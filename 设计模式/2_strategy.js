/* var performanceS = function(){}

performanceS.prototype.calculate = function(salary){
  return salary * 4;
}

var performanceA = function(){}

performanceA.prototype.calculate = function(salary){
  return salary * 3;
}

var performanceB = function(){}

performanceB.prototype.calculate = function(salary){
  return salary * 2;
}

var Bouns = function(){
  this.salary = null;
  this.strategy = null;
}

Bouns.prototype.setSalary = function(salary){
  this.salary = salary;
}

Bouns.prototype.setStrategy = function(strategy){
  this.strategy = strategy;
}

Bouns.prototype.getBouns = function(){
  return this.strategy.calculate(this.salary)
} */

/* var bouns = new Bouns();

bouns.setSalary(10000)
bouns.setStrategy( new performanceS() )
console.log(bouns.getBouns())

bouns.setStrategy( new performanceA() )
console.log(bouns.getBouns()) */

//-----------------------------------------------------

//js版 策略模式
/* 
var strategies = {
  "S": function(salary){
    return salary * 4;
  },
  "A": function(salary){
    return salary * 3;
  },
  "B": function(salary){
    return salary * 2;
  }
}

var calculateBonus = function(level, salary){
  return strategies[level](salary)
} */

// console.log(calculateBonus('S', 20000))
// console.log(calculateBonus('A', 10000))

//-----------------------------------------------------
//动画
/* var tween = {
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

var div = document.getElementById('div')
var animate = new Animate(div)

animate.start('left', 500, 1000, 'strongEaseIn')
setTimeout(() => {
  animate.start('left', 1000, 1000, 'easeIn')

}, 1000) */

//-----------------------------------------------------
/* 
//表单验证

var strategies = {
  isNonEmpty: function(value, errorMsg){
    if(value === ''){
      return errorMsg;
    }
  },
  minLength: function(value, length, errorMsg){
    if(value.length < length){
      return errorMsg;
    }
  }
}

var Validator = function(){
  this.cache = []
}

Validator.prototype.add = function(dom, rule, errorMsg){
  var ary = rule.split(':')
  this.cache.push(function(){
    var strategy = ary.shift();
    ary.unshift(dom.value)
    ary.push(errorMsg)
    return strategies[strategy].apply(dom, ary)
  })
}

Validator.prototype.start = function(){
  for(var i = 0, validatorFunc; validatorFunc = this.cache[i++];){
    var msg = validatorFunc();
    if(msg){
      return msg
    }
  }
}


var validataFunc = function(){
  var validator = new Validator();

  validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
  validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位')

  var errorMsg = validator.start()
  return errorMsg;
}

var registerForm = document.getElementById('registerForm')
registerForm.onsubmit = function(){
  var errorMsg = validataFunc()
  if(errorMsg){
    console.log(errorMsg)
    return false;
  }
}

 */

//-----------------------------------------------------

var S = function(salary){
  return salary * 4;
}
var A = function(salary){
  return salary * 3;
}
var B = function(salary){
  return salary * 2;
}
var calculateBonus = function(fn, salary){
  return fn(salary)
}

calculateBonus(S, 1000)