# 搭建一张测试表
* 表名为TEST_DATA
|ID|NUM_TEST|
|--|--|
|1|1|
|2|2|
|3||

* `ID` 为自增字段；`NUM_TEST`为测试字段，可空

# NULL 对四则运算的影响
* sql语句
```sql
select NULL-1+2-1, NULL+1, NULL / 0, NULL * 1 FROM TEST_DATA
```
* 查询结果

|NULL-1+2-1| NULL+1| NULL / 0| NULL * 1|
|--|--|--|--|
|null|null|null|null|

* 总结：对于四则运算，只要含有`null`，则结果为`null`

# NULL 对函数运算的影响
## SUM
### 一般情况
```sql
select SUM(NUM_TEST), SUM(NVL(NUM_TEST, 0)) from TEST_DATA
```

|select SUM(NUM_TEST)| SUM(NVL(NUM_TEST, 0))|
|--|--|
|3|3|

通常情况下使用`SUM`时，会跳过null值数据，对其他数据进行相加操作

### SUM操作不存在的数据

* `ID = 999` 是数据库中不存在的数据
```sql
select SUM(NUM_TEST), SUM(NVL(NUM_TEST, 0)), NVL(SUM(NUM_TEST),0) from TEST_DATA WHERE ID = 999
```
| SUM(NUM_TEST) | SUM(NVL(NUM_TEST, 0))| NVL(SUM(NUM_TEST),0) |
|--|--|--|
|null|null|null|

* 当`where`筛选出**不存在**的数据时，`SUM`与`NVL`的各种组合最终结果都是`NULL`

## AVG
### 一般情况
`AVG` 也一样：将`NULL`去掉后，进行计算，（如果用`AVG(NVL(NUM_TEST, 0))`，NULL被替换为其他值，参与`AVG()`运算）

```sql
select AVG(NUM_TEST), AVG(NVL(NUM_TEST,0)), FROM TEST_DATA
```
|AVG(NUM_TEST)|AVG(NVL(NUM_TEST,0))|
|--|--|
|(1+2) / 2 = 1.5|(1+2+0) / 3 = 1|


### AVG操作不存在的数据
结果参考SUM
```sql
select AVG(NUM_TEST), AVG(NVL(NUM_TEST,0)), FROM TEST_DATA where t = 999
```
|AVG(NUM_TEST)|AVG(NVL(NUM_TEST,0))|
|--|--|
|null|null|


## MIN & MAX & COUNT
`MAX()`、`MIN()`、`COUNT()` 与`SUM`一样，将`NULL`去掉后，进行计算
```sql
select max(NUM_TEST), min(NUM_TEST), count(NUM_TEST) FROM TEST_DATA
```
| max(NUM_TEST) | min(NUM_TEST) | count(NUM_TEST) |
|--|--|--|
|2|1|2|

