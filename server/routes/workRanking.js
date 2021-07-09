var express = require('express');
var router = express.Router();

// 最新の投稿から一週間以内で、多くレビューされた作品TOP3を取得
router.get('/', async function(req, res){

  pool.query('SELECT created_at FROM reviews ORDER BY created_at DESC LIMIT 1', function(error, result){
    if(error){
      console.log(error);
      throw error;
    };

    console.log(result[0])

    res.send({
      "statusCode": 200,
      "body": JSON.stringify(result[0])
    });

    // pool.query(
    //   `SELECT
    //     works.work_id,
    //     works.title,
    //     works.genru,
    //     works.name,
    //     works.image,
    //     COUNT(*) AS COUNT
    //   FROM reviews          
    //   INNER JOIN works ON reviews.work_id = works.work_id
    //   WHERE reviews.created_at ${ result[0] } AND ${ result[0] } - INTERVAL 7 DAY
    //   GROUP BY reviews.work_id
    //   ORDER BY COUNT DESC
    //   LIMIT 3`,
    //   function(err, res){
    //     if(err){
    //       console.log(err);
    //       throw err;
    //     };

    //     res.send({
    //       "statusCode": 200,
    //       "body": JSON.stringify(result)
    //     });
    //   }
    // )
  });
});

module.exports = router;