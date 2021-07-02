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
  
  // 投稿へのいいね
router.post('/', function(req, res){
  const likes = {
    review_id: req.body.review_id,
    user_id: req.body.user_id,
    created_at: new Date
  };
  
  connection.beginTransaction((err) => {
    if (err) { throw err; }

    // ①reviewsテーブルの該当レビューで、いいねの総数を + 1
    connection.query(`UPDATE reviews SET likes = IFNULL(likes, 0) + 1 WHERE review_id=${ req.body.review_id }`, function(err, results, fields){
      if(err){
        return connection.rollback(() => {
          throw err;
        });
      }

      // ②likesテーブルに誰がどのレビューをいいねしたかを保存
      connection.query('INSERT INTO likes SET ?', likes, function(err, results, fields){
        if(err){
          return connection.rollback(() => {
            throw err;
          });
        }

        connection.commit((err) => {
          if(err){
            return connection.rollback(() => {
              throw err;
            });
          }
          
          res.send('success!');
        });
      });
    });
  });
});

module.exports = router;
