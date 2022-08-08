var express = require('express')
var app = express()
var fs = require('fs')

app.use(express.static('js'))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  fs.readFile('./js/index.html', (err, html) => {
    res.send(html)
  })
})

app.listen(8888)