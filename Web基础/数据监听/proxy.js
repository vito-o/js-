/* let data = { foo : 'foo'}

let p = new Proxy(data, {
    get(target, key, receiver){
        return target[key]
    },
    set(target, key, value, receiver){
        console.log('set value')
        target[key] = value;
    }
})

p.foo = 123 */

/* let data = [1, 2, 3]

let p = new Proxy(data, {
    get(target, key, receiver){
        return target[key]
    },
    set(target, key, value, receiver){
        console.log('set value')
        return target[key]
    }
})

p.push(4)

//Uncaught TypeError: 'set' on proxy: trap returned falsish for property '3'

 */


/* 
 let data = [1, 2, 3]

 let p = new Proxy(data, {
     get(target, key, receiver){
        //console.log(receiver)
        return target[key]
     },
     set(target, key, value, receiver){
         console.log('set value', receiver)
         target[key] = value;
         return true;
     }
 })

 p.push(4)

 */
/* 
let data = [1, 2, 3]

let p = new Proxy(data, {
    get(target, key, receiver){
        console.log('get value', key)
        return target[key]
    },
    set(target, key, value, receiver){
        console.log('set value ', key, value)
        target[key] = value;
        return true;
    }
})

p.push(1) */

/* 
let data = [1, 2, 3]

let p = new Proxy(data, {
    get(target, key, receiver){
        console.log('get value', key)
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver){
        console.log('set value', key, value)
        return Reflect.set(target, key, value, receiver)
    }
})

p.unshift('a') */

/* let data = {
    foo: 'foo',
    bar: {
        key: 1
    },
    ary: ['a', 'b']
}

let p = new Proxy(data, {
    get(target, key, receiver){
        console.log('get value', key)
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver){
        console.log('get value', key, value)
        return Reflect.set(target, key, value, receiver)
    }
})

p.bar.key = 2   

p.ary.push('c') */



/* 
let data = { a : { b: { c: 1}}}
let p = new Proxy(data, {
    get(target, key, receiver){
        console.log(receiver)
        const res = Reflect.get(target, key, receiver)
        console.log(res)
        return res;
    },
    set(target, key, value, receiver){
        return Reflect.set(target, key, value, receiver)
    }
})

p.a */
/* 
function reactive(data, cb){
    let timer = null;
    return new Proxy(data, {
        get(target, key, receiver){
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver){
            clearTimeout(timer)
            timer = setTimeout(() => {
                cb && cb()
            }, 0)
            return Reflect.set(target, key, value, receiver)
        }
    })
}

let ary = [1, 2]

let p = reactive(ary, () => {
    console.log('trigger')
})

p.push(3)
 */

function reactive(data, cb){
    let res = null;
    let timer = null;

    res = data instanceof Array ? [] : {}

    for(let key in data){
        if(typeof data[key] === 'object'){
            res[key] = reactive(data[key], cb)
        }else{
            res[key] = data[key]
        }
    }
    console.log(res)

    return new Proxy(res, {
        get(target, key, receiver){
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver){
            clearTimeout(timer)
            timer = setTimeout(() => {
                cb && cb();
            }, 0)
            return Reflect.set(target, key, value, receiver)
        }
    })
}

let data = { foo : 'foo', bar : [1, 2]}
let p = reactive(data, () => {
    console.log('trigger')
})

p.bar.push(5)