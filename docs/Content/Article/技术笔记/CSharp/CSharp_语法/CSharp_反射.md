# 反射简介
- 操作dll文件（cs生成的可执行文件）的一个类库
- 需要在项目中，将dll添加到引用中

# 反射调用类
## 普通类
```csharp
class Program
{
    // 方法一：项目名内引用，参数为dll文件名(不带扩展名)
    // 加载项目外的dll文件，则需要将文件引用进项目后，才可以使用
    Assembly assembly1 = Assembly.Load("SqlDB");

    // 方法二：跨项目引用，参数为完整路径（带扩展名）
    Assembly assembly2 = Assembly.LoadFile("D:\Proj\bin\Debug\SqlDB.dll");

    // 方法三（推荐）：
    // 既可以项目内引用，也可以跨项目引用(带扩展名)
    Assembly assembly3 = Assembly.LoadForm("D:\Proj\bin\Debug\SqlDB.dll");
    Assembly assembly4 = Assembly.LoadForm("SqlDB.dll");

    // 方法四：当获得 Type 时，实例化该type对应的类对象
    var IntAssembly = Assembly.GetExecutingAssembly().CreateInstance(typeof(System.Int32).ToString());
    
    // 遍历dll中所有的类型
    foreach(var item in assembly4.GetTypes())
    {
        Console.WriteLine(item.Name);
    }
}
```

## 泛型类

# 反射调用方法
## BindingFlags 筛选方法修饰符
反射调用方法时，默认调用Public成员，要查询其他成员（protected, private等），则需要通过`BindingFlags`枚举类型对查找的成员进行筛选

|`BindingFlags`枚举值|含义|
|--|--|
|`IgnoreCase`|查找时，忽略大小写|
|`DeclaredOnly`|仅查找该类下的成员方法，不查找继承获得的成员|
|`Instance`|实例化成员（非静态的成员）|
|`Static`|静态成员|
|`Public`|公共成员|
|`NonPublic`|非公共成员（public以外的）|
- 添加`BindingFlags`后，`Instance`与`Static`必须二选一


## 反射直接获取构造方法
* 获取某个类的构造方法
- `GetConstructors()`只能查询public成员，要查询其他成员（protected, private等），则需要通过`BindingFlags`枚举类型对查找的成员进行筛选

    ```csharp
    Assembly assembly4 = Assembly.LoadForm("SqlDB.dll");
    Type type = assembly4.GetType("SqlDB.ReflectionTest");
    // 获取某个类的public构造方法
    foreach(var ctor in type.GetConstructors(BindingFlags.Instance | BindingFlags.Public))
    {
        Console.WriteLine(ctor.Name);
        // 获取构造方法中的全部参数
        foreach(var params in ctor.GetParameters())
        {
            Console.WriteLine(params.ParameterType);
        }
    }
    // 获取某个类的全部私有构造方法
    var privateCtorList = type.GetConstructors(BindingFlags.Instance | BindingFlags.NonPublic);
    ```

## public 构造函数
* 在`SqlDB`项目下，创建`ReflectionTest`类；并通过反射实例化该类
- 在`SqlDB`中创建`ReflectionTest`类
```csharp
public class ReflectionTest
{
    public ReflectionTest()
    {
        Console.WriteLine("无参构造");
    }

    public ReflectionTest(string name)
    {
        Console.WriteLine($"带参构造{name}");
    }
}
```
- 通过反射获取`ReflectionTest`的两种构造函数

    ```csharp
    // 获取 ReflectionTest所在的 dll文件
    Assembly assembly4 = Assembly.LoadForm("SqlDB.dll"); // 拿到了 整个dll文件，其中包含ReflectionTest类

    // 获取指定类型
    Type type = assembly4.GetType("SqlDB.ReflectionTest");

    // 实例化type(动态实例化)
    object obj1 = Activator.CreateInstance(type); // 调用的是 ReflectionTest 的无参数构造方法

    // 实例化type（通过有参构造添加）
    object obj2 = Activator.CreateInstance(type, new object[] {"hello！"}); // 调用的是 ReflectionTest 的有参数构造方法
    ```

## private 构造函数
- 继续使用`SqlDB`中的`ReflectionTest`类
```csharp
Type type = Assembly.LoadForm("SqlDB.dll");.GetType("SqlDB.ReflectionTest");
object obj1 = Activator.CreateInstance(type, true); // 调用的是 ReflectionTest 可调用私有的构造参数
```

## 普通方法
- `SqlDB`的`ReflectionTest`类添加新方法
```csharp
public class ReflectionTest
{
    // 添加新方法
    public void Show1()
    {  
        Console.WriteLine("Show1");
    }

    private void Show2()
    {  
        Console.WriteLine("Show2无参构造");
    }

    private void Show2(string str)
    {
        Console.WriteLine("Show2有参构造");
    }
}
```

- 反射调用
```csharp
Type type = Assembly.LoadForm("SqlDB.dll").GetType("SqlDB.ReflectionTest");
Object obj = Activator.CreateInstance(type, true); 
// 调用私有方法
MethodInfo method = type.GetMethod("Show2", BindingFlags.Instance | BindingFlags.NonPublic);
method.Invoke(obj, new Object[]{}); // Show2无参构造
```

## 泛型方法
- `SqlDB`的`ReflectionTest`类添加新方法
```csharp
public class ReflectionTest
{
    // 添加新方法
    public void Show<T>()
    {  
        Console.WriteLine("无参数泛型方法");
    }

    public void Show<T>(string name, int id)
    {  
        Console.WriteLine($"带参数的泛型方法: {name}, {id}");
    }
}
```
- 反射调用泛型方法
    ```csharp
    Type type = Assembly.LoadFrom("SqlDB.dll").GetType("SqlDB.ReflectionTest");
    Object obj = Activator.CreateInstance(type, true); 

    // 反射泛型方法
    var method = type.Method("Show");

    // 输入泛型对应的参数T
    var genericMethod = method.MakeGenericMethod(new Type[] {typeOf(int)}); 
    genericMethod.Invoke(obj, new Object[]{ });  // 无参数泛型方法
    genericMethod.Invoke(obj, new Object[]{ "zhangSan", 1}); // 带参数的泛型方法: zhagSan, 1
    ```

## 重载方法
- 创建一个新的类
    ```csharp
    public class ReflectionDemo
    {
        public string Show()
        {
            return "Nothing";
        }

        public string Show(string str)
        {
            return str;
        }        
    }
    ```

- 两个`Show`方法互为重载方法，所以需要根据参数的类型判定选择哪个方法进行调用
    ```csharp
    var obj = getDll.CreateInstance("fifaReflection.ReflectionDemo");  // 将程序集的类进行实例化
    // 有重载方法时
    // 这时仅靠方法名无法获取我们想要的方法(比如Show 就有两个重载方法)，所以需要在GetMethod(方法名, 参数类型列表)来获取想要的方法
    var res1 = obj.GetType().GetMethod("Show", new Type[] { typeof(string) }).Invoke(obj, new object[] { "hello" });
    ```

## 调用私有静态方法
需要满足静态（`BindingFlags.Static`）和私有（`BindingFlags.NonPublic`）
```csharp
var obj = getDll.CreateInstance("fifaReflection.ReflectionDemo");
var private_statics_method = tp.GetMethod("staticMethod", BindingFlags.Static | BindingFlags.NonPublic); 

// 当涉及到重载方法时，需要添加参数信息对同名函数进行区分
var private_statics_method_with_param = tp.GetMethod("staticMethod", BindingFlags.Static | BindingFlags.NonPublic, null, new Type[]{ typeof(string), typeof(string), typeof(string) }, null);
```

# 反射实现工厂类
- 工厂类就是输入特定字符，返回初始化好的类
- 这些类初始化的参数数量和类型一样
- 准备若干个类
    ```csharp
    public partial class A: BaseClass
    {
        public const string TABLE_NAME = "A";
        public A(int id)
        {
        }
    }

    public partial class B: BaseClass
    {
        public const string TABLE_NAME = "B";
        public B(int id)
        {
        }
    }

    public partial class C: BaseClass
    {
        public const string TABLE_NAME = "C";
        public C(int id)
        {
        }
    }
    ```
- 通过反射 查看当前程序集中每个类的`TABLE_NAME`常量，发现与输入的相等，则初始化 & 返回
    ```csharp  
    public BaseClass GetFormDetailGUI(string tableName, int id)
    {
        object[] paramArray = new object[] { id };
        // GetExecutingAssembly()读取当前的程序集
        var allGuiTypes = Assembly.GetExecutingAssembly().GetTypes();
        foreach (var guiType in allGuiTypes)
        {
            if (guiType.GetField("TABLE_NAME") != null && formName == guiType.GetField("TABLE_NAME").GetRawConstantValue().ToString())
            {
                return Assembly.GetExecutingAssembly().CreateInstance(guiType.ToString(), false,
                BindingFlags.Default, null, paramArray, null, null) as BaseForm;
            }
        }
        // 未匹配到对应的数据
        throw new Exception("未查询到对应表单界面");
    }

    ```

- 调用工厂类方法
    ```csharp
    var a = GetFormDetailGUI("A", 0);  // 返回的初始化好的对象A
    var b = GetFormDetailGUI("B", 0);   // 返回的初始化好的对象B
    ```

- 好处：每次添加新的类进来时，只需要每个类中加入`TABLE_NAME`常亮即可，不需要对代码本体进行修改
---
# 参考
- [详解(C#) .NET反射中的BindingFlags以及常用的BindingFlags使用方](https://blog.csdn.net/f_957995490/article/details/107872442)
- [C#反射使用时注意BindingFlags的用法](https://blog.csdn.net/weixin_38109688/article/details/80147535)