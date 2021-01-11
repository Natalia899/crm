const express = require('express')
const path = require('path')
const app = express()
const mysql = require('mysql')
//
const api = require('./server/routes/api')

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//   });

//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE sql_crm", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });

const sqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sql_crm',
    multipleStatements: true
})

sqlConnection.connect((err) => {
    if (!err)
        console.log('DB connected')
    else
        console.log('DB connection failed' + JSON.stringify(err, undefined, 2))
})


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', api)

const port = 3002
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})