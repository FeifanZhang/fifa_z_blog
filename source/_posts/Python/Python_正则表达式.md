---
title: Python_正则表达式
toc: true
mathjax: true
date: 2021-10-31 15:41:36
tags:
- 正则表达式
categories:
- Python
- 正则表达式
---

# 正则语法规则
## 匹配字符类型
|元字符|字符类型|等价表达|补充|
|--|--|--|--|
|\d|匹配0\~9之间的数字|[0-9]|
|\D|匹配除了`\d`以外的所有数字|[^0-9]|
|\s|匹配任一空白字符|[\t\n\s\r\f\v]|
|\S|匹配除了`\s`以外的所有字符，即非空白字符|[^\t\n\s\r\f\v]|
|\w|匹配文字字符（数字大小写下划线）|[a-zA-Z0-9_]|Python3中，该元字符默认可匹配中文字符，需在`re.compile()`中设置ASCII编码即可取消中文匹配|
|\W|匹配除`\w`以外的所有字符，即非文字字符|[^a-zA-Z0-9_]|
## 灵活匹配
<table>
    <tr>
        <th>字符</th>
        <th>含义</th>
        <th>举例</th>
        <th>补充说明<th>
    </tr>
    <tr>
        <td rowspan="2">.</td>
        <td rowspan="2">匹配<strong>除换行符外</strong>任何单个字符</td>
        <td rowspan="2"><strong>.</strong>在<strong>[]</strong>内仅代表字符本意，不会转换成元字符匹配</td>
        <td><strong>.[\d]</strong>：任一除换行符外的单字符+一个数字</td>
    </tr>
    <tr>
        <td><strong>[.\d]</strong>：匹配.符号加上一个数字</td>
    </tr>
    <tr>
        <td>*</td>
        <td>匹配该符号前一个子表达式<strong>0~n次</storng></td>
        <td rowspan="4"><b>默认为贪婪匹配:</b>当发现可以匹配1次也可以匹配n次时，按最长匹配项进行匹配</td>
        <td>*</td>
    </tr>
    <tr>
        <td>+</td>
        <td>匹配该符号前一个子表达式<strong>1~n次</storng></td>
        <td>*</td>
    </tr>
    <!-- the end of + -->
    <tr>
        <td rowspan="2">{}</td>
        <td>{n. m}: 匹配该符号前一个子表达式<strong>n~m次</storng></td>
        <td>*</td>
    </tr>
    <tr>
        <td>{n}: 匹配该符号前一个子表达式<strong>n次</storng></td>
        <td>*</td>
    </tr>
    <!-- the end of {} -->
    <tr>
        <td>?</td>
        <td>在元字符后加该符号（如 <b>'.?'</b> 以及 <b>'*?'</b> ）可解除贪婪模式</td>
        <td>*</td>
        <td>*</td>
    </tr>
    <!-- the end of ? -->
    <tr>
        <td rowspan="3">[]</td>
        <td rowspan="2">[n-m]: 表示该字符匹配的范围</td>
        <td>[0-9]就是匹配数字0-9(只能是个位数)</td>
        <td rowspan="3">与<b>.</b>字符的说明相同：<b>.</b> 在 <b>[]</b> 内仅代表字符本意，不会转换成元字符匹配</td>
    </tr>
    <tr>
        <td>[a-d]就是匹配abcd任意一个</td>
    </tr>
    <tr>
        <td>[条件1条件2...条件n]表示该字符符合<strong>条件1 或 条件2 或 ... 条件n</strong>即可匹配</td>
        <td><b>[\d\t]</b>表示匹配数字或制表符空格</td>
    </tr>
    <!-- the end of [] -->
    <tr>
        <td rowspan="3">^</td>
        <td><b>放在[]里面</b>: 表示<b>非条件</b></td>
        <td><b>[^abc]</b>表示除了abc以外的进行匹配</td>
        <td></td>
    </tr>
    <tr>
        <td rowspan="2"><b>放在[]外面</b>: 匹配文本的起始位置</td>
        <td><b>单行模式下 ^\w </b>匹配<b>整篇内容</b>的第一个字符（无论是否使用<b>findall</b>方法，都只返回一个结果）</td>
        <td rowspan="2">默认情况下为单行模式，切换为多行的方法参见<b>compile方法</b></td>
    </tr>
    <tr>
        <td><b>多行模式下^\w</b>匹配<b>每行开头</b>的第一个字符</td>
    </tr>
    <!-- the end of ^ -->
    <tr>
        <td rowspan="2">$</td>
        <td><b>单行模式下：</b>整篇内容的第一个字符开始匹配（无论是否使用<b>findall</b>方法，都只返回一个结果）</td>
        <td><b>^\w\d</b>: 整篇内容第一个字符是非符号字符,第二个是数字字符</td>
        <td rowspan="2">默认情况下为单行模式，切换为多行的方法参见<b>compile方法</b></td>
    </tr>
    <tr>
        <td><b>多行模式下</b>：匹配<b>每行开头</b>的第一个字符</td>
        <td><b>^\d{2}</b>: 整篇内容的每一行开头的头两个字符为数字</td>
    </tr>
    <!-- the end of $ -->
    <tr>
        <td>()</td>
        <td>字符串满足一个匹配规则后，仅返回()内的内容</td>
        <td><b>'(\d{3}),'</b>：匹配三个数字+一个逗号，匹配到合适的字符串后，仅返回<b>()</b>中的内容（即三个数字）</td>
    </tr>
    <!-- the end of () -->
    <tr>
        <td>\</td>
        <td><b>\</b>后面的一个字符不进行正则转义，而是匹配它本身的符号</td>
        <td><b>'\.'</b>：如果不加\，则是匹配<b>一个除换行外的字符</b>，加上反斜杠后，匹配<b> . 这个字符</b></td>
    </tr>
</table>

# python re模块
## compile()方法
1. 通过compile生成匹配的正则语法对象  
    ```python
    pattern_default = re.compile(r'\w')
    # 后面通过pattern_default.findall(content)进行匹配
    ```
2. 对compile设置`re.A`将编码转换为ASCII码
    ```python
    pattern_default = re.compile(r'\w')
    pattern_ASCII = re.compile(r'\w', re.A)
    source = '你好tony'
    print(pattern_default.findall(source))
    print(pattern_ASCII.findall(source))
    ```
3. 对compile设置`re.M`将匹配模式变为多行模式
    ```python
    if __name__ == '__main__':
        pattern_default = re.compile(r'^\d+', re.M)
        source = '''
    20202aa
    2323qq
    5454dd
        '''
        # 字符串另起一行必须顶头，不然正则表达式会认为顶头的不是字符而是\t制表符
        print(pattern_default.findall(source))  # ['20202', '2323', '5454']
    ```
## match()方法
* 从字符串的**首字符**开始匹配，成功则返回`Match Object`对象，未成功则返回`None`
  ```python
    a = 'super01sup'
    print(re.match(r'01', a))  # None
    print(re.match(r'([\w]+)01([\w]+)', a).group())  # super01sup
    print(re.match(r'([\w]+)01([\w]+)', a).group(0))  # super01sup
  ```
### group()
* 返回被匹配的字符串
* `group()`以及`group(0)`则表示返回正则表达式匹配到的字符串
* `group(1~n)`则表示返回`()`中匹配到的字符串
  ```python
    a = 'usa01usa02usa03usa04usa05usa06usa'
    print(re.search(r'usa([\d]+)usa([\d]+)', a).group())  # usa01usa02
    print(re.search(r'usa([\d]+)usa([\d]+)', a).group(0))  # usa01usa02
    print(re.search(r'usa([\d]+)usa([\d]+)', a).group(1))  # 01
    print(re.search(r'usa([\d]+)usa([\d]+)', a).group(2))  # 02
  ```
### start() & end() & span()
* `start()`返回匹配开始的位置
* `end()`返回匹配结束的位置
* `span()`返回tuple， 其中(start, stop)
  ```python
  a = 'super01sup'
  print(re.match(r'([\w]+)01([\w]+)', a).start())  # 0
  print(re.match(r'([\w]+)01([\w]+)', a).end())  # 10
  print(re.match(r'([\w]+)01([\w]+)', a).span())  # (0, 10)
  ```
## search()方法
* 从字符串**任一符合**匹配规则的字符开始匹配，成功则返回`Match Object`对象，未成功则返回`None`
## findall()方法
* 返回所有匹配到的字符串以列表方式进行
  ```python
  a = 'usa01usa02usa03usa04usa05usa06usa'
  print(re.findall(r'[\d]+', a))
  # ['01', '02', '03', '04', '05', '06']
  ```
## group()方法
* 返回通过正则表达式匹配到的带有`()`的子字符串
  ```python
  a = 'usa01usa02usa03usa04usa05usa06usa'
  print(re.findall(r'usa([\d]+)usa([\d]+)', a))
  # [('01', '02'), ('03', '04'), ('05', '06')]
  ```
## sub()方法
* 将所有匹配到的字符串进行替换
* `group()`在该方法中无效
  ```python
    a = 'usa01usa02usa03usa04usa05usa06usa'
    print(re.sub(r'[\d]+', '09', a))  # usa09usa09usa09usa09usa09usa09usa
    print(re.sub(r'usa([\d]+)usa([\d]+)', '09', a))  # 090909usa
    # 第二个匹配中，括号没有任何效果，反而是将整个匹配到的字符串整体替换为09
  ```

---
* [Python的re.match()和re.search()的使用和区别](https://blog.csdn.net/weixin_38819889/article/details/93846579)
* 


