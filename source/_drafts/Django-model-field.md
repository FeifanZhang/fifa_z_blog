---
title: Django model field
tags:
- python
- django
- rom
categories:
- [python, django, rom]
---
## ROM简介
ROM (object relational mapping)对象关系映射，是指数据库数和后端之间，数据类型的映射。
优点：减少数据库和后端的耦合，即使更改成其他数据库，也不会影响后端对数据库操作的代码。
缺点：python的ROM类型转换为对应的数据库类型耗时，sql语句效率低。
<!-- more -->
## 增删查改语句
### 增

### 删
通过`delete()`语句实现：
`delete()`为硬删除，建议前端的删除操作为软删除，这样便于数据的恢复。如果数据确实无用，可在后台进行硬删除。
以下是不同场景下所对应的`delete`语句：
```python 检索id进行删除
word_obj = Word.objects.get(id=word_id)
word_obj.delete()  
# 如果用filter，传入的id错误方法不会抛出异常，而且id唯一，所以可以使用get方法
```
```python 批量进行删除
# 不使用get，因为拿到的数据数量大于1个就会报错
```
### 查
### 改
## 字段类型简介
字段结构仅介绍每种字段类型的基础使用以及对应的python数据结构
### 关系字段
#### Autofield
作为表的的主键使用，是一个带有自增属性的Integer， 在models.py中不用去定义，django会自动生成
```python 在models.py中如下定义
class TestModel(models.Model):
    id = models.AutoField(primary_key=True)
```
#### ForignKey
作为表的外键使用，即外键字段，对应一对多的情况，列如：一本书对应一个出版社，一个出版社可对应多本书。外键添加`unique=true`则成为`oneToOne`字段
```python
class Publisher(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=12)
    addr = models.TextField()
    date = models.DateField()

class Book(models.Model):
    title = models.CharField(max_length=12)
    price = models.DecimalField(max_digits=6,decimal_places=2)
    # 建立publisher和book之间的关联
    pulisher = models.ForeignKey(to='Publisher')
```
#### ManyToManyField
即多对多字段，对应数据库中一个数据相互可以对应多条，列如：一本书可以有多个作者，一个作者可以有多本书
```python
class Book(models.Model):
    title = models.CharField(max_length=12)
    price = models.DecimalField(max_digits=6,decimal_places=2)
    pulisher = models.ForeignKey(to='Publisher')
    
class Author(models.Model):
    name = models.CharField(max_length=12)
    book = models.ManyToManyField(to='Book',related_name='authors')
    info = models.OneToOneField(to='Authorinfo',related_name='infos')
```
```python 在视图函数中，多对多这样添加作者的书
author.book.add(book1, book2)
```
#### OneToOneField
即一对一字段，通过用来将一条数据补常用的数据单独存放，例如对于作者来说，姓名、作品等是常被查询的，而地址、生日这些是补常用的，就可以将这部分数据通过一对一字段对应分表存放。和外键的使用一样

### 字符串类
charfield和textfield没有本质区别，官方文档给出的区别是：长字符串使用textfield，短字符串使用charfield
#### CharField
长度小于64（即`max_length<=64`时，使用charfield）
#### TextField
长度小于64（即`max_length>64`时，使用textfield）
```python
word = models.CharField("word", max_length=64, default="case_for_charfield", null=False)
word = models.TextField("word", max_length=255, default="case_for_textfield", null=False)
```


### 数字类
#### IntegerField
不带有小数点的整数，
```python
priority = models.IntegerField(default=0)
```
#### DecimalField
带有精度的十进制数字，两个关键词必须设置：`max_digits`（变量最大的位数：小数点前位数+小数点后位数）和`decimal_places`（小数点后位数最大值）
```python
# 小数点前后位数相加最大为3，小数点后数位不能超过2
models.DecimalField( max_digits=3, decimal_places=2 )
```
#### FloatField
浮点类型，double


### Bool类
#### BooleanField
python的布尔类型，且不能为空（必须设置 `default=true/false`），
```python
owner = models.BooleanField("owner", default=True)
```
#### NullBooleanField
可以为空的布尔值
```python
owner = models.NullBooleanField("owner")
```
### 时间类
#### DateField
时间字段，只有年月日
#### TimeField
时间字段，储存几时几分
#### DateTimeField
时间字段，包括年月日和几时几分
```python
# 设置了auto_now_add，使得DateTimeField的值为创建时的时间
date_created = models.DateTimeField("date_created", auto_now_add=timezone.now)
```
### 文件类
#### FileField
#### ImageField
##### 创建media文件夹
ImageField储存的是文件的路径，所以需要一个文件夹来储存真正的图片本体
1. 在Django根目录下创建media文件夹（与static平级）
2. 在setting.py文件末尾添加配置
```python
# 媒体文件即项目的根目录
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname('__file__')))

# media的文件路径：根目录下的media文件夹
MEDIA_ROOT = os.path.join(PROJECT_ROOT, 'media')

# django前端模板会通过这个'MEDIA_URL'拼接ImageField存储的图片文件名来访问图片
MEDIA_URL = '/media/'
```
##### 创建ImageField
在对应app里的model.py中添加代码
```python
class Photo(models.Model):
    info = models.CharField("info", max_length=128, unique=True, default="1")
    date_created = models.DateTimeField("date_created", default=timezone.now)
    # upload_to后面跟着的参数是图片media下的文件夹名称，所以最后存储的位置为：PROJECT_ROOT/media/photos/
    src = models.ImageField(upload_to='photos', null=True)
    is_delete = models.BooleanField("is_delete", default=False)
    objects = PhotoManager()
```
### 其他
#### enum
enum属于字段或整数类类，是一系列常量的的集合，在models.py中如下定义：
```python
owner = models.CharField(choices=(('xiaohong', "female"), ('xiaoming', "male")), default='xiaohong', max_length=128)
```
增删改查`owner`的时候，输入键值对的key（即`xiaohong`和`xiaoming`），来控制`owner`的值

---
## 字段选项详解

---
## 字段类型与python数据类型的对应关系
| python数据类型 | Model字段类型     |
| -------------- | ----------------- |
| Integer        | Autofield()       |
| Django.Model   | ForignKey()       |
| Django.Model   | ManyToManyField() |
| Django.Model   | OneToOneField()   |
| String         | CharField()       |
| String         | TextField()       |
| Integer        | IntegerField()    |
| Decimal        | DecimalField()    |
| Float          | FloatField()      |
| String         | FileString()      |
| String         | ImageField()      |

---
## 参考

[Django中的Model中的字段类型、字段选项与关系类型](https://blog.csdn.net/weixin_38654336/article/details/79843458)
[Django的AutoField字段](https://blog.csdn.net/weixin_34013044/article/details/86014920)
[django中的关系字段](https://www.cnblogs.com/Kingfan1993/p/9931447.html)
[django 框架模型之models常用的Field，这些Field的参数、及常见错误原因及处理方案](https://blog.csdn.net/weixin_37773766/article/details/80330221)

