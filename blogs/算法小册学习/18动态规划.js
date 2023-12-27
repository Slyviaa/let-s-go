
/* 
  爬楼梯分析：
    ----递归分析：先定位到终点，再往回退，分析问题：
        1.从第n阶往回退，可能回退1步或2步，即从n可回退到n-1或者n-阶，记为f(n-1);
        2.第n-2阶对应的路径数记为f(n-2)；
        3.可以得出：f(n) = f(n-1) + f(n-2);
        4.边界条件；第1阶只能回退一步，只有一中方法；第2阶 可按1+1 或者 2退回，有两种办法；即f(1) =1,f(2) = 2
*/
/**70.爬楼梯  https://leetcode.cn/problems/climbing-stairs/
 * @param {number} n
 * @return {number}
 */
/* 
  递归实现
*/
var climbStairs = function(n) {
    if(n === 1 || n=== 2){
      return n===1 ?1:2
    }
    return climbStairs(n-1) + climbStairs(n-2)
};

// 递归实现+记忆搜索；即把计算过的fn存起来；避免重复计算
var fn =[]
var climbStairs = function(n) {
  if(n === 1 || n=== 2){
    return n===1 ?1:2
  }
  if(fn[n]) return fn[n]
  return climbStairs(n-1) + climbStairs(n-2)
};

// 动态规划 
var climbStairs = function(n) {
  var fn =[]
  fn[1] = 1
  fn[2] = 2
  for(let i = 3 ; i <=n ;i++){
    fn[i] = fn[i-1] + fn[i-2]
  }
  return fn[n]
};

climbStairs(4)

/* 
  使用动态规划的特征：
    1.要求你给出达成某个目的的解法个数;
    2、不要求你给出每一种解法对应的具体路径;
    3.每一个状态一定是由上一个状态推导出;
    **4**.最优子结构:它指的是问题的最优解包含着子问题的最优解;不管前面的决策如何，此后的状态必须是基于当前状态（由上次决策产生）的最优决策(状态转移方程);
    **5**.重叠子问题：在递归的过程中，出现了反复计算的情况;
*/

/* 
  解题步骤：
  1.确定dp数组（dp table）以及下标的含义
  2.确定递推公式
  3.dp数组如何初始化
  4.确定遍历顺序
  5.举例推导dp数组  
*/


/* 
  怎样确定状态转移方程？
  1.递归思想明确树形思维模型：找到问题终点，思考倒退的姿势，可以帮助你更快速地明确状态间的关系
  2.结合记忆化搜索，明确状态转移方程；
  3.递归代码转化为迭代表达。
*/

/** 322. 零钱兑换  https://leetcode.cn/problems/coin-change/
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
/*  
  零钱兑换解题思路：
  f（c）为总额为c时的最小硬币数;c为总额；cn为任意可拿走的硬币面额;
  f（c)等于从总额c-cn的最小硬币+1
  状态转移方程：
    f(c) = Math.min(f(c-c1) +1, f(c-c2) +1,...,f(c-cn) +1）
  初始化状态：
    f(0) = 0
*/
var coinChange = function(coins, amount) {
  // 缓存结果
    let fn = []
    fn[0] = 0
    for(let i = 1 ; i<= amount; i++){
      // 遍历累加总额
      // 初始化硬币总数
      fn[i] = Infinity
     for(let j =0 ; j<coins.length; j++ ){
      // 遍历硬币面额
      if(i - coins[j]>=0){
        // 如果总额大于当前面额，则取最小值
        fn[i] = Math.min(fn[i],fn[i - coins[j]] + 1)
      }
     }
    }
    return  fn[amount] === Infinity? -1: fn[amount]
}; 
/* 
  01背包模型:
  1.每个物品的数量只有一个；
  2.每个物品最多只能选择一次；
  问题描述：
    有 n 件物品，物品体积用一个名为 w 的数组存起来，物品的价值用一个名为 value 的数组存起来；
    每件物品的体积用 w[i] 来表示，每件物品的价值用 value[i] 来表示。
    现在有一个容量为 c 的背包，问你如何选取物品放入背包，才能使得背包内的物品总价值最大？

  解题思路：
  1.不是所有的物品都放在了背包里面，背包不一定恰好装满；
  2.逐渐增加背包容量时；遍历物品的容量，物品可能在背包内（影响总价值），可能不在背包内（不影响总价值）；
  3.状态转移方程：
    f(i，c)为总物品个数为i；背包容量为c时，能得到的最大价值；
    f（i-1,c)为当拿掉所有物品中的一个物品，且此物品不在背包内的最大价值；
    f（i-1,c-w[i])为当拿掉所有物品中的一个物品，且此物品不在背包内的最大价值；
  f（i,c）= Math.max(f（i-1,c),f（i-1,c-w[i])+value[i]）
  初始化状态:
    当物品总数为0时，f(0，c) = 0 
    当背包容量总数为0时，f(i，0) = 0
*/

function testWeightBagProblem (weight, value, size) {
  // 定义 dp 数组
  // 数组初始化
  const len = weight.length,
        dp = Array(len + 1).fill().map(() => Array(size + 1).fill(0));

  // i 为物品数量；j为背包容量
  for (let j = weight[0]; j <= size; j++) {
    // 若背包有容量；初始化背包的
    dp[1][j] = value[0];
}
// 遍历增加物品数量和背包容量
  for(let i = 1 ; i <=len;i++ ){
    for(let j =0 ; j <=size;j++ ){
      if(j>=weight[i]){
        // 如果当前背包的容量大于物品的重量；则该物品可放入在背包内
        dp[i][j] = Math.max(dp[i-1][j],dp[i-1][j - weight[i]] + value[i])
      }else{
        // 如果当前背包的容量小于物品的重量；则该物品可没有放入在背包内；最大价值和前一个最大价值一样
        dp[i][j] = dp[i-1][j]
      }
    }
  }
  console.table(dp)
  return dp[len][size]
}

function test () {
  console.log(testWeightBagProblem([1, 3, 4, 5], [15, 20, 30, 55], 6));
}

test();
