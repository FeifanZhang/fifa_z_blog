---
title: SQL_distinct
toc: true
tags:
  - SQL
  - distinct
categories:
  - - SQL
    - distinct
date: 2022-01-12 20:47:09
---


# 本系列文章用到的表格示例
## dept (DEPARTMENT)
  
|Field|Type|Null|Key|Default|Detail|
|--|--|--|--|--|--|
|DEPTNO|INT(2)|NO|PRI|NULL||
|DNAME|VARCHAR(14)|YES||NULL||
|LOC|VARCHAR(13)|YES||NULL|员工地址|

## emp (EMPLOYEE)
  
|Field|Type|Null|Key|Default|detail|
|--|--|--|--|--|--|
|EMPNO|INT(4)|NO|PRI|NULL|
|ENAME|VARCHAR(10)|YES||NULL|
|JOB|INT(4)|YES||NULL|员工的职位|
|MGR|INT(4)|YES||NULL|员工对应的manager|
|HIREDATE|DATE|YES||NULL|
|SAL|DOUBLE(7,2)|YES||NULL|每月薪资|
|COMM|DOUBLE(7,2)|YES||NULL|每月补助|
|DEPTNO|INT(2)|YES||NULL|员工所在部门的编号|

## salgrade
  
  |Field|Type|Null|Key|Default|detail|
  |--|--|--|--|--|--|
  |grade|INT(4)|NO|PRI|NULL|
  |losal|DOUBLE(7,2)|YES||NULL|显示对应薪资等级的最低薪资| 
  |hisal|DOUBLE(7,2)|YES||NULL|显示对应薪资等级的最最高薪资|

* 举个例子

  |grade|losal|hisal|
  |--|--|--|
  |1|100|600|
  |2|601|1000|
* 1级薪资是在`100 ~ 600`之间
* 2级薪资是在`601 ~ 1000`之间



