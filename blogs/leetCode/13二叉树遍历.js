/* 
  144. 二叉树的前序遍历
  二叉树的先序遍历 递归写法
*/
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  const res = []
  preOrder(root)
  return res

  function preOrder(root){
      if(!root){
          return 
      }
      res.push(root.val)
      preOrder(root.left)
      preOrder(root.right)
  }
};

/* 
  144. 二叉树的前序遍历
  二叉树的先序遍历 迭代写法
*/
var preorderTraversal = function(root) {
  const res = []
  if(!root) return res
  const stack = []
  // 结点出栈的时候读取结点的值以及左右子结点的信息；
  stack.push(root)
  while(stack.length){
    let cur = stack.pop()
    res.push(cur.val)
    // 栈结构后进先出
    if(cur.right){
      stack.push(cur.right)
    }
    if(cur.left){
      stack.push(cur.left)
    }
  }
  return res
}

/* 
  145. 二叉树的后序遍历
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**递归
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  const res = []
  postorder(root)
  return res 
  function postorder(root){
    if(!root){
      return
    }
    postorder(root.left)
    postorder(root.right)
    res.push(root.val)
  }
};

/**迭代法
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  const res = []
  if(!root) return res
  const stack = []
  stack.push(root)
  while(stack.length){
    let cur = stack.pop()
    // 将后读取的结点值放在前面
    res.unshift(cur.val)
    if(cur.left){
      stack.push(cur.left)
    }
    if(cur.right){
      stack.push(cur.right)
    }
  }
  return
};

/* 
  94. 二叉树的中序遍历
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root  递归法
 * @return {number[]} 
 */
var inorderTraversal = function(root) {
    const res =[]
    inOrder(root)
    return res
    function inOrder(root){
      if(!root){
        return res
      }
      inOrder(root.left)
      res.push(root.val)
      inOrder(root.right)
    }
};

/**
 * @param {TreeNode} root  中序遍历迭代法  左 中 右
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  const res =[]
  if(!root){
    return res
  }
  const stack = []
  let cur = root
  while(cur || stack.length){
    while(cur){
      // 遍历查找最左子结点时，将所有元素入栈
      stack.push(cur)
       // 继续搜索当前结点的左孩子
      cur = cur.left
    }
    // 取出栈顶元素
    let cur = stack.pop()
    res.push(cur.val)
    // 尝试查找 右结点
    stack.push(cur.right)
  }
  return res
  
};

/* 
  102. 二叉树的层序遍历
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const queue = [] // 初始化队列queue
  const res = []
  let cur = []
  if(!root){
     return res
  }
 // 根结点首先入队
 queue.push(root)
 // 队列不为空，说明没有遍历完全
 while(queue.length) {
    // len取是之前缓存的一层的长度；for循环中queue的长度会动态改变
    len = queue.length
    let level = []
     // for循环对应的是二叉树中的一层
    for(let i = 0;i<len;i++){
      const top = queue[0] // 取出队头元素  
      level.push(top.val)
      // 如果左子树存在，左子树入队
      if(top.left) {
          queue.push(top.left)
      }
      // 如果右子树存在，右子树入队
      if(top.right) {
          queue.push(top.right)
         
      }
      queue.shift() // 访问完毕，队头元素出队
    }
    res.push(level)

 }
 return res 
};

/* 
  226. 翻转二叉树
*/
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  const res = []
  if(!root){
    return root
  }
  // 递归交换右孩子的子结点
  let right = invertTree(root.right)
  let left = invertTree(root.left)
  // 交换当前遍历到的两个左右孩子结点
  root.left = right
  root.right = left
  return root
};