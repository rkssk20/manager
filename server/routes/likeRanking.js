var express = require('express');
var router = express.Router();

// いいねの多い投稿TOP3を取得
router.get('/', function(req, res){
  pool.query(
    `SELECT
      reviews.review,
      reviews.genru,
      reviews.neta,
      reviews.star,
      reviews.created_at,
      IFNULL(likes, 0) AS likes,
      users.user_id,
      users.user_name,
      users.picture,
      works.work_id,
      works.title,
      works.name,
      works.image
    FROM reviews
    INNER JOIN works ON reviews.work_id = works.work_id
    INNER JOIN users ON reviews.user_id = users.user_id
    ORDER BY reviews.likes DESC
    LIMIT 3`, function(error, result){
      res.send(result);
    }
  );
});

module.exports = router;