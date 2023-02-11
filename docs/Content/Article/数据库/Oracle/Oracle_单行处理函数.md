文章仅对mysql有区别的单行处理函数进行说明

# 单行处理函数汇总  

|函数名|用途|用法|
|--|--|--|
|nvl|oracle版`ifnull`，表达的意思，输入参数与`ifnull`完全一样|`nvl(字段名, defaultValue)`|
|nvl2|如果`value1`为null，返回`value3`, 否则返回`value2`|`nvl2(value1, value2, value3)`|
|to_char|将日期格式化的转为字符串|`to_char(sysdate, 'yyyy-mm-dd')`|

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

## nvl
* `nvl`为空处理函数：将null转换成具体值
* 由于在数据库运算中 有null参与的数学运算最后结果都为null，所以需要`ifnull`将null转化为可计算的值
* 计算员工每个月拿到的工资 + 补助，若没有补助则数据库中`comm`显示`null`
  * `select sal + nvl(comm, 0) as realSal from emp;`

# 参考
* [oracle怎么将日期转为字符串](https://www.php.cn/oracle/489480.html)