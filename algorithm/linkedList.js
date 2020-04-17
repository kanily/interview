/**
 * 链表——一种基础数据结构
 * 自身就是一个指针，指向头结点，相应的这个头节点又有个指针指向下一个节点，以此类推。
 * 每个节点包含两块区域，数据区域包含该位置的值，另一个区域包含一个指针指向下一个节点
 */
function LinkList() {
    this._length = 0;  // 长度属性
    this._head = null; // 链表指向的第一个元素，一开始的链表为空
}
LinkList.prototype = {
    add: function(data) {
        var node = {
            data: data,
            next: null
        },
        current;
        if (this._head === null) {
            this._head = node
        } else {
            current = this._head;
            while (current.next) {
                current = current.next
            }
            current.next = node
        }
        this._length++
    },
    item: function(index) {
        if (index > -1 && index < this._length) {
            var current = this._head,
            i = 0;
            while (i++ < index) {
                current = current.next;
            }
            return current.data;
        } else {
            return null;
        }
    },
    remove: function(index) {
        if (index > -1 && index < this._length) {
            var current = this._head,
                previous,
                i = 0;
            if (index === 0) {
                this._head = current.next
            } else {
                // 找到正确的位置进行删除
                while (i++ < index) {
                    previous = current;
                    current = current.next
                }
                previous.next = current.next
            }
            this._length--;
            return current.data;
        } else {
            return null;
        }
    }
}
// 使用
var list = new LinkedList();
list.add('red')
list.add('orange')
list.add('yellow')

function showStudent(ssn) {
    var student = db.get(ssn);
    if(student !== null) {
        document.querySelector(`#{elementId}`).innerHTML = `${student.ssn}, ${student.firstname}, ${student.lastname}`;
    } else {
        throw  new Error('student is not found')
    }
}

var find = curry(function (db, id) {
    var obj = bd.get(id);
    if(obj === null) {
        throw new Error('Object not found');
    }
    return obj;
})

var csv = (student) {
    return `${student.ssn}, ${student.firstname}, ${student.lastname}`;
}

var append = curry(function (elementId, info) {
    document.querySelector(elementId).innerHTML = info;
})

var showStudent = run(append('#student-info'), csv, find(db));

class Person {
    constructor(firstname, lastname, ssn) {
        this._firstname = firstname;
        this._lastname = lastname;
        this._ssn = ssn;
        this._address = null;
        this._birthYear = null;
    }

    get ssn() {
        return this._ssn;
    }

    get firstname() {
        return this._firstname;
    }

    get address() {
        return this._address;
    }

    get birthYear() {
        return this._birthYear;
    }

    set address(addr) {
        this._address = addr;
    }

    toString() {
        return `Person(${this._firstname}, ${this._lastname})`
    }
}

class Student extends Person {
    constructor(firtname, lastname, ssn, school) {
        super(firtname, lastname, ssn);
        this._school = school
    }

    get school() {
        return this._school;
    }
}
