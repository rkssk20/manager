var express = require('express');
var router = express.Router();

// 投稿の取得
router.post('/', function(req, res){
  // スクロールに合わせて取得位置を指定
  const pageNum = req.body.page * 10;
  // ①レビューと投稿したユーザーを結合
  // ②レビューと対象作品を結合
  // ③ログイン中のユーザーが、そのレビューをいいねしていれば結合
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
    INNER JOIN users ON reviews.user_id = users.user_id AND reviews.user_id='${ req.body.account_id }'
    INNER JOIN works ON reviews.work_id = works.work_id
    LEFT JOIN likes ON reviews.review_id = likes.review_id AND likes.user_id='${ req.body.user_id }'
    ORDER BY reviews.created_at DESC
    LIMIT 10 OFFSET ${ pageNum }`,
    function(error, result){
      if(error) throw error;

      res.send({
        "statusCode": 200,
        "body": result
      });
    }
  );
});

module.exports = router;