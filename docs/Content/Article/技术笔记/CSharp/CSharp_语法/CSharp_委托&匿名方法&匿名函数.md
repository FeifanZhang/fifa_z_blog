# 委托简介
* 委托是一种特殊类型，初始化时，需要一个方法支持
* 应用场景：多个方法的**形参与返回值一致**时，可用委托对这些方法进行统一调用
* 意义：当程序的上下文是固定的，仅在某个关键的部分，不确定调用哪个函数，这时候需要让程序更换被调用函数，又不想两个函数耦合性太高，使用委托可实现间接调用，或者可替换调用
* 优点：增强代码重用性
* 应用限制：**委托的形参和返回类型**与**所有被委托方法**的形参和返回类型一致
    ```cs
    // 定义方式：delegate + 返回类型 + 名称 (参数)
    delegate void MyDelegate(string name); //定义委托
    private void Form1_Load(object sender, EventArgs e)
    {

        // 实例化委托（必须传入一个方法，该方法的参数类型和返回类型与定义的委托一致）
        MyDelegate mydel = new MyDelegate(sayChinese);

        // 委托的多播
        // 通过 -= += 管理委托的方法
        mydel += sayEng;
        mydel += sayThaiLand;
        mydel -= sayEng;

        // 两种调用方法，输入参数 c# 会将参数输入委托的方法从而执行
        mydel.Invoke("FIFA!");
        mydel("HIHIHI!);
    }

    // 以下三个被委托的方法，其返回类型 & 参数与委托一致
    public void sayChinese(string name)
    {
        MessageBox.Show("你好" + name);
    }

    public void sayEng(string name)
    {
        MessageBox.Show("hi"+name);
    }

    public void sayThaiLand(string name)
    {
        MessageBox.Show("sa wa di ka" + name);
    }
    ```
# 泛型委托
- 当输入参数的类型不确定时，可以通过泛型委托增强委托的复用性
```csharp
delegate void AddDelegate<T>(T a, T b); 
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

public void Show1(string a)
{

}

public void Show2(string a, int b)
{

}
```
- 有返回值的委托（Func），最多支持17个重载，`<typeA, typeB>`中，`typeB`是返回类型
```csharp
var func1 = Func<int, int>(Show1);
Console.WriteLine(func1());

public int Show1(int a)
{
    return a;
}
```

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

  

