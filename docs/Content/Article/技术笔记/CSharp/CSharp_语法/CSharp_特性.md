# 特性介绍
- 使用范围：程序集、类、属性、方法、字段以及参数等都可以使用（能想到的地方，都能用）
- 使用场景：数据验证
- 本质：`Attribute`的子类（子类名称以Attribute结尾）
- 类似于`Python`的装饰器，不修改已有方法的情况下，增加其功能

# 特性的简单使用
- 定义特性
```csharp
public class ShowAttribute: Attribute
{
    public string ShowInfo{get; set;}

    public void Show()
    {
        Console.WriteLine(ShowInfo);
    }
}
```
- 特性与目标绑定
```csharp
[Show(ShowInfo = "我是该类的特性”)]
public class ShowTest
{
    [Show(ShowInfo = "我是test方法上的特性”)]
    public void Test()
    {

    }
    [Show(ShowInfo = "我是属性上的特性”)]
    public string TestProperty{get; set;}

    [Show(ShowInfo = "我是字段上的特性”)]
    public string TstField;
}
```
- 调用特性（通过反射获取目标的特性 & 执行）
  - 通过`Type.IsDefined(AttributeType, bool)) `去判断目标上是否有对应的特性
  - 第一个参数（`AttributeType`）是特性的类型，第二个参数判断(`bool`)是否递归其父类去寻找第一个参数输入的特性类型
  - 下文的`InvokeConter`类详细说明了如何在**类**、**方法**、**属性**以及**字段**上查找绑定的特性（通过反射）
    ```csharp
    public class InvokeConter
    {
        // 用扩展方法定义特性的调用类
        public static void InvokeManager<T>(this T showTest) where T:new()
        {
            Type type = showTest.GetType();
            // 在类上查找特性
            if(type.IsDefined(typeof(ShowAttribute), true)) // 判断是否存在ShowAttribute类的特性
            {
                object[] attrList = type.GetCustomAttributes(typeof(ShowAttribute), true);
                foreach(ShowAttribute attr in attrList)
                {
                    attr.Show(); // 调用反射的Show方法
                }
            }

            // 在方法上查找特征
            foreach(MethodInfo method in type.GetMethods())
            {
                if(method.IsDefined(typeof(ShowAttribute), true))
                {
                    object[] attrList = method.GetCustomAttributes(typeof(ShowAttribute), true);
                    foreach(ShowAttribute attr in attrList)
                    {
                        attr.Show(); // 调用反射的Show方法
                    }
                }
            }

            // 在属性上查找
            foreach(PropertyInfo prop in type.GetProperties())
            {
                if(prop.IsDefined(typeof(ShowAttribute), true))
                {
                    object[] attrList = prop.GetCustomAttributes(typeof(ShowAttribute), true);
                    foreach(ShowAttribute attr in attrList)
                    {
                        attr.Show(); // 调用反射的Show方法
                    }
                }
            }

            // 在字段上查找
            foreach(FieldInfo field in type.GetField())
            {
                if(field.IsDefined(typeof(ShowAttribute), true))
                {
                    object[] attrList = field.GetCustomAttributes(typeof(ShowAttribute), true);
                    foreach(ShowAttribute attr in attrList)
                    {
                        attr.Show(); // 调用反射的Show方法
                    }
                }
            }
        }
    }
    ```

- 测试类
    ```csharp
    ShowTest showTest = new ShowTest();
    showTest.InvokerManager();
    ```

# 特性实现对属性 & 字段的合法验证
如下需求：类中传入一个手机号，需验证该手机号的长度是否符合要求；其次需要有一个方法来验证属性 or 字段是否为空；这两者全部用特性实现。两个需求都是用于验证的，所以从两个特性中抽象出相同的验证方法`Validate()`方法进行验证,通过抽象类`AbstractValidateAttrbute`约束该方法（`Validate(object obj): bool`）；其余用于验证的特性类，直接继承该类并实现该方法即可
- 抽象特性类（`AbstractValidateAttrbute`）
    ```csharp
    public abstract class AbstractValidateAttrbute: Attribute
    {
        // 输入参数后，返回布尔值表明参数是否合法
        public abstract bool Validate(object objValue);
    }
    ```

- 实现验证手机号码长度的特性(`LongAttribute`)
    ```csharp
    // 继承抽象类 实现电话号码长度的验证
    [AttributeUsage(AttributeTargets.Property)]
    public class LongAttribute: AbstractValidateAttrbute
    {
        private long _Long = 0;

        public LongAttribute(long phoneLength)  // 规定正确手机号码的长度
        {
            this._Long = phoneLength;
        }

        public override bool Validate(object objValue)
        {
            return objValue != null && objValue.ToString().Length() == 11;
        }
    }
    ```

- 验证变量是否为空的特性(`Requiredttribute`)
    ```csharp
    [AttributeUsage(AttributeTargets.Property)]
    public class RequiredAttribute: AbstractValidateAttrbute
    {
        public override bool Validate(object objValue)
        {
            return objValue != null && !string.IsNullOrWhtieSpace(objValue.ToString());
        }
    }
    ```
- 验证字符串长度的特性(`StringLengthAttribute`)
    ```csharp
    [AttributeUsage(AttributeTargets.Property)]
    public class StringLengthAttribute: AbstractValidateAttrbute
    {
        private int _MinL = 0;
        private int _MaxL = 100;

        public StringLengthAttribute(int MinL, int MaxL)
        {
            this._Max = MaxL;
            this._Min = MinL;
        }

        public override bool Validate(object objValue)
        {
            return objValue != null && objValue.ToString().Length >= this.MinL && bjValue.ToString().Length <= this.MaxL;
        }
    }
    ```
- 特性调用
  - 思路：通过扩展方法(`Validate<T>`)扩展泛型类 -> `Validate<T>`方法中，通过反射获取泛型类中的所有属性 -> 通过反射执行属性所带的特性
```csharp
class AttributeExtend
{
    // 扩展方法来实现 Validate，该方法内
    public static bool Validate<T>(this T t)
    {
        Type type = t.GetType();
        foreach(var prop in type.GetProperties())
        {
            if(prop.IsDefine(typeOf(AbstractValidateAttrbute), true))
            {
                // 拿到特性所绑定的属性
                object objValue = prop.GetValue(t);
                // 通过属性值，获取该属性下所有用于验证的特性
                foreach(AbstractValidateAttrbute attr in prop.GetCustomAttributes())
                {
                    // 执行这些特性的Validate方法
                    if(!attr.Validate(objValue)) // 方法验证失败 直接返回false
                    {
                        return false;
                    }
                }
                return true;
            }
        }
    }
}
```
- 测试类
当调用特性时，特性类名称的结尾`Attribute`是可以省略的
```csharp
public class Student
{
    [Required]
    public int Id{get; set;}

    [Required]
    [StringLength(5, 10)]
    public String StudentName{get; set;}

    [Required]
    [Long(11)]
    public long PhoneNum{get; set;}
}

var stu = new Student()
{
    Id = 1,
    PhoneNum = 1234567890,
    StudentName = "特性的使用"
}
Console.WriteLine(student.Validate() ? "验证成功" : "验证失败"); 
```

# 特性的配置文件
特性的配置有三个参数：`[AttributeUsage(AttributeTargets, AllowMutiple, Inherited)]`，分别规定了**特性的作用范围**、**特性的叠加**以及**特性的继承**
- 特性的作用范围
  - 特性默认是是在程序集、类、属性、方法、字段以及参数等都可以使用，`AttributeUsage`进行限制，`AttributeUsage`是一个枚举类
    ```csharp
    [AttributeUsage(AttributeTargets.Class)]  // 该特性只能对类型进行使用
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method )] // 在类 和 方法中都可使用
    ```

- 特性的叠加
  - 当目标对象需要叠加多个特性时，需要设置`AllowMutiple = true`来开启(默认为`false`)
    ```csharp
    [AttributeUsage(AttributeTargets.Class, AllowMutiple = true)]
    public class TableAttribute : Atrribute
    {
        public TableAttribute()
        {

        }

        public TableAttribute(string table)
        {

        }
    }
    ```
- 特性的继承
  - 通过`Inherited = true`来设置该特性是可继承的
    ```csharp
    [AttributeUsage(AttributeTargets.Class, AllowMutiple = true, Inherited = true)]
    public class TableAttribute : Atrribute
    {
        public TableAttribute()
        {

        }

        public TableAttribute(string table)
        {

        }
    }

    // 子类继承 TableAttribute
    public class Table2Attribute : TableAttribute
    {
        public TableAttribute()
        {

        }

        public TableAttribute(string table)
        {

        }
    }
    ```