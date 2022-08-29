# `GetType()`与`typeof()`的区别：

||GetType()|typeof()|
|--|--|--|
|输入参数|变量，已实例化的对象|int string 等类型|
|方法本质|从System.Object继承的方法|运算符|
|执行时间点|程序运行时计算|程序编译时被计算|

* 正因为`GetType()`继承自Object，所以任何对象都会有该方法

```csharp
var compare1 = new Dictionary<int, int>();
var type1 = compare1.GetType(); // 实例化对象可使用GetType()
var type2 = typeof(Dictionary<int, int>)  // int string 等类型，通过typeof获取type对象
var res = type1 == type2; // true
```