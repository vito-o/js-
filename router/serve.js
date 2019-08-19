var express = require('express')

var app = express()

app.use('/index', express.static(__dirname + ''))


app.listen(8888)


console.log('server running in 8888')