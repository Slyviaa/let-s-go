/* 
  递归回溯思想套路
  function xxx(入参) {
  前期的变量定义、缓存等准备工作 
  
  // 定义路径栈
  const path = []
  
  // 进入 dfs
  dfs(起点) 
  
  // 定义 dfs
  function dfs(递归参数) {
    if(到达了递归边界) {
      结合题意处理边界逻辑，往往和 path 内容有关
      return   
    }
    
    // 注意这里也可能不是 for，视题意决定
    for(遍历坑位的可选值) {
      path.push(当前选中值)
      处理坑位本身的相关逻辑
      path.pop()
    }
  }
}

*/

/* 
  LCR 083. 全排列； 46. 全排列
*/
/**将罗列的结果可转化为树结构；按照树的DFS可输出每个可能的结果
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const len = nums.length
  const res = []
  const result = []
  const visited ={}
  // 第一个坑开始占位
  dfs(0) 
  return res
  function dfs(n){
    if(n===len){
      // 边界条件
      res.push(result.slice())
      return
    }
    for(let i = 0; i<len;i++){
      if(!visited[nums[i]]){
        // 当前结点还没有占坑，则入坑
        visited[nums[i]] = true
        result.push(nums[i])
        // 开始占下一个坑位
        dfs(n+1)
        result.pop()
        visited[nums[i]] = false
      }
    }
  }
};
/* 
  77. 组合  递归的剪枝操作   组合：数据不能重复；
  给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
  你可以按 任何顺序 返回答案。
*/
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  const res = []
  const curr = []
  dfs(1)
  return res
  function dfs(nth){
    if(nth === k){
      res.push(curr.slice())
      return 
    }
    for(let i = nth;i<=n;i++ ){
      curr.push(i)
      dfs(i+1)
      curr.pop()
    }
  }
};

