---
title: Python_格式化输出
toc: true
tags:
  - python
  - print
categories:
  - - python
    - print
date: 2021-12-05 14:53:09
---
# 格式化输出
## `%` 占位符
### 字符串
* **全称：** 字符串格式化占位参数：`%[-/+][m][.n]s`
* m: 占位符的字符串需要空格补齐并达到m的长度
  ```python
  print('My name is |%20s|' % 'hello')  # 填充16空格达到20长度
  print('My name is |%20s|' % 'hello world')  # 填充9空格达到20长度
  # My name is |               hello|
  # My name is |         hello world|
  ```
* -/+/0: 当占位符处的字符串要空格补齐时是左侧填充(-)还是右侧填充(+),**与`m`一起使用**
  ```python
  print('My name is %20s!' % 'hello')  # 空格默认左侧填充
  print('My name is %-20s!' % 'hello')  # 左填充20个空格
  print('My name is %+20s!' % 'hello')  # 右填充20个空格
  # My name is                hello!
  # My name is hello               !
  # My name is                hello!
  ```
* .n: 截取的字符串长度
  ```python
  print('My name is %.2s!' % 'hello')
  print('My name is %20.3s!' % 'hello')
  # My name is he!
  # My name is                  hel!
  ```
* 多个 `%` 占位符可以表示多个字符串
  ```python
  print('My name is |%20s|%12s|' % ('hello', '2012-02-01'))
  print('My name is |%20s|%12s|' % ('hello world', '2012-02-11'))
  # My name is |               hello|  2012-02-01|
  # My name is |         hello world|  2012-02-11|
  ```

### 数字
#### 整数
* **全称：** 数字格式化占位参数: `%[-/+/0][m][.n][d/x/o]`
* `d/x/o`: d代表十进制；x代表十六进制；o代表八进制
  ```python
  # %d 10进制
  a = 7
  print('My number is %d' % 666)  # My number is 666
  print('my secondary number is %d' % a)  # my secondary number is 7

  # %x 16进制
  print('My number is %x' % 666)  # My number is 29a
  print('my secondary number is %x' % a)  # my secondary number is 7

  # %o 8进制
  print('My number is %o' % 666)  # My number is 1232
  print('my secondary number is %o' % a)  # my secondary number is 7
  ```
* 不同进制的占位符会将输入的**十进制**转换为对应的进制数字
* `-/+/0`: 当占位符处的字符串要空格补齐时是左侧填充(-)还是右侧填充(+),**与`m`一起使用**，`0`则会起到左侧补位的作用
* 注意：当使用 `+` 的时候，python除了在左侧空格补位，还会在数字左侧补一个+号, `-`号没有此类问题
* `-/+`与`0`无法一起使用
  ```python
      a = 666
      print('My number is |%15d|' % a)
      print('My number is |%-15d|' % a)
      # 注意：当使用 + 的时候，除了左侧空格补位外，还在数字左侧补一个+号
      print('My number is |%+15d|' % a)
      # My number is |            666|
      # My number is |666            |
      # My number is |           +666|
      
      a = -666
      print('My number is |%15d|' % a)
      print('My number is |%-15d|' % a)
      print('My number is |%+15d|' % a)
      # My number is |           -666|
      # My number is |-666           |
      # My number is |           -666|
  ```
* 使用0进行补位时，若数字为负，则符号会放在最左侧
  ```python
      a = 666
      print('My number is |%015d|' % a)
      # 注意：当使用 + 的时候，除了左侧空格补位外，还在数字左侧补一个+号
      print('My number is |%+015d|' % a)
      # My number is |000000000000666|
      # My number is |+00000000000666|

      a = -666
      print('My number is |%015d|' % a)
      print('My number is |%+015d|' % a)
      # My number is |-00000000000666|
      # My number is |-00000000000666|
  ```
#### 浮点数
`%[-/+/0][m][.n]f` 默认6位小数
  ```python
  a = -66
  b = -66.66
  print('My number is |%f|' % a)
  print('My number is |%f|' % b)
  # My number is |-66.000000|
  # My number is |-66.660000|
  ```
* .n: 代表小数位数, 指定小数位会四舍五入
  ```python
      b = 66.66
      print('My number is |%.2f|' % b)
      print('My number is |%.3f|' % b)
      # My number is |66.7|
      # My number is |66.66|
      # My number is |66.660|

      # 四舍五入的例子
      print('My number is |%.1f|' % b)
      # My number is |66.7|
  ```
### 多参数输出
* 将多个参数封装成元组
  ```python
    info = ('FIFA', 20, 3.1415926535)
    print("My name is %s, I'm %d, my luck number is %.4f" % info)
    # My name is FIFA, I'm 20, my luck number is 3.1416
    print("My name is %s, I'm %d, my luck number is %.4f" % ('FIFA', 20, 3.1415926535))
    # My name is FIFA, I'm 20, my luck number is 3.1416
  ```
## format 方法（推荐）
* `{[index]:[fill | align][sign][#][m][,][.n][type]}`
* 所有`[]`内参数都是可选参数，非必须
  |参数|含义|举例|
  |--|--|--|
  |index|参数的序号 或者 key||
  |fill|填充样式||
  |align | 对齐方式，与`fill`一同使用|`<`左对齐，`>`右对齐，`^`居中对齐，`=`右对齐符号在左侧|
  |sign|给数字添加符号，若数字为负数，则添加无效，若为正数，则数字最终正负以添加符号为准|可添加`+`,`-`以及` `|
  |#|显示数字的进制|`0x`十六进制,`0o`八进制,`0b`二进制|
  |,|千分位格式化(每3位添加一`,`以便阅读)||
  |m|占位宽度|
  |.n|对于字符串，表示截取的长度，对于数字则是截取的位数||
  |type|格式化类型字符|`s`字符串，`d`十进制，`b`二进制，`x`十六进制，`o`八进制，`f`浮点数，`%`可将浮点转换成百分数|
### 举例
* index举例
  ```python
  # index
  # `format`中参数与字符串占位符数量不等时，通过占位符的`index`参数获取`format`对应的参数
  # 若不添加`index`参数，则默认第一个占位符的`index`为0，第二个`index`为1 ... 以此类推
  # 不添加`index`参数，务必保持占位符与`format`参数数量相等
  print('{},{}'.format(1,2))
  # 1,2
  print('{0}, {1}, {0}'.format(1, 2))
  # 1, 2, 1
  ```
* type举例
  ```python
  # type举例
  # 使用的type与format的参数种类要一一对应
  print('{0:s},{1:d},{1:x},{1:o},{2:f}'.format('hello', 13, 13.22222))
  # hello,13,d,15,13.222220

  print(('|{:,%}|'.format(0.01223343242343223423)))
  # |1.223343%|
  ```
#### 字符串举例
  ```python
    # m参数
    print('{:s}'.format('hello')) # s 表示 type为string
    print('|{:20s}|'.format('hello'))  # 默认左对齐，上一部分讲的 % 则是右对齐
    # hello
    # |hello               |

    # .n参数
    print('{:s}'.format('hello'))
    print('|{:20.2s}|'.format('hello'))
    print('|{:20.3s}|'.format('hello'))
    # hello
    # |he                  |
    # |hel                 |

    # align  参数
    print('|{:<20s}|'.format('hello'))  # 默认左对齐
    print('|{:<20s}|'.format('hello'))
    print('|{:>20s}|'.format('hello'))
    print('|{:^20s}|'.format('hello'))
    # |hello               |
    # |hello               |
    # |               hello|
    # |       hello        |

    # fill参数
    print('|{:<20s}|'.format('hello'))  # 对齐填充默认为空格
    print('|{:+>20s}|'.format('hello'))
    print('|{:x^20s}|'.format('hello'))
    # |hello               |
    # |+++++++++++++++hello|
    # |xxxxxxxhelloxxxxxxxx|
  ```
#### 数字举例
  ```python
    # #参数： 用以表示当前数字的进制
    print('{0:d},{0:x},{0:o},{0:b}'.format(13))
    # 13,d,15,1101 （难以看出是多少进制）
    print('{0:#d},{0:#x},{0:#o},{0:#b}'.format(13))
    # 13,0xd,0o15,0b1101

    # sign参数 （在%占位符中，用 +/-号表示左右对齐；在format中，+/-仅表示数字符号，左右对齐通过align参数实现）
    # 给数字添加符号，若数字为负数，则添加无效，若为正数，则数字最终正负以添加符号为准
    print('{0:+d},{0:-d},{1:+d},{1:-d},{0: d}, {1: d}'.format(13, -13))
    # +13,13,-13,-13, 13, -13

    # .n参数 小数点后保留的小数位，会四舍五入
    print('|{:15.2f}|'.format(13.2345))
    print('|{:15.4f}|'.format(13.2345))
    # |          13.23|
    # |         13.235|

    # ,参数 
    print('|{:d}|'.format(1223343242343223423))
    print('|{:,d}|'.format(1223343242343223423))
    # |1223343242343223423|
    # |1,223,343,242,343,223,423|
    # 其余参数与字符串中使用方法无异
  ```
### format方法传入参数的其他方法
#### 传入元组参数
  ```python
  par1 = ('hello', 0, 1)
  par2 = ('hi', 2, 3.222)
  print('{0[0]},{0[1]},{0[2]}'.format(par1))  # hello,0,1
  # 传入多个可变参数
  print('{0[0]},{1[0]}'.format(par1, par2))  # hello,hi
  # 对可变参数的元素进行格式化输出操作
  print('{0[0]},|{1[2]:20.2}|'.format(par1, par2))  # hello,|                 3.2|
  ```
#### 传入字典参数
*  `%`格式化字符串不支持该功能
  ```python
    # 传入可变参数
    par1 = {'name':'fifa', 'gender':'real man', 'grade':0.333}
    par2 = {'name':'who care','gender':'female', 'grade':0.6666}
    # 常规用法
    print('{0[name]},{0[gender]},{1[name]},{1[grade]}'.format(par1,par2))  # fifa,real man,who care,0.6666
    # 高级一些
    print('{p1[name]},{p1[gender]},{p1[name]},{p2[grade]}'.format(p1=par1, p2=par2))  # fifa,real man,fifa,0.6666
    # 对字典内元素进行操作
    print('{p1[name]},{p2[grade]:.2}'.format(p1=par1, p2=par2))  # fifa,0.67(四舍五入)
  ```
#### 直接引用(最推荐)
  ```python
    name = 'name'
    age = 18
    salary = 233333
    print(f'My name is:{name}, age:{age}, salary:{salary:,} per hour')
  ```



