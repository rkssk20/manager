var express = require('express');
var router = express.Router();

// 最新の投稿から一週間以内で、多くレビューされた作品TOP3を取得
router.get('/', function(req, res){

  async function Query(){
    const promisePool = pool.promise();

    // async function Promise(){
    //   const [response] = await promisePool.query('SELECT created_at FROM reviews ORDER BY created_at DESC LIMIT 1');

      const [result] = await promisePool.query(
        `SELECT
          works.work_id,
          works.title,
          works.genru,
          works.name,
          works.image,
          COUNT(*) AS COUNT
        FROM reviews
        INNER JOIN works ON reviews.work_id = works.work_id
        WHERE reviews.created_at BETWEEN '2021-06-25T14:44:30.000Z' - INTERVAL 7 DAY AND '2021-06-25T14:44:30.000Z'
        GROUP BY reviews.work_id
        ORDER BY COUNT DESC
        LIMIT 3`
      );

    //   return result;
    // };

    // const result = await Promise();

    res.send({
      "statusCode": 200,
      "body": result
    });
  };

  Query();
});

module.exports = router;