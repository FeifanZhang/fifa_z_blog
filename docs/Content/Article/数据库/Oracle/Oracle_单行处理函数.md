文章仅对mysql有区别的单行处理函数进行说明

# 单行处理函数汇总  

|函数名|用途|用法|
|--|--|--|
|nvl|oracle版`ifnull`，表达的意思，输入参数与`ifnull`完全一样|`nvl(字段名, defaultValue)`|
|nvl2|如果`value1`为null，返回`value3`, 否则返回`value2`|`nvl2(value1, value2, value3)`|
|coalesce|前面为若干变量，最后一个为默认值；从第一个表达式开始读取，返回第一个非空值；若所有表达式都为null，返回最后的默认值|`coalesce(value1, value2, ... , valueN, 默认值)`|
|decode|第一个参数为变量, 程序会按顺序遍历value1 ~ valueN,返回与变量相等的value; 若未发现相等的value,返回默认值|`decode(变量名, value1, value2, ..., valueN, 默认值)`|
|to_char|将日期格式化的转为字符串|`to_char(sysdate, 'yyyy-mm-dd')`|
|`\|\|`|用于字符串拼接|`select a \|\| b from dual` |

## null对sql语句计算的影响
* `where`语句中，判断是否为空，只能用`is null` 和 `is not null`
* 数字计算，只要变量含有null，则整个计算结果为null（举例：无论是`20 = null` 或是 `20 <> null`，最后返回的结果都是null）
* 布尔类型计算：
  * or :`false or null = null`； `true or null = true`
  * and : `false and null = false`； `true and null = null`
  * 原因：null从概念角度，是未知的；null进行布尔计算式时，就是布尔类型（具体是true 还是 false无所谓）。一个布尔类型与`false`做`and`运算，最终一定是false；布尔类型与`true`做`and`计算，最终结果一定是true
* `in()` 参数包含null时，系统会将null忽略；`not in()` 包含null，则不会有结果返回
  * `in()`表达式解析
     ```sql
     select * from dept where id in (10, 20, null)

     -- in语句中个参数都是 or 关系，所以上文sql等价如下:
     select * from dept where id = 10 or id = 20 or id = null

     -- 因为表达式`id = null` = null， 所以上文sql中翻译如下
     select * from dept where id = 10 or id = 20 or null -- 此时，id = 10 或 20，整个表达式为true
     ```
  * `not in()`表达式解析
     ```sql
     select * from dept where id not in (10, 20, null)

     -- in语句中个参数都是 or 关系，所以上文sql等价如下:
     select * from dept where id <> 10 and id <> 20 and id <> null

     -- 因为表达式`id <> null` = null， 所以上文sql中翻译如下
     select * from dept where id <> 10 and id <> 20 and null
     /* 此时分为三种情况：
          true and false and null  -> false
          false and false and null -> false
          false and true and null -> false
        综上所述，无论哪种情况，返回值都是false，故not in()参数包含null时，不会返回任何值
     */
     ```
* 总结：当中间结果可能出现null时，要通过各种函数（`nvl`、`nvl2`、`coalesce()`、`decode()`函数消除null）

## nvl
* `nvl`为空处理函数：将null转换成具体值
* 由于在数据库运算中 有null参与的数学运算最后结果都为null，所以需要`ifnull`将null转化为可计算的值
* 计算员工每个月拿到的工资 + 补助，若没有补助则数据库中`comm`显示`null`
  * `select sal + nvl(comm, 0) as realSal from emp;`

## to_char()

<table>
<tr>
    <th>模板</th>
    <th>描述</th>
</tr>
<tr>
     <td>HH</td>
     <td>一天的小时数 (01-12)</td>
</tr>
<tr>
     <td>HH12</td>
     <td>一天的小时数 (01-12)</td>
</tr>
<tr>
     <td>HH24</td>
     <td>一天的小时数 (00-23)</td>
</tr>
<tr>
     <td>MI</td>
     <td>分钟 (00-59)</td>
</tr>
<tr>
     <td>SS</td>
     <td>秒 (00-59)</td>
</tr>
<tr>
     <td>SSSS</td>
     <td>午夜后的秒 (0-86399)</td>
</tr>
<tr>
     <td>AM or A.M. or PM or P.M.</td>
     <td>正午标识（大写）</td>
</tr>
<tr>
     <td>am or a.m. or pm or p.m.</td>
     <td>正午标识（小写）</td>
</tr>
<tr>
     <td>Y,YYY</td>
     <td>带逗号的年（4 和更多位）</td>
</tr>
<tr>
     <td>YYYY</td>
     <td>年（4和更多位）</td>
</tr>
<tr>
     <td>YYY</td>
     <td>年的后三位</td>
</tr>
<tr>
     <td>YY</td>
     <td>年的后两位</td>
</tr>
<tr>
     <td>Y</td>
     <td>年的最后一位</td>
</tr>
<tr>
     <td>BC or B.C. or AD or A.D.</td>
     <td>年标识（大写）</td>
</tr>
<tr>
     <td>bc or b.c. or ad or a.d.</td>
     <td>年标识（小写）</td>
</tr>
<tr>
     <td>MONTH</td>
     <td>全长大写月份名（9字符）</td>
</tr>
<tr>
     <td>Month</td>
     <td>全长混合大小写月份名（9字符）</td>
</tr>
<tr>
     <td>month</td>
     <td>全长小写月份名（9字符）</td>
</tr>
<tr>
     <td>MON</td>
     <td>大写缩写月份名（3字符）</td>
</tr>
<tr>
     <td>Mon</td>
     <td>缩写混合大小写月份名（3字符）</td>
</tr>
<tr>
     <td>mon</td>
     <td>小写缩写月份名（3字符）</td>
</tr>
<tr>
     <td>MM</td>
     <td>月份 (01-12)</td>
</tr>
<tr>
     <td>DAY</td>
     <td>全长大写日期名（9字符）</td>
</tr>
<tr>
     <td>Day</td>
     <td>全长混合大小写日期名（9字符）</td>
</tr>
<tr>
     <td>day</td>
     <td>全长小写日期名（9字符）</td>
</tr>
<tr>
     <td>DY</td>
     <td>缩写大写日期名（3字符）</td>
</tr>
<tr>
     <td>Dy</td>
     <td>缩写混合大小写日期名（3字符）</td>
</tr>
<tr>
     <td>dy</td>
     <td>缩写小写日期名（3字符）</td>
</tr>
<tr>
     <td>DDD</td>
     <td>一年里的日子(001-366)</td>
</tr>
<tr>
     <td>DD</td>
     <td>一个月里的日子(01-31)</td>
</tr>
<tr>
     <td>D</td>
     <td>一周里的日子(1-7；SUN=1)</td>
</tr>
<tr>
     <td>W</td>
     <td>一个月里的周数</td>
</tr>
<tr>
     <td>WW</td>
     <td>一年里的周数</td>
</tr>
<tr>
     <td>CC</td>
     <td>世纪（2 位）</td>
</tr>
<tr>
     <td>J</td>
     <td>Julian 日期（自公元前4712年1月1日来的日期）</td>
</tr>
<tr>
     <td>Q</td>
     <td>季度</td>
</tr>
<tr>
     <td>RM</td>
     <td>罗马数字的月份（I-XII；I=JAN）－大写</td>
</tr>
<tr>
     <td>rm</td>
     <td>罗马数字的月份（I-XII；I=JAN）－小写</td>
</tr>
</table>

## \|\| 的用法
* 用于拼接
  ```sql
  select a || b from dual -- 将 a b 两个字段进行拼接
  select a || '*' || b  -- 将 a b 通过 * 拼接
  ```

# 参考
* [oracle怎么将日期转为字符串](https://www.php.cn/oracle/489480.html)
* [Oracle 中的 NULL 值解析](https://mp.weixin.qq.com/s?__biz=MjM5MzExMTU2OQ==&mid=208458155&idx=1&sn=edfb86f72011072a4143eb618f003dc3&chksm=2f047ad51873f3c36e617d2cb33730ce854bff169b84753531f4a359686c822e1381fbc634ff&scene=27)