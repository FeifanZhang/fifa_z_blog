# 多行处理函数简介
* 又称**分组函数**，特点是输入多行，经过函数处理后输出一行数据（如求和，求平均值等）
* **null值的处理**：使用分组函数进行计算时，函数会自动忽略null值
* **使用区域**：分组函数不得直接使用在`where`中，因为sql关键字的执行顺序：`from -> where -> group by -> select -> order by`，分组函数必须在`group by`之后使用(如果没有group by分组，则默认整个表为一组)，所以可以使用分组函数的关键词有:`select`, `order by`

# 多行处理函数汇总
|函数名|用途|参数|
|--|--|--|
|count|计数|
|sum|求和|
|avg|求均值|
|max|最大值|
|min|最小值|
|concat|字符串拼接|`concat(字符串1, 字符串2, ...)`|
* 注意：分组函数的使用，必须先分组，再使用；若没有进行分组，则整张表默认为一组

## count
* `count(字段名)` 与 `count(*)` 的区别
  * `count(字段名)`：该字段下所有不为null的元素总数
  * `count(*)`: 整张表元素的总数，因为 `*` 代表所有字段，`count(*)`表示计算所有至少一个字段不为null的元素个数。但一个元素中 primary key肯定不为null，所以用于计算整张表元素的总数
* 公司员工人数
  * `select count(ename) from emp;`
* 公司有补助的员工数(无员工补助则显示为null，会将其直接忽略)
  * `select count(comm) from emp;`

## sum
* 计算所有员工工资和
  * `select sum(sal) from emp;`
* 所有员工补助总和(有的员工补助为null，但sum会自动忽略掉null值)
  * `select sum(comm) from emp;`

## avg
* 计算员工平均工资
  * `select avg(sal) from emp;`

## max
* 找出员工中的最高工资
  * `select ename, max(sal) from emp;`

## min
* 找出员工的最低工资
  * `select ename, min(sal) from emp;`

## concat
* 字符串拼接
* `select concat(ename, empno) from emp;`

# group by
* 又称分组函数，用于将给定的字段进行分组
* 使用场景：在实际应用中，可能会遇到先将数据进行分组，再对每一组数据进行处理
* 用法：`select 字段名 from 表名 group by 字段名1, 字段名2;`
* group by中出现的字段必须出现在select中
* 书写顺序
  ```sql
  select ...
  from ...
  where ...
  group by ...
  order by ...;
  ```
* 查找各部门最高工资
  * `select max(sal), deptno from emp group by deptno;`
* 查找每个部门，不同工作岗位的最高薪资
  * `select deptno, max(sal) from emp group by deptno, job;`

# having
* 基于group by之后，对剩余数据进行第二次过滤(或者说过滤的条件会用到分组函数的情况)
* 不可单独使用，必须与group by 一同使用
* 找出每个部门最高薪资，且显示大于3000的
  * 方案一：
    * `select deptno, max(sal) from emp group by deptno having max(sal) > 3000;`
    * 效率较低：该语句是拿到每个部门的最高薪资，最后用`having`筛掉3000以下的。可以在`group by`之前，就筛选掉薪资3000以下的，这样`group by`以及后续关键字操作的数据量会少很多
  * 方案二：
    * `select deptno, max(sal) from emp where sal > 3000 group by deptno;`
* 如果用`where`可以解决，则首先用`where`，如果不行，则用`having`
* 一个`where`解决不了的问题：找出每个部门平均薪资，显示平均薪资高于2500的
  * `select deptno, avg(sal) from emp group by deptno having avg(sal) > 2500;`

# distinct
* 去掉重复的字段项
* `select distinct 字段1 from 表名;`
* distinct必须出现在若有字段的前面
  - **T** : `select distinct job, ename from emp;`
  - **F** : `select ename, distinct job from emp;`
* 统计工作岗位的数量
  * `select count(distinct job) from emp;`

# 关键字执行顺序
* from -> where -> group by -> having -> select -> order by
* 找出每个岗位的平均薪资，要求显示平均薪资大于2500的（manager除外），按照平均薪资降序排列
    ```sql
    select job, avg(sal) as avgsal
    from emp 
    where job <> 'manager' 
    group by job 
    having avg(sal) > 2500  # 此时未执行select，所以不能使用avgsal
    order by avgsal desc;  # 先执行的select 在执行 order by 所以可以使用 avgsal
    ```











