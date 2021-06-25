var express = require('express');
var router = express.Router();

// 投稿の取得
router.post('/', function(req, res){
  // スクロールに合わせて取得位置を指定
  const pageNum = req.body.page * 10;

  // フォローしている全ユーザーのIDを取得
  pool.query(`SELECT follower_id FROM follows WHERE user_id='${ req.body.user_id }'`, function(err, result){

    let followList = [ "'" + req.body.user_id + "'"];

    result.map(item => {
      followList.push( "'" + item.follower_id + "'")
    });

    const follows = followList.join(',');

    // フォローしているID、または自分のIDに一致する投稿を全て取得
    pool.query(
      `SELECT
        reviews.review_id,
        reviews.work_id,
        reviews.review,
        reviews.genru,
        reviews.neta,
        reviews.star,
        reviews.created_at,
        IFNULL(likes, 0) AS likes,
        users.user_id,
        users.user_name,
        users.picture,
        works.title,
        works.name,
        works.image,
        likes.user_id AS Ilike
      FROM reviews
      INNER JOIN users ON reviews.user_id = users.user_id
      INNER JOIN works ON reviews.work_id = works.work_id
      LEFT JOIN likes ON reviews.review_id = likes.review_id AND likes.user_id='${ req.body.user_id }'
      WHERE reviews.user_id IN ${ '(' + follows + ')' }
      ORDER BY reviews.created_at DESC
      LIMIT 10 OFFSET ${ pageNum }`,
      function(error, result){
        if(error) throw error;
  
        res.send(result);
      }
    );
  });
});

module.exports = router;