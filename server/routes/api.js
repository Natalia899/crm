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
    console.log(result);
    res.send(result)
})

router.get('/owners', async (req, res) => {
    let query = `SELECT * FROM owner ORDER BY owner`
    let result = await sequelize.query(query)
    res.send(result)
})

const findId = async (table, name, value) => {
    let query = `SELECT id FROM ${table} WHERE ${name} = '${value}'`;
    let result = await sequelize.query(query)
    console.log(result[0][0].id);
    return (result[0][0].id)
}

//findId('country', 'country', 'Ukraine')

router.post('/client', async (req, res) => {
    console.log(req.body)
    const { last, first, email, sold, date, email_type, ownerName, country } = req.body
    let emailTypeId = email_type !== null ?
        await findId('email_type', 'email_type', email_type) :
        null
    let ownerId = await findId('owner', 'owner', ownerName)
    let countryId = await findId('country', 'country', country)
    let query = `INSERT INTO client VALUES (null, '${last}', '${first}', '${email}', 
    ${sold}, '${date}', ${emailTypeId}, ${ownerId}, ${countryId})`;
    let result = await sequelize.query(query)
    console.log(result);
    res.send(result)
})

router.put('/client/:id', async function (req, res) {
    const { id } = req.params
    let {tableName, newData} = req.body
    let query = `update client set ${tableName}='${newData}' where id=${id}` 
    let result = await sequelize.query(query)
    res.send(result)
})

router.delete('/client/:id', async (req, res) => {
    const { id } = req.params
    let query = `DELETE FROM client WHERE client.id = ${id}`;
    let result = await sequelize.query(query)
    console.log(result);
    res.send(result[0])
})


module.exports = router