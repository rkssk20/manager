var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const MYSQL_HOST = process.env['MYSQL_HOST'];
const MYSQL_DATABASE = process.env['MYSQL_DATABASE'];
const MYSQL_USER = process.env['MYSQL_USER'];
const MYSQL_PASSWORD = process.env['MYSQL_PASSWORD'];

const connection = mysql.createConnection({
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
});

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });


});

module.exports = router;
