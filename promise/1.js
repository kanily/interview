/**
 * 1. new Promise时， 需要传递一个 executor 执行器， 执行器立即执行
 * 2. executor 接受两个参数 分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected， 或者 从 pending 到 resolved
 * 4. promise 的状态一旦确认， 就不会再改变
 * 5. promise 都有 then 方法， then方法接收两个参数， 
 *    分别是 promise 成功回调的 onFulfilled 和 失败回调的 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled 并将 promise的值作为参数传进去
 *    如果promise已经失败， 那么执行 onRejected 并将 promise失败的原因作为参数传递进去
 *    如果promise是pending状态，则把 onFulfilled 和 onRejected 函数存起来， 等到状态确定后，
 *    再按照相应的对象执行（发布-订阅模式）
 * 7. onFulfilled 和 onRejected 的参数可以缺省
 * 8. promise 可以 then 多次，promise的then 返回一个promise
 * 9. 如果then返回的是一个结果， 那么可以把这个结果作为参数，传递下一个then 的 onFulfilled成功的回调
 * 10. 如果then 返回的是一个异常， 那么可以把这个异常作为参数， 传递给下一个then 的 onRejected 失败回调
 * 11. 如果 then 返回的是一个promise, 那么需要等这个promise 那么等到这个promise 执行完
 *     promise执行成功就走下一个then成功， promise执行失败就走下一个then的失败
 */



const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = 'rejected';

function Promise(excutor) {
  let that = this; //缓存当前promise 实例对象
  that.status = PENDING; // 初始状态
  that.value = undefined; // fulfilled状态时 返回的信息
  that.reason = undefined; // rejected状态时 拒绝的原因
  that.onFulfilledCallbacks = []; //存储fulfilled 状态对应的onFulfilled函数
  that.onRejectedCallbacks = []; //存储rejected 状态对应的onRejected 函数

  function resovle (value) { //value 成功态时接受的终值
    if(value instanceof Promise) {
      return value.then(resovle, reject)
    }
    //实践中要确保 onFulfilled 和 onRejected方法异步执行，
    //且应该在then 方法调用的时候那一轮事件循环的执行栈执行结束之后
    setTimeout(() => {
      // 调用resovle 回调对应的onFulfilled函数
      if (that.status === PENDING) {
        // 只能由pending状态 =》 fulfilled 状态（避免多次调用resovle reject）
        that.status = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.forEach(callback => {
          callback(that.value)
        });
      }
    })
  }

  function reject(reason) {
    setTimeout(() => {
      // 调用reject 回调对应onRejected 函数
        if (that.status === PENDING) {
          // 只能由 pending =》 rejected （避免多次调用resovle reject）
          that.status = REJECTED;
          that.reason = reason;
          that.onRejectedCallbacks.forEach(callback => {
            callback(that.reason)
          })
        }
    })
  }

  //捕获在excutor执行期炮数的异常
  try {
    excutor(resovle, reject)
  } catch (error) {
    reject(e)
  }
  
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  let newPromise;
  onFulfilled = 
    typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected = 
   typeof onRejected === "function" ? onRejected : reason => {
     throw reason
   }

   if(that.status === FULFILLED) {
     return newPromise = new Promise((resovle, reject) => {
       setTimeout(() => {
         try {
           let x = onFulfilled(that.value)
           resovlePromise(newPromise, x, resovle, reject);
         } catch (error) {
           reject(error)
         }
       })
     })
   }
   
   if(that.status === REJECTED) {
     return newPromise = new Promise(() => {
       setTimeout(() => {
         try {
           let x = onRejected(that.reason)
           resovlePromise(newPromise, x, resovle, reject)
         } catch (error) {
           reject(error)
         }
       })
     })
   }

   if(that.status === PENDING) {
     that.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(that.value)
            resovlePromise(newPromise, x, resovle, reject)
          } catch (error) {
            reject(error)
          }
        })
     })

    that.onRejectedCallbacks.push(() =>{
      setTimeout(() => {
        try {
          let x = onRejected(that.reason)
          resovlePromise(newPromise, x, resovle, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
    
}

function resovlePromise (newPromise, x, resolve, reject) {
  let that = this;
  if(newPromise === x) {
    reject(new TypeError('Chaining cycle'));
  }
  if(x & typeof x === 'object' || typeof x === 'function') {
    let used;
    try {
      let then = x.then;
      if(typeof then === 'function') {
        then.call(x, (y) => {
          if(used) return;
          used === true;
          resovlePromise(newPromise, y, resolve, reject);
        }, (reason) => {
          if(used) return;
          used === true;
          reject(reason);
        })
      }else {
        if(used) return;
        used = true;
        resolve(x);
      }
    } catch (error) {
      if(used) return;
      used = true;
      reject(error);
    }
  }else{
    resolve(x);
  }
}

// promise.finally
// 不管成功 or 失败 最终都会走到finally 还可以继续 then 且可以把值原封不动的传给后面的then
Promise.prototype.finally = function (callback) {
  return this.then((value) => {
    return Promise.resolve(callback()).then(() => {
      return value
    })
  }, (err) => {
    return Promise.resolve(callback().then(() => {
      throw err
    }))
  })
}

//promise.all（promises） 返回一个promise对象
/**
 * 1. 如果传入的是一个空的可迭代对象，那么此promise对象回调完成（resolve），
 *  只有这种情况是同步执行的，其他的都是返回一个异步完成
 * 2. 如果传入参数不包含任何一个promise， 则返回一个异步完成
 * 3. promises 所有的promise都完成时，或参数中不包含promise时 回调完成
 * 4. 如果一个 promise 失败，那么promise.all 返回的promise对象失败
 * 5. 在任何情况下，promises返回的promise的完成状态结果都是一个数组
 */

 Promise.prototype.all = function (promises) {
   return new Promise((resolve, rejected) => {
    let index = 0;
    let result = [];
    if (promises.length === 0) {
      resolve(result)
    } else {
      function processValue (idx, data) {
        result[i] = data;
        if (++index === promises.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        //promises[i]可能是个普通值
        Promise.resolve(promises[i]).then((data) => {
          processValue(i, data)
        }, (err) => {
          rejected(err);
          return;
        })
      }
    }
   })
 }


 //Promise.race()
 /**
  * 返回一个promise函数，他将与第一个传递的promise相同的方式被完成，他可以是完成也可以是失败，
  * 取决于第一个完成的方式是两个中的哪一个
  * 如果传递的是一个空数组，那么primise将处于永远等待
  * 如果迭代中包含一个或多个 非promise/resolve/reject的promise，那么promise.race将解析为迭代中找到的第一个值
  */
Promise.prototype.race = function(promises) {
  return new Promise((resovle, reject) => {
    if(promises.length === 0) {
      return;
    }else {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then((data)=> {
          resolve(data);
          return;
        }, (err) => {
          reject(err);
          return;
        })
      }
    }
  })
}

//Promise.allSettled
/**
 * 将一组promise实例作为参数，包装成一个新的promise实例，只有等到所有的promise都执行完成后
 * 不管是fulfilled 或是 rejected 包装实例才会结束
 */

 //Promise.any
/**
 * 将一组promise实例作为参数，包装成一个新的promise实例，实例参数只要有一个promise是resolve状态
 * 包装的实例则返回resolve状态，如果实例参数都返回rejected状态，实例才返回 rejected
 */
