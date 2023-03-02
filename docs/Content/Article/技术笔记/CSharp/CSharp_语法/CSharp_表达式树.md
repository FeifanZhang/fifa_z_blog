# 表达式树简介
* 定义
  * 树形结构表示代码，每个节点都是一种表达式
  * 对表达式树中的每个节点进行动态调整，其效率要高于反射
* 用途：
  * ORM框架实现
  * 工作流框架
  * lambda表达式、动态执行代码、动态组装代码等
  * 在业务流程的开发过程中，用到较少；但在框架的开发上，会用到较多

# 表达式种类
* ConstantExpression：常量
* ParameterExpression：输入参数
* BinaryExpression：二元表达式（对两个数据进行操作，比如`1+1`, `2*3`），加减乘除会在`NodeType`属性中显示
* PropertyExpression：属性表达式，表示表达式中，调用了实例对象的属性
* MethodInfo：调用方法,当表达式节点，调用了其他方法，则该表达式类型为`MethodInfo`
* 示例1
    ```cs
    Expression<Func<string, string>> func_exp = (s) => s + "委托";
    ```
    - 表达式会如下被解析
    ```mermaid
    graph TD;
        BinaryExpression`+` --> ParameterExpression`s`;
        BinaryExpression`+` --> ConstantExpression`委托`;
    ```

* 示例2
    ```cs
    Expression<Func<string, string>> func_exp = (s) => (s + "委托") * Convert.ToInt32("2");
    ```
    - 表达式会如下被解析
    ```mermaid
    flowchart TD
        BinaryExpression`*` --> MethodInfo`Convert.ToInt32`
        BinaryExpression`*` --> BinaryExpression`s+委托`
        BinaryExpression`s+委托` --> ParameterExpression`s`
        BinaryExpression`s+委托` --> ConstantExpression`委托`
    ```

# 手动拼接表达式树
将该表达式进行手动拼接：`Expression<Func<int, int>> func_exp = (x) => x + 5; `
```cs
class Program
{
    static void Main(string[] args)
    {
        // 上面的表达式树，可以转化为如下写法
        // x: 参数表达式
        ParamaterExpression paramExp = Expression.Paramaeter(typeOf(int), x);

        // 5： 常量表达式
        ConstantExpression constExp = Expression.Constant(5);

        //二元运算表达式(将常量表达式 与 参数表达式 进行拼接)
        BinaryExpression binExp = Expression.Add(paramExp, constExp);

        // func_exp为lambda样式，所以最后要将表达式拼装成 lambda表达式
        // 两个参数：
        // 1. Body：Expression 类型，即上面生成的表达式树
        // 2. 参数列表；IList<ParamaterExpression>
        Expression<Func<int, int>> func_exp2 = Expression.Lambda<Func<int, int>>(binExp, new ParameterExpression[] { paramExp });

        // 编译 & 启动表达式树
        var res = func_exp2.Compile().Invoke(7);
    }
}
```

# 自动拼接

# 简易ORM工具

# 参考
* [C#表达式树讲解1](https://www.jb51.net/article/234253.htm)