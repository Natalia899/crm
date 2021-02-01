const express = require("express")
const router = express.Router()
const mysql = require('mysql')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/sql_crm')

router.get('/clients', async (req, res) => {
    let query = `SELECT * FROM client, country, owner, email_type
WHERE client.email_type_id = email_type.id AND
client.country_id = country.id AND
client.owner_id = owner.id
ORDER BY last`;
    let result = await sequelize.query(query)
    res.send(result)
})

router.get('/owners', async (req, res) => {
    let query = `SELECT * FROM owner ORDER BY owner`
    let result = await sequelize.query(query)
    res.send(result)
})

router.get('/email', async (req, res) => {
    let query = `SELECT * FROM email_type`
    let result = await sequelize.query(query)
    res.send(result)
});

router.get('/hottestCountry', async (req, res) => {
    const query = `SELECT country AS category, COUNT(*) AS sum
    FROM client as c, country as co
    WHERE c.country_id = co.id
    GROUP BY country
    ORDER BY COUNT(*) DESC;`
    const country = (await sequelize.query(query))[0][0]
    res.send(country)
});


router.get('/chartsData', async (req, res) => {
    const ownerQuery = `SELECT owner AS category, COUNT(*) AS sales
      FROM  client AS c, owner AS o 
      WHERE c.owner_id = o.id
      AND c.sold IS TRUE
      GROUP BY owner
      ORDER BY COUNT(*) DESC;`
    const countryQuery = `SELECT country AS category, COUNT(*) AS sales
      FROM client as c, country as co
      WHERE c.country_id = co.id
      GROUP BY country;`
    const monthQuery = `SELECT COUNT(date) as counted_leads,
     date as count_date 
     FROM client 
     GROUP BY  date;`
    const owners = (await sequelize.query(ownerQuery))[0].slice(0, 3)
    const countries = (await sequelize.query(countryQuery))[0]
    const lastMonth = (await sequelize.query(monthQuery))[0]
        .filter(d => new Date(d.count_date) > new Date(new Date().setDate(new Date().getDate() - 30)))
    res.send({ owners, countries, lastMonth })
})

const findId = async (table, name, value) => {
    let query = `SELECT id FROM ${table} WHERE ${name} = '${value}'`;
    let result = await sequelize.query(query)
    console.log(result[0][0].id);
    return (result[0][0].id)
}

router.post('/client', async (req, res) => {
    console.log(req.body)
    const { last, first, email, sold, date, email_type, owner, country } = req.body
    let emailTypeId = email_type == null ?
        null :
        await findId('email_type', 'email_type', email_type)
    let ownerId = await findId('owner', 'owner', owner)
    let countryId = await findId('country', 'country', country)
    let query = `INSERT INTO client VALUES (null, '${last}', '${first}', '${email}', 
    ${sold}, '${date}', ${emailTypeId}, ${ownerId}, ${countryId})`;
    let result = await sequelize.query(query)
    console.log(result);
    res.send(result)
})

router.put('/client/:name', async function (req, res) {
    const { name } = req.params
    let { tableName, newValue } = req.body
    let clientId = await findId('client', 'last', name)

    if (tableName === 'email_type') {
        let referenceId = await findId(`${tableName}`, `${tableName}`, `${newValue}`)
        let query = `UPDATE client SET email_type_id = ${referenceId} WHERE id=${clientId}`
        let result = await sequelize.query(query)
        console.log(result)
        res.send(result)
    } else if (tableName === 'owner') {
        let referenceId = await findId(`${tableName}`, `${tableName}`, `${newValue}`)
        let query = `UPDATE client SET owner_id = ${referenceId} WHERE id=${clientId}`
        let result = await sequelize.query(query)
        console.log(result)
        res.send(result)
    } else if (tableName === 'sold') {
        let query = `UPDATE client SET sold = 1 WHERE id=${clientId}`
        let result = await sequelize.query(query)
        console.log(result)
        res.send(result)
    }
})

router.delete('/client/:id', async (req, res) => {
    const { id } = req.params
    let query = `DELETE FROM client WHERE client.id = ${id}`;
    let result = await sequelize.query(query)
    console.log(result);
    res.send(result[0])
})


module.exports = router