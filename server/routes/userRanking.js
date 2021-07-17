var express = require('express');
var router = express.Router();

// いいね数が多いユーザーTOP3を取得
router.get('/', function(req, res){
  pool.query(
    `SELECT
      users.user_name,
      users.user_id,
      users.picture,
      users.profile,
      sum(reviews.likes)
    FROM reviews
    INNER JOIN users ON reviews.user_id=users.user_id
    GROUP BY reviews.user_id
    ORDER BY reviews.likes DESC
    LIMIT 3`, function(error, result){
      res.send(result);
    }
  );
});

module.exports = router;