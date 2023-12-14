/* 
  js的原生排序算法 sort  sort((a,b)=>a-b)
*/
/* 
  排序算法的分类：
    1.基本排序方法：冒泡，插入，选择；
    2.进阶排序方法：归并，快速排序
*/

/* 
  冒泡排序 -----重复比较相邻的两个项
  重点：
    1.将相邻的两个元素比较,若第一个元素比第二个元素大，则交换位置；
    2.完成一次遍历；每次都有一个最大的元素冒到数组的最后面
  时间复杂度：  O(n^2) ,最好的情况下为O(n),即数组本身即有序
  空间复杂度：O（1）
 */
function bubbleSort(nums){
  for(let i = 0 ; i<nums.length ; i++){
    // 标志元素是否交换过位置
    let flag = false
    for(let j = 0 ; j<nums.length - i -1 ; j++){
      // 后几个元素已经为有序的，不需要再遍历
      if(nums[j]>nums[j+1]){
        flag = true
        const temp = nums[j]
        nums[j] = nums[j+1]
        nums[j+1] = temp
      }
    }
    // 若元素遍历一遍，一次也没有交换过位置；说明元素本身即有序；直接返回
    if(!flag)return nums
  }
  return nums
}

/* 
  选择排序 --- 得出最小值
  重点：
    1.循环遍历数组，每次都找出当前范围内的最小值，把它放在当前范围的头部；
    2.缩小排序范围，继续重复以上操作，直至数组完全有序为止。
  时间复杂度： O(n^2) 内层循环每次都要走
*/
function slectSort(nums){
  const len = nums.length
  for(let i = 0 ; i<len ; i++){
    let minIndex = i
    // 
    for(let j = i ; j<len ; j++){
      // 后几个元素已经为有序的，不需要再遍历
      if(nums[j]<nums[minIndex]){
        minIndex = j
      }
    }
    // 遍历一次得到最小值的下标minIndex
    if(i!== minIndex){
      var temp = nums[minIndex]
      nums[minIndex] = nums[i]
      nums[i] = temp
    }
  }
  return nums
}


/* 
插入排序----找到元素在它前面那个序列中的正确位置
  重点：
    1.通过正确地定位当前元素在有序序列里的位置；
    2.不断扩大有序数组的范围，最终达到完全排序的目的。
  时间复杂度：
    最好情况O(n):全为正序
    最坏O(n^2):全为逆序
*/

function insertSort(nums){
  const len = nums.length
  for(let i = 1 ; i<len ; i++){
    // 待插入元素
    let temp = nums[i]
    let j = i
    // 如果前一个元素大于当前元素；则temp需要插入有序序列；
    // 从有序序列最后位置往前遍历；
    // 当temp值小于nums[j]的时候；则证明目标位置仍在序列的前面；将元素往后移；为目标值腾位置
    // 当temp值不小于nums[j]的时候；则此时的j就是插入元素的最终位置
    while(j>0 && nums[j-1]>temp){
      // 将元素往后移一位
      nums[j] = nums[j-1]
      j--
    }
    // 将待插入元素放入空出的位置
    nums[j] = temp
  }
  return nums
}



/* 
  进阶排序算法：归并和快速排序
*/
/* 
  分治思想：将一个大问题分成几个小问题分别求解；之后再整合小问题的解整合为大问题的解
  分支步骤：
    1.分解小问题；
    2.求解小问题
    3.整合小问题的解
*/

/* 
  归并排序：分治思想
    分解小问题：将数组一分为二；再将子数组再一分为二,直到数组的长度为1；
    求解小问题：从粒度最小的子数组开始，两两合并、确保每次合并出来的数组都是有序的。（这里的“子问题”指的就是对每个子数组进行排序）。
    合并子问题的解，得出大问题的解：当数组被合并至原有的规模时，就得到了一个完全排序的数
  重点：拆分数组；合并有序数组；重复,递归回溯
  复杂度：O(nlog(n))
    切分的复杂度：n次切分为log(n);每次切分的时间复杂度为O（1）；
    合并的复杂度：单次合并的复杂为O(n)
    所以总得复杂度为：切分的复杂度*合并的复杂度
*/
function mergeSort(nums){
  const len = nums.length
  if(len<=1){
    return nums
  }
  let mid = Math.floor(len/2)
  // 递归分割数组
  let leftArr = mergeSort(nums.slice(0,mid))
  let rightArr = mergeSort(nums.slice(mid,len))
  // 合并数组
  nums = mergeArr(leftArr,rightArr)
  return nums

  // 合并有序数组
  function mergeArr(nums1,nums2){
      // 初始化两个指针，分别指向 arr1 和 arr2
      let i = 0, j = 0   
      // 初始化结果数组
      const res = []    
      // 缓存arr1的长度
      const len1 = nums1.length  
      // 缓存arr2的长度
      const len2 = nums2.length  
      // 合并两个子数组
      while(i < len1 && j < len2) {
          if(nums1[i] < nums2[j]) {
              res.push(nums1[i])
              i++
          } else {
              res.push(nums2[j])
              j++
          }
      }
      // 若其中一个子数组首先被合并完全，则直接拼接另一个子数组的剩余部分
      if(i<len1) {
          return res.concat(nums1.slice(i))
      } else {
          return res.concat(nums2.slice(j))
      }
  }
}

/* 
  快速排序：
    分治思想,和归并排序不一样的是，快速排序并不会把真的数组分割开来再合并到一个新数组中去，而是直接找一个基准值；在原有的数组内部进行排；
    最好时间复杂度：每次选择的基准值刚好为当前子数组的中间数。这时，可以确保每一次分割都能将数组分为两半，进而只需要递归 log(n) 次 O(nlog(n))。
    最坏时间复杂度：每次划分取到的都是当前数组中的最大值/最小值。大家可以尝试把这种情况代入快排的思路中，你会发现此时快排已经退化为了冒泡排序，对应的时间复杂度是 O(n^2)。
    平均时间复杂度： O(nlog(n))
*/
function quickSort(nums,left = 0 , right = nums.length -1){
  // 数组长度大于1则继续分割
  if(nums.length>1){
    // basicIndex为下一次划分的基准值的下标
    const basicIndex = partition(nums,left,right)

    if(left<basicIndex -1){
      // 左子数组已（0，basicIndex -1）
      quickSort(nums,left,basicIndex -1)
    }
    if(right>basicIndex){
      // 右子数组以（basicIndex,right）
      quickSort(nums,basicIndex,right)
    }
  }
  return nums

  //以基准值左右排序
  function partition(nums,left,right){
    // 默认取中间元素为基准值
    let curBasicIndex = Math.floor(left+(right -left)/2)
    while(left<= right){
        while(nums[left]< nums[curBasicIndex]){
          // 左子数组如果一直小于基准值；左指针右移
          left++
        }
        while(nums[right]> nums[curBasicIndex]){
          // 右子数组如果一直小于基准值；右指针左移
          right--
        }

        if(left <= right){
          // left < right左右指针没有相遇；说明左边有比基准值大的元素，右边有比左基准值小的元素；
          //交换两边元素的值
          // if(left!== right){
            const temp = nums[left]
            nums[left] = nums[right]
            nums[right] = temp
          // }
          // 左右指针都移动
          left++
          right--
        }
    }
    return left
  }
}

const arr = [5, 3, 2, 4, 1]
// console.log(bubbleSort(arr))
// console.log(slectSort(arr))
// console.log(mergeSort(arr))
console.log(quickSort(arr))