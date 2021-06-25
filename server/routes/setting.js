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

// ユーザー情報のアップデート
router.post('/', function(req, res) {
  const update = {
    picture: req.body.picture,
    user_name: req.body.user_name,
    user_id: req.body.user_id,
    profile: req.body.profile
  };

  // IDの変更がない場合
  if(req.body.user_id === req.body.old_id){
    pool.query(`UPDATE users SET ? WHERE user_id='${ req.body.old_id }'`, update, function(err, result){
      if(err) throw err;

      res.send('success');
    });

  // IDの変更がある場合
  }else{
    // 同じIDを調べる
    pool.query(`SELECT user_id FROM users WHERE user_id='${ req.body.user_id }'`, function(err, result){
      if(err) throw err;
      
      // IDが他ユーザーに使用されている場合
      if(result.length > 0){
        res.send('already');

      // IDが未使用の場合更新する
      }else{
        connection.beginTransaction((err) => {
          if (err) {throw err;}
      
          // ①usersテーブルの変更
          connection.query(`UPDATE users SET ? WHERE user_id='${ req.body.old_id }'`, update, function(err, results, fields){
            if(err){
              return connection.rollback(() => {
                throw err;
              });
            }

            // ②reviewsテーブルのID変更
            connection.query(`UPDATE reviews SET user_id='${ req.body.user_id }' WHERE user_id='${ req.body.old_id }'`, function(err, results, fields){
              if(err){
                return connection.rollback(() => {
                  throw err;
                });
              }
      
              // ③likesテーブルのID変更
              connection.query(`UPDATE likes SET user_id='${ req.body.user_id }' WHERE user_id='${ req.body.old_id }'`, function(err, results, fields){
                if(err){
                  return connection.rollback(() => {
                    throw err;
                  });
                }

                // ④followsテーブルでフォロー側のID変更
                connection.query(`UPDATE follows SET user_id='${ req.body.user_id }' WHERE user_id='${ req.body.old_id }'`, function(err, results, fields){
                  if(err){
                    return connection.rollback(() => {
                      throw err;
                    });
                  }

                  // ⑤followsテーブルでフォロワー側のID変更
                  connection.query(`UPDATE follows SET follower_id='${ req.body.user_id }' WHERE follower_id='${ req.body.old_id }'`, function(err, results, fields){
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
                      
                      res.send('success');
                    });
                  });
                });
              });
            });
          });
        });
      }
    });
  }
});

module.exports = router;