```python
from lxml import etree

# 获取本地的网页文件
tree = etree.parse('test.html')

# 获取request中的网页数据
#tree_req = etree.HTML(response.text)

# 【html标签】下的【body标签】下的【div标签】下的【p标签】
p_tag= tree.xpath('/html/body/div/p')

# 整个页面所有的p标签
all_p_tag = tree.xpath('//p')

# 寻找class属性为song的div标签 tagName[@属性名=属性值]
div_tag = tree.xpath('//div[@class="song"]')

# 通配符
# * 匹配全部类型的标签
# class为song的全部标签
all_song_tag = tree.xpath('//*[@class="song"]')

# 局部搜索
# ./ : 当前标签为根节点，继续向下
li_list = tree.xpath('//*[@class="tang"]/ul')
for li in li_list:
    li.xpath('./li/a')  #当前li标签下的 a标签

# 索引定位
# 获取页面的第一个div标签
first_div_tag = tree.xpath('//div[1]')

# 层级定位
# // 表示该标签下的全部子标签（直接嵌套或间接嵌套）；/ 表示直接嵌套

# class='tang'的div标签 下的 ul -> li -> a标签
a_list = tree.xpath('//div[@class="tang"]/ul/li/a')

# class='tang'的div标签 下的 全部a标签（包含div直接嵌套，和间接嵌套）,类似bs4的空格
a_all_list = tree.xpath('//div[@class="tang"]//a')

# 或表达
# 表达式1 | 表达式2 ： 获取满足任意一个表达式的标签
all_tang_content = tree.xpath('//div[@class="tang"]//a//text() | //div[@class="tang"]//b//text()')

# 提取标签内容
# 返回值 string组成的list
# /text(): 获取本标签的文本
# //text(): 获取本标签 & 全部子标签的文本内容
a_feng_list = tree.xpath('//a[@id="feng"]/text()')

# 获取 div class=song 的标签的自身 & 子标签内容
tree.xpath('//div[@class="song"]//text()')

# 获取属性
# @属性名称即可获得
href_list = tree.xpath('//div[@class="tang"]/ul/li/a/@href')
href_short_list = tree.xpath('//div[@class="tang"]//@href')

```

# 小技巧
* chrome的开发者工具中，选中某个标签后，右键 -> copy 会出现标签的定位描述（xpath、bs4等格式）

