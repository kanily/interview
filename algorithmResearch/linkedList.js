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

