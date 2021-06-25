var express = require('express');
var router = express.Router();

// いいねした投稿の取得
router.post('/', async function(req, res){
  const pageNum = req.body.page * 10;

  // 表示しているアカウントがいいねした投稿を外部結合で取得。
  // その投稿にログイン中のユーザーがいいねしていれば内部結合で取得
  pool.query(
    `SELECT
      reviews.work_id,
      reviews.genru,
      reviews.review_id,
      reviews.review,
      reviews.neta,
      reviews.star,
      IFNULL(likes, 0) AS likes,
      reviews.created_at,
      users.user_id,
      users.user_name,
      users.picture,
      works.title,
      works.name,
      works.image,
      userLikes.user_id AS Ilike
    FROM likes accountLikes
    INNER JOIN reviews ON accountLikes.review_id=reviews.review_id AND accountLikes.user_id='${ req.body.account_id }'
    INNER JOIN users ON reviews.user_id = users.user_id
    INNER JOIN works ON reviews.work_id = works.work_id
    LEFT JOIN likes userLikes ON reviews.review_id=userLikes.review_id AND userLikes.user_id='${ req.body.user_id }'
    ORDER BY accountLikes.created_at DESC
    LIMIT 10 OFFSET ${ pageNum }`,
    function(error, result){
      if(error) throw error;

      res.send(result);
    }
  );
});

module.exports = router;