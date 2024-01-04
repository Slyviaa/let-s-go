/* 
  单例模式：保证一个类只有一个实例，并提供全局的访问点。
  实现：怎样保证只有一个实例？只需要提供方法，判断类是否已经创建过一个实例；若是，则返回创建的实例，否则新创建返回；
*/

class SingleInstance{
  show(){
    console.log('show')
  }
  static getInstance(){
    // 判断有无实例
    if(!SingleInstance.instance){
      SingleInstance.instance = new SingleInstance()
    }
    // 判断唯一唯一实例
    return SingleInstance.instance
  }
}

const s1 = SingleInstance.getInstance()
const s2 = SingleInstance.getInstance()
console.log(s1=== s2) //true 同一个实例对象

/* 
  vuex中的单例模式思想：

  vuex的假单例行为；vuex源码中的Store类并没有判断Store是否构建过实例的方法；若new 多个Store实例；它们都是不同的；
  是通过vue的其他方法确保一个vue应用类只会实例化Store一次：
    vue install()函数通过拦截 Vue.use(Vuex) 的多次调用，保证了在同一个Vue应用只会安装唯一的一个Vuex实例；
    而 vuexInit() 函数则保证了同一个Vue应用只会被挂载唯一一个Store；

  在全局范围内，Vuex 中的 Store 并不一定是唯一的。因为在同一个页面中，我们可以使用多个 Vue 应用，每个 Vue 应用都可以拥有自己的 Store 实例。
  这也解释了为什么Vuex没有将单例逻辑放在Store 类中去实现，而是将其解构到了 install 函数里。
  
  $store实例在 Vue 组件树中是被层层继承下来的——当子组件自身不具备 $store 时，会查找父组件的 $store 并继承。
  这样，整个 Vue 组件树中的所有组件都会访问到同一个 Store 实例——那就是根组件的Store实例。

*/
const store1 = new Vuex.Store()
const store2 = new Vuex.Store()
console.log(store1 === store2) //false

// 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
// 静态方法版
class Storage{
  static getInstance(){
    if(!Storage.instance){
      Storage.instance = new Storage()
    }
    // 判断唯一唯一实例
    return Storage.instance
  }
  setItem(key,value){
    return localStorage.setItem(key,value)
  }
  getItem(key){
    return localStorage.getItem(key)
  }
}

/* 
  闭包版
*/


function Storage(){

}
Storage.getInstance =(function(){
  if(!Storage.instance){
    Storage.instance = new Storage()
  }
  // 判断唯一唯一实例
  return Storage.instance
})()

Storage.prototype.setItem = (key,value)=>{
  return localStorage.setItem(key,value)
}
Storage.prototype.getItem = (key)=>{
  return localStorage.getItem(key)
}

// 实现一个全局唯一的Modal弹框


