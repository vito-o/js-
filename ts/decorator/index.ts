
/**
 * 类装饰器
 * @param params 
 */
function logClass(params:any){
    /* return function(target:any){
        console.log(target);
        console.log(params);
    } */
}

@logClass
class HttpClient{
    test:string;
    constructor(){
        this.test = 'xxx';
    }

    getData(){

    }
}