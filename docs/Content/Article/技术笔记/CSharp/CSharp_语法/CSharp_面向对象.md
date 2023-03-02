# namespace
* 相当于Python的module，通过using 引入namespace，当两个类名称一样时，通过namespace进行区分

## 举例
* 有两个namespace如下图所示
    ```cs
    namespace demo1{
        class Adapter{

        }

        class Generate{

        }
    }

    namespace demo2{
        class Adapter{

        }

        class Generate1{

        }
    }
    ```
* 在其他文件中调用
    ```cs
    // 首先引入namespace
    using demo1;
    using demo2;

    namespace demo{
        class Program{
            static void Main(){
                // demo1与demo2中存在Adapter同名class时，实例化该类需要加namespace
                demo1.Adapter adt = new demo1.Adapter();
                demo2.Adapter adt1 = new demo2.Adapter();

                // 不存在同名class，直接使用类名即可
                demo1.Generate gen = new Generate();
            }
        }
    }
    ```

## namespace嵌套
* 有两个namespace如下图所示
    ```cs
    namespace demo1{
        namespace demo12{
            class Adapter{

            }
        }
    }

    ```
* 在其他文件中调用
    ```cs
    // 首先引入namespace
    using demo1.demo12; //namespace1.namespace2

    namespace demo{
        class Program{
            static void Main(){
                Adapter adt = new Adapter();
            }
        }
    }
    ```
## 常用namespace
    ```cs
    using System; //包含定义数据类型，事件，事件处理的基本类型，创建项目时自带
    using System.Data; //数据访问功能的命名空间和类，与数据库有关
    using System.IO; //数据流与读写相关功能的类
    using Windows.Forms; // windows开发的窗体类
    using System.Web; //网站开发相关命名空间 & 类
    ```

# 类
## 类库
* 类库是可重用的若干类型的集合，包含接口，抽象类和具体类等。注意：类库不等于框架（Framework），框架是类库的集合。编译后生成DLL文件，多个项目对其进行引用
* 使用方法：
  * 选择类库 -> 右键选择生成 -> 生成成功，默认路径为类库下`\bin\debug`
  * 在其他项目中，右侧`资源管理器` ->`引用` -> 添加引用 -> 选择类库生成的dll文件
  * `using`关键词导入至文件后，即可使用

## 类声明
* 具体可参照函数修饰符
* 子类的修饰符与父类保持一致
* `class`关键词不添加修饰符时，默认为`internal`
    ```cs
    internal class Demo1{  // 仅在该程序集中使用

        ...;
    }

    public class Demo2{  // 在外部可以调用

    }

    static class Demo3{  // 类中的属性 & 方法不需要实例化直接调用，类内部方法必须为静态方法
        ...;
    }

    class Demo{  // 不加类权限默认为私有类 internal
        ...;
    }
    ```

## 类属性声明
* 大驼峰命名
* 添加 `get` or `set`关键字, set表示可以给属性赋值，get表示可以获取属性值
    ```cs
    public class Demo{
        // 以下为自动属性，必须带有get
        public string Name {get; set;}  // 可以获取 也可以赋值

        public string NickName {get; set;}  // 可以获取 也可以赋值

        public int Height {get;} // 只能获取，不可赋值

        public int age{get;}  // 只能赋值，不可获取

        
        public void Eat() {
            MessageBox.Show("eating");
        }
        public void Sleep()
        {
            MessageBox.Show("sleeping");
        }
        public void Run()
        {
            MessageBox.Show("running");
        }
    }

    // 转换到调用类的文件中
    static void Main()
    {
        Demo demo = new Demo();  // 实例化
        demo.Run();
        demo.Eat();
        demo.Sleep();

        //通过初始化器进行初始化（即给属性赋值）
         Demo demo = new Demo(){
             Name = "Tom",
             NickName = "FIFA"
         };  // 实例化
        demo.Run();
        demo.Eat();
        demo.Sleep();
    }
    ```

## 继承
### 子类重写父类方法
* 被重写的父类方法：
- 必须是`protected` 或 `public`方法
- 必须通过`virtual`修饰该方法
    ```csharp
    public class A
    {
        // 声明虚方法使得该方法可被重写
        public virtual void MethodA()
        {

        }
    }

    public class B: A
    {
        // 重写 MethodA方法
        public override void MethodA()
        {
            base.MethodA();  // 调用父类方法
        }
    }
    ```

### 构造方法的重写
- 不需要 `virtual`修饰
- 需要通过`base`继承父类构造方法：调用子类构造方法时，会先通过`base`调用父类构造方法初始化，后调用子类构造方法
    ```csharp
    public class A
    {
        int v;
        public A(int v)
        {
            this.v = v;
        }
    }

    public class B: A
    {
        // 重写构造方法
        public B(int v): base(v)
        {
            // 通过base.v调用父类属性
            base.v = v > 0 ? v : 0;
        }
    }
    ```

### 子类构造函数参数与父类不同
- 父类需要如下参数初始化：`int a, int b, string c`；但在子类中，`int b`默认为2，仅需初始化`int a & string c`

```csharp
public partial class Father
{
    public FrmFlowApprovalEdit(int a, int b, string c = null)
    {
        
    }
}

public partial class Child : Father
{
    public Child(int a, string c = null ): base(outterA, 2, outterStr)
    {

    }
}
```

## 重载
* 同一个类中，几个方法的**参数名相同**，**返回类型相同**，只是**输入的参数不同**，这些方法互为重载方法
    ```csharp
    public class A
    {
        public string methodA(int a)
        {
            return $"一个参数的methodA";
        }

        public string methodA(int a, int b)
        {
            return "两个参数的MethodA";
        }

        // 调用 methodA
        var res1 = methodA(1, 2); // 两个参数的methodA
        var res2 = methodA(1); // 一个参数的methodA
    }
    ```

## 接口
* 接口用于规范标准，仅负责描述属性，方法，成员，类继承接口后，接口中的所有成员要全部实现不得有遗漏
* 接口的特点：子类类只能有一个父类，但可以继承多个接口
    ```cs
    MyWrite mw = new MyWrite();
    mw.WriteLine();

    internal interface ItfDemo
    {
        //该方法用于输出内容
        void WriteLine();
    }

    class MyWrite : ItfDemo
    {
        // 必须实现所有的接口成员
        public void WriteLine()
        {
            Console.WriteLine("输出文字接口");
            Console.ReadKey();
        }
    }

    class MyWriteRead : ItfDemo, ItfDemo1  // 可继承自多个接口
    {
        // 必须实现两个接口的成员
        public void WriteLine()
        {
            Console.WriteLine("输出文字接口");
            Console.ReadKey();
        }
        
        public void ReadLine()
        {
            Console.WriteLine("输出文字接口");
            Console.ReadKey();
        }
    }
    ```

