/* 
  队列的重点：
    栈向队列的转化 :利用栈的操作实现队列先进先出的特点
    双端队列：允许在队列的两端进行插入和删除的队列
    优先队列
*/

/* 
  232. 用栈实现队列
*/

var MyQueue = function() {
  this.stack1 = []
  this.stak2 = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.stack1.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  if(this.stack2.length <=0){
    while(this.stack1.length ){
      // stack2为 stack1相反顺序；stack1栈底的元素到了stack2栈顶的位置
      this.stack2.push(this.stack1.pop())
    }
  }
  return  this.stack2.pop()
};

/**
 * @return {number} 返回队列开头的元素
 */
MyQueue.prototype.peek = function() {
  if(this.stack2.length <=0){
    while(this.stack1.length ){
      // stack2为 stack1相反顺序；stack1栈底的元素到了stack2栈顶的位置
      this.stack2.push(this.stack1.pop())
    }
  }
  return  this.stack2[this.stack2.length -1]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return ! (this.stack1.length || this.stack2.length )
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

/* 
  双端队列：
    const queue = [1,2,3,4] // 定义一个双端队列   
    queue.push(1) // 双端队列尾部入队 
    queue.pop() // 双端队列尾部出队   
    queue.shift() // 双端队列头部出队 
    queue.unshift(1) // 双端队列头部入队
    */
/* 
  239. 滑动窗口最大值
*/
/**暴力解法 O(n*n)
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  if(nums.length ===1){
    return nums
  }
  let res = []
  for(let i = 0;i<nums.length -k +1;i++){
    let max = nums[i]
    for(let j = 0 ; j<k ;j++){
      max = Math.max(max,nums[j])
    }
    res.push(max)
  }
  return res
};

var maxSlidingWindow = function(nums, k) {
  if(nums.length ===1){
    return nums
  }
  let res = []
  let stack = []
  // 初始化栈
  for(let i = 0;i<k;i++){
    stack.push(nums[i])
  }
  for(let i = k -1;i<nums.length- k + 1;i++){
    while(stack.length){
      if(nums[i+k]>= stack[stack.length -1] ){
        // 右侧增加
        stack.push(nums[i])
      }else if(nums[i - k] <= stack[stack.length -1]){
        // 左侧删除
        stack.pop()
      }
    }
    res[i] = stack.
  }

  return res
};