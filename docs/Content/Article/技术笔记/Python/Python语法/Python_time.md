# 时间戳类型
## time()
* 1970年1月1日到现在的秒数
  ```python
  print(time.time())
  # 1638690378.975141
  ```

# 结构化时间对象
* 该类对象的输出格式
* **输入：** 输入时间戳，即可得到对应的时间对象，默认的输入为`time.time()`

## localtime()
* 是一种结构化时间对象
* 显示目前本地时间
  ```python
  b = time.localtime()
  # time.struct_time(tm_year=2021, tm_mon=12, tm_mday=5, tm_hour=15, tm_min=49, tm_sec=44, tm_wday=6, tm_yday=339, tm_isdst=0)

  # tm_wday 中，0代表星期一
  # tm_isdst 代表夏令时 -1为False， 0为True
  ```
* 获取返回值两种方法：索引获取或变量名获取
  ```python
  b = time.localtime()
  # 返回的结果是元祖，可以通过索引获取数据
  print('today is: {}-{}-{}'.format(b[0], b[1], b[2]))
  # today is: 2021-12-5

  # 通过变量名称进行获取，具体变量名可print localtime进行显示
  print('today is: {}-{}-{}'.format(b.tm_year, b.tm_mon, b.tm_mday))
  # today is: 2021-12-5
  ```
* 该方法属性为只读类型，不可修改
* 可传入其他时间点的时间戳来获得对应的时间对象
  ```python
    a = time.time() - 3600
    print(time.localtime())
    print(time.localtime(a))
    # time.struct_time(tm_year=2021, tm_mon=12, tm_mday=5, tm_hour=21, tm_min=33, tm_sec=0, tm_wday=6, tm_yday=339, tm_isdst=0)
    # time.struct_time(tm_year=2021, tm_mon=12, tm_mday=5, tm_hour=20, tm_min=33, tm_sec=0, tm_wday=6, tm_yday=339, tm_isdst=0)
  ```

## gmtime()
* 返回格林尼治（UTC）时间
* 使用方法，表达方式与`time.localtime()`一样，也是一种结构化时间对象，只是显示的时区时间不一样
  ```python
  print(time.gmtime())
  # time.struct_time(tm_year=2021, tm_mon=12, tm_mday=5, tm_hour=13, tm_min=23, tm_sec=22, tm_wday=6, tm_yday=339, tm_isdst=0)
  ```

## ctime()
* 固定格式输出日期
  ```python
  print(time.ctime())
  # Sun Dec  5 19:04:22 2021
  ```
* 默认输入`time.time()`，可输入自定义时间戳
  ```python
  a = time.time() - 3600
  print(time.ctime())
  print(time.ctime(a))
  # Sun Dec  5 21:34:21 2021
  # Sun Dec  5 20:34:21 2021
  ```
* 缺点：格式固定，无法自定义格式，故诞生了`ctime()` **pro max ultra加强版**，用的最多的time方法：`strftime()`

# 结构化时间字符串
* 可自定义格式化输出时间
* **参数：** 第一个是希望输出日期的格式，第二个是结构化时间对象（默认为`time.localtime()`）
* * **输出：** 字符串类型

## strftime()
* 日期格式占位符
  |日期格式占位符|说明|
  |--|--|
  |%Y|四位的年|
  |%y|两位的年|
  |%m|月份，取值范围01-12|
  |%b|月份的英文缩写|
  |%b|月份的英文全拼|
  |%d|天，取值范围01-31|
  |%w|当前日期是这个星期的第几天：**0是周日,1是周一...6是周六**|
  |%W|当前日期所在的周，是今年的第几周|
  |%H|小时，24进制|
  |%I|小时，12进制|
  |%p|显示AM PM与`%I`一起使用|
  |%M|分钟|
  |%a|星期的英文缩写|
  |%A|星期的英文全拼|

  ```python

  print(time.strftime('%Y-%m-%d %H:%M:%S'))
  time.sleep(7)
  print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
  # 2021-12-05 22:05:47
  # 2021-12-05 22:05:54
  ```

# 结构化的时间对象 --> 时间戳
## mktime()
  ```python
  print(time.mktime(time.localtime()))
  print(time.mktime(time.gmtime()))
  # 1638711778.0
  # 1638682978.0
  ```

# 结构化字符串 --> 结构化时间对象
## strptime()
  ```python
    a = '2021-12-05 22:05:47'
    print(time.strptime(a, '%Y-%m-%d %H:%M:%S'))
    # time.struct_time(tm_year=2021, tm_mon=12, tm_mday=5, tm_hour=22, tm_min=5, tm_sec=47, tm_wday=6, tm_yday=339, tm_isdst=-1)
  ```

# 总结
``` mermaid
flowchart TD
  subgraph 时间戳
      time
  end
  结构化时间对象
  结构化时间字符串
  时间戳 -- localtime, gmtime, ctime --> 结构化时间对象
  结构化时间对象 -- strftime --> 结构化时间字符串
  结构化时间字符串 -- strptime --> 结构化时间对象
  结构化时间对象 -- mktime --> 时间戳
```

