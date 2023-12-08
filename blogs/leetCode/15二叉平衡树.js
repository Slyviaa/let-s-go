/* 
  二叉平衡树：指的是任意结点的左右子树高度差绝对值都不大于1的二叉搜索树。

*/
/* 
  110
  LCR 176. 判断是否为平衡二叉树
  输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树
  要点：
    1.任意结点的左右字数高度不超过1-----每个节点-->递归--》递归边界，递归式，回溯
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
var isBalanced = function (root) {
  let flag = true
  // 自底向上递归的做法类似于后序遍历，
  // 对于当前遍历到的节点，先递归地判断其左右子树是否平衡，再判断以当前节点为根的子树是否平衡。
  // 如果一棵子树是平衡的，则返回其高度（高度一定是非负整数），否则将flag标记为false。如果存在一棵子树不平衡，则整个二叉树一定不平衡。
  dfs(root)
  return flag
  function dfs(root) {
    if (!root || !flag) return 0
    // 左子树的高度
    let leftCount = dfs(root.left)
    // 右子树的高度
    let rightCount = dfs(root.right)
    // 计算两高度差
    if (Math.abs(leftCount - rightCount) > 1) {
      flag = false
      return 0
    }
    // 返回数的高度
    return Math.max(leftCount, rightCount) + 1
  }
};
const root = {
  val: 3,
  left: {
    val: 9,
    left: {
      val: null
    },
    right: {
      val: null
    }
  },
  right: {
    val: 20,
    left: {
      val: 15
    },
    right: {
      val: 7
    }
  }
};

isBalanced(root)

/* 
  1382. 将二叉搜索树变平衡
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
 * @return {TreeNode}
 */
var balanceBST = function(root) {
  let valArr =[]
  inOrder(root)
  return dfs(0,valArr.length -1)

  //遍历有序数组，递归生成平衡树
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
    // 中序遍历获取所有的节点
  function inOrder(root){
    if(!root) return 
    inOrder(root.left)
    valArr.push(root.val)
    inOrder(root.right)
  }
};