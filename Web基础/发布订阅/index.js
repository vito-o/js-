/* let corp = {}

corp.list = []

corp.on = function(cb){
    this.list.push(cb);
}

corp.emit = function(){
    this.list.forEach(cb => {
        cb.apply(this, arguments);
    })
}

corp.on(function(position, salary){
    console.log('你的职位是：' + position)
    console.log('期望薪水：' + salary)
})

corp.on(function(skill, hobby){
    console.log('你的技能有：' + skill)
    console.log('你的爱好有：' + hobby)
})

corp.emit("前端", 10000)
corp.emit("端茶倒水", '足球')
 */

/* 
let corp = {}

corp.list = {}

corp.on = function(key, cb){
    if(!this.list[key])
        this.list[key] = []

    this.list[key].push(cb);
}

corp.emit = function(){
    let key = [].shift.call(arguments);
    let list = this.list[key]

    if(!list || !list.length) 
        return;
    
    list.forEach(cb => {
        cb.apply(this, arguments)
    })
}

corp.on('1', function(position, salary){
    console.log('你的职位是：' + position)
    console.log('期望薪水：' + salary)
})

corp.on('2', function(skill, hobby){
    console.log('你的技能有：' + skill)
    console.log('你的爱好有：' + hobby)
})

corp.emit('1',"前端", 10000)
corp.emit('2',"端茶倒水", '足球') */


/* let event = {
    list: {},
    on(key, cb){
        if(!this.list[key])
            this.list[key] = []

        this.list[key].push(cb)
    },
    emit(){
        let key = [].shift.call(arguments),
            funs = this.list[key]

        if(!funs || !funs.length)
            return false;
        
        funs.forEach(cb => {
            cb.apply(this, arguments);
        })
    },
    remove(key, cb){
        let fns = this.list[key]

        if(!fns)
            return false
        
        if(!cb){
            fns && (fns.length = 0)
        }else{
            fns.forEach((fn,i) => {
                if(fn === cb){
                    fns.splice(i, 1);
                }
            })
        }
    }
}

function cat(){
    console.log('喵喵喵')
}
function dog(){
    console.log('汪汪汪')
}

event.on('pet', cat)
event.on('pet', dog)

event.remove('pet', dog);

event.emit('pet', ['二哈', '波斯猫']) */

//EventEmitter

function EventEmitter(){
    this._events = Object.create(null);
}

EventEmitter.defaultMaxListeners = 10;

EventEmitter.prototype.addListener = EventEmitter.prototype.on;

EventEmitter.prototype.eventNames = function(){
    return Object.keys(this._events)
}

EventEmitter.prototype.setMaxListeners = function(n){
    this._count = n;
}

EventEmitter.prototype.getMaxListeners = function(){
    return this._count ? this._count : EventEmitter.defaultMaxListeners;
}

EventEmitter.prototype.on = function(k, cb, flag){
    if(!this._events)
        this._events = Object.create(null);

    if(k !== 'newListener'){
        this._events['newListener'] && this._events['newListener'].forEach(listener => {
            listener(k)
        })
    }
    
    if(this._events[k]){
        if(flag){
            this._events[k].unshift(cb);
        }else{
            this._events[k].push(cb);
        }
    }else{
        this._events[k] = [cb]
    }

    if(this._events[k].length === this.getMaxListeners()){
        console.log('the lintener cb of k is max default')
    }
}

EventEmitter.prototype.prependListener = function(k, cb){
    this.on(k, cb, true);
}

EventEmitter.prototype.propendOnceListener = function(k, cb){
    this.once(k, cb, true)
}

EventEmitter.prototype.once = function(k, cb, flag){
    function wrap(){
        cb(...arguments);
        
        this.removeListener(k, wrap)
    }
    wrap.listen = cb;
    this.on(k, wrap, true);
}

EventEmitter.prototype.removeListener = function(k, cb){
    if(this._events[k]){
        this._events[k] = this._events[k].filter(listener => {
            return cb !== listener && cb !==listener.listen
        })
    }
}

EventEmitter.prototype.removeAllListener = function(){
    this._events = Object.create(null);
}

EventEmitter.prototype.listeners = function(k){
    return this._events[k]
}

EventEmitter.prototype.emit = function(k, ...args){
    if(this._events[k]){
        this._events[k].forEach(listener => {
            listener.call(this, ...args)
        })
    }
}

function Girl(){

}

let girl = new Girl()

girl.__proto__ = EventEmitter.prototype;

let drink = function(data){
    console.log(data)
    console.log('喝酒')
}

let findBoy = function(){
    console.log('交友')
}

girl.on('newListener', function(eventName){
    console.log('名称: '+ eventName)
})

girl.on('结婚', function(){})

girl.setMaxListeners(3)

console.log(girl.getMaxListeners())

girl.once('失恋', drink)
girl.once('失恋', drink)

girl.prependListener('失恋', function(){
    console.log('before')
})
girl.once('失恋', drink)
girl.emit('失恋', '1')
debugger
console.log(girl)