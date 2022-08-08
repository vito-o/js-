/**
 * 命令模式最常见的应用场景：
 * 有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道请求的操作是什么。
 * 此时相望用一种松耦合和的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系
 * 
 */

 var button1 = document.getElementById('button1')
 var button2 = document.getElementById('button2')
 var button3 = document.getElementById('button3')
 var MenuBar = {
  refresh: function(){
    console.log('刷新菜单名称');
  }
}

var SubMenu = {
  add: function(){
    console.log('增加子菜单');
  },
  del: function(){
    console.log('删除子菜单');
  }
}

/* 
 var setCommand = function(button, command){
   button.onclick = function(){
     command.execute()
   }
 }

 
/* 
 var RefreshMenuBarCommand = function(receiver){
   this.receiver = receiver;
 }

 RefreshMenuBarCommand.prototype.execute = function(){
   this.receiver.refresh();
 }

 var AddSubMenuCommand = function(receiver){
   this.receiver = receiver;
 }

 AddSubMenuCommand.prototype.execute = function(){
   this.receiver.add()
 }

 var DelSubMenuCommand = function(receiver){
   this.receiver = receiver;
 }


 DelSubMenuCommand.prototype.execute = function(){
   this.receiver.del()
 }

 var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
 var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
 var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

 setCommand(button1, refreshMenuBarCommand)
 setCommand(button2, addSubMenuCommand)
 setCommand(button3, delSubMenuCommand)
 */

/* var setCommand = function(button, func){
  button.onclick = function(){
    func()
  }
}

var RefreshMenuBarCommand = function(receiver){
  return function(){
    receiver.refresh()
  }
}

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button1, refreshMenuBarCommand) */
/* 
var setCommand = function(button, command){
  button.onclick = function(){
    command.execute()
  }
}

var RefreshMenuBarCommand = function(receiver){
  return {
    execute: function(){
      receiver.refresh()
    }
  }
}

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);

setCommand(button1, refreshMenuBarCommand) */

var tween = {
  linar: function(t, b, c, d){
    return c*t/d + b;
  },
  easeIn: function(t, b, c, d){
    return c * (t /= d) * t + b;
  },
  strongEaseIn: function(t, b, c, d){
    return c * (t /= d) * t * t * t * t + b;
  }
}

var Animate = function(dom){
  this.dom = dom;
  this.startTime = 0;
  this.startPos = 0;
  this.endPos = 0;
  this.propertyName = null;
  this.easing = null;
  this.duration = null;
}

Animate.prototype.start = function(propertyName, endPos, duration, easing){
  this.startTime = +new Date;
  this.startPos = this.dom.getBoundingClientRect()[propertyName];
  this.propertyName = propertyName;
  this.endPos = endPos;
  this.duration = duration;
  this.easing = tween[easing]
  
  var self = this;
  var timeId = setInterval(function(){
    if(self.step() === false){
      clearInterval(timeId)
    }
  }, 19)
}

Animate.prototype.step = function(){
  var t = +new Date;
  if(t >= this.startTime + this.duration){
    this.update(this.endPos);
    return false;
  }
  var pos = this.easing(
    t - this.startTime, 
    this.startPos, 
    this.endPos - this.startPos,
    this.duration
  )
  this.update(pos)
}

Animate.prototype.update = function(pos){
  this.dom.style[this.propertyName] = pos + 'px';
}


var ball = document.getElementById('ball');
var pos = document.getElementById('pos');
var moveBtn = document.getElementById('moveBtn');
var cancelBtn = document.getElementById('cancelBtn')

/* moveBtn.onclick = function(){
  var animate = new Animate(ball);
  animate.start('left', pos.value , 1000, 'strongEaseIn')
} */

/* 
var MoveCommand = function(receiver, pos){
  this.receiver = receiver;
  this.pos = pos;
  this.oldPos = null;
}

MoveCommand.prototype.execute = function(){
  this.receiver.start('left', this.pos, 1000, 'strongEaseIn');
  this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
}

MoveCommand.prototype.undo = function(){
  this.receiver.start('left', this.oldPos, 100, 'strongEaseIn')
}

var moveCommand;

moveBtn.onclick = function(){
  var animate = new Animate(ball);
  moveCommand = new MoveCommand(animate, pos.value);
  moveCommand.execute()
}

cancelBtn.onclick = function(){
  moveCommand.undo();
} */
/* 
var Ryu = {
  attack: function(){
    console.log('攻击');
  },
  defense: function(){
    console.log('防御');
  },
  jump: function(){
    console.log('跳跃');
  },
  crouch: function(){
    console.log('蹲下')
  }
}

var makeCommand = function(receiver, state){
  return function(){
    receiver[state]()
  }
}

var commands = {
  '119': 'jump', //w
  '115': 'crouch', //s
  '97': 'defense', //a
  '100': 'attack' //d
}

var commandStack = [];

document.onkeypress = function(ev){
  var keyCode = ev.keyCode,
      command = makeCommand(Ryu, commands[keyCode])
  if(command){
    command();
    commandStack.push(command);
  }
}

document.getElementById('replay').onclick = function(){
  var command;
  while(command = commandStack.shift()){
    command();
  }
} */


var closeDoorCommand = {
  execute: function(){
    console.log('关门');
  }
}

var openPcCommand = {
  execute: function(){
    console.log('开电脑');
  }
}

var openQQCommand = {
  execute: function(){
    console.log('登录QQ')
  }
}

var MarcoCommand = function(){
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

var macroCommand = MarcoCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand)

macroCommand.execute();