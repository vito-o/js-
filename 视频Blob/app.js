let express = require('express')
let app = express()
let fs = require('fs')

app.all('*', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

var questions = [
  {
    data:231,
    num:444,
    age:13
  },
  {
    data:231,
    num:444,
    age:13
  },
]

app.get('/video_1', function(req, res){
  res.sendFile( __dirname + "/" + "1-1-0.mp4" );
})
app.get('/video_2', function(req, res){
  res.sendFile( __dirname + "/" + "1-2-0.mp4" );
})
app.get('/video_3', function(req, res){
  res.sendFile( __dirname + "/" + "1-3-0.mp4" );
})
app.get('/video_4', function(req, res){
  res.sendFile( __dirname + "/" + "1-4-0.mp4" );
})
app.get('/video_5', function(req, res){
  res.sendFile( __dirname + "/" + "1-5-0.mp4" );
})

app.get('/123', function(req, res){
  res.status(200)
  res.json(questions)
})

var server = app.listen(8888, function(){
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})