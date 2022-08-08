/**
 * 深拷贝和浅拷贝
 * 
 * 深拷贝和浅拷贝都是针对引用类型，js中的变量类型分为值类型和引用类型，对值类型进行复制会对值进行一份拷贝
 * 而对于引用类型复制，则会进行地址的拷贝，最终两个变量指向同一份数据
 */
var a = 1;
var b = a;
a = 2;
//console.log(a, b)
//2  1， a b 指向不同的数据

//引用类型指向同一份数据
var a = {c: 1}
var b = a;
a.c = 2;
//console.log(a, b)
//a.c = 2, b.c = 2; a b 指向同一份数据

/**
 * 对于引用类型，会导致a b指向同一份数据，此时如果对其中一个进行修改，就会影响另外一个，有时候这
 * 可能不是我们想要的结果，如果对这种现象不清楚的话，还可能造成不必要的bug，那么如何切换a和b之间的
 * 关系呢，可以拷贝一份a数据，根据拷贝的层级不同可以分为浅拷贝和深拷贝，浅拷贝就是只进行一层拷贝，
 * 深拷贝就是无线层级拷贝
 */

/* var a1 = {b : {c : {}}}
var a2 = shallowClone(a1) //浅拷贝
console.log(a2.b.c === a1.b.c)

var a3 = clone(a1)
console.log(a3.b.c === a1.b.c)

function shallowClone(source){
    var target = {}
    for(var i in source){
        if(source.hasOwnProperty(i)){
            target[i] = source[i];
        }
    }
    return target;
} */


/**
 * 深拷贝： 浅拷贝 + 递归
 */
// var a1 = {b : { c: { d: 1}}}
// var a3 = clone(a1)

function clone(source){
    var target = {}
    for(var i in source){
        if(source.hasOwnProperty(i)){
            if(typeof source[i] === 'object'){
                target[i] = clone(source[i])
            }else{
                target[i] = source[i]
            }
        }
    }
    return target;
}

function isObject(x){
    return Object.prototype.toString.call(x) === '[object Object]';
}

function createData(deep, breadth){
    var data = {}
    var temp = data;

    for(var i = 0; i < deep; i++){
        temp = temp['data'] = {}
        for(var j = 0; j < breadth; j++){
            temp[j] = j;
        }
    }

    return data;
}

//console.log(createData(1, 3))
//console.log(clone(createData(1000, 0)))

var a = {
    a1: 1,
    a2: {
        b1: 1,
        b2: {
            c1: 1
        }
    }
}

/* 
function cloneLoop(x){
    const root = {}

    //栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ]

    while(loopList.length){
        //深度优先
        const node = loopList.pop()
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        //初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if(typeof key !== 'undefined'){
            res = parent[key] = {}
        }

        for(let k in data){
            if(data.hasOwnProperty(k)){
                if(typeof data[k] === 'object'){
                    //下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k]
                    })
                }else{
                    res[k] = data[k]
                }
            }
        }
    }

    return root;
}

cloneLoop(a) */


/**
 * 使用循环代替递归
 * @param {*} x 
 */
/* function cloneLoopTest(x){
    let root = {}

    let list = [
        {
            parent: root,
            key: undefined,
            data: x
        }
    ]

    while(list.length){
        let node = list.pop();

        let parent = node.parent;
        let key = node.key;
        let data = node.data;

        let res = parent;
        if(typeof key !== 'undefined'){
            res = parent[key] = {}
        }

        for(let i in data){
            if(data.hasOwnProperty(i)){
                if(typeof data[i] === 'object'){
                    list.push({
                        parent: res,
                        key: i,
                        data: data[i]
                    })
                }else{
                    res[i] = data[i];
                }
            }
        }

    }

    return root;

}

console.log(
    cloneLoopTest(a)
) */


/* 
var a = {
    a1: 1,
    a2: {
        b1: 1,
        b2: {
            c1: 1
        }
    }
}
*/
function cloneForce(x){
    let root = {}

    const uniqueList = []

    let list = [
        {
            parent: root,
            key: undefined,
            data: x
        }
    ]

    while(list.length){
        let node = list.pop();

        let parent = node.parent;
        let key = node.key;
        let data = node.data;

        let res = parent;
        if(typeof key !== 'undefined'){
            res = parent[key] = {}
        }

        let uniqueData = find(uniqueList, data);
        if(uniqueData){
            parent[key] = uniqueData.target;
            continue;
        }

        uniqueList.push({
            source: data,
            target: res
        })

        for(let i in data){
            if(data.hasOwnProperty(i)){
                if(typeof data[i] === 'object'){
                    list.push({
                        parent: res,
                        key: i,
                        data: data[i]
                    })
                }else{
                    res[i] = data[i]
                }
            }
        }
    }
    return root
}

function find(arr, item){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].source === item){
            return arr[i]
        }
    }
    return null;
}

console.log(
    cloneForce(a)
)