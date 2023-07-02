`Listagg()`用于字符串拼接，即列转行

# 示例表结构
* 表名：`TEST_DATA`

|ID|NATION|CITY|
|--|--|--|
|1|中国|杭州|
|2|中国|上海|
|3|中国|北京|
|4|美国|纽约|
|5|美国|波士顿|
|6|日本|东京|

# 基础用法
* `listagg(字段x, '分割的标点符号') within group(order by 字段y)`
  * 字段x：拼接的字段
  * 字段y：`字段x`在排序时，通过`字段y`进行排序

## 示例：显示全部国家，对应的全部城市在同一行中进行显示
* sql语句：
```sql
select nation, 
listagg(city, ',') within group(order by city) as cities -- 将同nation的city合并至一行显示，并根据city排序
from TEST_DATA
group by nation -- 合并的依据是国家字段
```
* 结果
|nation|cites|
|--|--|
|中国|上海,北京,杭州|
|日本|东京|
|美国|波士顿,纽约|

# 高级用法
* `listagg(字段x,',') within GROUP (order by 字段y) over (partition by 字段z)`
  * 字段x：拼接的字段
  * 字段y：`字段x`在排序时，通过`字段y`进行排序
  * 字段z：类似于group by `字段z`
  * 总结一下：遍历每一行数据时，将`字段z`相等的数据拿过来，拼接其字段x & 排序是数据的`字段y`

## 示例：显示所有城市 & 对应城市国家的所有城市
* sql语句：

```sql
select city,
listagg(city, ',') within group(order by city) over (partition by nation) as cities
from TEST_DATA 
```

* 结果:
|CITY|CITIES|
|--|--|
|杭州|上海,北京,杭州|
|上海|上海,北京,杭州|
|北京|上海,北京,杭州|
|纽约|波士顿,纽约|
|波士顿|波士顿,纽约|
|东京|东京|


# 不同数据库的字符串拆分 & 合并函数
|操作|Oracle|MySql|SQL Server|PostgreSQL|SQLite|
|--|--|--|--|--|--|
|字符串合并|listagg()|group_concat|string_agg|string_agg|group_concat|
|字符串拆分|WITH|WITH|WITH|WITH|WITH|WITH|
|字符串拆分|PL/SQL|-|string_split|regexp+split_to_table|-|