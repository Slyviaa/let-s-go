// 判断是否是回文
// 反转字符串
function isPalindrome(str){
  const revertStr = str.split('').reverse().join('')
  return revertStr=== str
}
// 根据对称性，判断是否为回文
function isPalindrome2(str){
  const len = str.length
  for(let i= 0; i<len/2;i++){
    if(str[i]!== str[len - i -1]) return false
  }
  return true
}
const str = 'aabbabbaa'
// console.log(isPalindrome(str))
// console.log(isPalindrome2(str))

/* 
  给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
*/
function validPalindrome(str){
    let left = 0
    let right = str.length - 1
    while(left<right ){
      if(str[left]=== str[right]){
        left++
        right--
      }else{
        return isPalindrome(left,right -1) || isPalindrome(left+1,right)
      }
    }
    function isPalindrome(i,j){
      while(i<j){
        if(str[i]!== str[j]) return false
        i++
        j--
      }
      return true 
    }
    return true
}
const str2 = 'abc'
console.log(validPalindrome(str2))

/* 
  211. 添加与搜索单词 - 数据结构设计
  真题描述： 设计一个支持以下两种操作的数据结构：
  void addWord(word)
  bool search(word)
  search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
  . 可以表示任何一个字母。
*/
function WordDictionary (){
  this.strMap = {}
  this.addWord = function(str){
    let addStr = str.trimStart()
    if(this.strMap[addStr.length]){
      this.strMap[addStr.length].push(addStr)
    }else{
      this.strMap[addStr.length] =[addStr]
    }
    console.log(22222,this.strMap);
  }
  this.search = function(str){
    let searchStr = str.trimStart()
    if(!this.strMap[searchStr.length]){
      return false
    }
    if(searchStr.includes('.')){
      let regex = new RegExp(searchStr)
      return this.strMap[searchStr.length].some(item=>regex.test(item))
    }else{
      return this.strMap[searchStr.length].includes(searchStr)
    }
  }
}
const wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
console.log(wordDictionary.search("pad")) // 返回 False
console.log(wordDictionary.search("bad"))
console.log(wordDictionary.search("ad"))
console.log(wordDictionary.search("b.."))

/* 力扣：8
  8. 字符串转换整数 (atoi)
  字符串以数字开头和结尾正则： /^\d(.*\d)?$/ 
*/
function atoi(str){
  const reg = /\s*([-\+]?[0-9]*).*/
  const maxNum = Math.pow(2,31) -1
  const minNum = -maxNum -1
  let numStr = str.match(reg)
  let targetNum = 0 
  if(numStr){
    targetNum = +numStr[1]
    if(Number.isNaN(targetNum)){
      targetNum = 0 
    }
    if(targetNum>maxNum ){
      targetNum = maxNum
    }else if(targetNum<minNum){
      targetNum = minNum
    }
  }
  return targetNum

}