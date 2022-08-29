# 单行处理函数简介
* 也称**数据处理函数**, 特点是一个输入对应一个输出
* 与之相对的是**多行处理函数**：一次处理多个输入，最终得到一个输出，如 `sum`, `avg`
* 单行处理函数是可嵌套的，如取表emp中所有name的小写首字母:`upper(substr(name, 1, 1))`
* 任何出现了字段名的地方，都可以添加单行处理函数，如 select where等关键词后

# 单行处理函数汇总
|函数名|用途|用法|
|--|--|--|
|lower|转换小写|`lower(字段名)`|
|upper|转换大写|`upper(字段名)`|
|substr|取子串|`substr(字段名,截取起始下标，截取长度)`|
|length|取长度|`length(字段名)`|
|trim|去空格|`trim(字段名)` & `trim(字符串)`|
|str_to_date|字符串转日期|`str_to_date(str, '格式')`|
|date_format|日期格式化（日期转字符串）|
|format|设置千分位|
|round|四舍五入|`round(数字, 保留小数点后几位)`|
|rand()|生成随机数|
|ifnull|null转换为一个具体值|`ifnull(字段名, null转换成的具体值)`|

## lower
* 将所有人名字转成小写
  * `select lower(ename) from emp;`, 字段名称默认为`lower(ename)`
  * 通过`as`参数修改字段名：`select lower(ename) as lower_ename from emp;`

## upper
* 将所有人名字转成大写
  * `select upper(ename) from emp;`, 字段名称默认为`upper(ename)`
  * 通过`as`参数修改字段名：`select upper(ename) as upper_name from emp;`

## substr
* `substr(字段名,截取起始下标，截取长度)`
* 起始下标从1开始 不是0
* 截取员工姓名的首字母
  * `select substr(ename, 1, 1) from emp;`
* 查询员工首字母为a的人名
  * `select ename from emp where substr(ename, 1, 1) = 'A';`
  * 模糊查询：`select ename from emp where ename like 'A%';`
* 获取员工姓名首字母的小写（单行处理函数可嵌套）
  * `select upper(substr(ename, 1, 1)) from emp;`

## length
* 获取员工姓名长度
  * `select length(ename) as lengthename from emp;`

## trim
* 常用于更新数据时，去除数据的空格
* 找出名字为SMITH的员工
  * `select * from emp where ename = trim('    SMITH  ');`
  * 在实际应用中，匹配的员工姓名是从后台传入的，可能会带有空格，所以需要通过`trim`去除

## str_to_date
在MySql中格式化输出日期的信息至少是年月日，如果字符串中的信息只有年或年月，函数会自动进行补全
* 当 date = '2020-11'：`str_to_date(date, '%Y-%m')` -> 2020-11-00
* 当 date = '2020-11'：`str_to_date(date, '%Y')` -> 2020-00-00
* 若在查询以外的语句进行使用，很有可能会因为字符串`年月日缺失`或`年月日的格式问题`直接报错`error 1292: Truncated incorrect date value`

## case
* 相当于`switch`关键字
* `case 字段名 when 字段满足条件1 then doSth1 when 字段满足条件2 then doSth2 else doSth3 end`
* 员工工作岗位为manager时，工资上调 10%；岗位为salesman时，工资上调 50%。**注意**：(不修改数据库，仅修改显示的数据)
    ```sql
    select 
      job,
      ename,
      (case job when 'manager' then sal * 1.1 when 'salesname' then sal * 1.5 else sal end) as newSal,
    from emp ;
    ```

## round
* `round(小数，保留的小数位)`
  * **保留的小数位**: 0是保留整数，1是保留1位小数，以此类推；-1保留个位数，-2保留十位以此类推
* 举例
  * `round(3.1415, 0)` -> 3
  * `round(3.5, 0)` -> 4
  * `round(3.14, 1)` -> 3.1
  * `round(31, -1)` -> 30
  * `round(399, -2)` -> 400

## rand()
* 生成随机数(0 ~ 1)之间
* `rand()` -> 随机生成(0 ~ 1) 之间小数
* `round(rand()*100, 0)` -> 随机生成(0 ~ 100)之间的浮点数并四舍五入保留到整数位

## ifnull
* `ifnull`为空处理函数：将null转换成具体值
* 由于在数据库运算中 有null参与的数学运算最后结果都为null，所以需要`ifnull`将null转化为可计算的值
* 计算员工每个月拿到的工资 + 补助，若没有补助则数据库中`comm`显示`null`
  * `select sal + ifnull(comm, 0) as realSal from emp;`









