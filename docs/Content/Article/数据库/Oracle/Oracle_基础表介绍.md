# ALL_CONSTRAINTS 
当前库中的所有约束信息（下表仅对部分常见字段进行说明）

|列名称|字段简介|类型|说明|
|--|--|--|--|
|OWNER|约束用户名称|||
|CONSTRAINT_NAME|约束名称|varchar|该约束的唯一ID，与其他约束相关的表联结时，可用于外键|
|CONSTRAINT_TYPE|约束类型|varchar|U:唯一，R:外键，C：not null， P:主键|
|TABLE_NAME|表名称|varchar||


# ALL_CONS_COLUMNS 
当前库所约束的表和字段

|列名称|字段意思|类型|说明|
|--|--|--|--|
|OWNER||||
|CONSTRAINT_NAME|约束名称|varchar|该约束的唯一ID，与其他约束相关的表联结时，可用于外键|
|TABLE_NAME|表名称|varchar|该约束对应的表名称|
|COLUMN_NAME|列名称|varchar|该约束对应的列|

# ALL_COL_COMMENTS
* 当前数据库所有字段的COMMENT

|列名称|字段意思|类型|说明|
|--|--|--|--|
|OWNER||||
|TABLE_NAME|表名称|varchar|该约束对应的表名称|
|COLUMN_NAME|列名称|varchar|该约束对应的列|
|COMMENTS|字段的COMMENT描述|varchar||


# 示例
## 获取表对应的主键
通过 `ALL_CONSTRAINTS` 找到表所有的约束，再联结`ALL_CONS_COLUMNS` 查找主键
```sql
select a.column_name 
from all_cons_columns a, all_constraints b 
where a.constraint_name = b.constraint_name 
and b.constraint_type = 'P' and a.table_name = 'TABLE_TEST'
```
## 获取字段对应的COMMENT
```sql
select COMMENTS from ALL_COL_COMMENTS where TABLE_NAME = 'TABLE_TEST' AND COMMENTS = 'COL_TEST'
```

## 获取主键对应的COMMENT
```sql
select c.COMMENTS
from all_cons_columns  a, all_constraints b, all_col_comments c
where a.constraint_name = b.constraint_name 
and b.constraint_type = 'P' 
and a.table_name = 'TABLE_TEST' 
and c.TABLE_NAME= 'TABLE_TEST' 
and c.COLUMN_NAME = a.COLUMN_NAME
```
# 参考
* [简介](https://wenku.baidu.com/view/e15cc0c75df7ba0d4a7302768e9951e79b8969a6.html)
* [约束 oracle,Oracle中的约束](https://blog.csdn.net/weixin_39941732/article/details/116441606)