/* 
  二叉搜索树的定义：
    1.是一棵空树；
    2.由根结点、左子树、右子树组成，同时左子树和右子树都是二叉搜索树，
    且左子树上所有结点的数据域都小于等于根结点的数据域，右子树上所有结点的数据域都大于等于根结点的数据域
    3.强调：数据域的有序性；二叉搜索树上的每一棵子树，满足：左孩子 <= 根结点 <= 右孩子
    
    4.特点：二叉搜索树的中序遍历是有序的，非递减的；
  二叉搜索树需要掌握：
    1.查找数据域为某一特定值的结点
    2.插入新结点
    3.删除指定结点

*/

/* 
700. 二叉搜索树中的搜索

  1.遍历二叉树；若遍历的结点为空，则返回null,没有找到目标结点值；
  2.若结点有值，且等于搜索的值，则返回结点值；
  3.若当前结点值大于目标值，则继续在结点的左子树中查找；若当前结点值大于目标值，则在结点的右子树中查找
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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (!root) return null
  if (root.val === val) {
    return root
  } else if (root.val > val) {
    // 大于目标值，继续向左子树查找
    return searchBST(root.left, val)
  } else {
    // 小于目标值，继续向右子树查找
    return searchBST(root.right, val)
  }
};
/* 
  二叉搜索树插入结点：
  1.插入结点n的过程可以转化为查找值为n的结点的过程；直到结点为空，说明这就是目标节点的位置；

*/
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  if (!root) {
    root = new TreeNode(val)
    return root
  }
  if (root.val > val) {
    // 大于目标值，继续向左子树查找
    root.left = insertIntoBST(root.left, val)
  } else {
    // 小于目标值，继续向右子树查找
    root.right = insertIntoBST(root.right, val)
  }
  return root
};

/* 
  删除节点：
  1.先找到目标结点的位置；
  2.目标结点只有左子树；则左子树所有结点中值最大的结点替换到目标；
  3.目标结点只有右子树；则右子树所有结点中值最小的结点替换到目标；
  4.目标结点左右子树都有；则右子树中值最小的结点 或者左子树中值最大的结点替换到目标

  疑问：
  1.怎样找最大值/最小值结点？----如上
  2.找到目标结点后,怎样与删除结点后的树连接起来？-----找到需要删除的结点，再继续调用deleteNode方法
*/
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var deleteNode = function (root, val) {
  if (!root) {
    return null
  }
  if (val === root.val) {
    // 找到目标结点
    if (!root.left && !root.right) {
      //无子树，为叶子结点，直接删除
      root = null
    } else if (root.left && !root.right) {
      // 仅有左子树，则找到左子树中最大的结点
      let leftMaxNode = findMax(root.left)
      // 将目标结点的值替换为leftMaxNode的值
      root.val = leftMaxNode.val
      // 删除左子树中leftMaxNode结点
      root.left = deleteNode(root.left, leftMaxNode.val)

    } else if (!root.left && root.right) {
      // 仅有右子树，则找到右子树中最小的结点
      let rightMinNode = findMax(root.right)
      // 将目标结点的值替换为rightMinNode的值
      root.val = rightMinNode.val
      // 删除右子树中rightMinNode结点
      root.right = deleteNode(root.right, rightMinNode.val)
    } else {
      // 左右子树均有；则找到左子树中最小值，或者右子树中的最小值结点；为了避免左右子树的长度相差的太多，可以在此处比较左右子树的长度
      let rightMinNode = findMax(root.right)
      // 将目标结点的值替换为rightMinNode的值
      root.val = rightMinNode.val
      // 删除右子树中rightMinNode结点
      root.right = deleteNode(root.right, rightMinNode.val)
    }

  } else if (val < root.val) {
    // 目标值小于当前结点的值，则再当前结点的左子树中继续查找目标结点      
    root.left = deleteNode(root.left, val)

  } else if (val > root.val) {
    // 目标值大于当前结点的值，则再当前结点的右子树中继续查找目标结点
    root.right = deleteNode(root.right, val)
  }
  return root

  // 寻找左子树结点中的最大值结点；返回值结点值，并删除这个结点
  function findMax(root) {
    while (root.right) {
      root = root.right
    }
    return root
  }

  // 寻找右子树结点中的最小值结点；返回值结点值，并删除这个结点
  function findMin(root) {
    while (root.left) {
      root = root.left
    }
    return root
  }
};

/* 
  98. 验证二叉搜索树
  疑问：1.怎样将当前结点值与其所有的左子树，右子树的结点值比较？？ 将所有的结点值遍历出来用数组存放；再统一比较值的大小顺序
        
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  // 空树也是二叉搜索树
  if (!root) return true
  let nodeValArr = []
  // 二叉搜索树，中序遍历出的是非递减的有序序列
  inOrder(root)
  for (let i = 1; i <= nodeValArr.length; i++) {
    if(nodeValArr[i-1] >= nodeValArr[i]){
      return false
    }
  }
  return true
// 中序遍历
  function inOrder(root) {
    if (!root) return nodeValArr
    inOrder(root.left)
    // 中序遍历将结点的值存入数组
    nodeValArr.push(root.val)
    inOrder(root.right)
  }
};

/* 
  98. 验证二叉搜索树 
*/
var isValidBST = function (root) {
  // 空树也是二叉搜索树
  if (!root) return true
  return dfs(root,-Infinity,Infinity)
  function dfs(root,minValue,maxValue){
    if(!root) return true
    // 如果左节点的值大于等于 根节点的值 或 右节点的值小于等于 根节点的值  则 为false
    if(root.val >= maxValue || root.val <= minValue ) return false
    // 更新左孩子的最大值，右孩子的最小值
    return dfs(root.left,minValue,root.val) && dfs(root.right,root.val,maxValue)
  }
};

/* 
  108. 将有序数组转换为二叉搜索树
  解题思路：
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
 * @param {number[]} nums 升序数组
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  if(!nums.length){
    return null
  }
 return dfs(0,nums.length-1)
  function dfs(low,high){
    //左右范围大于右边时，说明区间已经遍历完成
    if(low> high) return null
    // 因为左右子树的高度不能超过1;所以数组的中间值为根结点
    let curIndex = Math.floor(low +( high - low)/2)
    let cur = new TreeNode(nums[curIndex])
    // 递归生成左右子树
    cur.left = dfs(low,curIndex-1)
    cur.right = dfs(curIndex+1,high)
    // 返回当前结点
    return cur
  }
};