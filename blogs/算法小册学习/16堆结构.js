/* 
  完全二叉树：
  1.从第一层到倒数第二层，每一层都是满的，也就是说每一层的结点数都达到了当前层所能达到的最大值
  2.最后一层的结点是从左到右连续排列的，不存在跳跃排列的情况（也就是说这一层的所有结点都集中排列在最左边）。

  结点特征：
  那么对于索引为 n 的结点来说：
    索引为 (n-1)/2 的结点是它的父结点
    索引 2*n+1 的结点是它的左孩子结点
    索为引 2*n+2 的结点是它的右孩子结点
*/

/* 
  堆：完全二叉树的一种特例,分为大顶堆，小顶堆
  大顶堆 ：每个结点的结点值都不小于其左右孩子的结点值，这样的完全二叉树就叫做“大顶堆”；
  小顶堆：每个结点值都不大于其左右孩子的结点值，这样的完全二叉树就叫做“小顶堆
  操作：1.如何取出堆顶元素（删除操作）2.往堆里追加一个元素（插入操作）
*/

/* 
  取出堆顶元素 ：
  重点：取出元素后，如何保持堆的结构
  思路：用最后一个结点的元素代替堆顶元素；向下对比(将当前结点与孩子结点对比) +交换（孩子结点>跟结点的值，则交换两结点的值）
*/
function downHeap(heap,low,high){
  // 入参是堆元素在数组里的索引范围，low表示下界，high表示上界
  let i = low,j = 2*low + 1;
  while(j<=high){
    // 如果右结点大于左结点的值
    if(j+1 <=high & heap[j+1]>heap[j]){
      j += 1
    }
    if(heap[i]<heap[j]){
      // 如果结点小于孩子结点的值；则交换位置
      const temp = heap[i]
      heap[i] = heap[j] 
      heap[j] = temp
      // 更新结点为孩子结点
      i = j
      j = 2*j + 1
    }else{
      // 已经排好序，则跳出
      break
    }

  }
}

/* 
 堆增加一个元素 ：
 思路：
 向上对比(将当前结点与父结点对比) +交换（孩子结点>父结点的值，则交换两结点的值）
*/
function upHeap(heap,low,high){
  // 入参是堆元素在数组里的索引范围，low表示下界，high表示上界
  let i = high,j = Math.floor((i-1)/2);
  while(j>= low){

    if(heap[i]<heap[j]){
      // 如果结点大于父孩子结点的值；则交换位置
      const temp = heap[i]
      heap[i] = heap[j] 
      heap[j] = temp
      // 更新结点为父结点索引
      i = j
      j = Math.floor((i-1)/2)
    }else{
      // 已经排好序，则跳出
      break
    }
  }
}
/* 
  215. 数组中的第K个最大元素
  排序：常见的排序算法，并不能在排序的过程中知道结点的值；需要等元素全部排序完成之后，才能知道所有元素的顺序；
  tip:每当“第k大”或者“第k高“这样的关键字时，就是在暗示你用优先队列/堆结构来做题——这样的手法可以允许我们在不对序列进行完全排序的情况下，找到第 k 个最值。
*/
/**排序实现
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  const sorted = nums.sort((a,b)=>b-a)
  return sorted[k -1]
};

/**堆实现
 * 维护一个长度为k小顶堆（则堆顶元素为最小值）-->遍历（k,nums.length),若元素比堆顶的元素值大，则替换为堆顶的元素，再重排堆顶；若小于则忽略--》遍历完成，则堆顶的元素则为第k大的元素
 * 重点：
 *  1.初始化长度为k小顶堆；
 *  2.维护堆顶元素；
 *  3.更新堆结构；
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest2 = function(nums,k) {
  let heap = []
  let len = nums.length
  let low = 0
  // 创建长度为k的小顶堆
  createUpHeap(k)
  // 更新[k,len-k]的小顶堆
  for(let i = k ; i< len ; i++){
    if(nums[i]>heap[0]){
      heap[0] = nums[i]
      // 堆顶元素替换后，更新小顶堆，保持堆结构
      updateDownHeap(0,k)
    }
  }
  // 取出栈顶元素
  return heap[0]
  // 由堆顶向下更新小顶堆
  function updateDownHeap(low,high){
    let i = low,j = 2*low +1
    while(j<= high){
      // heap[i]为子父结点,heap[j]为左子结点，heap[j+1]为右子结点
      if(j+1 <= high && heap[j+1]<heap[j]){
        // 右结点小于左结点
        j += 1
      }
      if(heap[i]>heap[j]){
        // 如果结点小于孩子结点的值；则交换位置
        const temp = heap[i]
        heap[i] = heap[j]
        heap[j] = temp
        // 更新结点为孩子结点
        i = j
        j = 2*i +1
      }else{
        // 已经排好序，则跳出
        break
      }
    }
  }
  // 创建小顶堆
  function createUpHeap(n){
    for(let i = 0 ; i<n ; i++){
      heap.push(nums[i])
      updateUpHeap(0,i)
    }
  }
  // 更新小顶堆
  function updateUpHeap(low,high){
    let i = high,j = Math.floor((i - 1)/2)
    while(j>= low){
      // heap[i]为子结点,heap[j]为父结点
      if(heap[i]<heap[j]){
        // 如果结点小于孩子结点的值；则交换位置
        const temp = heap[i]
        heap[i] = heap[j]
        heap[j] = temp
        // 更新结点为孩子结点
        i = j
        j = Math.floor((i - 1)/2)
      }else{
        // 已经排好序，则跳出
        break
      }
    }
  }
};

const arr = [2,1]
console.log(findKthLargest2(arr,2))