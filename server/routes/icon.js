var express = require('express');
var router = express.Router();
var multer = require('multer');
var multers3 = require('multer-s3');
var aws = require('aws-sdk');

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const BUCKET = process.env.BUCKET;

// const s3 = new aws.S3({
//   accessKeyId: ACCESS_KEY_ID,
//   secretAccessKey: SECRET_ACCESS_KEY,
//   Bucket: BUCKET
// })

// const upload = multer({
//   storage: multers3({
//     s3: s3,
//     bucket: BUCKET,
//     // アクセスコントロール 全員の読み取りを許可
//     acl: 'public-read',
//     // 送信するオブジェクト
//     metadata: function(req, file, cb){
//       cb(null, { fieldName: file.originalname });
//     },
//     // ファイル名
//     key: function(req, file, cb){
//       const fullpath = 'icons/' + file.originalname + Date.now()
//       cb(null, fullpath);
//     }
//   })
// }).single('icon');

// S3への画像のアップロード
router.post('/', function(req, res) {
  // upload(req, res, function(err){
  //   if(err){
  //     res.send('uploaderror');
  //   }else{
  //     res.send(req.file.location);
  //   }
  // })
});

module.exports = router;
