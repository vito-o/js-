/* var MacroCommand = function(){
  return {
    commandsList: [],
    add: function(command){
      this.commandsList.push(command)
    },
    execute: function(){
      for(var i = 0, command; command = this.commandsList[i++];){
        command.execute();
      }
    }
  }
}

var openAcCommand = {
  execute: function(){
    console.log('打开空调')
  }
}

var openTvCommand = {
  execute: function(){
    console.log('打开电视');
  }
}

var openSoundCommand = {
  execute: function(){
    console.log('打开音响')
  }
}

var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand)
macroCommand1.add(openSoundCommand);


var closeDoorCommand = {
  execute: function(){
    console.log('关门')
  }
}

var openPcCommand = {
  execute: function(){
    console.log('开电脑');
  }
}

var openQQCommand = {
  execute: function(){
    console.log('登录qq');
  }
}

var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand)

var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1)
macroCommand.add(macroCommand2)

var setCommand = (function(command){
  document.getElementById('button').onclick = function(){
    command.execute();
  }
})(macroCommand); */


/* 
var Folder = function(name){
  this.name = name;
  this.files = []
}

Folder.prototype.add = function(file){
  this.files.push(file)
}

Folder.prototype.scan = function(){
  console.log('开始扫描文件夹：' + this.name);
  for(var i = 0, file, files = this.files; file = files[i++];){
    file.scan();
  }
}

var File = function(name){
  this.name = name;
}

File.prototype.add = function(){
  throw new Error('文件下不能再添加文件');
}

File.prototype.scan = function(){
  console.log('开始扫描文件：' + this.name);
}

var folder = new Folder('学习资料')
var folder1 = new Folder('Javascript')
var folder2 = new Folder('jQuery');

var file1 = new File('javascript设计模式与开发实践')
var file2 = new File('精通jquery')
var file3 = new File('重构与模式')

folder1.add(file1)
folder2.add(file2)

folder.add(folder1);
folder.add(folder2);
folder.add(file3)


var folder3 = new Folder('Nodejs')
var file4 = new File('深入浅出Node.js')

folder3.add(file4);

var file5 = new File('javascript语言精粹');

folder.add(folder3);
folder.add(file5)

folder.scan();
 */


/**
 * 组合模式
 * 一些值得注意的地方
 * 
 * 1.组合模式不是父子关系
 * 组合模式的树型结构容易让人误以为组合对象和叶对象是父子关系，这是不正确的。
 * 组合模式是一种HAS-A（聚合）的关系，而不是IS-A。组合对象包含一组叶对象，但Leaf并不是Composite
 * 的子类。组合对象把请求委托给它所包含的所有叶对象，他们能够合作的关键是拥有相同的接口。
 * 
 * 2.对叶对象操作的一致性
 * 组合模式除了要求组合对象和叶对象拥有相同的接口之外，还有一个必要条件，就是对一组叶对象的操作必须
 * 具有一致性。
 * 
 * 3.双向映射关系
 * 
 */



var Folder = function(name){
  this.name = name;
  this.parent = null;
  this.files = []
} 

Folder.prototype.add = function(file){
  file.parent = this;
  this.files.push(file)
}

Folder.prototype.scan = function(){
  console.log('开始扫描文件夹：' + this.name);

  for(var i = 0, file, files = this.files; file= files[i++];){
    file.scan();
  }
}

Folder.prototype.remove = function(){
  if(!this.parent){
    return;
  }

  for(var files = this.parent.files, l = files.length - 1; l >= 0; l--){
    var file = files[l];
    if(file == this){
      files.splice(l, 1);
    }
  }
}

var File = function(name){
  this.name = name;
  this.parent = null;
}

File.prototype.add = function(){
  throw new Errror('不能添加再文件下面');
}

File.prototype.scan = function(){
  console.log('开始扫描文件：' + this.name);
}

File.prototype.remove = function(){
  if(!this.parent){
    return;
  }
  for(var files = this.parent.files, l = files.length - 1; l >= 0; l--){
    var file = files[l];
    if(file == this){
      files.splice(l, 1);
    }
  }
}

var folder = new Folder('学习资料')
var folder1 = new Folder('JavaScript');
var file1 = new File('深入浅出node.js')

folder1.add(new File('javascript设计模式与开发实践'));
folder.add(folder1);
folder.add(file1)

folder1.remove()
folder.scan()