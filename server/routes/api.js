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

router.get ('/owners', async (req, res) => {
    let query = `SELECT * FROM owner ORDER BY owner`
    let result = await sequelize.query(query)
    res.send(result)
})

//post router not working
router.post('/client', async (req, res) => {
    console.log(req.body)
    const { last, first, email, sold, date, email_type, ownerName, country } = req.body
    //add query`SELECT
    let query = `INSERT INTO client VALUES (null, '${last}', '${first}', '${email}', 
    ${sold}, '${date}', ${email_type_id}, ${owner_id}, ${country_id})`;
    let result = await sequelize.query(query)
    console.log(result);
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