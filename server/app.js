var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mysql = require('mysql2');

var accountRouter = require('./routes/account');
var profileRouter = require('./routes/profile');
var followRouter = require('./routes/follow');
var unFollowRouter = require('./routes/unFollow');
var reviewRouter = require('./routes/review');
var deletePostRouter = require('./routes/deletePost');
var musicRouter = require('./routes/music');
var postsRouter = require('./routes/posts');
var myPostsRouter = require('./routes/myPosts');
var workPostsRouter = require('./routes/workPosts');
var averageRouter = require('./routes/average');
var likeRouter = require('./routes/like');
var unLikeRouter = require('./routes/unLike');
var settingRouter = require('./routes/setting');
var deleteRouter = require('./routes/delete');
var iconRouter = require('./routes/icon');
var favoritesRouter = require('./routes/favorites');
var workRouter = require('./routes/work');
var workRankingRouter = require('./routes/workRanking');
var likeRankingRouter = require('./routes/likeRanking');
var userRankingRouter = require('./routes/userRanking');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json())
app.use(logger('dev'));
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/profile', profileRouter);
app.use('/account', accountRouter);
app.use('/follow', followRouter);
app.use('/unFollow', unFollowRouter);
app.use('/review', reviewRouter);
app.use('/deletePost', deletePostRouter);
app.use('/music', musicRouter);
app.use('/like', likeRouter);
app.use('/unLike', unLikeRouter);
app.use('/posts', postsRouter);
app.use('/myPosts', myPostsRouter);
app.use('/average', averageRouter);
app.use('/workPosts', workPostsRouter);
app.use('/favorites', favoritesRouter);
app.use('/setting', settingRouter);
app.use('/delete', deleteRouter);
app.use('/icon', iconRouter);
app.use('/work', workRouter);
app.use('/workRanking', workRankingRouter);
app.use('/likeRanking', likeRankingRouter);
app.use('/userRanking', userRankingRouter);

// mysql pool
var pool = mysql.createPool({
  host: process.env['MYSQL_HOST'],
  user: process.env['MYSQL_USER'],
  password: process.env['MYSQL_PASSWORD'],
  database: process.env['MYSQL_DATABASE'],
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

global.pool = pool;

app.get('/', (req, res) => {
  res.send('ver1');
});

var mysql2 = require('mysql2/promise');

app.get('/test', async function(req, res){

  var connection = mysql2.createPool({
    host: process.env['MYSQL_HOST'],
    user: process.env['MYSQL_USER'],
    password: process.env['MYSQL_PASSWORD'],
    database: process.env['MYSQL_DATABASE'],
  });

  connection.connect();

  connection.query('SELECT created_at FROM reviews ORDER BY created_at DESC LIMIT 1', function(error, response){
    connection.query(
      `SELECT
        works.work_id,
        works.title,
        works.genru,
        works.name,
        works.image,
        COUNT(*) AS COUNT
      FROM reviews
      INNER JOIN works ON reviews.work_id = works.work_id
      WHERE reviews.created_at BETWEEN '${ response[0].created_at }' - INTERVAL 7 DAY AND '${ response[0].created_at }'
      GROUP BY reviews.work_id
      ORDER BY COUNT DESC
      LIMIT 3`
    );

    connection.end();
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;