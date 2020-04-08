function generateArray(length, arr = []) {
  let randomNum = Math.floor((Math.random()*30)+2);
  if(arr.indexOf(randomNum) === -1) {
    arr.push(randomNum);
  }
  return arr.length < length ? generateArray(length, arr) : arr ;
}

function toFlat(arr, newArr = []) {
  for (let key in arr) {
    console.log(arr[key])
    typeof arr[key] === 'number' ? newArr.push(arr[key]) : toFlat(arr[key], newArr);
  }
  return Array.from(new Set(newArr)).sort((a, b) =>{ return a - b});
}

// class LazyMan {
//   constructor(name) {
//     this.name = name
//     console.log(`Hi I am ${name}`)
//   }
//   sleep(time) {
//     setTimeout(() => {
//       console.log(`等待了${time}`)
//     }, time)
//   }
//   eat(some) {
//     console.log(`I am eating ${some}`)
//   }
// }

function LazyMan(name) {
  if(! (this instanceof  LazyMan)) {
    return  new LazyMan(name)
  }
  this.taskList = [];
  this.next();
  console.log(`Hi I am ${name}`);
}
LazyMan.prototype.sleep = function(time) {
  let that = this
  that.taskList.push({
    delayTime: time * 1000,
    callback() {
      console.log(`等待了${time}s ...`)
      that.next()
    }
  })
  return this;
}

LazyMan.prototype.eat = function(food) {
  let that = this
  that.taskList.push({
    delayTime: 0,
    callback() {
      console.log(`I am eating ${food}`)
      that.next()
    }
  })
  return that;
}
LazyMan.prototype.next = function() {
  const taskList = this.taskList;
  if ( taskList.length === 0 ) return;
  const {delayTime, callback} = taskList[0]
  setTimeout(() => {
    callback && callback()
    taskList.shift()
    this.next()
  },delayTime)
}
LazyMan('Tony').sleep(10).eat('lunch');

function add() {
  let args = [].slice.call(arguments);
  let addArgs = args.length === 1 ? args[0] : args.reduce((pre, item) => {
    return pre + item
  })
  function sumF() {
    let addArgs2 = args.length === 1 ? args[0] : args.reduce((pre, item) => {
      return pre + item
    })
    return addArgs += addArgs2
  }
  sumF.toString = function () {
    return addArgs
  }
  return sumF;
}
