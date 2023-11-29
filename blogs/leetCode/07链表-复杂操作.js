/* 
   021. 删除链表的倒数第 N 个结点
    给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
*/
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd1 = function(head, n) {
  let dummyNode = new ListNode()
  dummyNode.next = head
  let len = 0
  let fast = dummyNode
  let slow = dummyNode
  let count = 0
  // 首先快指针获得链表总长度
  while(fast.next){
    len++
    fast = fast.next
  }
  // 倒数第n个，即正数len-n+1个
  while(slow.next&& count <= len - n){
    // 找到正数第len-n + 1个的前驱结点len-n；
    if(count === len - n ){
      // 删掉第len-n+1个结点
      slow.next = slow.next.next
    }else{
      slow = slow.next   
    }
    count++
  }
  return dummyNode.next
};

var removeNthFromEnd2 = function(head, n) {
  let dummyNode = new ListNode()
  dummyNode.next = head
  let fast = dummyNode
  let slow = dummyNode
  // 首先快指针先走n步；
  while(n){
    fast = fast.next
    n--
  }
  // fast快指针走到终点时，fast此时为第len个,此时慢指针走为第len-n结点
  while(fast.next){
      fast = fast.next
      slow = slow.next
  }
  slow.next = slow.next.next
  return dummyNode.next
};

/* 
  206. 反转链表
  给定单链表的头节点 head ，请反转链表，并返回反转后的链表的头节点。
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  if(!head|| !head.next){
    return head
  }
  // cur当前结点，prev前驱结点，next后驱结点;迭代法
  while(cur){
    // 双指针法 当前指针和它的前指针；迭代改变指向
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
    next = cur
  }
 return pre
};
// 反转链表 递归
function reverseSmallNode(head){
  if(!head|| !head.next){
    return head
  }else {
    return recursiveNode(null,head)
  }
}

function recursiveNode(pre,cur){
  if(!cur) return pre
  let next = cur.next
  cur.next = pre
  pre = cur
  cur = next
  return recursiveNode(pre,cur)
}
/* 
  92. 反转链表 II
  反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head,m,n) {
  if(!head|| !head.next || m === n){
    return head
  }
  let dummy = new ListNode()
  dummy.next = head
  let pre = dummy
  let cur = head
  // cur当前结点，prev前驱结点，next后驱结点;
  while(m-1){
    pre = cur
    cur = cur.next
    m--
    n--
  }
  // 开始反转节点的前面一个结点
  let leftNode = pre
  // 开始反转的第一个结点
  let starNode = cur
  while(n){
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
    n--
  }
  // 遍历完后；此时prev指向的是反转的最后一个结点
  starNode.next = cur
  leftNode.next = pre
  return  dummy.next 
};