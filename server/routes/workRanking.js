var express = require('express');
var router = express.Router();

// 最新の投稿から一週間以内で、多くレビューされた作品TOP3を取得
router.get('/', async function(req, res){

  const resultList = [];
  const promisePool = pool.promise();

  try{
    function Query(){
      async function Loop(){      
        const [rows, fields] = await promisePool.query('SELECT created_at FROM reviews ORDER BY created_at DESC LIMIT 1');

        resultList.push(rows);
      };

      Loop().then(() => {
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
          WHERE reviews.created_at BETWEEN '${ resultList[0] }' - INTERVAL 7 DAY AND '${ resultList[0] }'
          GROUP BY reviews.work_id
          ORDER BY COUNT DESC
          LIMIT 3`, function(error, result){
            res.send(result);
          }
        );
      });
    };

    Query();
  }catch(error){
    console.log(error);
  }
});

module.exports = router;