var sqlite3 = require('sqlite3').verbose()
var path = require('path');
var fs = require("fs");
var express = require('express');
var app = express();
// var PORT = process.env.PORT || 8080
var PORT = 8000
//connect to the database
var db = new sqlite3.Database('./coursera.db');

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

//path for static files - to be served to the client
app.use(express.static(path.join(__dirname, 'dist')));


//Application Routes
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

//api to get thread info in json
app.get('/api/:id', function(request, response) {
  // var filePath = path.join(__dirname, 'dist', 'threads', request.params.id + '.txt');

  //reading file to get threadId's
  // fs.readFile(filePath, function (err, data) {
  //   if (err) {
  //      return console.error(err);
  //   }
  //   threadIdList = data.toString().split('\n');
    // if(threadIdList.length>15){
    //   var thread_start = (request.params.num-1) * 15;
    //   var thread_end = (request.params.num)*15;
    //   threadIdList = threadIdList.slice(thread_start,thread_end);
    // }

    //getting thread info from database
    // query = 'SELECT lastAnsweredAt, createdAt, title, viewCount, totalAnswerCount FROM thread WHERE threadId IN (\'' + threadIdList.join('\', \'') + '\');';
    query = 'SELECT T.lastAnsweredAt, T.createdAt, T.title, T.content, T.viewCount, T.totalAnswerCount, T.id, T.courseId, T.threadId, TN.score FROM thread T, thread_new TN WHERE T.id = TN.id and T.courseId = \'' + request.params.id + '\' ORDER BY TN.score DESC;';
    db.all(query, function(err,rows){
      //console.log(rows.length);
      if(err){
        console.log('ERROR while querying database ; ' + err);
        return;
      };
      response.json(rows);
    });

  });

// });

// Get course ids from the databse
app.get('/courses', function(request, response) {
    query = 'SELECT DISTINCT courseId FROM thread;';
    db.all(query, function(err,rows){
      //console.log(rows.length);
      if(err){
        console.log('ERROR while querying database ; ' + err);
        return;
      };
      response.json(rows);
    });
});

// get all posts from one particular thread
app.get('/api/thread/:id', function(request, response) {
    // query = 'SELECT id, user, post_text, post_time FROM post2 WHERE thread_id = \'' + request.params.id + '\';';    //Select thread content
    query = 'SELECT id, user, post_text, post_time FROM post_new WHERE thread_id = \'' + request.params.id + '\';';    //Select all posts under the thread
    db.all(query, function(err,rows){
      //console.log(rows.length);
      if(err){
        console.log('ERROR while querying database ; ' + err);
        return;
      };
      response.json(rows);
    });
});


//universal routes - route to the react app
app.get('*', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

//Port for listening
app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
