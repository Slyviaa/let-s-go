// 栈的实现
class Stack{
  constructor(){
    this.data = []
  }
  push(el){
    this.data.push(el)
  }
  pop(){
    this.data.pop()
  }
  clear(){
    this.data = []
  }
  peek(){
    return this.data[this.data.length -1]
  }
  size(){
    return this.data.length
  }
} 

const s = new Stack()
s.push(1)
s.push(3)
console.log(s.peek())
console.log(s.size())
s.pop()
s.clear()
console.log(s);

// 栈的实现
class Queue{
  constructor(){
    this.data = []
  }
  push(el){
    this.data.push(el)
  }
  pop(){
    this.data.shift()
  }
  clear(){
    this.data = []
  }
  peek(){
    return this.data[this.data.length -1]
  }
  size(){
    return this.data.length
  }
} 
const q = new Queue()
const q1 = new Queue()
q.push(1)
q.push(3)
console.log(q.peek())
console.log(q.size())
q.pop()
// q.clear()
console.log(q,q.data[1]=2);

function ListNode(val){
    this.val = val
    this.next = null
}
var node = new ListNode(1)
var node2 = new ListNode(2)
node.next = node2
// 1,2之间增加节点3
const node3 = new ListNode(3)
node3.next = node.next
node.next = node3

// 删除节点3
node.next = node3.next
console.log('wwww',node)

// 二叉树的数据结构
const treeNode = {
  val:'A',
  left:{
    val:'B',
    left:{
      val:'D'
    },
    right:{
      val:'E'
    }
  },
  right:{
    val:'C',
    left:{
      val:'F'
    },
    right:{
      val:'G'
    }
  }
}

// 先序遍历
function preOrder(root){
  // 边界条件
  if(!root)return 
  console.log('preOrder',root.val)
  preOrder(root.left)
  preOrder(root.right)
}
// 中序遍历
function inOrder(root){
  if(!root)return 
  inOrder(root.left)
  console.log('inOrder',root.val)
  inOrder(root.right)
}

// 后序遍历
function postOrder(root){
  if(!root)return 
  postOrder(root.left)
  postOrder(root.right)
  console.log('postOrder',root.val)
}
console.log('preOrder',preOrder(treeNode))
console.log('inOrder',inOrder(treeNode))
console.log('postOrder',postOrder(treeNode))