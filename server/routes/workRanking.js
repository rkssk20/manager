var express = require('express');
var router = express.Router();

// 最新の投稿から一週間以内で、多くレビューされた作品TOP3を取得
router.get('/', async function(req, res){

  // async function Query(){
    // const promisePool = pool.promise();

    const response = await function Promise(){
      pool.query('SELECT created_at FROM reviews ORDER BY created_at DESC LIMIT 1', function(error, response){
        return response[0].created_at;
      });
    };

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
      WHERE reviews.created_at BETWEEN '${ response }' - INTERVAL 7 DAY AND '${ response }'
      GROUP BY reviews.work_id
      ORDER BY COUNT DESC
      LIMIT 3`, function(error, result){

        res.send({
          "statusCode": 200,
          "body": result
        });
      }
    );
});

module.exports = router;