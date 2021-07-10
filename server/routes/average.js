var express = require('express');
var router = express.Router();

// 評価の平均を取得
router.post('/', function(req, res){
  pool.query(
    `SELECT AVG(star) AS average FROM reviews WHERE work_id='${ req.body.work_id }' AND genru=${ req.body.genru }`,
    function(error, result){
      if(error) throw error;

      res.send(result);
    }
  );
});

module.exports = router;