/* 
  21. 合并两个有序链表
*/
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 * 输入：l1 = [1,2,4], l2 = [1,3,4]输出：[1,1,2,3,4,4]
 * 输入：l1 = [], l2 = []输出：[]
 * 输入：l1 = [], l2 = [0]输出：[0]
 * 时间复杂度：O(n)，其中 n 是链表的长度。
   空间复杂度：O(1)
 */
var mergeTwoLists = function(list1, list2) {
  // 定义头节点,让链表可以访问
  let head = new ListNode()
  let cur  = head
  while(list1&& list2){
    if(list1.val<=list2.val){
      cur.next = list1
      list1 = list1.next
    }else{
      cur.next = list2
      list2 = list2.next
    }
    cur = cur.next 
  }
  // 若两个链表长度相等,则cur.next指向null
  // 若两个链表长度不相等,则cur.next指向剩余的那个链表
  // 若两个链表长度都为空,则cur.next指向null
  cur.next = list1!== null ?list2:list1
  return head.next
};

/*  
  83. 删除排序链表中的重复元素
  时间复杂度：O(n)，其中 n 是链表的长度。
  空间复杂度：O(1)
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  let cur = head
  while(cur && cur.next){
    if( cur.val === cur.next.val){
    // 删除cur.next结点
      cur.next = cur.next.next
    }else{
      cur = cur.next
    }
  }
  //题目给定头指针，则返回head;否则自己定义的head则返回head.next
  return head  
};

/*  
  82.删除排序链表中的重复元素 II  
  时间复杂度：O(n)，其中 n 是链表的长度。
  空间复杂度：O(1)
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  if(!head || !head.next){
    return head
  }
  // 删掉重复的元素，所以要找到前驱结点；
  // 新增一个节点，保证链表一直都有前驱结点
  let dummyNode = new ListNode()
  dummyNode.next = head
  let cur = dummyNode
  // 因为dummynode指向head，所以从head开始遍历；
  // 遍历链表
  while(cur.next && cur.next.next){
    if(cur.next.val === cur.next.next.val){
      let val = cur.next.val
      // 记住重复的点，遍历之后的链表
      while(cur.next&& cur.next.val ===val ){
        cur.next = cur.next.next
      }
    }else{
      cur = cur.next
    }
  }
  return dummyNode.next
};