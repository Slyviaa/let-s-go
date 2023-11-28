/* 
  20. 有效的括号
*/
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const bracketObj = new Map([['(', ')'], ['{', '}'], ['[', ']']])
  const stack = []
  if (!s || s.length % 2 !== 0) return false
  for (let i = 0; i < s.length; i++) {
    if (bracketObj.has(s[i])) {
      // 如果为左括号,则将右括号入栈
      stack.push(bracketObj.get(s[i]))
    } else {
      // 如果为右括号，则判断是否和栈顶的括号一致;
      if ((!stack.length || stack.length && stack.pop() !== s[i])) {
        return false
      }
    }
  }
  // 栈为空则括号全部匹配成功
  return !stack.length

};

/* 
  739. 每日温度

*/
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  // 暴力解法；两层for循环-----复杂度：O(n*n)测试用例通过了，但耗时太长。
  const len = temperatures.length
  let res = []
  for (let i = 0; i < len; i++) {
    if (temperatures[i + 1] > temperatures[i]) {
      res.push(1)
    } else {
      let j = i + 2;
      while( j < len){
        if (temperatures[j] > temperatures[i]) {
          //找到比temperatures[i]大的；跳出for循环
          res.push(j - i)
          break
        }
        j++
      }
      if(j>= len){
        res.push(0)
      }
    }
  }
  return res
};

/** 栈解法----啊啊啊啊，想不到啊
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures2 = function (temperatures) {
  const len = temperatures.length
  const res = new Array(len).fill(0)
  const stack =[]
  // 虽然有两层循环；但是对每个元素只出栈入栈了一次；所以复杂度为O(n)
  for(let i = 0 ; i<len;i++){
    while(stack.length && temperatures[i]>temperatures[stack[stack.length-1]]){
      // 维护一个由temperatures索引组成的递减栈；
      // 遍历将当前元素与栈顶的索引对应的元素值比较；若大于栈顶元素值，则栈顶元素找到了高于他的温度；若小于栈顶温度，则入栈；
      let top = stack.pop()
      res[top] = i - top
    }
    stack.push(i)
  }
  return res
};

/* 
  155. 最小栈-
*/

var MinStack = function() {
  this.stack = []
  this.mins= []
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
  this.stack.push(val)
  // 维护一个非递增的栈；
 if(!this.mins.length||val <=this.mins[this.mins.length -1] ){
    this.mins.push(val)
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.stack.pop(val)
  if(val === this.mins[this.mins.length -1]){
    this.mins.pop()
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return  this.stack[this.stack.length - 1]
};

/**
 * @return {number} 爆力解法--遍历
 */
MinStack.prototype.getMin1 = function() {

  let minNum = this.stack[0]
  for(let i = 0 ; i<this.stack.length;i++){
    minNum= Math.min(minNum,this.stack[i])
  }
  return minNum
};
/**
 * @return {number} 每次push和pop时维护一个最小
 */
MinStack.prototype.getMin = function() {

  return this.mins[this.mins.length -1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */