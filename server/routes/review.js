var express = require('express');
const router = express.Router();

var mysql = require('mysql');

const MYSQL_HOST = process.env['MYSQL_HOST'];
const MYSQL_USER = process.env['MYSQL_USER'];
const MYSQL_PASSWORD = process.env['MYSQL_PASSWORD'];
const MYSQL_DATABASE = process.env['MYSQL_DATABASE'];

var connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
});

router.post('/', function(req, res) {

})

module.exports = router;
