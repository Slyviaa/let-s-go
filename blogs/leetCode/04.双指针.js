// 合并两个有序的数组
// 双指针；只使用一次循环；while写法
function combineSortedArr(num1,num2){
  let m = num1.length -1
  let n = num2.length - 1
  let k = num1.length + num2.length - 1
  // 双指针 将num2合并到num1
  while(m>=0 && n>=0) {
    if(num1[m]>num2[n]){
      num1[k]= num1[m]
      m--
      k--
    }else{
      num1[k]= num2[n]
      n--
      k--
    }
  }
  // num1已经遍历完，num2还没有遍历完，则循环将num2剩余的按顺序写入num1;
  // 因为是合并到num1中；所以num1还没有遍历完则不用处理
  while(n>=0){
    num1[k]= num2[n]
    n--
    k--
  }
  return num1
}
// for循环写法
function combineSortedArr2(num1,num2){
  let m = num1.length -1
  let n = num2.length - 1
  let k = num1.length + num2.length - 1
  // 双指针 将num2合并到num1
  for(let k = num1.length + num2.length - 1;k>=0;k--){
    if(m>=0 && n>=0){
      if(num1[m]>num2[n]){
        num1[k]= num1[m]
        m--
      }else{
        num1[k]= num2[n]
        n--
      }
    }else if(n>=0){
      num1[k]= num2[n]
      n--
    }
  }
  return num1
}
const num1=[1,3,3,6]
const num2=[1,1,3,4,7,8]
console.log(combineSortedArr2(num1,num2))

// 三数求和 
/* 真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
注意：答案中不可以包含重复的三元组。 
*/
// 思路：固定一个i；移动left和right两个指针；
function treeSum(num){
  // 升序排序
  const arr = num.sort((a,b)=>a-b)
  console.log('sss',arr);
  let left = 1
  let right = arr.length - 1
  let res =[]
  for(let i =0; i<arr.length;i++){
    if(arr[i]>0){
      return res
    }
    if(i&&arr[i] === arr[i-1]){
      // i(a）去重
      continue
    }
    left = i + 1
    right = arr.length - 1
    while(left< right){
      console.log('RIGHT',arr[i],arr[left],arr[right])
      let sum = arr[i] + arr[left] + arr[right]
      if(sum>0){
        // 右指针后退
        right--
      }else if(sum<0){
        // 做指针前进
        left++
      }else{
        res.push([arr[i],arr[left],arr[right]])
        left++
        right--
        while(left< right&&arr[left] === arr[left+1]){
          // left（b)去重
          left++
        }
        while(left< right&&arr[right] === arr[right-1]){
          // right(c）去重
          right--
        }
       
      }
    }
  }
  return res
}
let nums =  [-1, 0, 1, 2, -1, -4,0,0]
console.log(treeSum(nums))

// 数组，有序，而且要求输出的是值，跟数组中的索引值没有关系；则可以考虑使用双指针法
// 时间复杂度O(n);空间复杂度O（n)