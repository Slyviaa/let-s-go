/* 
  工厂模式的特点:分离出变与不变的内容，将创建对象的过程单独封装；只需传参，不关注具体的实现，就能拿到实例结果；
*/

/* 
  例如根据职位分配工作内容
*/
// 创建
function User(name , age, career, work){
  this.name = name
  this.age = age
  this.career = career
  this.work = work
}
// 将职位与工作内容的分配抽离出来，封装为根据职位分配工作的简单工厂
function Factory(name, age, career){
  let work
  switch(career){
    case 'coder':
      work =['coding','debug']
      break;
    case 'pm':
      work =['ppt','plan']
      break;
    case 'hr':
      work =['hire','plan']
      break;
  }
  return new User(name , age, career, work)
}

/* 
  总结：将创建对象的过程单独封装，这样的操作就是工厂模式；
  使用场景：有构造函数的地方，写了大量构造函数、调用了大量的 new的地方可考虑使用工程模式封装
*/