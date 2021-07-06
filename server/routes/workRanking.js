var express = require('express');
var router = express.Router();

// 一週間以内の投稿から、レビューされた数の多い作品TOP3を取得する
// 一週間以内の投稿が3件未満の場合、さらに一週間前から取得。これを3件たまるまで繰り返す。
router.get('/', async function(req, res){

  res.set({ 'Access-Control-Allow-Origin': '*' });
  
  const resultList = [];
  let day = 0;
  const promisePool = pool.promise();

  function Query(){
    async function Loop(){      
      const [rows, fields] = await promisePool.query(
        `SELECT
          works.work_id,
          works.title,
          works.genru,
          works.name,
          works.image,
          COUNT(*) AS COUNT
        FROM reviews          
        INNER JOIN works ON reviews.work_id = works.work_id
        WHERE reviews.created_at BETWEEN NOW() - INTERVAL ${ day + 7 } DAY AND NOW() - INTERVAL ${ day } DAY
        GROUP BY reviews.work_id
        ORDER BY COUNT DESC
        LIMIT 3`
      );

      await resultList.push(rows);
      return rows.length;
    };

    Loop().then((result) => {
      if(result < 3){
        day = day + 7;
        Query();
      }else{
        res.send(...resultList);
      }
    });
  };

  Query();
});

module.exports = router;