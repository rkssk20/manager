var express = require('express');
var router = express.Router();

// 一週間以内の投稿から、いいねの多いものTOP3を取得
// 一週間以内の投稿が3件未満の場合、さらに一週間前から取得。これを3件たまるまで繰り返す。
router.get('/', async function(req, res){

});

module.exports = router;