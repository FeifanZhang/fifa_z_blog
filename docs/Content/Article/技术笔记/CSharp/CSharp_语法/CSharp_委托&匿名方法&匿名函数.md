# 委托简介
* 委托是一种特殊类型，初始化时，需要一个方法支持
* 应用场景：多个方法的**形参与返回值一致**时，可用委托对这些方法进行统一调用
* 意义：当程序的上下文是固定的，仅在某个关键的部分，不确定调用哪个函数，这时候需要让程序更换被调用函数，又不想两个函数耦合性太高，使用委托可实现间接调用，或者可替换调用
* 优点：增强代码重用性，调用者与目标解耦
* 应用限制：**委托的形参和返回类型**与**所有被委托方法**的形参和返回类型一致

# 简单示例
```cs
public class Program
{
    delegate int Transformer(int x);  // 创建委托

    static int Square (int x) => x * x;  // 创建一个参数和返回类型与委托一致的函数

    static void Main()
    {
        Transformer t = Square;  // 创建委托示例（将函数给到委托变量）

        int res = t(3);  // 执行委托（委托调用函数） 

        Console.WriteLine(res);  // by the way res is 9
    }
}
```

# 多播委托
* 定义：一个委托引用一组目标方法
* 所有**委托实例**都具有多播能力
```cs
public class Program
{
    delegate string SayHi(string name);  // 创建委托

    // 被委托的函数
    public void sayHiInChinese(string name) {return $"你好 {name}";}

    public void sayHiInEng(string name) {return $"Hello {name}";}

    public void sayHiInThaiLand(string name) {return $"sa wa di ka {name}";}

    static void Main()
    {
        SayHi hi = sayHiInChinese; 
        // 委托会按照轮播的顺序，对函数进行调用 += 是添加轮播；-=是删除轮播

        // 添加轮播
        hi += sayHiInChinese;
        hi += sayHiInEng;
        hi += sayHiInThaiLand;

        // 删除轮播
        hi -= sayHiInThaiLand; 
        var res = hi("fifa");  // res为最后一个委托函数的结果: sa wa di ka fifa
    }
}
```

* **委托是不可变的！** 所以使用`-=`与`+=` 时，相当于创建了新的委托实例，将其赋给当前变量
* 多播委托的返回值，是最后一个被调用方法的`return`，中间函数的返回值会被放弃
* c# 会将委托的`+`、`-`、`+=`、`-=`编译成`System.Delegate`的`Combine`与`Remove`两种方法

# 实例方法和静态方法的委托
* 调用实例方法时，委托的`Target`属性是该方法的**实例对象**
* 调用静态方法时. 委托的`Target`属性是**null**

```cs
public delegate void InstanceDelegate(int x);
class X
{
    public void InstanceProgress(int x) => Console.WriteLine(x);
}

public class Program
{
    static void Main()
    {
        X x = new X();
        // 委托调用实例方法
        InstanceDelegate i = x.InstanceProgress;
        i(99);
        Console.WriteLine(t.Target == x); // true
        Console.WriteLine(p.Method);  // Void InstanceProgress(Int32)
    }
}
```

# 泛型委托
当输入参数的类型不确定时，可以通过泛型委托增强委托的复用性

```csharp
delegate T AddDelegate<T>(T a, T b); 
public int AddInt(int a, int b)
{
    return a + b;
}

public double AddDouble(double a, double b)
{
    return a + b;
}
var addDoubleDel = new AddDelegate<Double>(AddDouble);
var addIntDel = new AddDelegate<Int>(AddInt);
```

# 预定义委托
- 无返回值委托（Action）,最多支持16个重载
    ```csharp
    var action1 = new Action<string>(Show1);
    action1("无返回值委托");
    var action2 = new Action<string, int>(Show2)
    action2("无返回值委托", 1);

    public void Show1(string a){ }

    public void Show2(string a, int b){ }

    ```
- 有返回值的委托（Func），最多支持17个重载，`<typeA, typeB>`中，`typeB`是返回类型
    ```csharp
    var func1 = Func<int, int>(Show1);
    Console.WriteLine(func1());

    public int Show1(int a){ return a; }
    ```

# 委托与接口的比较
* 委托可以实现的，接口也可以实现
* 适用委托而不是接口的情况
  * 需要多播实现的场景（接口只能定义一个方法，无法实现多播）
  * 订阅者需要多次实现该接口

# 委托的兼容性
* 即使两个委托的参数类型、返回结果类型相同，也不能相互赋值
  ```cs
  // D1 D2的委托 参数和返回值一样
  delegate void D1();
  delegate void D2();

  D1 d1 = Method;
  D2 d2 = d1; // 会报错
  ```

* 两个委托实例的目标方法相同，则两个实例相等
  ```cs
  delegate void D();
 
  // 引用了相同的方法 Method
  D d1 = Method;
  D d2 = Method; 

  // 因为d1 d2 都调用了Method 所以两个委托实例相等
  Console.WriteLine(d1 == d2);  // true
  ```

# Event
* Event（事件）通常会有两个角色：**广播者** 和 **订阅者**
* 广播者：包含一个委托字段，广播者通过调用委托来决定何时广播
* 订阅者：
  * 方法目标的接收者，决定何时开始/结束监听（通过`-=` `+=`）
  * 订阅者之间相互独立，不知道其他订阅者的存在
* Event定义：将上述的广播订阅模式进行正式化，实现了**广播者/订阅者**模型，防止订阅者之间相互干扰


# 匿名函数
* 通过 `=>` 表示
    ```cs
    (int a, int b) => a+b;
    (a, b, c) => a + b + c;
    a => a * a;
    () => Math.PI;

    // 多条语句也可以使用lambda方法，语句条数必须为多条且有return
    (a, b)=>{
        // 其他执行语句
        return a + b
    };
    ```

## List中使用匿名函数
* 与 `.Select` 或 `.Where`关键词搭配
* `Select`通过匿名函数将List中每个元素进行处理后，返回一个新的List
  * 匿名函数中带有判断条件，则返回的List<bool>
  * 无判断条件，则为List<obj>
* `Where` 匿名函数中必须有判断语句，返回满足条件的元素对象

  

