const arr1 =[1,2,3,5,6,6,6,4,4,6,7,1,2,4]

// for循环遍历去重  时间复杂度：O(n)=n*n
function unique(arr){
  console.time('unique');
  const res =[]
  if(arr.length){
    for(let i = 0;i<arr.length;i++){
      let sameFlag = false
      for(let j = 0;j<res.length;j++){
        if(arr[i] === res[j]){
          sameFlag = true
        }
      }
      if(!sameFlag){
        res.push(arr[i])
      }
    }
  }
  console.log('----------');
  console.timeEnd('unique');
  return res
}

// for循环+indexOf 时间复杂度：O(n)=n*n
function unique1(arr){
  console.time('unique1');
  const res =[]
  if(arr.length){
    for(let i = 0;i<arr.length;i++){
      let sameFlag = false
      if(res.indexOf(arr[i])== -1){
        res.push(arr[i])
      }
    }
  }
  console.log('----------');
  console.timeEnd('unique1');
  return res
}
// 先排序再遍历 时间复杂度：O(n)=n
function unique3(arr){
  console.time('unique3');
  const res = []
  // concat.concat()是浅拷贝；
  // sort返回的排序后的原数组；会影响原数组
  const sorted = arr.concat().sort()
  // 比较相邻的两个数若是否重复
  let prev
  for (let i =0;i<sorted.length;i++){
    if(!i||prev!== sorted[i]){
      res.push(sorted[i])
    }
    prev = sorted[i]
  }
  console.timeEnd('unique3')
  return res
 
}
// es6 set
function unique4(arr){
  return [...new Set(arr)]
}
// es6 map
function unique5(arr){
  const res = new Map()
  return arr.filter(item=>!res.has(item)&&res.set(item,1))
}
// 根据是否需要排序,是否去掉字母重复的大小写
function unique7(array, isSorted, iteratee) {
  var res = [];
  var seen = [];
  for (var i = 0, len = array.length; i < len; i++) {
      var value = array[i];
      var computed = iteratee ? iteratee(value, i, array) : value;
      // 我觉得这里有点问题
     // 如果不做修改的话，一个排序过的数组，传不传入 iteratee 方法，对运行结果没啥影响啊。
      if (isSorted) {
        if (!i || seen !== computed) {
            res.push(computed)
        }
        seen = computed;
    }
      else if (iteratee) {
          if (seen.indexOf(computed) === -1) {
              seen.push(computed);
              res.push(value);
          }
      }
      else if (res.indexOf(value) === -1) {
          res.push(value);
      }        
  }
  return res;
}
var arr = ['A','a',1].sort();//按数字字母排序 => [1, "A", "a"]
console.log(unique7(arr,true,function(item){
  return typeof item == 'string' ? item.toLowerCase() : item
}));
// 使用键值对去重,
function unique8(arr){
  const obj ={}
  return arr.filter(item=>obj.hasOwnProperty(typeof item + JSON.stringify(item))?false: ((obj[typeof item + JSON.stringify(item)] = true)))
}

// 字符串和数字一起去重
const arr2 = [1,'2',3,2,1,1,'2','1',3,4,5]
//[1, 2, 3, 5,6, 4, 7]
console.log(unique(arr1));
console.log(unique1(arr1));
console.log(unique3(arr1));
console.log(unique4(arr1));
console.log(unique5(arr1));
// [1,'2',3,2,1,1,'2','1',3,4,5]
console.log(unique(arr2));
console.log(unique1(arr2));
console.log(unique3(arr2));
console.log(unique4(arr2));
console.log(unique5(arr2));
console.log(unique8(arr2));

// 区分两个对象- 使用对象存储；键名为：JSON,stringfy()；不适合正则；应为任何正则JSON,stringfy后都为{}
function unique6(arr){
  const obj = {}
  return arr.filter(item=>!obj[typeof item+JSON.stringify(item)] && (obj[typeof item+JSON.stringify(item)]= true))
}
const arr3 = [{a:1},{a:1},{b:3},{d:1}]
console.log(unique6(arr3))

// 特殊类型的比较
var array4 = [1, '1', '1', 1,null, null, 1,undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];

var str1 = '1';
var str2 = new String('1');

console.log(str1 == str2); // true
console.log(str1 === str2); // false

console.log(null == null); // true
console.log(null === null); // true

console.log(undefined == undefined); // true
console.log(undefined === undefined); // true

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(/a/ == /a/); // false
console.log(/a/ === /a/); // false

console.log({} == {}); // false
console.log({} === {}); // false

var array4 = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN,{},/b/];
console.log(unique(array4));// for循环：[1,'1',null,undefined,String,String,/a/,/a/,NaN,NaN] 
console.log(unique1(array4));//indecOf:比较使用的是=== ：[1,'1',null,undefined,String,String,/a/,/a/,NaN,NaN] 
console.log(unique3(array4));//sort()排序的结果不一定,保证排序结果需要传入compareFn： [/a/,/a/,1,'1',1,String,Strin,NaN,NaN,undefined]
console.log(unique4(array4));//Set: [1,'1',null,undefined,String,String,/a/,/a/,NaN]
console.log(unique5(array4));//Map: [1,'1',null,undefined,String,String,/a/,/a/,NaN,NaN]
console.log(unique6(array4))// [ 1, '1', [String: '1'], /a/ ]
console.log(unique8(array4))//使用对象键值对的方式可以区分:null,NaN;JSON.stringfy()不能区分正则;[ 1, '1', null, undefined, {},[String: '1'], /a/, NaN ]
// console.log(JSON.stringfy(/a/)) //{}
// console.log(JSON.stringfy(/b/)) //{}


/* 
  总结:
  1.区分undefined,null,NaN,1,'1'等可用对象键值对的方式;使用typeof item +JSON.stringfy(item)作为键;
  2.可将数字先排序,后再for循环比较相邻两个数据项,去重;sort函数方法排序结果不准确;

*/

const tar = [1,2,3,1,2,1,2,1,'1',1]
console.log(unique3(tar));
