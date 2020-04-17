/**
 * 冒泡排序
 * 比较前两个元素 -> 如果第一个元素应该排在第二个后面，则两者交换 -> 比较第二个与第三个元素 
 * 如果第二个元素应该在第三个后面，两者交换 -> 重复以上过程知道末尾
 * 时间复杂度 平均复杂度O(n*n), 最好情况O(n), 最差情况(n*n)
 * 空间复杂度 O(1)
 * 稳定性 稳定
 */
function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex]
    items[secondIndex] = temp
}
/**
 * 外层循环负责遍历，内层循环负责数组的元素比较
 * 
 */
function bubbleSort(items) {
    var len = items.length,
            i,
            j,
            stop;
    for (i = 0; i < len; i++) {
        var done = true
        for(j = 0, stop = len-i-1; j < stop; j++) {
            if(items[j] < item[j+1]) {
                swap(items, j, j+1)
                done = false
            }
        }
        if (done) {
            break;
        }
    }
    return items
}