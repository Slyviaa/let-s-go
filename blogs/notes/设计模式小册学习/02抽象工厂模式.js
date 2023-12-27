/* 
  开放封闭原则的内容：对拓展开放，对修改封闭。说得更准确点，软件实体（类、模块、函数）可以扩展，但是不可修改
*/

/* 
  简单工厂模式与抽象工厂模式的：
    1.都尝试分离变与不变的部分；区别在与场景复杂度不同；
    2.简单工厂模式处理的是简单的类；共性可以简单分离的类；所以逻辑比较简单，不要求代码可拓展性；
    3.抽象工厂处理的是复杂的类，每个类不仅有很多细分的类别，而且还有很多变化的拓展可能；
      所以需要对共性做处理，使用抽象类去降低维护扩展的成本，同时需要对类的性质做划分。
*/

/* 
  抽象工厂类的关键角色：
  1.抽象工厂（抽象类，它不能被用于生成具体实例）： 
      用于声明最终目标产品的共性。在一个系统里，抽象工厂可以有多个（大家可以想象我们的手机厂后来被一个更大的厂收购了，
      这个厂里除了手机抽象类，还有平板、游戏机抽象类等等），每一个抽象工厂对应的这一类的产品，被称为“产品族”。
  2.具体工厂（用于生成产品族里的一个具体的产品）： 
      继承自抽象工厂、实现了抽象工厂里声明的那些方法，用于创建具体的产品的类。
  3.抽象产品（抽象类，它不能被用于生成具体实例）： 
      上面我们看到，具体工厂里实现的接口，会依赖一些类，这些类对应到各种各样的具体的细粒度产品（比如操作系统、硬件等）
      ，这些具体产品类的共性各自抽离，便对应到了各自的抽象产品类。
  4.具体产品（用于生成产品族里的一个具体的产品所依赖的更细粒度的产品）： 
    比如我们上文中具体的一种操作系统、或具体的一种硬件等。
*/

// es6类模拟实现抽象工厂 手机 = 硬件+软件
// 抽象工厂类
class MobilePhoneFactory {
  // 提供操作系统的接口
  createOS(){
      throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
  // 提供硬件的接口
  createHardWare(){
      throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
}

// 具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {
  createOS() {
      // 提供安卓系统实例
      return new AndroidOS()
  }
  createHardWare() {
      // 提供高通硬件实例
      return new QualcommHardWare()
  }
}

// 定义操作系统这类产品的抽象产品类
class OS {
  controlHardWare() {
      throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
  }
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
  controlHardWare() {
      console.log('我会用安卓的方式去操作硬件')
  }
}

class AppleOS extends OS {
  controlHardWare() {
      console.log('我会用🍎的方式去操作硬件')
  }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
  // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
  operateByOrder() {
      throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
  }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
  operateByOrder() {
      console.log('我会用高通的方式去运转')
  }
}

class MiWare extends HardWare {
  operateByOrder() {
      console.log('我会用小米的方式去运转')
  }
}



