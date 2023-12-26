/* 
  迷宫游戏 ： DFS深度优先遍历实现  从入口开始，选择分叉；一直深入前进；若无路则返回前一个分叉扣，走另外一条路；直到找到出口
*/
function DFS(root) {
  const res = []
  if (!root) {
    return res
  }
  preOrder(root)
  return res
  function preOrder(root) {
    if (!root) return
    res.push(root.val)
    preOrder(root.left)
    preOrder(root.right)
  }
}
/* 
  层次遍历BFS：广度优先 
*/
function BFS(root) {
  const res = []
  if (!root) {
    return res
  }
  const queue = []
  queue.push(root)
  while (queue.length) {
    let top = queue[0]
    res.push(top.val)
    if (top.left) {
      queue.push(top.left)
    }
    if (top.right) {
      queue.push(top.right)
    }
    queue.shift()
  }
  return res
}

const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    right: {
      val: "F"
    }
  }
};

console.log(BFS(root))
console.log(DFS(root))