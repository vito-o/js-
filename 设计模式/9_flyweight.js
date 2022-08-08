/**
 * 享元模式，是一种用于性能优化的模式
 * 享元模式的核心是运用共享技术来有校支持大量细粒度的对象
 * 
 * 如果系统中，因为创建了大量类似的对象而导致内存占用过高，享元模式就非常有用。在js中，浏览器特别
 * 是移动端的浏览器分配的内存并不算多，如何节省内存就成了一件非常有意义的事情。
 * 
 * 享元模式要求将对象的属性划分为内部状态与外部状态（状态在这里通常指属性）
 * 享元模式的目标是尽量减少共享对象的数量
 * 
 * 内部状态存储与对象内部
 * 内部状态可以被一些对象共享
 * 内部状态独立与具体的场景，通常不会改变
 * 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享
 * 
 */

 //不使用享元模式的情况下：
 var Model = function(sex){
  this.sex = sex;
 }

 Model.prototype.takePhoto = function(){
   console.log('sex= ' + this.sex + ' underwear= ' + this.underwear);
 }

 var maleModel = new Model('male');
 var femaleModel = new Model('female');

 for(var i = 1; i <= 50; i++){
   maleModel.underwear = 'underwear' + i;
   maleModel.takePhoto();
 }

 for(var j = 1; j <= 50; j++){
   femaleModel.underwear = 'underwear' + j;
   femaleModel.takePhoto();
 }