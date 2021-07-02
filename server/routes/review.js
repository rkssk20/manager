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


router.post('/', function(req, res){
  const review = {
    user_id: req.body.user_id,
    work_id: req.body.work_id,
    genru: req.body.genru,
    review: req.body.review,
    neta: req.body.neta,
    star: req.body.star,
    created_at: new Date
  };
  
  const work = {
    work_id: req.body.work_id,
    genru: req.body.genru,
    title: req.body.title,
    name: req.body.name,
    image: req.body.image,
  };

  pool.query(`SELECT * FROM works WHERE work_id='${ req.body.work_id }'`, function(error, result){

    // すでにレビューの存在する作品の場合
    if(result.length > 0){
      pool.query('INSERT INTO reviews SET ?', review, function(error, result){
    
        res.send('success');
      });

    // 初めて投稿する作品の場合
    }else{
      connection.beginTransaction((err) => {
        if (err) { throw err; }
    
        // ①作品を保存
        connection.query(`INSERT INTO works SET ?`, work, function(err, results, fields){
          if(err){
            return connection.rollback(() => {
              throw err;
            });
          }
    
          // ②レビューを保存
          connection.query('INSERT INTO reviews SET ?', review, function(err, results, fields){
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
    };
  });
});

module.exports = router;