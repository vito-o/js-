/**
 * Blob和ArrayBuffer
 * 最早是数据库直接用Blob来存储二进制数据对象，这样就不用关注存储数据
 * 的格式了。在web领域，Blob对象表示一个只读原始数据的类文件对象
 * 虽然是二进制原始数据但是类似文件的对象。因此可以向操作文件对象
 * 一样操作Blob对象
 * 
 * ArrayBuffer对象用来表示通用的固定长度的原始二进制数据缓冲区。
 * 我们可以通过new ArrayBuffer(length)来获得一片连续的内存空间，
 * 它不能直接读写，但可根据需要将其传递到TypedArray视图或DataView
 * 对象来解释原始缓冲区。实际上视图只是给你提供了一个某种数据类型
 * 的读写接口，让你可以操作ArrayBuffer里的数据，TypedArray需要
 * 指定一个数组类型来保证数组成员都是同一个数据类型，而DataView
 * 数组成员可以是不同的数据类型
 * 
 * TypedArray视图的类型数组对象有以下几个：
 * Int8Array 8位有符号整数， 长度1个字节
 * Uint8Array 8位无符号整数，长度1个字节
 * Uint8ClampedArray 8位无符号整数， 长度1个字节，溢出处理不同
 * Int16Array 16位有符号整数， 长度2个字节
 * Uint16Array 16位无符号整数， 长度2个字节
 * Int32Array 32位有符号整数， 长度4个字节
 * Uint32Array 32位无符号整数，长度4个字节
 * Flot32Array 32位浮点数，长度4字节`
 * Flot64Array 64位浮点数，长度位8个字节
 * 
 * Blob与ArrayBuffer的区别是，除了原始字节之外它还提供了mine type
 * 作为元数组，Blob和ArrayBuffer之间可以进行转换
 * File对象其实继承自Blob对象，并提供了name，lastModifiedDate,
 * size,type等基础元数组
 * 
 * 创建Blob对象并转换成ArrayBuffer
 */
//创建一个以二进制数据存储的html文件
/* 
const text = '<div>hello world</div>'
const blob = new Blob([text], {type:'text/html'})
//以文本读取
const textReader = new FileReader()
textReader.readAsText(blob)
textReader.onload = function(){
  console.log(textReader.result)
}
//以ArrayBuffer形式读取
const bufReader = new FileReader()
bufReader.readAsArrayBuffer(blob)
bufReader.onload = function(){
  console.log(new Uint8Array(bufReader.result))
} */

//创建一个相同数据的ArrayBuffer，并转换成Blob

//我们直接创建一个Uint8Array并填入上面的数据
/* 
const u8Buf = new Uint8Array([60, 100, 105, 118, 62, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 60, 47, 100, 105, 118, 62])
const u8Blob = new Blob([u8Buf],{type:'text/html'})
const textReader = new FileReader()

textReader.readAsText(u8Blob)
textReader.onload = function(){
  console.log(textReader.result)
} */

/**
 * URL.createObjectURL()
 * 
 * video标签，audio标签还是img标签的src属性，不管是相对路径，绝对路径
 * 或者一个网络地址，归根结底都是指向一个文件资源的地址。既然我们知道
 * 了Blob其实就是一个可以当做文件用的二进制数据，那么只要我们可以生成
 * 一个指向Blob的地址，是不是就可以用在这些标签的src属性上，答案是可以的
 * 这里我们要用到的就是URL.createObjectURL()
 */

 //const objectURL = URL.createObjectURL(object)
/* 
 const upload = document.querySelector('#upload')
 const preview = document.querySelector('#preview')

 upload.onchange = function(){
   const file = upload.files[0]
   const src = URL.createObjectURL(file)
   preview.src= src;
 } */

 function ajax(url, cb){
   const xhr = new XMLHttpRequest()
   xhr.open('get', url)
   xhr.responseType = 'arraybuffer'
   xhr.onload = function(){
     cb(xhr.response)
   }
   xhr.send()
 }

/*  ajax('http://192.168.2.154:8888/video', function(res){
   const src = URL.createObjectURL(res)
   document.querySelector('#video').src = src;
 }) */

const video = document.querySelector('video')

const assetURL = 'http://192.168.2.154:8888'
let i = 1;
var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

if('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)){
  const mediaSource = new MediaSource()
  video.src = URL.createObjectURL(mediaSource)
  mediaSource.addEventListener('sourceopen', sourceOpen)
}else{
  console.error('Unsupported MIME type or codec: ', mimeCodec)
}

function sourceOpen(){
  const mediaSource = this;
  var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec)
  
  function getNextVideo(url){
    ajax(url, function(buf){
      sourceBuffer.addEventListener("updateend", function() {
        if(i === 1){
          mediaSource.endOfStream();
          var playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              // 这个时候可以安全的暂停
              //video.pause();
            })
            .catch(error => {
        
            });
          }
        }

        if (i < 6) {
          //一段视频加载完成后，请求下一段视频
          getNextVideo(`${assetURL}/video_${i}`);
        }
        if (i === 6) {
          //全部视频片段加载完关闭容器
          mediaSource.endOfStream();
          URL.revokeObjectURL(video.src); //Blob URL已经使用并加载，不需要再次使用的话可以释放掉。
        }
        i++;
      })

      sourceBuffer.appendBuffer(buf);
    })
  }


  getNextVideo(`${assetURL}/video_${i}`)

}

 