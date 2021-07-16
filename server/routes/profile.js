var express = require('express');
var router = express.Router();

// ユーザーデータ
router.post('/', function(req, res){
  let sql;

  if(req.body.myAccount){
    const auth_id = req.body.id.replace('auth0|', '');

    sql = `SELECT
            picture,
            user_name,
            user_id,
            profile,
            IFNULL(follow, 0) AS follow,
            IFNULL(follower, 0) AS follower
          FROM users WHERE auth_id='${ auth_id }'`;

  }else{
    sql = `SELECT
            users.picture,
            users.user_name,
            users.user_id,
            users.profile,
            IFNULL(follow, 0) AS follow,
            IFNULL(follower, 0) AS follower,
            follows.follow_id
          FROM users
          LEFT JOIN follows ON users.user_id = follows.follower_id AND follows.user_id='${ req.body.user_id }'
          WHERE users.user_id='${ req.body.id }'`;
  };

  pool.query(sql, function(err, result){
    if(err) throw err;

    if(result.length !== 0){
      res.send(result);
    }else{
      res.send(['empty']);
    }
  });
});

module.exports = router;