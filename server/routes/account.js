var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
  pool.query(
    `SELECT
      users.user_name,
      users.user_id,
      users.picture,
      users.profile,
      follows.follow_id
    FROM users
    LEFT JOIN follows ON users.user_id = follows.follower_id AND follows.user_id='${ req.body.user_id }'
    WHERE users.user_name LIKE '%${ req.body.name }%' OR users.user_id LIKE '%${ req.body.name }%'`,
    function(error, result){
      if(error) throw error;

    res.send(result);
  });
});

module.exports = router;