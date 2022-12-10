
# Linq 简介
* Linq to obj(数组，list集合) 中使用  -- 内存数据
* linq to sql 查询数据用的（在数据库中使用， 详情参考[IQueryable](../CSharp_语法/CSharp_枚举.md)）
* linq to xml 查询xml文件
* 以下示例所用到的数据如下文所示
    ```csharp
    List<Students> StudentList = new List<Students>()
    {
        new Students()
        {
            Id = 0,
            Name = "csharp1",
            ClassId = 2,
            Age = 25
        },
        new Students()
        {
            Id = 1,
            Name = "csharp2",
            ClassId = 3,
            Age = 22
        },
        new Students()
        {
            Id = 3,
            Name = "csharp3",
            ClassId = 4,
            Age = 21
        }
    }

    ```

# where
* 对变量中的每个元素遍历时的限制条件
    ```csharp
    // 当newList被使用时 才会查询
    // 扩展方法的方式（推荐）
    var newList = StudentsList.Where(x => x.Age > 20).ToList();
    // 表达式样式(了解即可，功能比扩展式的少，而且最后会转义为扩展式)
    var otherNewList =  (from s in StudentsList 
                        where s.Age < 20 
                        select s).ToList();
    ```

# Select
* select 是投影：即将满足条件的元素投影至新的表单中
* 在数据库中，select可以选择表中需要的字段；在linq中，用于提取元素中的一些属性形成新的类型
    ```csharp
    // 将 StudentsList 中的每一个元素转换成只包含变量 age 和 id 的元素
    var query = StudentsList.Select( s => new {id = s.Id, age = s.Age});

    // 表达式用法
    var query2 = from s in StudentsList select new { id = s.iD, age = s.Age };
    ```

# Join
* 除了 StudentsList以外，新添加一个数据源
    ```csharp
    List<StuClass> StuClass = new List<StuClass>()
    {
        new StuClass{ Id = 1, ClassName = "小小班" },
        new StuClass{ Id = 2, ClassName = "小班" },
        new StuClass{ Id = 3, ClassName = "中班" },
        new StuClass{ Id = 4, ClassName = "大班" },
    };
    ```
* join示例
    ```csharp
    // 表达式语法
    // 联结时，不要写等号，用 equals表示相等
    var query = from s in StudentsList
                join c in StuClass on s.ClassId equals c.Id
                select new { 
                    Id = s.Id,
                    ClassId = s.ClassId,
                    Age = s.Age,
                    ClassName = c.ClassName,
                    Name = s.Name,
                 };
    
    // 扩展方法
    var query2 = StudentsList.Join(stuClass, s=> s.ClassId, c => c.Id, (s, c) => new { 
                    Id = s.Id,
                    ClassId = s.ClassId,
                    Age = s.Age,
                    ClassName = c.ClassName,
                    Name = s.Name,
                });
    // stuClass 是被 join 的变量
    // s => s.ClassId 表示 StudentsList 通过 ClassId 做联结
    // c => c.Id 表示 stuClass通过 id 做联结
    // 最后是返回的元素形态
    ```

# Take & Skip & SkipWhile
* Take: 对返回的信息条数做限制
* Skip: 跳过一定数量的元素
* SkipWhile：跳过不满足条件的元素，直到遇见第一个满足条件的元素后，返回该元素和后面的元素

```csharp
var intList = List<int>() {0, 3, 2, 7, 6, 9, 3, 7};
var query1 = intList.Take(3); // 返回前三条信息: 0, 3, 2
var query2 = intList.Skip(4); // 跳过前4个元素，返回剩下的元素 6, 9, 3, 7
var query3 = intList.SkipWhile(i => i < 4); // 遇见 < 4的元素就跳过；直到遇见第一个大于4的元素（7）时，返回该元素和剩下的元素(7,6,9,3,7)
```
* `SkipWhile` 与 `Where` 区别：

    |方法名|退出时机|返回的元素|
    |--|--|--|
    |`SkipWhile`|第一个不满足条件的元素|退出时，剩下的元素|
    |`Where`|全部元素遍历完|所有满足条件的元素|

# Any & All
* `Any` 表示集合中任一元素满足条件，返回true
* `All` 表示集合中全部元素满足条件，返回true

```csharp
// 任何一个 chartId > 3 就返回 true
bool res1= chartList.Any(chart => chart.Id > 3);

// 查看是否全部 chart的id 满足大于3的条件
bool res2= chartList.All(chart => chart.Id > 3);
```

# GroupBy
* 通过某些条件，将集合的所有元素进行分类
* 返回值：`IEnumerable<IGrouping<typeA, typeB>>`: `typeA`是分类条件的变量类型, `typeB`是列表中元素类型, `IEnumerable`则是可迭代的类型
    ```csharp
    // 将列表 chartList中的所有元素，按照其 chartId 进行分组，再根据每个group中，元素的数量进行排序
    // 返回集合的元素类型IGrouping<int, Chart> 中，int 是 chartId的类型；Chart 是chartList 元素类型
    IEnumerable<IGrouping<int, Chart>> groupByChartID = chartList.GroupBy(s => s.ChartId).OrderByDescending(s => s.Count());

    // 根据 chartName 进行分类
    // 返回的元素类型IGrouping<string, Chart> 中，int 是 chartName的类型；Chart 是chartList 元素类型
    IEnumerable<IGrouping<string, Chart>> groupByChartName = chartList.GroupBy(s => s.ChartName);

    // 遍历 GroupBy的结果
    foreach(IGrouping<int, Chart> ele in groupByChartID)
    {
        var chartId = ele.Key; // 获取 chartId
        var chartList = ele; // 获取该 chartId下的所有chart
    }
    ```


# Aggregate
## `list.Aggregate((param1, param2) => expression)`
  * `params1`很特殊，遍历第一个元素时，表示list中的第一个元素；遍历后面的元素时，表示的是上一次`expression`处理后返回的值
  * `params2`表示遍历的下一个元素：`param1`表示list中第一个元素时，`params2`表示第二个元素；以此类推
* 用法1：求和
    ```csharp
    var l = new List<int>() {1, 2, 3, 4};
    int total = l.Aggregate((sum, next) => sum += next);
    ```

    遍历第一个元素：当 sum = 1 时；next = 2；经过计算后，sum += next = 3  
    遍历第二个元素：sum = 3; next = 3; 经过计算后，sum += next = 6  
    遍历第三个元素：sum = 6; next = 4; 经过计算后， sum += next = 10  
    遍历第四个元素：sum = 10, next 不存在 结束  
 
* 用法2：求最值
    ```csharp
    var l = new List<int>() {1, 2, 3, 4};
    // 求最大值
    int maxValue = l.Aggregate((maxV, next) => maxV > next ? maxV : next);

    // 求最小值
    int minValue = l.Aggregate((minV, next) => minV < next ? minV : next);
    ```
    遍历第一个元素：当 maxV = 1 时；next = 2；经过计算后，maxV = 2  
    遍历第二个元素：maxV = 1; next = 3; 经过计算后，smaxV = 3  
    遍历第三个元素：maxV = 1; next = 4; 经过计算后， maxV = 4  
    遍历第四个元素：maxV = 1, next 不存在 结束  
    最小值同理

## `list.Aggregate(default, (param1, param2) => expression)`
* `default`参数就是遍历的第一个元素不是list的第一个元素，而是`default`
* 还是以求和举例子
    ```csharp
    var l = new List<int>() {1, 2, 3, 4};
    int total = l.Aggregate(22, (sum, next) => sum += next);
    ```
    遍历第一个元素：sum = default = 22; next = 1; 计算后，sum += next = 23  
    遍历第二个元素：当 sum = 23；next = 2；经过计算后，sum += next = 25  
    遍历第三个元素：sum = 25; next = 3; 经过计算后，sum += next = 28  
    遍历第四个元素：sum = 28; next = 4; 经过计算后， sum += next = 32  
    遍历第五个元素：sum = 32, next 不存在 结束

# 总结
本篇博客仅介绍了`Linq`常用的数据筛选方法，除此以外还有很多其他方法，大家可以自行学习

---
# 参考
* [LINQ中的Aggregate用法总结](https://www.cnblogs.com/wpflovesj/p/4997502.html)