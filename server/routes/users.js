var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

const AWS_BUCKET = process.env.AWS_BUCKET;

const s3 = new AWS.S3({'region':'ap-northeast-1'});

router.post('/', function(req, res){
  const oldName = req.body.image;
  // S3の画像URLからキー部分を抜き取る
  const icon = oldName.substring(oldName.lastIndexOf("/")-5,oldName.length);
  console.log(icon);

  // ①Auth0に設定してある画像のURLからKeyを作成し、S3の画像がアップロードされてから何ミリ秒経過したか取得
  s3.getObject({
    Bucket: AWS_BUCKET,
    Key: icon
  }, function(err, data) {
    if (err) {
      res.send(err);
    }else{
      const time = new Date();
      const nowTime = time.getTime();
      const s3Time = data.LastModified.getTime();
      const result = nowTime - s3Time;

      if(result > 0){
        // ②30日以上経過していたらその画像を削除
        s3.deleteObject({
          Bucket: AWS_BUCKET,
          Key: icon
        })
        .promise()
        .then(response => console.log(response))
        .then(res.send('goodLuck'))
        .catch(error => res.send(error));
      }else{
        res.send('timeError');
      }
    }
  });
});

module.exports = router;