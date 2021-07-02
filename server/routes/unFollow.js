var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

const MYSQL_HOST = process.env['MYSQL_HOST'];
const MYSQL_USER = process.env['MYSQL_USER'];
const MYSQL_PASSWORD = process.env['MYSQL_PASSWORD'];
const MYSQL_DATABASE = process.env['MYSQL_DATABASE'];

// フォローを外す
// var connection = mysql.createConnection({
//   host: MYSQL_HOST,
//   user: MYSQL_USER,
//   password: MYSQL_PASSWORD,
//   database: MYSQL_DATABASE
// });

router.post('/', function(req, res){
  const follow = {
    user_id: req.body.user_id,
    follower_id: req.body.follower_id
  };
  
  connection.beginTransaction((err) => {
    if (err) { throw err; }

    // ①usersテーブルで自分のフォロー数を - 1
    connection.query(`UPDATE users SET follow = IFNULL(follow, 0) - 1 WHERE user_id='${ req.body.user_id }'`, function(err, results, fields){
      if(err){
        return connection.rollback(() => {
          throw err;
        });
      }

      // ②usersテーブルで相手のフォロワー数を - 1
      connection.query(`UPDATE users SET follower = IFNULL(follower, 0) - 1 WHERE user_id='${ req.body.follower_id }'`, function(err, results, fields){
        if(err){
          return connection.rollback(() => {
            throw err;
          });
        }

        // ③followテーブルから削除
        connection.query(`DELETE FROM follows WHERE user_id='${ req.body.user_id }' AND follower_id='${ req.body.follower_id }'`, function(err, results, fields){
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
});

module.exports = router;
