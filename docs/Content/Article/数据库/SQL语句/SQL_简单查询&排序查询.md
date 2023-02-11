# select where基础用法
* 获取单字段：`select 字段名 from 表名;`
* 获取多字段：`select 字段名1, 字段名2 from 表名;`
* 获取全部字段: `select * from 表名`，尽量不要在开发中使用，效率较低
  
# as用法
* `select 字段名 as 替换成的字段名 from 表名`
* 举例说明
  * 给选取的列起‘别名’
    * `select deptno as deptnum from dept;`
    * 返回结果会将`deptno`转换成`deptnum`
  * 省略as的做法
    * `select deptno deptnum from dept;`
  * '别名’带有空格
    * `select deptno 'dept num' from dept;`
  * '别名'有中文
    * `select deptno '部门编号' from dept;` 
    * **(不管是否有空格都要用单引号括起来)**
  * 多字段"别名"
    * `select deptno deptnum, dname deptname from dept;`
* 注意：
  * 仅将查询结果列名进行替换，而不会对原表字段产生影响
  * 数据库中用引号的地方，一定要用单引号，双引号oracle数据库不识别
  * 别名为中文，必须单引号括起来

# 数学运算
## 乘法
* 已知`emp`表中`sal`是员工一个月收入，求年薪
* `select ename, sal*12 from emp;` 但注意最后出现的字段名是`ename` & `sal*12`，所以需要用`as`改变字段名

# order by
## 单字段排序
* 根据`order by`后面的字段名进行排序
* 用法: 
  * `select * from 表名 order by 字段名;`（默认为升序）
  * 指定降序：`select * from 表名 order by 字段名 desc;`
  * 指定升序：`select * from 表名 order by 字段名 asc;`
* 除字段名以外，可以输入该字段在表中第几列进行查询
  * 查询所有员工并以升序排列(若工资在表中第二列)，了解即可，极其不推荐
  * `select * from emp order by 2;`

## 多个字段排序
* 查询所有员工并以升序排列（若薪资相等，则以名字升序排列）
    * `select * from emp order by sal asc, ename asc;`

## 综合一下
* `select * from emp where sal between 1250 and 3000 order by sal desc;`
* 注意:
  * 关键字顺序不可改变必须是这样：
    ``` sql
    select ... 
    from ... 
    where ... 
    order by ...;
    ```
  * 执行顺序：`from`,`where`,`select`,`order by`（排序永远最后）





