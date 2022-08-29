# 函数结构
* 命名规则：大驼峰（单词首字母全部大写）如`PublicService`
    ```cs
    //函数调用权限
    public void Demo(){
        ...
    }

    // 传参
    public void Add(int num1, int num2){  // 无返回值用 void
        int res = num1 + num2;
    }

    // 设置返回值
    public int Add(int num1, int num2){
        return num1 + num2;
    }

    public void Main(){
        MessageBox.Show(""+Add(1, 2)); // 3
    }
    ```

# 函数种类
## 静态方法
* 生命周期：与程序生命周期一样，
* 作用域：全局
* 用处：用户登录信息，配置信息，SQLHelper
* 优点：效率高
* 缺点：内存占用较大，若无必要，尽量不去创建静态对象
    ```csharp
    public static void Show(string str)
    {
        // To do Sth
    }

    // 调用静态方法，可直接调用
    Show("hahaha");
    ```

## 构造方法
* 用处：初始化对象，以及相关数据
* 特点：默认为一个无参数的构造方法，但是可以重载多个
    ```csharp
    class Test
    {
        public string str;

        // 重载构造方法
        public Test(string str)
        {
            this.str = str;
        }
    }

    //调用构造方法（new 对象时自动调用）
    var a = new Test();  // 直接调用系统默认的无参数构造方法
    var b = new Test("test 测试构造方法");  // 调用重载后的方法
    ```

## 析构方法
* 用处：释放对象，GC垃圾回收器进行调用，开发人员几乎不会用到
* 例子：Dialog的`Dispose()`方法（需要实现`IDisposeable`接口）

## 虚方法（`Virtual`）& 重写方法（`Override`）
* 虚方法作用：子类继承后，可以重写该方法
* 虚方法特点：好维护
* 如何重写虚方法：通过`override`修饰符进行重写（虚方法和重写方法是配合使用的）
    ```csharp
    // 父类
    public class Test
    {
        // 实现两数相加
        public virtual int Cal(int a, int b)
        {
            return a + b;
        }
    }

    // 子类
    public class ExtText: Test
    {
        // 重写的方法：改成两数的平均数
        // override 修饰符进行修改
        public override int Cal(int a, int b)
        {
            // base是父类对象
            return base.Cal(a, b) / 2;
        }
    }
    ```


## 抽象方法（`Abstract`）
* 用处：仅规定方法名，传入参数个数 & 类型，输出参数类型；做好规范后，让子类去实现(本身不实现任何方法)，多用于接口
* 用法：通过`abstract`修饰符进行修饰
* 特点：子类必须实现所有父类的抽象方法
    ```csharp
    public abstract class Test
    {
        // 不实现任何方法
        public abstract int Cal(int a, int b);
    }

    public class ExtText: Test
    {
        public override int Cal(int a, int b)
        {
            return a + b;
        }
    }
    ```

### 抽象方法和虚方法的区别
|方法类型|自身是否有方法体|子类是否必须实现方法|使用场景|
|--|--|--|--|
|`Abstract`|否|是|接口居多（有**继承关系**也可以使用）|
|`Virtual`|是|否|有**继承关系**即可使用（除接口外）|
## 扩展方法
* 通过`静态类`和`静态方法`，在不修改原始类时，即可扩展该类中的方法
    ```csharp
    class Calculate
    {
        public int Add(int a, int b)
        {
            return a + b;
        }
    }

    // 将 Calculate类增加一个新方法
    static class CalculateNew()
    {
        // 将添加一个三数相加的方法
        public static int AddNew(this Calculate cal, int a, int b, int c)
        {
            return a + b + c;
        }
    }

    // 调用方法
    Calculate cal - new Calculate();
    cal.Add(1,2);
    cal.addNew(1,2,3);
    ```

# 函数修饰符
```cs
public void Add(){ // 谁都能访问，可以被子类重写
    ...;
}

protected void Add(){  // 只能在当前类或其子类中访问，可以被子类重写
    ...;
}

private void Add(){ // 只能在当前类的内部访问，无法被子类重写
    ...;
}

internal void Add(){  // 只能在同一个项目内可以访问
    ...;
}

protected internal void Add(){ // 本项目或子类可以访问
    ...;
}
```

# 函数参数
## 参数默认值
* 带有默认值的参数必须放在所有参数的最后
    ```csharp
    public void ShowMsg(string msg = "No msg")
    {
        MessageBox.Show(msg); 
    }

    // 参数有默认值，必须放在最后
    public void ShowMutiMsg(string msg, string msg1 = "default")
    {
        MessageBox.Show(msg+msg1); 
    }

    ShowMsg();  // 弹出 No msg
    ShowMsg("hello")  // 弹出 hello
    ShowMutiMsg("Hi!") // 弹出Hi!default
    ShowMutiMsg("Hi!", "CSharp") // 弹出Hi!CSharp
    ```

## 参数修饰符
### 无修饰符
```cs
    public void SendMsg(string msg){
        string msg = "hello world";
        // 参数无修饰符时，不会改变传入参数的值
        // SendMsg中的msg == "hello world"; Main中的msg == "hello"
        // SendMsg中的msg变量的改变不会影响该函数外的msg变量的改变
    }

    public void Main(){
        string msg = "hello"; 
        SendMsg(msg);
        // 执行完如上代码后，Main中的msg仍为"hello"
    }
```

### out
  * 指针，引用参数前加 out，函数会直接操作该变量
  * 使用out做修饰符，调用函数中必须给out修饰的变量赋值，无论其是否有值
    ```cs
        public void SendMsg(out string msg){
            string msg = "hello world";  // 直接改变了传入变量的值
        }

        public void Main(){
            string msg = "hello";
            SendMsg(out msg);
            // 执行完毕后，Main中的msg变为 "hello world"
        }

        // 将创建被out修饰的变量与传参合二为一
        public int Add(int num1, out int num2){
            string num2 = 2;
            return num1 + 2;
        }
        public void Main(){
            Add(1, out int num2); // 直接创建了num2并传入Add中
            MessageBox.Show(""+num2); // 2
        }
    ```

### ref
  * 在调用函数中可以给被修饰的变量赋值，也可以不修改
  * 被修饰的变量传入函数之前，必须被赋值
  ```cs
  public void SendMsg(ref string msg1, ref string msg2){
      msg2 = "world!"; // 直接更改函数外从msg2位置传入的变量的值(如果msg2这个位置的参数实际名称为msg或是其他，那么它的值依然改变)
      MessageBox.Show(msg1+msg2);  // helloworld!
  }

  public void Main(){
      string msg1 = "hello", msg2 = "world";
      SendMsg(ref msg1, ref msg2);  // helloworld!
  }
  ```

### params
* 输入任意数量的参数
* 参数必须是一维数组
* 不得与`ref` `out` 组合使用
* `params`关键字的参数必须是函数的最后一个参数
  ```cs
    public void useParams(params int[] intList){  // 常规类型
        foreach(int i in intList){

        }
    }

    public void useParams1(params object[] list){ // 输入多种类型的参数
        for (int i = 0; i < list.Length(); i++){
            object a = list[i]
        }
    }

    public void useParams1(double x, params object[] list){ // 如果前面是特定类型，后面是params也可以：

    }

    public void Main(){
        useParams(1,2,3); // 可以直接输入

        int[] intArray = new int[] {1,2,3};
        useParams(intArray);  // 可以变成列表输入

        useParams(1, 'a', "asa"); 输入参数为 object 类，则参数类型可以不固定
    }
  ```

# 匿名函数
* c# 中，匿名函数分为匿名方法（`delegate`） 和 匿名函数（`=>`）

## 委托
* 多个方法的形参与返回值一致时，可用委托对这些方法进行统一调用
* 委托的形参和返回类型一定要与委托的方法一致，所有委托方法的形参和返回类型一致
    ```cs
    delegate void MyDelegate(string name); //声明委托
    private void Form1_Load(object sender, EventArgs e)
    {

        // 实例化委托
        MyDelegate mydel = new MyDelegate(sayChinese);

        // 委托的多播
        // 通过 -= += 管理委托的方法
        mydel += sayEng;
        mydel += sayThaiLand;
        mydel -= sayEng;

        // 输入参数 c# 会将参数输入委托的方法从而执行
        mydel("FIFA!");
    }

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

## 匿名函数
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

---
# 参考
* [C# params 用法简介](https://blog.csdn.net/wcc27857285/article/details/80991824)
* [C#中Trim()、TrimStart()、TrimEnd()的用法](https://www.cnblogs.com/carekee/articles/2094731.html)
  

