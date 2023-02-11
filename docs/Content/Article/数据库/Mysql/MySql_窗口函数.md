# 窗口函数定义
* MySql支持版本: 8.0及以上
* 函数定义：
* 函数用法：`窗口函数名 over(partition by 字段名1 order by 字段名2 desc/asc)`
  * `partition by 字段名1`：类似于`group by`,通过该字段对数据进行分组
  * `order by 字段名2`：根据字段2进行排序
* 窗口函数与分组函数的区别
  * 分组函数通过`group by`分类后进行计算，其计算颗粒度只能到达每个**group**(如：`count()`用于计算group下的数据数量，`sum()`则是计算group下某个字段的总和)
  * 窗口函数可以通过`partition by `将计算颗粒度缩小至每个**group**中的每一条数据（如`rank() over(partition by name order by score desc)`就是将数据通过`name`进行分组，并通过`score`**分别**对**每个分区**内的数据进行排名）
  * 窗口函数所求出的结果，会被带到“下一行数据”：`row_number()`求得本行为1，则下一行数据的`row_number()`结果就会根据逻辑顺延到2


# 窗口函数简介

|函数类型|函数名|用途|用法|
|--|--|--|--|
|序号函数|rank()|跳跃的，带有间断的排名（数据中出现**3个并列第一**，**1个第二**；则结果的rank为:1，1，1，4）|`rank() over(partition by 字段名1 order by 字段名2 desc/asc)`|
|序号函数|dense_rank()|普通情况下的排名（数据中出现**3个并列第一**，**1个第二**；则结果的rank为:1，1，1，2）|`dense_rank() over(partition by 字段名1 order by 字段名2 desc/asc)`|
|序号函数|row_number()|连续的排名（数据中出现**3个并列第一**，**1个第二**；则结果的rank为:1，2，3，4）|`row_number() over(partition by 字段名1 order by 字段名2 desc/asc)`|
|前后函数|LAG(expr, n, default_value)|返回当前行的**前n行**expr的值|
|前后函数|LEAD(expr, n, default_value)|返回当前行的**后n行**expr的值|
|首尾函数|first_value(expr)|返回**第一个**expr的值|
|首尾函数|last_value(expr)|返回**最后一个**expr的值|
|分布函数|precent_rank()|等级值百分比||
|分布函数|cume_dist()|累计分布值||
|其他函数|nth_value(expr, n)|返回第n个expr的值|
|其他函数|ntile(n)|将分区中的有序数据分为n个桶，记录桶编号|
|窗口聚合函数|sum(字段名)|计算**本和和前面若干行**的总和|
|窗口聚合函数|avg(字段名)|计算**计算本和和前面若干行**的平均值|
|窗口聚合函数|min(字段名)|计算**计算本和和前面若干行**的最小值|
|窗口聚合函数|max(字段名)|计算**计算本和和前面若干行**的最大值|
|窗口聚合函数|count()|计算**计算partition by 分组后，每一组的数据量**|



# 窗口函数事例

## rank & dense_rank & row_number
* 用法：`rank()/dense_rank()/row_rank() over (partition by 字段1 order by 字段2)`
* 举例表格(rank)如下所示

  |id|name|score|
  |--|--|--|
  |1|a|100|
  |2|a|90|
  |3|a|90|
  |4|b|80|
  |5|b|70|
  |6|c|60|
  |7|d|50|

* `order by`表示以哪个字段值为依据进行排序
    * `select score, rank() over(order by score desc) as 'rank' from rank`
    |score|rank|
    |--|--|
    |100|1|
    |90|2|
    |90|2|
    |80|4|
    |70|5|
    |60|6|
    |50|7|

* `partition by`为可选参数，先将数据分成若干分区，并**分别**对**每个分区**内的数据进行排名
  * `select score, rank() over(partition by name order by score desc) as 'rank' from rank`
    |name|score|rank|
    |--|--|--|
    |a|100|1|
    |a|90|2|
    |a|90|2|
    |b|80|1|
    |b|70|2|
    |c|60|1|
    |d|50|1|
  * 首先将数据根据`name`字段进行分割成不同group，每个group中**独立排序**

## lag & lead
* `LAG(expr, n, default_value) over(partition by 字段名1 order by 字段名2 desc/asc)`
  * expr: 选择的字段
  * n: 以`order by`后面的字段排序为基准，向前移动n行
  * default_value: 当字段为空时，所赋的值
* `LEAD(expr, n, default_value) over(partition by 字段名1 order by 字段名2 desc/asc)`
  * 输入参数与`LAG`相同，只是该函数用于提取后n行的数值


## count
* `count(*) over(partition by 字段名1, ...,字段名n order by 字段名2 desc/asc)`
* 示例
  * 表结构 & 数据

    |col1|col2|
    |--|--|
    |a|a|
    |a|a|
    |a|c|
    |b|a|
    |b|b|
    |b|c|
    |c|a|
    |c|b|

  * `select col1, col2, count(*) over (partition by col1) cal from tmp_test`
    * 结果
  
      |col1|col2|cal|
      |--|--|--|
      |a|a|3|
      |a|a|3|
      |a|c|3|
      |b|a|3|
      |b|b|3|
      |b|c|3|
      |c|a|2|
      |c|b|2|

  * **partition by 可以跟随多个列** ：`select count(*) over (partition by col1, col2) cal from tmp_test` 
    * 结果

      |col1|col2|cal|
      |--|--|--|
      |a|a|2|
      |a|a|2|
      |a|c|1|
      |b|a|1|
      |b|b|1|
      |b|c|1|
      |c|a|1|
      |c|b|1|
  



# 参考
* [开窗函数与聚合函数](https://blog.csdn.net/weixin_53952878/article/details/125829118)
* [Mysql 窗口函数](https://blog.csdn.net/nmsLLCSDN/article/details/123287490)
* [MySQL开窗聚合函数——SUM（）,AVG（）,MIN（）,MAX（）](https://blog.csdn.net/weixin_47723732/article/details/123549429)
* [MySQL - COUNT() OVER() 函数用法详解](https://blog.csdn.net/Dream_Weave/article/details/117417085)