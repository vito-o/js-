/**
 * 一种基于继承的设计模式--模板方法（Template Method）
 * 
 * 模板方法是一种只需继承就可以实现的非常简单的模式。
 * 模板方法模式由两部分结构组成，
 * 第一部分：是抽象父类
 * 第二部分：是具体的实现子类
 * 通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。
 * 子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。
 * 
 * 
 */
/* 
 var Coffee = function(){}

 Coffee.prototype.boilWater = function(){
   console.log('把水煮沸');
 }

 Coffee.prototype.brewCoffeeGriends = function(){
   console.log('用沸水冲泡咖啡');
 }

 Coffee.prototype.pourInCup = function(){
   console.log('把咖啡倒进杯子')
 }

 Coffee.prototype.addSugarAndMilk = function(){
   console.log('加糖和牛奶');
 }

 Coffee.prototype.init = function(){
   this.boilWater()
   this.brewCoffeeGriends()
   this.pourInCup()
   this.addSugarAndMilk();
 }

 var coffee = new Coffee();
 coffee.init();


 var Tea = function(){}

 Tea.prototype.boilWater = function(){
   console.log('把水煮沸')
 }

 Tea.prototype.steepTeaBag = function(){
   console.log('用废水侵泡茶叶')
 }

 Tea.prototype.pourInCup = function(){
   console.log('把茶水倒进杯子')
 }

 Tea.prototype.addLemon = function(){
   console.log('加柠檬')
 }

 Tea.prototype.init = function(){
   this.boilWater()
   this.steepTeaBag()
   this.pourInCup()
   this.addLemon()
 }

 var tea = new Tea();
 tea.init();
 */
//--------------------------------------------------

var Beverage = function(){}

Beverage.prototype.boilWater = function(){
  console.log('把水煮沸');
}

Beverage.prototype.brew = function(){} //空方法，应该由子类重写

Beverage.prototype.pourInCup = function(){}; //空方法，应该有子类重写

Beverage.prototype.addCondiments = function(){} //空方法，应该有子类重写

/**
 * 模板方法
 * 该方法称为模板方法的原因是，该方法中封装了子类的算法框架，它作为一个算法的模板，知道子类以
 * 何种顺序区执行哪些方法。
 * 
 */
Beverage.prototype.init = function(){
  this.boilWater()
  this.brew()
  this.pourInCup();
  this.addCondiments()
}

var Coffee = function(){}

Coffee.prototype = new Beverage();

Coffee.prototype.brew = function(){
  console.log('用沸水冲泡咖啡')
}

Coffee.prototype.pourInCup = function(){
  console.log('把咖啡倒进杯子')
}

Coffee.prototype.addCondiments = function(){
  console.log('加糖和牛奶')
}

var Coffee = new Coffee();
Coffee.init()

var Tea = function(){}

Tea.prototype = new Beverage();

Tea.prototype.brew = function(){
  console.log('用沸水侵泡茶叶')
}

Tea.prototype.pourInCup = function(){
  console.log('把茶倒进杯子');
}

Tea.prototype.addCondiments = function(){
  console.log('加柠檬')
}

var tea = new Tea();
tea.init();


/**
 * 抽象类
 * 
 * 首先说明的是，模板方法模式是一种严重依赖抽象类的设计模式。
 * 
 * 抽象类的作用
 * 
 * 在java中，类分两种，一种为具体类，另一种为抽象类。具体类可以被实例化，抽象类不能被实例化
 * 
 * 抽象类和接口一样可以用于向上转型，在静态类型语言中，编译器对类型的检查总是一个绕不过的话题与困扰
 * 虽然静态类型检查可以提高程序的安全性，但繁琐而严格的类型监测也时常会让程序员觉得麻烦。把对象的真正
 * 类型颖仓在抽象类或者接口之后，这些对象才可以被相互转换使用。
 * 
 * 除了用于向上转型，抽象类也可以标识一种契约。继承了这个抽象类的所有子类都将拥有跟抽象类一致的接口方法
 * 抽象类的主要作用就是为了它的子类定义这些公共接口。如果我们在子类种删除了这些方法种的某一个，那么将
 * 不能通过编译器的检查，这在某些场景下是非常有用的，
 * 
 * 
 */

var Beverage = function(){}

Beverage.prototype.boilWater = function(){
  console.log('把水煮沸')
}

Beverage.prototype.brew = function(){
  throw new Error('子类必须重写brew方法')
}

Beverage.prototype.pourInCup = function(){
  throw new Error('子类必须重写pourInCup方法')
}

Beverage.prototype.addCondiments = function(){
  throw new Error('子类必须重写addCondiments方法')
}

Beverage.prototype.customerWantsCondiments = function(){
  return true;
}

Beverage.prototype.init = function(){
  this.boilWater();
  this.brew()
  this.pourInCup();
  if(this.customerWantsCondiments()){
    this.addCondiments()
  }
}