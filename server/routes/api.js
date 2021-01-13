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

router.get('/email', async (req, res) => {
    let query = `SELECT * FROM email_type`
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

// router.post('/client', async (req, res) => {
//     console.log(req.body)
//     const { last, first, email, sold, date, email_type, owner, country } = req.body
//     let emailTypeId = email_type !== null ?
//         await findId('email_type', 'email_type', email_type) :
//         null
//     let ownerId = await findId('owner', 'owner', owner)
//     let countryId = await findId('country', 'country', country)
//     let query = `INSERT INTO client VALUES (null, '${last}', '${first}', '${email}', 
//     ${sold}, '${date}', ${emailTypeId}, ${ownerId}, ${countryId})`;
//     let result = await sequelize.query(query)
//     console.log(result);
//     res.send(result)
// })


router.post('/client', async (req, res) => {
    console.log(req.body)
    const { last, first, email, sold, date, email_type, owner, country } = req.body
    let emailTypeId = email_type !== null ?
        await findId('email_type', 'email_type', 'A') :
        await findId('email_type', 'email_type', 'A')
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