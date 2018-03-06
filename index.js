const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const sha256 = require('sha256')
const crypto = require('crypto')

const port = process.env.PORT || 3000
let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')


let app = express();
let pool  = mysql.createPool({
    connectionLimit : 5,
    host            : process.env.MYSQL_ADDON_HOST,
    user            : process.env.MYSQL_ADDON_USER,
    password        : process.env.MYSQL_ADDON_PASSWORD,
    database        : process.env.MYSQL_ADDON_DB
})

app.use(bodyParser.json())  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))  // for parsing application/x-www-form-urlencoded

require('./routes/index.js')(app, pool, mysql, sha256)
require('./routes/admin.js')(app, pool, mysql, sha256)
require('./routes/users.js')(app, pool, mysql, sha256, date, bodyParser, crypto)
require('./routes/blog.js')(app, pool, mysql, sha256, date, bodyParser, crypto)

app.listen(port, () => {
    console.log('Server started at http://localhost: %s', port)
})
