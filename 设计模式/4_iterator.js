//迭代器模式
/* 
//内部迭代
var each = function(arr, callback){
  for(var i = 0, len = arr.length; i < len; i++){
    callback(arr[i], i, arr)
  }
}

each([1, 2, 3], function(n, i){
  console.log(n, i)
}) */

//-----------------------------------------------------

//外部迭代 next
/* 
var Iterator = function(obj){
  var current = 0;

  var next = function(){
    current += 1;
  }

  var isDone = function(){
    return current >= obj.length;
  }

  var getCurrItem = function(){
    return obj[ current ];
  }

  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem
  }
}

var compare = function(iterator1, iterator2){
  while(!iterator1.isDone() && !iterator2.isDone()){
    if(iterator1.getCurrItem() != iterator2.getCurrItem()){
      throw new Error('iterator1和iterator2不相等');
    }
    iterator1.next();
    iterator2.next();
  }
  console.log('相等。。。')
}

var iterator1 = Iterator([1, 2, 3])
var iterator2 = Iterator([1, 2, 3])
compare(iterator1, iterator2)
 */
//-----------------------------------------------------
//中止迭代器
var each = function(arr, callback){
  for(var i = 0, len = arr.length; i < len; i++){
    if(callback(arr[i], i, arr) === false){
      break;
    }
  }
}

each([1, 2, 3], function(n, i){
  console.log(n, i)
  if(i == 1) return false;
})