var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

const MYSQL_HOST = process.env['MYSQL_HOST'];
const MYSQL_USER = process.env['MYSQL_USER'];
const MYSQL_PASSWORD = process.env['MYSQL_PASSWORD'];
const MYSQL_DATABASE = process.env['MYSQL_DATABASE'];

// var connection = mysql.createConnection({
//   host: MYSQL_HOST,
//   user: MYSQL_USER,
//   password: MYSQL_PASSWORD,
//   database: MYSQL_DATABASE
// });

// 投稿の削除、いいねの該当カラム削除
router.post('/', function(req, res){
  connection.beginTransaction((err) => {
    if (err) { throw err; }

    // ①投稿を削除
    connection.query(`DELETE from reviews WHERE review_id='${ req.body.review_id }'`, function(err, results, fields){
      if(err){
        return connection.rollback(() => {
          console.log(err)
          throw err;
        });
      }

      // ②いいねの該当レビューの削除
      connection.query(`DELETE from likes WHERE review_id='${ req.body.review_id }'`, function(err, results, fields){
        if(err){
          return connection.rollback(() => {
            console.log(err)
            throw err;
          });
        }

        connection.commit((err) => {
          if(err){
            return connection.rollback(() => {
              throw err;
            });
          }
          
          res.send('success');
        });
      });
    });
  });
});

module.exports = router;