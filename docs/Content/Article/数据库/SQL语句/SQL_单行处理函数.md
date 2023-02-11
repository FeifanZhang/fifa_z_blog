# 单行处理函数简介
* 也称**数据处理函数**, 特点是一个输入对应一个输出
* 与之相对的是**多行处理函数**：一次处理多个输入，最终得到一个输出，如 `sum`, `avg`
* 单行处理函数是可嵌套的，如取表emp中所有name的小写首字母:`upper(substr(name, 1, 1))`
* 任何出现了字段名的地方，都可以添加单行处理函数，如 select where等关键词后

# 单行处理函数汇总
|函数名|用途|用法|适用的数据库|
|--|--|--|--|
|lower|转换小写|`lower(字段名/字符串)`|mysql & oracle|
|upper|转换大写|`upper(字段名/字符串)`|mysql & oracle|
|substr|截取字符串|`substr(字段名/字符串,截取起始下标，截取长度)` 或 `substr(字段名/字符串,截取起始下标)`，mysql中可以用`substring()`替换|mysql & oracle|
|left|从字符串左侧取子串|`left(字段名/字符串, 截取长度)`|mysql & oracle|
|right|从字符串右侧取子串|`right(字段名/字符串, 截取长度)`|mysql & oracle|
|concat|字符串拼接|`concat(字段名1/字符串1, 字段名2/字符串2)`|mysql & oracle|
|length|取长度|`length(字段名)`|mysql & oracle|
|trim|去空格|`trim(字段名)` & `trim(字符串)`|mysql & oracle|
|str_to_date|字符串转日期|`str_to_date(str, '格式')`|mysql & oracle|
|diffdate()|日期差值|`DIFFDATE(日期单位,startdate,enddate)`|mysql & oracle|
|day,month,year|获取日期的天、月、年|`day(字段名)`|mysql|
|datepart|获取日期的信息|`datepart(时间单位, 日期字段)`|
|dateadd|日期增加|`dateadd(日期单位, 增加的日期长度,时间字段)`||
|date_sub|日期减少|`date_sub(日期单位, 减少的日期长度,时间字段)`||
|datename|获取日期的信息（同`datepart`）|||
|getdate|获取当前日期|`getdate()`||
|quarter|获取日期的季度值（返回值为1~4）|`quarter(日期字段/日期值)`||
|dayOfWeek|回去当前日期为星期几|`dayOfWeek()`||
|date_format|日期格式化（日期转字符串）||mysql & oracle|
|format|设置千分位||mysql & oracle|
|round|四舍五入|`round(数字, 保留小数点后几位)`|mysql & oracle|
|MOD|取余数|`MOD(除数, 被除数)`|mysql & oracle|
|rand()|生成随机数||mysql & oracle|
|ifnull|对应字段为`null`,则用`defaultValue`代替|`ifnull(字段名, defaultValue)`|mysql|
|isnull|若`exper`为空返回1，非空返回0|`isnull(exper) `|mysql|
|nullif|`exper1`=`exper2`，则返回null,其余的返回`exper1`|`nullif(exper1, exper2)`|mysql & oracle|


## lower
* 将所有人名字转成小写
  * `select lower(ename) from emp;`, 字段名称默认为`lower(ename)`
  * 通过`as`参数修改字段名：`select lower(ename) as lower_ename from emp;`

## upper
* 将所有人名字转成大写
  * `select upper(ename) from emp;`, 字段名称默认为`upper(ename)`
  * 通过`as`参数修改字段名：`select upper(ename) as upper_name from emp;`

## substr
* 起始下标从1开始 不是0
* 空格也算1个长度
* 起始下标为负数，表示从后往前截取
* `substr(字段名,截取起始下标，截取长度)`
  * 截取员工姓名的首字母
    * `select substr(ename, 1, 1) from emp;`
  * 查询员工首字母为a的人名
    * `select ename from emp where substr(ename, 1, 1) = 'A';`
    * 模糊查询：`select ename from emp where ename like 'A%';`
  * 获取员工姓名首字母的小写（单行处理函数可嵌套）
    * `select upper(substr(ename, 1, 1)) from emp;`
  * 从后往前截取字符串
    ```sql
    select substr('HelloWorld',-1,3) value from dual; --返回结果：d （代码原意为从后面倒数第一位开始往后取3个字符，但倒数第一位后面字符长度不够3，所以仅返回最后一个字符）
    select substr('HelloWorld',-2,3) value from dual; --返回结果：ld （仅返回2个字符的原因同上）
    select substr('HelloWorld',-3,3) value from dual; --返回结果：rld （从后面倒数第三位开始往后取3个字符）
    select substr('HelloWorld',-4,3) value from dual; --返回结果：orl （从后面倒数第四位开始往后取3个字符）
    ```
* `substr(字段名,截取起始下标)`
  * 截取该下标后面的全部字符串
    ```sql
    select substr('HelloWorld',0) value from dual;  --返回结果：HelloWorld，截取所有字符
    select substr('HelloWorld',1) value from dual;  --返回结果：HelloWorld，截取所有字符
    select substr('HelloWorld',2) value from dual;  --返回结果：elloWorld，截取从“e”开始之后所有字符
    select substr('HelloWorld',3) value from dual;  --返回结果：lloWorld，截取从“l”开始之后所有字符
    select substr('HelloWorld',-1) value from dual;  --返回结果：d，从最后一个“d”开始 往回截取1个字符
    select substr('HelloWorld',-2) value from dual;  --返回结果：ld，从最后一个“d”开始 往回截取2个字符
    select substr('HelloWorld',-3) value from dual;  --返回结果：rld，从最后一个“d”开始 往回截取3个字符
    ```

## length
* 获取员工姓名长度
  * `select length(ename) as lengthename from emp;`

## trim
* 常用于更新数据时，去除数据的空格
* 找出名字为SMITH的员工
  * `select * from emp where ename = trim('    SMITH  ');`
  * 在实际应用中，匹配的员工姓名是从后台传入的，可能会带有空格，所以需要通过`trim`去除

## 日期相关函数
### 日期单位
做日期之间的加减法，最后的结果会因为单位不同,而返回值不同（日期`2022-12-10`与`2021-12-10`相减，以`天`为单位,则返回365，以`年`为单位，则返回1）。**日期单位**会以第一个参数的形式传递给时间操作函数(`dateDiff()、datepart()、dateAdd()`)
*  `日期单位`: 表明返回的日期单位（年，月，日等）

    |参数|缩写|备注|
    |--|--|--|
    |year|yy, yyyy|年|
    |quarter|qq,q|季度|
    |month|mm,m|月|
    |dayofyear|dy,y|一年中的第几天|
    |day|dd,d|日|
    |week|wk，ww|一年中的第几周|
    |weekday|dw|星期几（返回`1`为周日，`2`为周一 ... 7为周六）|
    |Hour|hh|小时|
    |minute|mi,n|分钟|
    |second|ss,s|秒|
    |millisecond|ms|毫秒|
    |mns|mns|微秒|
    |ns|ns|纳秒|

### str_to_date
在MySql中格式化输出日期的信息至少是年月日，如果字符串中的信息只有年或年月，函数会自动进行补全
* 当 date = '2020-11'：`str_to_date(date, '%Y-%m')` -> 2020-11-00
* 当 date = '2020-11'：`str_to_date(date, '%Y')` -> 2020-00-00
* 若在查询以外的语句进行使用，很有可能会因为字符串`年月日缺失`或`年月日的格式问题`直接报错`error 1292: Truncated incorrect date value`

### dateDiff()
* 函数用于计算两个日期之间的差值`dateDiff(日期单位,startDate,endDate)`
  * 日期单位：前文已经有解释
  * `startDate` & `endDate`: 起始日期 & 结束日期
* `SELECT dateDiff(day,'2008-12-29','2008-12-30') AS DiffDate`
  * 结果

    |DiffDate|
    |--|
    |1|

* `SELECT dateDiff(day,'2008-12-30','2008-12-29') AS DiffDate`
  * 结果

    |DiffDate|
    |--|
    |-1|

### dateadd & date_sub
* 函数用于增加 / 减少当前时间: `dateadd(日期单位, 增加的日期长度,时间字段)` & `date_sub(日期单位, 增加的日期长度,时间字段)`
  * 日期单位：以上文介绍的`日期单位`为准
  * 增加的日期长度：数字，正负皆可
* `dateadd(year, 1, create_time)`: create_time + 1年
* `dateadd(year, -1, create_time)`: create_time - 1年
* `date_sub(m, 2, create_time)`: create_time + 2月
* `date_sub(m, -2, create_time)`: create_time - 2月


## case
* 相当于`switch`关键字
* `case 字段名 when 字段满足条件1 then doSth1 when 字段满足条件2 then doSth2 else doSth3 end`
* 员工工作岗位为manager时，工资上调 10%；岗位为salesman时，工资上调 50%。**注意**：(不修改数据库，仅修改显示的数据)
    ```sql
    select 
      job,
      ename,
      (case job when 'manager' then sal * 1.1 when 'salesname' then sal * 1.5 else sal end) as newSal
    from emp;
    ```
* 除了上述的简单条件判断以外，还可以通过`and`进行复杂条件判断
  * `case when 条件1 and 条件2 then doSth0 when 条件3 and 条件4 then doSth1 else doSth2 end`
  * 员工工作`岗位为manager` 且`工资<3000`时，工资上调 10%；`岗位为salesman` 且 `工资<1000`时，工资上调 50%。**注意**：(不修改数据库，仅修改显示的数据)
    ```sql
    select
      job,
      ename,
      (case
      when job = 'manager' and sal < 3000 then sal*1.1
      then job = 'salesman' and sal <1000 then sal*1.5) as newSal
      from emp;
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
* 注意：oracle中关键字为`nvl()`
  * `select sal + nvl(comm, 0) as realSal from emp;`

# 参考
* [SQL-DATEDIFF()](https://blog.csdn.net/qq_43223477/article/details/118960747)
* [SQL 日期函数 day() 、month()、year() 各种使用方法](https://blog.csdn.net/LQZ8888/article/details/113681410)
* [Mysql常用函数之Rank排名函数](https://blog.csdn.net/weixin_42272869/article/details/116372776)
* [Oracle中的substr()函数 详解及应用](https://www.cnblogs.com/dshore123/p/7805050.html)









