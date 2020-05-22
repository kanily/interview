##节流函数 throttle
###方案一
````
function throttle(fn, time) {
    let previous = 0
    return function(...args) {
        const temp = +new Date();
        if(temp - previous > time) {
            previous = temp
            fn.apply(this, args);
        }   
    }
}
````
#### 防抖函数 debounce
### 方案一
````
function debounce(fn, time){
    let timer = null;
    return function(...args) {
        if(!timer) {
            timer = setTimeout(() => {
                fn.call(this, args)
            }, time)   
        }
        clearTimeout(timer)
    }
        
}
