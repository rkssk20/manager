var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// spotify api
router.post('/', async function(req, res) {
  var SpotifyApi = await new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
  });
  
  await SpotifyApi.clientCredentialsGrant().then(
    function(data) {  
      SpotifyApi.setAccessToken(data.body['access_token']);
    },
  );

  // 検索で10件取得
  if(req.body.submit){
    SpotifyApi.searchTracks(req.body.submit, { limit: 10, country: 'JP' })
    .then(function(data){
      const resultList = [];
      var number;

      if(data.body.tracks.items.length === 0){
        resultList.push('empty');
      }else{
        number = data.body.tracks.items.length;
      }

      for(let i = 0; i < number; i++){
        const nameList = [];

        data.body.tracks.items[i].artists.forEach(item => {
          nameList.push(item.name);
        });

        resultList.push({
          id: data.body.tracks.items[i].id,
          image: data.body.tracks.items[i].album.images[0].url,
          title: data.body.tracks.items[i].name,
          name:  nameList.join(','),
          date: data.body.tracks.items[i].album.release_date
        });
      };

      res.send({
        "statusCode": 200,
        "body": resultList
      });
    });
  }
  
  // ID指定で取得
  if(req.body.id){
    SpotifyApi.getTrack(req.body.id, { country: 'JP' })
    .then(function(data){
      const nameList = [];

      data.body.artists.forEach(item => {
        nameList.push(item.name);
      });

      res.send({
        "statusCode": 200,
        "body": {
          id: data.body.id,
          url: data.body.external_urls.spotify,
          image: data.body.album.images[0].url,
          poster: '',
          title: data.body.name,
          name:  nameList.join(','),
          date: data.body.album.release_date
        }
      });
    }); 
  }
});

module.exports = router;