var express = require('express');
var router = express.Router();
var multer = require('multer');
var multers3 = require('multer-s3');
var aws = require('aws-sdk');

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_BUCKET = process.env.AWS_BUCKET;

const s3 = new aws.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  Bucket: AWS_BUCKET
})

const upload = multer({
  storage: multers3({
    s3: s3,
    bucket: AWS_BUCKET,
    // アクセスコントロール 全員の読み取りを許可
    acl: 'public-read',
    // 送信するオブジェクト
    metadata: function(req, file, cb){
      cb(null, { fieldName: file.originalname });
    },
    // ファイル名
    key: function(req, file, cb){
      const fullpath = 'icons/' + file.originalname + Date.now()
      cb(null, fullpath);
    }
  })
}).single('icon');

router.post('/', function(req, res) {
  upload(req, res, function(err){
    if(err){
      console.log(err);
      res.send('error')
    }else{
      console.log(req.file.location);
      res.send(req.file.location);
    }
  })
});

module.exports = router;
