/**
 * 141 环形链表
 * 如何证明有环？给每个结点一个flag，如果遍历再次遍历到这个flag，则证明有环；这个结点第一次被访问，则说明这个结点时环的起点
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  while (head) {
    if (head.flag) {
      // 如果有环，则这个第一个有flag的地方；则是环的起点；
      return true
    } else {
      head.flag = true
      head = head.next
    }
  }
  return false
};

// 142. 环形链表 II
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  while (head) {
    if (head.flag) {
      // 如果一个结点是环形链表成环的起点，那么它一定是第一个被发现 flag 标志已存在的结点：
      return head
    } else {
      head.flag = true
      head = head.next
    }
  }
  return null
};

// 142. 环形链表 II---快慢指针法
// 快指针每次走2步；慢指针每次走1步；则快指针总路程2t，慢指针t;若环的长度为s;则2t-t = s成立时则可以实现；
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  if (!head || !head.next) return null
  let fast = head.next.next
  let slow = head.next
  while (fast&& fast.next) {
    if (slow === fast) {
      // 如果快慢指针指向同一个结点；则证明有环；下一步则找环的起点在哪
      slow = head
      while(fast!== slow){
        // 让slow从头结点出发，slow和fast每次只移一步；slow和fast相遇的结点就是起点
        slow = slow.next
        fast = fast.next
      }
      return slow
    } 
    slow = slow.next
    fast = fast.next.next
  }
  return null
};