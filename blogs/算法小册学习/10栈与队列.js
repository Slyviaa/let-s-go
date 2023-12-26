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

// 双端队列  维护一个非递增队列；滑动窗口移动，->入队列
var maxSlidingWindow = function(nums, k) {
  if(nums.length ===1){
    return nums
  }
  let res = []
  let queue = []
  // 初始化栈
  for(let i = 0;i<nums.length;i++){
    while(queue.length && nums[i]>=nums[queue[queue.length -1]]){
      // 新加的元素大于队列尾部的元素-则队列所有小于新元素的元素出队列
      queue.pop()
    }
    // 小于队尾值的元素索引入队列
    queue.push(i)
    while(queue.length && queue[0]<=i-k){
      // 当队头元素索引小于等于滑动窗口起始点的索引时；说明对头索引对应的元素已不在滑动窗口内
      queue.shift()
    }
    
    if(i>=k){
      // 判断滑动窗口的状态，只有在被遍历的元素个数大于 k 的时候，才更新结果数组
      res.push(nums[queue[0]])
    }
  }

  return res
};


/* 
双端队列的重点：
  维持队列的递减性：确保队头元素是当前滑动窗口的最大值。这样我们每次取最大值时，直接取队头元素即可；
  在维持队列递减性的基础上、更新队列的内容。
  维持队列的有效性：确保队列里所有的元素都在滑动窗口圈定的范围以内。
  排除掉滑动窗口还没有初始化完成、第一个最大值还没有出现的特殊情况。
 */
