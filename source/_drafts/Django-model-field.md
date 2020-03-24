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
# 不使用get，因为拿到的数据数量大于1个就，get会报错
```
### 查
### 改
## 字段类型简介
### 结构类
#### Autofield
#### ForignKey
#### ManyToManyField
#### OneToOneField
### 字符串类
#### CharField
#### TextField
### 数字类
#### IntegerField
#### DecimalField
#### FloatField
### Bool类
#### BooleanField
#### NullBooleanField
### 时间类
#### DateField
#### TimeField
#### DateTimeField
### 文件类
#### FileField
#### ImageField
### 其他
#### enum
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

