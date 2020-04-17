## 构造函数
---
**constructor** 返回实例对象构造函数的引用，此值是对函数本身的引用
<pre>
function Person (name) {
    this.name = name;
}

var p = new Person(name);
p.constructor === Person
</pre>
构造函数本身就是函数，不过为了规范都会首字母大写， 主要`区别`在于使用 *new* 生成的实例函数就是构造函数，直接调用的就是普通函数 

### constructor 是只读的吗？
对引用类型来是可以修改的，对基本数据类型是 只读的
<pre>
function Parent() {
    this.name = 'xiaoming';
    this.age = '18';
}
Parent.prototype = {
    method: funtion () {}
}

function Children() {

}

Children.prototype = new Parent();
Children.prototype.foo = 'Hello world'
//此时constructor 指向 Object
Children.prototype.constructor === Object //true
//修正constructor

Children.prototype.constructor = Children
</pre>

### new 到底是如果实现的呢
<pre>
function create () {
    // 创建一个空对象
    var obj = new Object(),
    //2. 获得构造函数，同时删除arguments 里的第一个参数
    Con = [].shift.call(arguments);
    //3. 链接到原型，obj可以访问到构造函数的属性
    Object.setPrototypeOf(obj, Con.prototype)
    //4.绑定this实现继承，让其可以访问构造函数的属性
    var result = Con.apply(obj, arguments)
    //优先返回构造函数的对象
    return result instanceof Object ? result : obj
}
</pre>
## 原型 prototype
每个构造函数对象拥有一个**原型对象**，对象以原型为模板，从原型继承方法和属性，这些属性和方法定义在构造器函数的 **prototype** 属性上，而非本身

## \__proto__
构造函数的 prototype 属性有个 \__proto__属性，这是一个访问器属性（即getter 函数和 setter函数），通过他可以访问到对象内部的 [[Prototype]]\(一个对象或null)
##
__prototype__ 属性在es6后才被标准化，获取或者设置可以用
<pre>
    Object.setPrototypeOf()
    Object.getPrototypeOf()
</pre>

##原型链
每个对象拥有原型对象，通过__proto__指针指向该对象的原型，并从中集成方法和属性， 同时原型对象也可能拥有原型，这样一层一层，最终会指向null；这种关系被称作原型链


