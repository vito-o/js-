const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    if(req.url == '/'){
        // res.setHeader('Content-Type', 'text/plain')
        // res.setHeader('Content-Length', 12);
        // res.write('helloworld')

        res.setHeader('Content-Type', 'text/html; charset=utf8')
        res.setHeader('Content-Length', 10)
        res.setHeader('Transfer-Encoding', 'chunked');
        res.write('<p>来啦</p>')
        setTimeout(() => {
            res.write('第一次传对双方来说咖啡碱阿斯利康房价打算离开房间撒旦离开房间打扫克里夫输<br/>')
        }, 1000)

        setTimeout(() => {
            res.write('第二次传输撒赖打开房间按时灯笼裤飞机按时灯笼裤发')
            res.end()
        }, 2000)
    }
})

server.listen(8888)