# APPLY 简介
`Apply`用法：`CROSS/OUTTER APPLY (EXP)`, `(EXP)`是表达式，该语法会将`(EXP)`表达式作用于每一行数据

# 示例
* t_name表如下显示，将其中Name列以`;`为分割 分成若干条数据
  
    |Name|
    |--|
    |a;b;c|

* 分割成如下表所示
    |Name|
    |--|
    |a|
    |b|
    |c|

* sql语句
    ```sql
    select *
    from t_name T
    CROSS APPLY (
        split(T.Name, ';')  -- Split 这个存储过程需要自己实现，这里是伪代码举例
    )
    ```
* 将`T`表中的所有数据拿出来，每一行都通过`APPLY`后面的`split()`表达式进行拆分，从而得到最终结果
* `APPLY`后面的表达式经过计算后，会有两种结果：有数据 or 为空，`OUTTER APPLY`就是表达式计算结果为空时，对应的原始表数据显示为null；`CROSS APPLY`当数据为空时，对应的原始表数据不显示

# cross apply & outer apply
|语法格式|类似语法|解释|
|--|--|--|
|`CROSS APPLY`|类似于`INNER JOIN`|`CROSS APPLY`后面的表达式为空时，则`CROSS APPLY`前面对应的数据不会进行显示|
|`OUTER APPLY`|类似于`OUTTER JOIN`的效果|`CROSS APPLY`后面的表达式为空时，则`CROSS APPLY`前面对应的数据会进行显示|
## 举例
* 两张表：`Department`和`Employee`，通过`CROSS APPLY`进行联结查询
* `Department`
  |deptId|deptName|
  |--|--|
  |1|人事部|
  |2|业务部|

* `Employee`
    |empId|empName|deptId|
    |--|--|--|
    |1|张三|2|
    |2|李四|2|

* sql语句
    ```sql
    -- CROSS APPLY
    select * from Department d
    CROSS APPLY(
        select * from Employee e
        where e.deptId = d.deptId
    ) A

    -- OUTER APPLY
    select * from Department d
    CROSS APPLY(
        select * from Employee e
        where e.deptId = d.deptId
    ) B
    ```
* `CROSS APPLY`最终结果
    |deptId|deptName|empId|empName|
    |--|--|--|--|
    |2|业务部|1|张三|
    |2|业务部|2|李四|
  结果中不会显示**人事部**，因为执行到人事部的数据时，发现`CROSS APPLY`得出的数据为空  
  

* `OUTER APPLY`最终结果
    |deptId|deptName|empId|empName|
    |--|--|--|--|
    |1|人事部|null|null|
    |2|业务部|1|张三|
    |2|业务部|2|李四|

  即使执行到人事部的数据时，发现`CROSS APPLY`得出的数据为空，仍会进行显示

# 将4列1行数据，变为2列2行
* 原始表

    |ID1|Name1|ID2|Name2|
    |--|--|--|--|
    |1|A|2|B|
    |3|C|4|D|
    |5|E|6|F|

* 最终输出
    |ID|Name|
    |--|--|
    |1|A|
    |2|B|
    |3|C|
    |4|D|
    |5|E|
    |6|F|
* sql语句
    ```sql
    select V.ID, V.Name  -- select时 只能取新表（v）中有的列
    From test_table t
    CROSS APPLY(
        VALUES (t.ID1, t.Name1), (t.ID2, t.Name2)  -- VALUE用于约定新表的列取自哪个字段：ID1与Name1成为一列；ID2与Name2为一列
    ) V (ID, Name)  -- 定义新表名称（v），并定义列名称
    ```


# 参考
* [如何在SQL中将四个列值追加到两个列中](https://cloud.tencent.com/developer/ask/sof/656153)
* [【SQL Server】CROSS APPLY和OUTER APPLY的应用详解](https://www.cnblogs.com/ronli/archive/2011/10/21/SQLAPPLY.html)
* [浅析 SQL Server 的 CROSS APPLY 和 OUTER APPLY 查询 - 第一部分](https://blog.csdn.net/weixin_53935287/article/details/125500136)