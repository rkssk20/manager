var express = require('express');
var router = express.Router();

// 作品情報の取得
router.post('/', async function(req, res){
  pool.query(
    `SELECT * FROM works WHERE work_id='${ req.body.work_id }' AND genru=${ req.body.genru }`,
    function(error, result){
      if(error) throw error;

      res.send(result);
    }
  );
});

module.exports = router;