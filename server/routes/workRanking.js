var express = require('express');
var router = express.Router();

// 最新の投稿から一週間以内で、多くレビューされた作品TOP3を取得
router.get('/', function(req, res){

  // const response = await connection.query('SELECT created_at FROM reviews ORDER BY created_at DESC LIMIT 1');

  // const result = await connection.query(
  //   `SELECT
  //     works.work_id,
  //     works.title,
  //     works.genru,
  //     works.name,
  //     works.image,
  //     COUNT(*) AS COUNT
  //   FROM reviews
  //   INNER JOIN works ON reviews.work_id = works.work_id
  //   WHERE reviews.created_at BETWEEN '${ response[0].created_at }' - INTERVAL 7 DAY AND '${ response[0].created_at }'
  //   GROUP BY reviews.work_id
  //   ORDER BY COUNT DESC
  //   LIMIT 3`
  // );

  // res.send(response, result);

  // return promise;

});

module.exports = router;