# 简介
* 当爬取到网页信息，且需要筛选时，通过`beautifulSoap`进行重点信息筛选
* 适用于聚焦形爬虫
* 本质：通过解析html标签进行内容提取
* 安装
  ```shell
  pip install bs4
  pip install lxml
  ```

# 示例网页代码
* 以下所有`bs4`的示例皆通过该网页进行演示
```html
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>测试bs4</title>
</head>
<body>
	<div>
		<p>百里守约</p>
	</div>
	<div class="song">
		<p>李清照</p>
		<p>王安石</p>
		<p>苏轼</p>
		<p>柳宗元</p>
		<a href="http://www.song.com/" title="赵匡胤" target="_self">
			<span>this is span</span>
		宋朝是最强大的王朝，不是军队的强大，而是经济很强大，国民都很有钱</a>
		<a href="" class="du">总为浮云能蔽日,长安不见使人愁</a>
		<img src="http://www.baidu.com/meinv.jpg" alt="" />
	</div>
	<div class="tang">
		<ul>
			<li><a href="http://www.baidu.com" title="qing">清明时节雨纷纷,路上行人欲断魂,借问酒家何处有,牧童遥指杏花村</a></li>
			<li><a href="http://www.163.com" title="qin">秦时明月汉时关,万里长征人未还,但使龙城飞将在,不教胡马度阴山</a></li>
			<li><a href="http://www.126.com" alt="qi">岐王宅里寻常见,崔九堂前几度闻,正是江南好风景,落花时节又逢君</a></li>
			<li><a href="http://www.sina.com" class="du">杜甫</a></li>
			<li><a href="http://www.dudu.com" class="du">杜牧</a></li>
			<li><b>杜小月</b></li>
			<li><i>度蜜月</i></li>
			<li><a href="http://www.haha.com" id="feng">凤凰台上凤凰游,凤去台空江自流,吴宫花草埋幽径,晋代衣冠成古丘</a></li>
		</ul>
	</div>
</body>
</html>
```

# 通过标签名定位
* 当网页存在多个标签时，会返回第一个标签
```python
from bs4 import BeautifulSoap
fp = open('test.html', 'r', encoding='utf-8')

# 对Beautiful soup进行实例化 
# 参数1：fp是被解析的页面源码数据
# 参数2：lxml是固定解析器
soup = BeautifulSoup(fp, 'lxml')
t_tag = soup.title  # <title>测试bs4</title>
p_tag = soup.p  # <p>百里守约</p>
```


# 通过标签属性定位
## find
* 用法：`.find('标签名称', '属性' = '属性数值')`
* 当网页存在多个满足条件的标签时，仅返回第一个标签
* 查找的属性名称为class时，find方法输入的属性名为`class_`而不是`class`，因为`class`为python保留的关键字
```python
from bs4 import BeautifulSoup
fp = open('test.html', 'r', encoding='utf-8')

soup = BeautifulSoup(fp, 'lxml')

# 参数1：标签名
# 参数2：属性名 & 对应的数值
div_tag = soup.find('div', class_= 'song')

'''
<div class="song">
<p>李清照</p>
<p>王安石</p>
<p>苏轼</p>
<p>柳宗元</p>
<a href="http://www.song.com/" target="_self" title="赵匡胤">
<span>this is span</span>
		宋朝是最强大的王朝，不是军队的强大，而是经济很强大，国民都很有钱</a>
<a class="du" href="">总为浮云能蔽日,长安不见使人愁</a>
<img alt="" src="http://www.baidu.com/meinv.jpg"/>
</div>
'''
# 查找 a 标签 id为 feng的标签内容
a_tag = soup.find('a', id='feng')  # <a href="http://www.haha.com" id="feng">凤凰台上凤凰游,凤去台空江自流,吴宫花草埋幽径,晋代衣冠成古丘</a>
```

## find_all
* 用法：同上
* 返回**所有**符合要求的标签
* 返回类型：List
```python
tag_list = soup.find_all('a', class_='du')
# [<a class="du" href="">总为浮云能蔽日,长安不见使人愁</a>, <a class="du" href="http://www.sina.com">杜甫</a>, <a class="du" href="http://www.dudu.com">杜牧</a>]
```

# 选择器
* 用法
* 参数：对标签的描述类似css描述格式
  * class: `.class_name`
  * id: `#id_value`
* 返回值：list

## 通过class查找
* 输入参数：`.class_name`
```python
all_tag_list = soup.select('.du')
'''
[
    <a class="du" href="">总为浮云能蔽日,长安不见使人愁</a>,
    <a class="du" href="http://www.sina.com">杜甫</a>, 
    <a class="du" href="http://www.dudu.com">杜牧</a>
]
'''
```


## 通过id查找
* 输入参数 `#id_value`
```python
all_tag_list = soup.select('#feng')  
''' 
[
  <a href="http://www.haha.com" id="feng">凤凰台上凤凰游,凤去台空江自流,吴宫花草埋幽径,晋代衣冠成古丘</a>
]

'''
```

## 层级查找
* 通过表达式，查找指定标签下，嵌套的标签
* 输入格式: `tag1 > tag2 > ... > tagn`
  ```python
  # 查找 【class为song的标签】下的【a标签】下的【span标签】的内容
  a_list = soup.select('.song > a > span')
  '''
  [
      <span>this is span</span>
  ]
  '''
  ```

* 获取a标签下的全部b标签（无论b标签是否直接嵌套在a中）
* 输入格式：`表达式1 表达式2`（两个标签表达式通过空格隔开）
  ```python
  a_list = soup.select('.song span')  # span标签是嵌套在a标签下，而非直接嵌套在class为song的标签中
  '''
  [
      <span>this is span</span>
  ]
  '''
  ```

# 提取标签内的文字内容
## .string 方法
* 将对应标签的内容取出
* 返回值：string
```python
tag = soup.find('a', id='feng')
context = tag.string  #  凤凰台上凤凰游,凤去台空江自流,吴宫花草埋幽径,晋代衣冠成古丘
```

## .text 方法
* 将对应标签下自身 & 嵌套的全部标签的内容取出
* 返回值：string（但不同标签的内容，通过`\n`进行隔离）
```python
tag = soup.find('div', class_='tang')
all_context = tag.text 
'''
清明时节雨纷纷,路上行人欲断魂,借问酒家何处有,牧童遥指杏花村
秦时明月汉时关,万里长征人未还,但使龙城飞将在,不教胡马度阴山
岐王宅里寻常见,崔九堂前几度闻,正是江南好风景,落花时节又逢君
杜甫
杜牧
杜小月
度蜜月
凤凰台上凤凰游,凤去台空江自流,吴宫花草埋幽径,晋代衣冠成古丘
'''
```

## .string & .text 方法区别
|方法名称|区别|
|--|--|
|.string|该标签自身的内容|
|.text|该标签自身 & 子标签的内容|
```python
tag = soup.find('div', class_='tang')

# 因为该div标签自身没有内容，故返回None
context = tag.string  

# 因为该标签下嵌套的子标签有内容，故不会返回None，返回自身 & 嵌套的全部内容
all_context = tag.text  
'''
清明时节雨纷纷,路上行人欲断魂,借问酒家何处有,牧童遥指杏花村
秦时明月汉时关,万里长征人未还,但使龙城飞将在,不教胡马度阴山
岐王宅里寻常见,崔九堂前几度闻,正是江南好风景,落花时节又逢君
杜甫
杜牧
杜小月
度蜜月
凤凰台上凤凰游,凤去台空江自流,吴宫花草埋幽径,晋代衣冠成古丘
'''
```

# 提取标签内的属性值
* 用于`img`标签提取图像、`a`标签提取url
* 语法：`tag[属性名称]`
```python
img_tag = soup.find('img')
img_url = img_tag['src']  # http://www.baidu.com/meinv.jpg
```