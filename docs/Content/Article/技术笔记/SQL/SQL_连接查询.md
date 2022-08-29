# 连接查询
* 查找一张表的内容，称之为单表查询，查询时需要多张表联合查找，称之为连接查询
* **SQL连接查询的分类** : 
  * 根据年代进行划分
    * SQL92：1992年出现的语法（现在不管了）
    * SQL99：1999年出现的语法
  * **根据表连接的方式分类** ：
    * 内连接
      * 等值连接
      * 非等值连接
      * 自连接
    * 外连接
      * 左外连接（左连接）
      * 右外连接（右连接）
    * 全连接

# 内连接 (inner join)
* `from 表名1 inner join 表名2 on 等值连接条件 where 其他条件;`
* `on`与`where`区别：
  * `on` 后面只能跟表连接条件，其余的条件筛选写在`where`后面
  * 连接查询时会生成一张中间表，`on`是在中间表生成时使用的条件，`where`则是中间表生成后，对该表进行过滤使用
* `inner join`简写成`join`

## 等值连接
* 查询每个员工所在部门名称，显示员工名 & 部门名称

  ```sql
  select 
    e.ename, d.dname
  from 
    emp e 
  join 
    dept d
  on 
    e.deptno = d.deptno; //因为on中的条件为等量关系故称为等值链接
  ```

## 非等值连接
* 找出每个员工的薪资等级，显示员工名，薪资以及薪资等级
  ```sql
  select 
    e.ename, e.sal, s.grade
  from
    emp e
  join
    salgrade s
  on
    e.sal between s.losal and s.hisal;  //条件不是一个等量关系，称之为非等值链接
  ```

## 自连接
* 查询员工以及对应的经理，显示员工以及经理姓名
  ```sql
  select 
    e1.ename as emp_name, e2.ename as mgr_name
  from
    emp e1
  join
    emp e2
  on
    e1.mgr = e2.empno;
  ```

# 外连接
## right join & left join
* `select from 表1 right join 表2 on 条件;`
  * 左外连接是指join左侧的主表（即表1）无论满足`on`条件与否，都会显示在结果（表2数据不满足匹配条件会显示null）
* `select from 表1 left join 表2 on 条件;`
  * 右外连接是指join右侧的主表（即表2）无论满足`on`条件与否，都会显示在结果（表1数据不满足匹配条件会显示null）

### 例题
* 查询每个员工上级领导姓名，显示所有员工姓名 & 领导名字
  ```sql
  select 
    e1.ename as empname, e2.ename as mgrname
  from
    emp e1
  left join
    emp e2
  on e1.mgr = e2.empno;
  ```
  * 所有员工名都会显示，若没有领导则`mgrname`显示null

# 两张以上的表链接
```sql
select ...
from a
join b
on a,b的条件
join c
on a,c的条件
join d
on a,d的条件;
```
* 一条sql语句中 内外连接可以混用

## 例题
* 找出每个员工部门名称 & 工资等级，要求显示员工名、部门名称、薪资、薪资等级
  ```sql
  select e.ename, d.dname, e.sal, s.grade
  from emp e
  join dept d
  on e.deptno = d.deptno
  join salgrade s
  on e.sal between s.lowsal and s.hisal;
  ```
* 找出每个员工部门名称以及工资等级 & 上级领导，要求显示员工名、领导名、薪资、薪资等级
  ```sql
  select e.ename, l.ename, s.sal, s.grade
  from emp e
  left join emp l
  on e.mgr = l.empno
  join dept d
  on e.deptno = d.deptno
  join salgrade s
  on e.sal between s.losal and s.hisal;
  ```






