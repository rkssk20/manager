var express = require('express');
var router = express.Router();

// 一週間以内に獲得したいいね数が多いユーザーTOP3を取得
// 一週間以内の投稿が3件未満の場合、さらに一週間前から取得。これを3件たまるまで繰り返す。
router.get('/', async function(req, res){
  const resultList = [];
  const promisePool = pool.promise();

  try{
    function Query(){
      async function Loop(){      
        const [rows, fields] = await promisePool.query(`SELECT * FROM reviews`);

        resultList.push(rows);
        return resultList;
      };

      Loop().then((result) => {
        res.send(result);
      });
    };

    Query();
  }catch(error){
    console.log(error);
  }
});

module.exports = router;