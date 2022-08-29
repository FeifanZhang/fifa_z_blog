# 什么是泛型
* List<T>, 其中的T为任意类型，T就叫做泛型
* 如何声明泛型变量：尖括号中间填写泛型变量名称:`List<T>`,`Dictionary<TKey, TValue>`
* 一旦变量声明了T的具体类型，呐该变量的类型就不能再更改
* 优点：使得代码重用，不同的类可以共用一套逻辑

# 泛型变量List<T>
```csharp
// 字符串
var l = new List<string>() {"a", "b", "c"};

// object 也可以作为泛型参数，但在做数据转换时，会有拆箱操作，性能损耗大，不建议少用
var objList = new List<object>();
```

# 泛型Dictionary<K, V>
* 字典中的 key value也都是泛型
    ```csharp
    var dict1 = new Dictionary<int, string>();
    dict1.Add(1,"a");
    ```

# 自定义泛型
```csharp
class MyGeneric<T>
{
    private T t;
    public MyGeneric(T t)
    {
        this.t = t;
    }

    public void Show()
    {
        Console.WriteLine(t);
    }
}

MyGeneric<string> gen = new MyGeneric<string>("Hi!");
gen.Show();  // 打印 Hi！

MyGeneric<int> gen = new MyGeneric<int>(22222);
gen.Show();  //打印 22222
```