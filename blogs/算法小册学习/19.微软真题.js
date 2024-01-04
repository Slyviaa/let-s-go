/* 
  5. 最长回文子串 https://leetcode.cn/problems/longest-palindromic-substring/
*/


/**
 * 暴力解法：时间复杂度O(n^3) 
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let maxLength =1
    let indexObj={start:0,end:1}
    for(let i = 0 ; i <s.length ;i++){
      for(let j = i + 1 ; j <=s.length ;j++){
        let sybStr = s.slice(i,j)
        if(isPalindrome(sybStr) && sybStr.length>maxLength){
          maxLength = sybStr.length
          indexObj.start = i
          indexObj.end = j
        }
      }
    }
    return s.slice(indexObj.start, indexObj.end)

    function isPalindrome(str){
      return str === str.split('').reverse().join('')
    }
};
/**
 * 动态规划方法
 * @param {string} s
 * @return {string}
 */
/* 
  分析：由于“最长”，最长的回文子串包含最短的回文子串（最优子结构）;返回的是字符串，所以需要知道字符串的开始和结束的下标值，所以需要用到二维数组

*/
var longestPalindrome = function(s) {
  const len = s.length
  let dp = Array(len).fill().map(() => Array(size + 1).fill(0))
  for(let i = 0 ; i <s.length ;i++){
    for(let j = i + 1 ; j <=s.length ;j++){
      
    }
  }
};
let s =
"ibvjkmpyzsifuxcabqqpahjdeuzaybqsrsmbfplxycsafogotliyvhxjtkrbzqxlyfwujzhkdafhebvsdhkkdbhlhmaoxmbkqiwiusngkbdhlvxdyvnjrzvxmukvdfobzlmvnbnilnsyrgoygfdzjlymhprcpxsnxpcafctikxxybcusgjwmfklkffehbvlhvxfiddznwumxosomfbgxoruoqrhezgsgidgcfzbtdftjxeahriirqgxbhicoxavquhbkaomrroghdnfkknyigsluqebaqrtcwgmlnvmxoagisdmsokeznjsnwpxygjjptvyjjkbmkxvlivinmpnpxgmmorkasebngirckqcawgevljplkkgextudqaodwqmfljljhrujoerycoojwwgtklypicgkyaboqjfivbeqdlonxeidgxsyzugkntoevwfuxovazcyayvwbcqswzhytlmtmrtwpikgacnpkbwgfmpavzyjoxughwhvlsxsgttbcyrlkaarngeoaldsdtjncivhcfsaohmdhgbwkuemcembmlwbwquxfaiukoqvzmgoeppieztdacvwngbkcxknbytvztodbfnjhbtwpjlzuajnlzfmmujhcggpdcwdquutdiubgcvnxvgspmfumeqrofewynizvynavjzkbpkuxxvkjujectdyfwygnfsukvzflcuxxzvxzravzznpxttduajhbsyiywpqunnarabcroljwcbdydagachbobkcvudkoddldaucwruobfylfhyvjuynjrosxczgjwudpxaqwnboxgxybnngxxhibesiaxkicinikzzmonftqkcudlzfzutplbycejmkpxcygsafzkgudy"
console.log(longestPalindrome(s))