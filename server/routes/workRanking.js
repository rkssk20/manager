var express = require('express');
var router = express.Router();

var mysql = require('mysql2');

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

let response;

connection.query('SELECT created_at FROM reviews ORDER BY created_at DESC LIMIT 1', function(error, result){
  response = result[0].created_at;
});

// 最新の投稿から一週間以内で、多くレビューされた作品TOP3を取得
router.get('/', async function(req, res){
  connection.query(
    `SELECT
      works.work_id,
      works.title,
      works.genru,
      works.name,
      works.image,
      COUNT(*) AS COUNT
    FROM reviews
    INNER JOIN works ON reviews.work_id = works.work_id
    WHERE reviews.created_at BETWEEN '${ response }' - INTERVAL 7 DAY AND '${ response }'
    GROUP BY reviews.work_id
    ORDER BY COUNT DESC
    LIMIT 3`, function(error, result){
      res.send({
        "statusCode": 202,
        "body": result
      });
    }
  );
});

module.exports = router;