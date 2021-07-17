var express = require('express');
var router = express.Router();

// 多くレビューされた作品TOP3を取得
router.get('/', function(req, res){
  pool.query(
    `SELECT
      works.work_id,
      works.title,
      works.genru,
      works.name,
      works.image,
      COUNT(*) AS COUNT
    FROM reviews
    INNER JOIN works ON reviews.work_id = works.work_id
    GROUP BY reviews.work_id
    ORDER BY COUNT DESC
    LIMIT 3`, function(error, result){
      res.send(result);
    }
  );
});

module.exports = router;