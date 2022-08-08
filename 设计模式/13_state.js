/**
 * 状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事务的行为改变
 * 
 */

 //原始模式
/* 
var Light = function(){
  this.state = 'off';
  this.button = null;
}

Light.prototype.init = function(){
  var button = document.createElement('button'),
      self = this;

  button.innerHTML = '开关'
  this.button = document.body.appendChild(button);
  this.button.onclick = function(){
    self.buttonWasPressed();
  }
}

Light.prototype.buttonWasPressed = function(){
  if(this.state == 'off'){
    console.log('开灯')
    this.state = 'on';
  }else if(this.state === 'on'){
    console.log('关灯');
    this.state = 'off';
  }
}

var light = new Light();
light.init(); 
*/

//状态模式

var OffLightState = function(light){
  this.light = light;
}

OffLightState.prototype.buttonWasPressed = function(){
  console.log('弱光')
  this.light.setState(this.light.weakLightState);
}

var WeakLightState = function(light){
  this.light = light;
}

WeakLightState.prototype.buttonWasPressed = function(){
  console.log('强光');
  this.light.setState(this.light.strongLightState);
}

var StrongLightState = function(light){
  this.light = light;
}

StrongLightState.prototype.buttonWasPressed = function(){
  console.log('超强灯');
  this.light.setState(this.light.superStrongLightState);
}

var SuperStrongLightState = function(light){
  this.light = light
}
SuperStrongLightState.prototype.buttonWasPressed = function(){
  console.log('关灯');
  this.light.setState(this.light.OffLightState);
}


var Light = function(){
  this.OffLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this)
  this.superStrongLightState = new SuperStrongLightState(this);
  this.button = null;
}

Light.prototype.init = function(){
  var button = document.createElement('button'),
      self = this;
  
  this.button = document.body.appendChild(button);
  this.button.innerHTML = '开关';

  this.currState = this.OffLightState;
  this.button.onclick = function(){
    self.currState.buttonWasPressed();
  }
}

Light.prototype.setState = function(newState){
  this.currState = newState;
}

var light = new Light();
light.init();

/**
 * Gof中对状态模式的定义：
 * 
 * 允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类
 * 
 * 第一部分的意思时将状态封装成独立的类，并将请求委托给当前的状态对象，当对象的内部状态改变时，会带来不同的行为变化
 * 第二部分从客户的角度来看，我们使用的对象，在不同的状态下具有截然不同的行为，这个对象看起来是从不同的类中实例化而来的
 * 事记上这是使用了委托的效果
 * 
 */

/* window.external.upload = function(state){
  console.log(state) //sign, uploading, done, error
}

var plugin = (function(){
  var plugin = document.createElement('embed');
  plugin.style.display = 'none'

  plugin.type = 'application/txftn-webkit'

  plugin.sign = function(){
    console.log('开始文件扫描');
  }

  plugin.pause = function(){
    console.log('暂停文件上传')
  }

  plugin.uploading = function(){
    console.log('开始文件上传');
  }

  plugin.del = function(){
    console.log('删除文件上传');
  }

  plugin.done = function(){
    console.log('文件上传完成');
  }

  document.body.appendChild(plugin)

  return plugin;
})();

var Upload = function(fileName){
  this.plugin = plugin;
  this.fileName = fileName;
  this.button1 = null;
  this.button2 = null;
  this.state = 'sign'
}

Upload.prototype.init = function(){
  var that = this;
  this.dom = document.createElement('div');
  this.dom.innerHTML = `
    <span>文件名称：${this.fileName}</span>
    <button data-action="button1">扫描中</button>
    <button data-action="button2">删除</button>
  `;

  document.body.appendChild(this.dom)
  this.button1 = this.dom.querySelector('[data-action="button1"]');
  this.button2 = this.dom.querySelector('[data-action="button2"]');
  this.bindEvent();
}

Upload.prototype.bindEvent = function(){
  var self = this;
  this.button1.onclick = function(){
    if(self.state == 'sign'){
      console.log('扫描中，点击无效...');
    }else if(self.state == 'uploading'){
      self.changeState('pause');
    }else if(self.state == 'pause'){
      self.changeState('uploading')
    }else if(self.state == 'done'){
      console.log('文件已经完成上传，点击无效')
    }else if(self.state == 'error'){
      console.log('文件上传失败，点击无效')
    }
  }

  this.button2.onclick = function(){
    if(self.state == 'done' || self.state == 'error' || self.state == 'pause'){
      self.changeState('del');
    }else if(self.state == 'sign'){
      console.log('文件正在扫描不能删除')
    }else if(self.state == 'uploading'){
      console.log('文件正在上传中，不能删除');
    }
  }
}

Upload.prototype.changeState = function(state){
  switch(state){
    case 'sign':
      this.plugin.sign();
      this.button1.innerHTML = '扫描中，任何点击无效';
      break;
    case 'uploading':
      this.plugin.uploading();
      this.button1.innerHTML = '正在上传，点击暂停';
      break;
    case 'pause':
      this.plugin.pause();
      this.button1.innerHTML = '已暂停，点击继续上传';
      break;
    case 'done':
      this.plugin.done();
      this.button1.innerHTML = '上传完成';
      break;
    case 'error':
      this.button1.innerHTML = '上传失败';
      break;
    case 'del':
      this.plugin.del();
      this.dom.parentNode.removeChild(this.dom)
      console.log('删除完成')
      break;
  }
  this.state = state;
} */

window.external.upload = function(state){
  console.log(state)
}

var plugin = (function(){
  var plugin = document.createElement('embed');
  plugin.style.display = 'none'
  plugin.type = 'application/txftn-webkit'

  plugin.sign = function(){
    console.log('开始文件扫描');
  }

  plugin.pause = function(){
    console.log('暂停文件上传')
  }

  plugin.uploading = function(){
    console.log('开始文件上传');
  }

  plugin.del = function(){
    console.log('删除文件上传');
  }

  plugin.done = function(){
    console.log('文件上传完成');
  }

  document.body.appendChild(plugin)

  return plugin;
})();

var Upload = function(fileName){
  this.plugin = plugin;
  this.fileName = fileName;
  this.button1 = null;
  this.button2 = null;
  this.signState = new SignState(this)
  this.uploadingState = new UploadingState(this)
  this.pauseState = new PauseState(this)
  this.doneState = new DoneState(this)
  this.errorState = new ErrorState(this)
  //设置当前状态
  this.currState = this.signState;
}

Upload.prototype.init = function(){
  var that = this;
  this.dom = document.createElement('div');
  this.dom.innerHTML = `
    <span>文件名称：${this.fileName}</span>
    <button data-action="button1">扫描中</button>
    <button data-action="button2">删除</button>
  `;

  document.body.appendChild(this.dom)
  this.button1 = this.dom.querySelector('[data-action="button1"]');
  this.button2 = this.dom.querySelector('[data-action="button2"]');
  this.bindEvent();
}

Upload.prototype.bindEvent = function(){
  var self = this;

  this.button1.onclick = function(){
    self.currState.clickHandler1();
  }

  this.button2.onclick = function(){
    self.currState.clickHandler2();
  }
}

Upload.prototype.sign = function(){
  this.plugin.sign();
  this.currState = this.signState;
}

Upload.prototype.uploading = function(){
  this.button1.innerHTML = '正在上传，点击暂停'
  this.plugin.uploading();
  this.currState = this.uploadingState;
}

Upload.prototype.pause = function(){
  this.button1.innerHTML = '已暂停，点击继续上传';
  this.plugin.pause();
  this.currState = this.pauseState;
}

Upload.prototype.done = function(){
  this.button1.innerHTML = '上传完成';
  this.plugin.done();
  this.currState = this.doneState;
}

Upload.prototype.error = function(){
  this.button1.innerHTML = '上传失败';
  this.currState = this.errorState;
}

Upload.prototype.del = function(){
  this.plugin.del();
  this.dom.parentNode.removeChild(this.dom);
}

var StateFactory = (function(){
  var State = function(){}

  State.prototype.clickHandler1 = function(){
    throw new Error('子类必须重写父类的clickHandler1方法');
  }
  State.prototype.clickHandler2 = function(){
    throw new Error('子类必须重写父类的clickHandler1方法');
  }

  return function(param){
    var F = function(uploadObj){
      this.uploadObj = uploadObj;
    };

    F.prototype = new State();

    for(var i in param){
      F.prototype[i] = param[i];
    }

    return F;
  }
})();

var SignState = StateFactory({
  clickHandler1(){
    console.log('扫描中，点击无效')
  },
  clickHandler2(){
    console.log('文件正在上传，不能删除')
  }
})

var UploadingState = StateFactory({
  clickHandler1(){
    this.uploadObj.pause()
  },
  clickHandler2(){
    console.log('文件正在上传，不能删除')
  }
})

var PauseState = StateFactory({
  clickHandler1(){
    this.uploadObj.uploading()
  },
  clickHandler2(){
    this.uploadObj.del();
  }
})

var DoneState = StateFactory({
  clickHandler1(){
    console.log('文件已完成上传，点击无效')
  },
  clickHandler2(){
    this.uploadObj.del();
  }
})

var ErrorState = StateFactory({
  clickHandler1(){
    console.log('文件上传失败，点击无效')
  },
  clickHandler2(){
    this.uploadObj.del();
  }
})

var uploadObj = new Upload('js设计模式与开发实践');
uploadObj.init();

window.external.upload = function(state){
  uploadObj[state]();
}

window.external.upload('sign')

setTimeout(function(){
  window.external.upload('uploading')
}, 1000)

setTimeout(function(){
  window.external.upload('done')
}, 5000)


/**
 * 状态模式和策略模式的关系
 * 
 * 相同点：他们都有一个上下文、一些策略或者状态类，上下文把请求委托给这些类来执行。
 * 不同点：
 *    策略模式：各个策略类之间是平等又不平行的，他们之间没有任何联系，所以客户必须熟知这些策略类的作用
 *              一遍客户可以随时主动切换算法；
 *    状态模式：状态和状态对应的行为是早已被封装好的，状态之间的切换也早被规定完成，“改变行为”这件事情
 *             发生在状态模式内部。对客户来说，并不需要了解这些细节。
 */

var Light = function(){
  this.currState = FSM.off;
  this.button = null;
}

Light.prototype.init = function(){
  var button = document.createElement('button');
  self = this;

  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button);

  this.button.onclick = function(){
    self.currState.buttonWasPressed.call(self);
  }
}

var FSM = {
  off: {
    buttonWasPressed: function(){
      console.log('关灯')
      this.button.innerHTML = '下一次按我是开灯';
      this.currState = FSM.on;
    }
  },
  on: {
    buttonWasPressed: function(){
      console.log('开灯')
      this.button.innerHTML = '下一次按我是关灯';
      this.currState = FSM.off;
    }
  }
}

var light = new Light();
light.init();

//闭包实现

var delegate = function(client, delegation){
  return {
    buttonWasPressed: function(){
      return delegation.buttonWasPressed.apply(client, arguments);
    }
  }
}

var Light = function(){
  this.offState = delegate(this, FSM.off);
  this.onState = delegate(this, FSM.on)
  //。。。
}


/**
 * 表驱动的有限状态机
 * 
 * 下一个状态是由当前状态和行为共同决定的，
 * 
 * 
 */