/**
 * 二叉搜索树
 * 每个节点都有数据，另外含有两个指针，指向其他节点
 * 特点：节点顺序基于节点值的大小，所有左节点的值都小于右节点的值
 */
var node = {
    value: 124,
    left: null,
    right: null
};

function BinarySearchTree() {
    this._root = null
}
BinarySearchTree.prototype = {
    constructor: BinarySearchTree,
    add: function (value) {
        var node = {
            value: value,
            left: null,
            right: null
        },
        current;
        if (this._root === null) {
            this._root = node;
        } else {
            current = this._root
            while (true) {
                if(value < current.value) {
                    if (current.left === null) {
                        current.left = node
                        break;
                    } else {
                        current = current.left
                    }
                } else if (value >  current.right) {
                    if (current.right === null) {
                        current.right = node
                        break
                    } else {
                        current = current.right
                    }
                } else {
                    break
                }
            }
        }
    },
    contains: function (value) {
        var found = false,
            current = this._root;
        while (!found && current) {
            if (value < current.value) {
                current = current.right
            } else if (value > current.value) {
                current = current.left
            } else {
                found = true
            }
        }
        return found    
    },
    remove: function (value) {
        var found = false,
            parent = null,
            current = this._root,
            childCount,
            replacement,
            replacementParent;
       // 定位要删除的节点 父节点要被记录      
        while(!found && current) {
            if(value < current.value) {
                parent = current
                current = current.left
            }else if (value > current.value) {
                parent = current
                current = current.right
            } else {
                found = true
            }
        }
        if (found) {
          // 计算节点数量
            childCount = (current.left === null ? 0 : 1) + (current.right === null ? 0 : 1)
            if(current === this._root) {
                switch(childCount){
                    case 0:
                        this._root = null;
                        break;
                    case 1:
                        this._root = current.right === null ? current.left : current.right
                        break;
                    case 2:
                        //新的根节点是源根节点的做子节点
                        //左子树的最右节点 直接前驱
                        replacement = this._root.left
                        while (replacement.right !== null) {
                            replacementParent = replacement
                            replacement = replacement.right
                        }
                        if(replacementParent !== null) {
                            replacementParent.right = replacement.left
                            replacement.right = this._root.right
                            replacement.left = this._root.left
                        }
                        this._root = replacement
                }
            } else {
                switch(childCount){
                    case 0:
                        if(current.value > parent.value) {
                            parent.left = null;
                        } else {
                            parent.right = null
                        }
                        break;
                    case 1:
                        if(current.value > parent.value) {
                        parent.left = current.left ? current.left.value : current.right.value
                    } else {
                        parent.right = current.left ? current.left.value : current.right.value
                    }
                    case 2:
                      //TODO
                        replacement = current.left
                        replacementParent = current
                        while (replacement.right !== null) {
                            replacementParent = replacement
                            replacement = replacement.right
                        }
                        replacementParent = replacement.left 
                        replacementParent.right = current.right
                        replacementParent.left = current.left
                        if (parent.value > replacement.value) {
                            parent.left = replacement
                        } else {
                            parent.right = replacement
                        }
                }
            }
        }
    },
    size: function () {
        var length = 0;
        this.traverse(function(node){
            length++;
        })
        return length
    },
    traverse: function (process) {
        // 辅助函数遍历节点
        function inOrder(node) {
            if(node.left !== null) {
                inOrder(node.left)
            }
            // call 使用指定的this 和单独给出的一个或多个参数调用一个函数，再次此处调用process
            process.call(this, node);
            if (node.right !== null) {
                inOrder(node.right)
            }
        }
        inOrder(this._root)
    },
    toArray: function () {
        var result = [];
        this.traverse(function(node){
            result.push(node.value)
        })
        return result
    },
    toString: function () {
        return this.toArray().toString();
    },

}