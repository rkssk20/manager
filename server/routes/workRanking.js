var express = require('express');
var router = express.Router();

// 最新の投稿から一週間以内で、多くレビューされた作品TOP3を取得
router.get('/', async function(req, res){

  pool.query('SELECT created_at FROM reviews ORDER BY created_at DESC LIMIT 1', function(error, result){
    if(error){
      console.log(error);
      throw error;
    };

    res.send({
      "statusCode": 200,
      "body": result
    });
  });
});

module.exports = router;