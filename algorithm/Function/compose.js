/**
 * 函数的组合
 */
let toUpperCase = function (str) {
    return str.toUpperCase(str);
}
let hello = function(name) {
    return `hi, {name}!`;
}

let sayHello = function() {
    return hello(toUpperCase('Tom'));
}

/**
 * 我们可以看到 hello 函数使用了 toUpperCase的返回值 类似于
 * sayHello = f(g(x)), 这时我们可以写一个compose 函数 将这个函数做为参数
*/

function _compose(f, g) {
    return function (x) {
        return f(g(x));
    }
}

/**
 * 如果 compose(f, g, h, i)?
 * 难道要写成 compose(f, compose(g, compose(h, i))?
 */

function compose() {
    let length = arguments.length;
    let args = arguments;
    return function () {
        let start = length -1;
        let result = args.apply(this, arguments);
        while (start--) args[start].apply(this, result)
        return result;
    }
}
