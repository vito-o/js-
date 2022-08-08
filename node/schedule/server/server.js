const child_process = require('child_process')


let workerProcess = child_process.exec('node ./index.js', function(error, stdout, stderr){
  console.log(error, stdout, stderr)
});

workerProcess.on('exit', function(code){
  console.log('子进程已退出，退出码'+ code)
})
