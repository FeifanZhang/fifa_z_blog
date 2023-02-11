# 子查询
* sql语句中嵌套`select`查询，被嵌套的`select`语句称为子查询
* 子查询可以出现在`select`、`from` 以及`where`语句中

## where中的子查询
* 比最低工资高的员工姓名 & 工资
  ```sql
  select ename, sal
  from emp
  where 
    sal > ( select min(sal) from emp);
  ```

## from中的子查询
* from后面的子查询，是将子查询的结果作为一张临时表
* 找出每个岗位的平均工资等级
  ```sql
  select a.job, s.grade
  from(
    select avg(sal) as avgsal, job
    from emp
    group by job) as a
  join
    salgrade as s
  on a.avgsal between s.losal and s.hisal
  ```
* 子查询中使用了多行处理函数时，要用`as`重命名,不然在嵌套外调用会报错（在上个例题中子查询`avg(sal)`若未重命名，则`on a.avg(sal)`在编译时会认为是一个函数而不是`a`表中的列）

## select中的子查询
* 没啥用，用内外连接代替






