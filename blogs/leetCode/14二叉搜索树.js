/* 
  二叉搜索树的定义：
    1.是一棵空树；
    2.由根结点、左子树、右子树组成，同时左子树和右子树都是二叉搜索树，
    且左子树上所有结点的数据域都小于等于根结点的数据域，右子树上所有结点的数据域都大于等于根结点的数据域
    3.强调：数据域的有序性；二叉搜索树上的每一棵子树，满足：左孩子 <= 根结点 <= 右孩子
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
var searchBST = function(root, val) {
  if(!root)return null
  while(root){
    if(root.val === val){
      return root
    }else if(root.val>val){
      // 大于目标值，继续向左子树查找
      searchBST(root.left)
    }else{
      // 小于目标值，继续向右子树查找
      searchBST(root.right)
    }
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
var insertIntoBST = function(root, val) {
  if(!root){
    root = new ListNode(val)
    return root
  }
  while(root){
   if(root.val>val){
      // 大于目标值，继续向左子树查找
      insertIntoBST(root.left)
    }else{
      // 小于目标值，继续向右子树查找
      insertIntoBST(root.right)
    }
  }
};

/* 
  删除节点：
  1.先找到目标结点的位置；
  2.目标结点只有左子树；则左子树所有结点中值最大的结点替换到目标；
  3.目标结点只有右子树；则右子树所有结点中值最小的结点替换到目标；
  4.目标结点左右子树都有；则右子树中值最小的结点 或者左子树中值最大的结点替换到目标

  疑问：
  1.怎样找最大值/最小值结点；
  2.找到目标结点后,怎样与删除结点后的树连接起来
*/
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var delBST = function(root, val) {
  if(!root){
    return null
  }
  let targetRoot = searchBST(root,val)
  if(!targetRoot || (!targetRoot.left && !targetRoot.right)){
     // 没有子树，为目标结点
     targetRoot = null
  }else if(targetRoot.left &&  targetRoot.right){
      // 有左右子树；
      // 左子树中值最大结点
      targetRoot.val = findMin(root)
      // 右子树中值最小结点
      // targetRoot.val = findMax(root)
  }else if(targetRoot.left && !targetRoot.right){
    // 仅有左子树,最大结点
    targetRoot.val = findMax(root)
  }else if(!targetRoot.left && targetRoot.right){
    // 仅有右子树，最小结点
    targetRoot.val = findMin(root)
  }
  return targetRoot
  // 查找目标结点
  function searchBST(root,val){
    if(!root){
      return null
    }
    if(root.val === val){
      return root
     }else if(root.val>val){
        // 大于目标值，继续向左子树查找
        searchBST(root.left)
      }else{
        // 小于目标值，继续向右子树查找
        searchBST(root.right)
      }
  }
  // 寻找结点中的最大值结点；返回值结点值，并删除这个结点
  function findMax(root,val){
    if(!root.right){
      let val = root.val
      root = null
      return val
    }
    findMax(root.right)
  }
  // 寻找结点中的最小值结点；返回值结点值，并删除这个结点
  function findMin(root,val){
    if(!root.left){
      let val = root.val
      root = null
      return val
    }
    findMax(root.left)
  }
};