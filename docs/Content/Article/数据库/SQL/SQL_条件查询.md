# 条件查询简介
* 条件查询是指当进行数据库查询时添加了限制条件，限制条件会添加在where关键词之后
* 语法格式
  ```sql
  select 
    字段1, 字段2 ... 字段3
  from 
    表名
  where 
    条件;
  ```

# 条件查询关键字
  |运算符|说明|
  |--|--|
  |=|等于|
  |<> 或 !=|不等于|
  |>|大于|
  |>=|大于等于|
  |<|小于|
  |<=|小于等于|
  |between a and b|在 a, b之间(等价于 a >= and <= b) a为左边界，b为右边界|
  |is null|是否为NULL（is not null不为空）|
  |and|并且|
  |or|或者|
  |in|包含，相当于多个 or|
  |not|not可以取非，应用于is和in中|
  |Exists()|关键词括号里的sql语句执行后有数据时，则exists判断为true|
  |like|like为模糊匹配支持`%`,`_`匹配，`%`匹配任一字符，一个`_`匹配一个字符 |
  |is not|和`<>`与`!=` 相比，多了一个判断是否为null|

## 等于，不等于，大于，小于，大于等于，小于等于
* 查询工资为800的员工
  * `select ename, empno from emp where sal = 800;`
* SMITH员工编号和薪资
  * `select empno, sal, from emp where ename = 'SMITH';`
* 查询工资不等于800的员工
  * `select ename, empno from emp where sal != 800;`
  * `select ename, empno from emp where sal <> 800;`
* 查询工资小于800的员工
  * `select ename, empno from emp where sal < 800;`
* 查询工资大于800的员工
  * `select ename, empno from emp where sal > 800;`
* 查询工资小于等于800的员工
  * `select ename, empno from emp where sal <= 800;`
* 查询工资大于等于800的员工
  * `select ename, empno from emp where sal >= 800;`

## between and
* 查询薪资在 2000 ~ 3000的员工
  * `select * from emp where sal between 2000 and 3000;`
  * **若不使用`between and`**:`select * from emp where sal >= 2000 and sal <= 3000;`
* 注意
  * between a and b中， a为左边界，b为右边界，且两端为闭区间（可以等于边界值） 

## is null & is not null
* 查询是否为null 只能用 is 不能用 `=`,因为`=`用于与值进行比较，而`null`代表空，不是一个值，所以用`is null`
* 列出所有有补助的员工
  * `select * from emp where comm is null;` 
* 列出所有有补助的员工
  * `select * from emp where comm is not null;`

## and & or
### and
* `select 字段名 from 表名 where 条件1 and 条件2 and ...`
* 筛选出满足所有条件的数据
* 查询岗位是 manager 且工资大于2500的员工
  * `select * from emp where job='manager' and sal > 2500;`

### or
* `select 字段名 from 表名 where 条件1 or 条件2 or ...`
* 查询职级为 SALESMAN 以及 MANAGER 两个级别的员工
  * `select * from emp where job='SALESMAN' or job='MANAGER';`

### and & or同时使用
* **优先级**：and 优先级较高于 or，如果需要改变优先级，加`()`即可
* 查询 薪水高于 2500 中，部门编号为 10 和 20的全部员工
  ```sql
  select *
  from emp
  where sal > 2500 and (deptno = 10 or deptno = 20);
  ```

## in & not in
### 用法
* 查询职级为 SALESMAN 以及 MANAGER 两个级别的员工
  * `select * from emp where job in ('MANAGER', 'SALESMAN');`
* 查询薪资为 800 & 5000的员工信息
  * `select * from emp where sal in (800, 5000);`
* 查询职级**除** SALESMAN 以及 MANAGER 两个级别**以外**的员工
  * `select * from emp where job not in ('MANAGER', 'SALESMAN');`
* 注意：
  * in 后面的参数并不是一个区间，而是条件的枚举（区间用`between and`）

### in & not in 条件包含空值
* 当 `in()`或`not in()`中包含null时，需要单独考虑
* 比如：下表名为`Names`

  |id|name|
  |--|--|
  |1|null|
  |2|Jack|
  |3|Nick|
  |4|Philip|
  ```sql
  select id from names where name in (null)  /*即使有name为空的id，返回值仍为空*/

  select id from names where name in (null, 1)  /*只会返回1，会直接无视掉name为null的数据*/

  select id from names where name not in (null) /*只要not in 中包含null，直接返回空*/

  select id from names where name not in (null, 1, 2) /*只要not in 中包含null，直接返回空*/
  ```

* 多个字段使用`in` + 子查询
  * [LeetCode184. 部门工资最高的员工](https://leetcode.cn/problems/department-highest-salary/)

## Exists & not Exists
* 与 `in & not in`相近，当`Exists`后面的表达式有返回值时，则对该条数据的判断为true
* 判断客户表（Customers）中，有哪些人没有订单（Order）[LeetCode 183. 从不订购的客户](https://leetcode.cn/problems/customers-who-never-order/submissions/)
  ```sql
    select name as Customers from Customers C where not exists (
      select 1 from Orders O where O.CustomerId = C.id
    )
  ```
  `select 1`表明不关心`exists`里面的细节，只要有返回值则为true

## like (模糊查询)
* `select 字段名 from 表名 where 字段名 like '条件';`
* `条件`中包含的模糊查询字符
  * `%` 代表任意多个字符
  * `_` 代表任意一个字符
  * 若要取消转义，符号前加`\`即可（`\%` & `\_`）
* 找出名字中含有o的员工信息
  * `select * from emp where ename like '%o%';`
* 找出名字结尾是T的员工
  * `select * from emp where ename like '%T';`
* 找出名字开头为T的员工
  * `select * from emp where ename like 'T%';`
* 名字第二个字母为T的员工
  * `select * from emp where ename like '_T%';`
* 找出名字中带有下划线的人
  * `select * from emp where ename like '%\_%';`

# 参考
* [SQL语句中in和not in条件包含null的注意点](https://blog.csdn.net/zijikanwa/article/details/116121998)
