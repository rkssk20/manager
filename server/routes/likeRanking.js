var express = require('express');
var router = express.Router();

// 一週間以内の投稿から、いいねの多いものTOP3を取得
// 一週間以内の投稿が3件未満の場合、さらに一週間前から取得。これを3件たまるまで繰り返す。
router.get('/', async function(req, res){

  // const resultList = [];
  // let day = 0;
  // const promisePool = pool.promise();

  // try{
  //   function Query(){
  //     async function Loop(){      
  //       const [rows, fields] = await promisePool.query(
  //         `SELECT
  //           reviews.review,
  //           reviews.genru,
  //           reviews.neta,
  //           reviews.star,
  //           reviews.created_at,
  //           IFNULL(likes, 0) AS likes,
  //           users.user_id,
  //           users.user_name,
  //           users.picture,
  //           works.work_id,
  //           works.title,
  //           works.name,
  //           works.image
  //         FROM reviews
  //         INNER JOIN works ON reviews.work_id = works.work_id
  //         INNER JOIN users ON reviews.user_id = users.user_id
  //         WHERE reviews.created_at BETWEEN NOW() - INTERVAL ${ day + 7 } DAY AND NOW() - INTERVAL ${ day } DAY
  //         ORDER BY reviews.likes DESC
  //         LIMIT 3`
  //       );

  //       resultList.push(rows);
  //       return resultList.length;
  //     };

  //     Loop().then((result) => {
  //       if(result < 3){
  //         day = day + 7;
  //         Query();
  //       }else{
  //         res.send(...resultList);
  //       }
  //     });
  //   };

  //   Query();
  // }catch(error){
  //   console.log(error);
  // }
});

module.exports = router;