var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

const BUCKET = process.env.BUCKET;
const s3 = new AWS.S3({'region':'ap-northeast-1'});
// ユーザー設定におけるS3の画像の削除

router.post('/', function(req, res){
  const oldName = req.body.image;
  // S3の画像URLからキー部分を抜き取る
  const icon = oldName.substring(oldName.lastIndexOf("/")-5,oldName.length);

  // ①Auth0に設定してある画像のURLからKeyを作成し、S3の画像がアップロードされてから何ミリ秒経過したか取得
  s3.getObject({
    Bucket: BUCKET,
    Key: icon
  }, function(err, data) {
    if (err) {
      // S3にないときエラーが出るので消去成功としておく
      res.send({result: 'deleted'});
    }else{
      const time = new Date();
      const nowTime = time.getTime();
      const s3Time = data.LastModified.getTime();
      const resultTime = nowTime - s3Time;

      // ②30日以上経過していたらその画像を削除
      if(resultTime > 2592000000){
        s3.deleteObject({
          Bucket: BUCKET,
          Key: icon
        })
        .promise()
        .then(res.send({result: 'deleted'}));
      }else{
        res.send({result: resultTime});
      }
    }
  });
});

module.exports = router;
