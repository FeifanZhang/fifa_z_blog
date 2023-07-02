* 作用：某一张表。存在一个id序列，添加记录时，id随着自动增长
* Oracle独有

# user_sequences
* 用于显示当前数据库的全部序列

|列名称|字段意思|类型|说明|
|--|--|--|--|
|SEQUENCE_NAME|序列名称|varchar||
|MIN_VALUE|最小值|varchar|小于等于起始值（起始值不在表中记录，而是创建时`start with` 放置在`LAST_NUMBER`字段，序列增长后覆盖）|
|MAX_VALUE|最大值|varchar|序列最大值，大于等于起始值|
|INCREMENT_BY|步长|number|调用`nextval`时序列增加的值|
|CYCLE_FLAG|是否循环|varchar|到达最大值后。是否从最小值重新开始 枚举S & N|
|ORDER_FLAG||varchar|
|CACHE_SIZE|缓存大小|number|表示缓存序列数字的个数，小于cycle值（循环次数）|
|LAST_NUMBER|当前序列的最大数值|number|

# 创建序列
* 基础语法
```
create sequence seq_name --seq_name: 序列名称
[start with n]  --序列起始值
[INCREMENT BY]  --步长
[{minvalue n | nominvalue}]  --最小值（小于等于起始值或置为 `nominvalue`）
[{maxvalue n | nomaxvalue}]  --最大值(大于等于起始值)
[{cycle n | nocycle}]  --是否循环
[{cache n | nocache}]  --是否设置缓存 小于cycle值，缓存可提高效率，但缓存大小不宜过大
```

* 实例
```sql
CREATE SEQUENCE t1_sql
    START WITH 1  -- LAST_NUMBER
    INCREMENT BY 1  -- INCREMENT_BY
    NOMINVALUE  -- MIN_VALUE
    NOMAXVALUE  -- MAX_VALUE
   CACHE 20;  -- 缓存20个数字
```


# 使用序列
## 查询序列的当前值
```sql
select t1_sql.currval from dual
```
* 注意：必须在序列有过一次增长(`nextval`)后，才能获取当前值

## 获取序列下一个值
```sql
select t1_sql.nextval from dual
```
