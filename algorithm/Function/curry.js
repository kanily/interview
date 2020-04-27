/**
 * @name curry
 * @version 1.0
 * @description 函数的柯里化 
 * @param fn
 * @param num
 * @example curry(add, 1, 2)
*/

function _curry(fn) {
    const args = [].slice.apply(arguments, 1);
    return function () {
        return fn.apply(this, args.concat(...arguments))
    }
}

/**
 * @name curry
 * @version 1.1
 * @param fn
 * @description currying is a technique of translating an evaluation of a function 
 * that takes multiple arguments (or tuple arguments) into evaluating a sequence 
 * functions, each with a single function;
 * @param length fn的参数个数
 * @example curry(add(1, 2))
 */

 function curry(fn, length) {
    // 判断要curry的函数的参数个数  
    length = length || fn.length;
    let slice = Array.prototype.slice;
    return function () {
        if(arguments.length < length) {
            const args = [fn].concat(slice.apply(this, arguments))
            return curry(_curry.apply(this, args), length - arguments.length);
        } else {
            return fn.apply(this, arguments)
        }
        
    }
 }
