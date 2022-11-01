# 公共表达式
## 定义
* 公共表达式简称为**CTE**，是MySql8.0之后新添加的特性
* 本质：一个临时的结果集，作用域（执行范围）是单个sql语句内（`select`,`insert`,`delete`,`update`中）
* 特点：每个CTE之间可以相互调用，也可调用自身形成**递归**
* 分类：递归CTE & 非递归CTE
* 意义：简化了递归等复杂查询的写法，提升了查询效率

## CTE基础语法
```sql
/*第一种：对cte的列没限制*/
with cte1_table_name as (
    /*select查询语句*/
)

/*第一种：对cte的列有字段限制*/
with cte2_table_name (col1_name, col2_name ... coln_name) as (
    /*select查询语句，该语句中的字段顺序、字段名称要与col1_name, col2_name ... coln_name一样*/
)
```

# 递归CTE
## 基础示例
* 生成一张只有一列的表，显示1 - 5这几个数字

```sql
with recursive cte(n) AS( /*n 表示要展示的字段*/
    select 1  /*递归的初始化语句：第一次执行产生的结果*/
    union all
    select n+1 from cte where n < 5  /*from cte这里提现了递归，where`后面跟随的条件为递归出口条件，用于递归的结束*/
)
select * from cte;
```

## 步骤说明
* 第一步（`select 1`时）得到结果如下
  |n|
  |--|
  |1|

* 后面union all后, `select n + 1`时
  |n|
  |--|
  |1|
  |2|

* 以此类推 ... 一直到`n = 4`时 `select n + 1`后
  |n|
  |--|
  |1|
  |2|
  |3|
  |4|
  |5|

## 例题
* 

# 参考
* [MySQL递归CTE(公共表表达式)](https://www.yiibai.com/mysql/recursive-cte.html)