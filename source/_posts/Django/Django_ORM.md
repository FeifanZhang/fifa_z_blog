---
title: Django_ORM
toc: true
tags:
  - django
  - ORM
categories:
   - django
   - ORM
date: 2021-10-08 15:17:53
---
# ORM框架
* ORM：object relational mapping 对象关系映射，使用类或对象对数据库进行操作而非使用SQL语句。
* 作用：是Django模型层的具体实现，建立模型类与表的关系，通过模型操作数据库
* 优点：实现了数据模型与数据库的解耦，数据库的切换无需修改查询语句，仅需修改配置文件即可
* 缺点：业务复杂时，使用成本较高；模型与数据之间的转换会有性能损失
## ORM操作
### 增添数据
#### 单表插入数据
  ```python
  Model_name.objects.create(属性1=值1,属性2=值2..属性n=值n)
  ```
  ```python
  obj = Model_name()
  obj.属性1=值1
  obj.属性2=值2
  ...
  obj.属性n=值n
  obj.save()
  ```
#### 外键关联时插入数据
* 一对一关联时，有两种创建数据的方法：
  ```python
  # 如下为数据库的结构
  # Wife表格引用了Author表格，Wife中的author作为一对一外键引入
  class Author(model.Model):
      name = models.CharField('作家',max_length=20)
      ...
  class Wife(model.Model):
      name = models.CharField('妻子', max_length=20)
      husband = models.oneToOneField(Author, on_delete=models.CASCADE)
  # 方式1：关联作者这个对象
  wife = Wife.objects.create(name='wang', author=author) 

  # 方式2：直接关联author的id
  wife = Wife.objects.create(name='wang', author_id=author.id) 
  ```
* 多对多关联时，有两种方式创建数据
  ```python
  # 数据表的关系
  class Author (models.Model):
      name = models.CharField('作家姓名', max_length = 20)

  class Book(models.Model):
      title = models.CharField('书名', max_length = 20)
      authors = models.manyToManyField(Author)

  # 方式1：先创建author
  author1 = Author.objects.create(name='wang')
  author2 = Author.object.create(name='zhang')
  book1 = author1.book_set.create(title='python')  #创建著作并与author1关联
  author2.book_set.add(book1)  #book1已创建，故直接与author2通过 .add() 关联即可

  #方式2：先创建book
  book1 = Book.objects.create(title='python')
  author1 = Author.objects.create(name='zhang')
  book1.authors.add(author1)
  book1.authors.create(name='wang')
  ```
### 删除数据
#### 硬删除
即数据从后台直接被删除；与之对应的是**软删除**，即数据在用户删除后会留有记录，在必要时可进行恢复。
* 硬删除单个数据
  ```python
  # 使用get方法确保拿到的数据唯一，且因为使用id检索，所以数据唯一
  user = MyModel.objects.get(id=1)
  user.delete()  
  ```
* 批量硬删除数据
  ```python
  users = MyModel.objects.filter(age__gt=20)
  users.delete()
  ```
#### 伪删除
* 即**软删除（soft delete）**，在创建数据表时添加一个`is_active`的布尔类型字段，默认为True，当用户执行删除操作时，将该字段设置为False。  
* 注意：当使用伪删除时，在视图函数中查询数据要加入 `is_active=True`进行过滤
### 查询数据
#### all方法
* 用法：MyModel.objects.all()
* 作用：查询MyModel中所有数据，相当于 `select * from table`
* 返回值：QuerySet对象，内部存放若干MyModel实例
    ```python
    from MyApp.models import MyModel
        lst = MyModel.objects.all()
        for ele in lst:
            print('name:', ele.name, 'age:', ele.age)
    ```
#### values方法
* 用法：MyModel.objects.values('列1','列2')
* 作用：查询部分列的数据并返回，相当于`select col1, col2 from table`
* 返回值：QuerySet，内部存放字典，格式为{'列1':值1 ... '列n':值n}
    ```python
    from MyApp.models import MyModel
        lst = MyModel.objects.values('name', 'age')
        for ele in lst:
            print('name:', ele.get('name'), 'age:', ele.get('age'))
    ```
#### values_list方法
* 用法：MyModel.objects.values_list('列1','列2')
* 作用：查询部分列的数据并返回，相当于`select col1, col2 from table`
* 返回值：QuerySet，内部每个元素为元祖，格式为(列1的值 ... 列n的值)
    ```python
    from MyApp.models import MyModel
        lst = MyModel.objects.values_list('name', 'age')
        for ele in lst:
            print('name:', ele[0], 'age:', ele[1])  # 元祖中元素顺序与 values_list中拟查询的属性（即values_list中填写的属性）顺序一样
    ```
#### order_by方法
* 用法：MyModel.objects.order_by('-列1')
* 作用：将查询到的结果根据某个字段进行排序，默认为升序，降序则在列前加 - 号
* 返回值：QuerySet对象，内部存放若干MyModel实例
    ```python
    from MyApp.models import MyModel
        lst = MyModel.objects.values('name', 'age').order_by('age')
        for ele in lst:
            print('name:', ele.name, 'age:', ele.age)
    ```
#### filter方法
* 用法：MyModel.objects.filter(属性1=值1, 属性2=值2 ...)
* 作用：返回该条件下的所有结果，多个filter条件表示与逻辑
* 返回值：QuerySet对象，内部存放若干MyModel实例
    ```python
    from MyApp.models import MyModel
        lst = MyModel.objects.filter(name='alan', age=19)
    ```
#### exclude方法
* 用法：MyModel.objects.exclude(属性1=值1, 属性2=值2 ...)
* 作用：返回不包含该条件下的所有结果，多个exclude条件表示与逻辑
* 返回值：QuerySet对象，内部存放若干MyModel实例
    ```python
    from MyApp.models import MyModel
        lst = MyModel.objects.exclude(name='alan', age=19)
    ```
#### get方法
* 用法：MyModel.objects.get(属性1=值1, 属性2=值2 ...)
* 作用：返回满足条件的唯一一条数据，如果发现结果多于1条，`抛出Model.MultipleObjectReturned`异常；无结果则抛出`Model.DoesNotExist`异常
* 返回值：QuerySet对象，内部存放若干MyModel实例
    ```python
    from MyApp.models import MyModel
        lst = MyModel.objects.get(name='alan', age=19)
    ```
#### 查询谓词
当我们需要实现更加灵活的查询时（如id>=10的数据，或年龄在19~23之间的用户），需要在查询语句中加入查询谓词进行查找。使用方法就是在`filter`中的属性名称后面加上查询谓词即可
* __exact:等值匹配，用于查询某些数据属性为空的情况
  ```python
  lst = MyModel.onjects.filter(name__exact = 'NULL')
  # 等同于 select * from table where name is NULL;
  # 在name后面加上 __exact即可实现谓词查询
  ```
* __gt:返回属性大于某值的结果
  ```python
  lst = MyModel.onjects.filter(age__gt = 15)
  # 等同于 select * from table where age > 15;
  ```
* __lt:返回属性小于某值的结果
  ```python
  lst = MyModel.onjects.filter(age__lt = 15)
  # 等同于 select * from table where age < 15;
  ```
* __contains:查询包含指定值的数据
  ```python
  lst = MyModel.onjects.filter(name__contains = 'w')
  # 等同于 select * from table where name like ’%w%‘;
  ```
* __startswith:以某个值开始
  ```python
  lst = MyModel.onjects.filter(name__startswith = 'w')
  # 等同于 select * from table where name like ’w%‘;
  ```
* __endswith:以某个值结束
  ```python
  lst = MyModel.onjects.filter(name__startswith = 'w')
  # 等同于 select * from table where name like ’%w‘;
  ```
* __in:查询在指定范围内的数据
  ```python
  lst = MyModel.onjects.filter(name__in = ['alan', 'aha', 'jack'])
  # 等同于 select * from table where name in ('alan', 'aha', 'jack');
  ```
* __range:查询在指定范围内的数据(一般是数字范围)
  ```python
  lst = MyModel.onjects.filter(age__range = (30, 50))
  # 等同于 select * from table where age BETWEEN 30 and 50;
  ```
### 聚合查询
#### 整表聚合
* 聚合函数：Sum, Avg, Count, Max, Min
  ```python
  from django.db.models import Sum, Avg, Count, Max, Min  # 此处聚合函数大写为了与python自身的sum avg等函数区分
  MyModel.objects.aggregate(结果名称 = 聚合函数('列的名称'))
  ```
* 返回结果：结果变量名与值组成的字典，格式为{'结果变量名':值}
#### 分组聚合
* 计算查询结果中每一个对象所关联的对象集合，从而得出其总计值/平均值/总和
* 语法：QuerySet(结果变量名=聚合函数('列的名称'))
* 示例：需要统计不同年龄的用户个数
* 返回结果：QuerySet
  ```python
  from django.db.models import 
  #  首先拿到字段的所有结果
  user_age = User.objects.values('age')
  lst = user_age.annotate(res = Count('age'))
  # 最终返回结果类型为QuerySet里面是字典{'age': value, 'res': value}
  ```
* 如果分组聚合后面继续增加筛选条件（类似sql中的having），则在后面直接添加`.filter`即可
  ```python
  #  接上个示例代码，在上一个的基础之上，当该年龄段用户大于2时才显示
  user_age.annotate(res = Count('age')).filter(res__gt = 1)
  ```
#### 正向查询
* 通过外键查找被关联的数据属性，就叫正向查询
* 无论是一对一`OneToOneField`还是一对多`ForeignKey`都是一样的
  ```python
  # 以下为数据库结构
  class Author(model.Model):
      name = models.CharField('作家',max_length=20)
      ...
  class Wife(model.Model):
      name = models.CharField('妻子', max_length=20)
      husband = models.oneToOneField(Author, on_delete=models.CASCADE)
  # 通过wife的name来查找作者的name
  author_name = Wife.objects.get(name='wang').author.name
  ```
#### 反向查询
##### 一对一`oneToOneField`查询
* 通过未设置外键属性的表查询带有外键属性的表格数据
    ```python
  # 以下为数据库结构
  class Author(model.Model):
      name = models.CharField('作家',max_length=20)
      ...
  class Wife(model.Model):
      name = models.CharField('妻子', max_length=20)
      husband = models.oneToOneField(Author, on_delete=models.CASCADE)
  # 通过author的name来查找作者wife的name
  wife_name = Author.objects.get(name='zhang').wife.name
  ```
##### 一对多`ForeignKey`查询
```python
# 数据库关系如下所示
class Publisher(models.Model):
    name = models.CharField('出版社名称', max_length=20)
class Book(models.Model):
    name = models.CharField('书籍名称', max_length=20)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)

publisher = Pulisher.objects.get(name='XXX')
# 首先是推荐的查询
books = publisher.book_set.all()
'''
上面的代码用于获取该publisher下的所有book，该方法好处是返回的是若干Book数据对象；
除此之外可以将 .all() 替换为 .filter() 去进行更加复杂的查询
'''
# 当然下面这样也可以
books = Book.objects.filter(publisher=publisher)
```
### 修改数据
#### 单个数据的修改步骤
* 查：通过 get方法获得需要修改的实体（使用`get()`的好处就是直接返回一个MyModel的对象，便于操作）
  ```python
  user = MyModel.objects.get(name='Alan')
  ```
* 改：通过`对象.属性=sth`的方式修改
  ```python
  user.age = 30
  ```
* 保存：通过`对象.save()`进行保存
    ```python
  user.save()
  ```
#### 批量数据的修改步骤
* 查：
  ```python
  user = MyModel.objects.filter(age_gt=20)
  ```
* 改：通过`update`方法将查询到的数据全部修改并直接保存
  ```python
  user.update(age=77)
  ```
### F对象
* F对象代指表内某条记录的字段信息
#### 修改数据的场景应用
  ```python
  from django.db.Models import F
  # 希望所有user的年龄全部+10
  UserModel.objects.all().update(age=F('age') + 10)
  # 以上可转化为如下语句
  # update 'user' set 'age' = ('user'.'age' + 10)
  # 以下是常规做法，不如上面的F对象
  users = User.objects.all()
  for user in users:
      user.age = user.age + 10
      user.save()
  ```
* 其次，当遇到大量请求修改数据时，可以起到上锁的作用，举个例子：某人发了一条微博，发出去第1秒收获1w点赞，常规操作是这样：
  ```python
  from django.db.Models import F
  def add_like(request, topic_id):
      topic = TopicModel.objects.filter(id = 1)  #第1秒1w个请求同时执行该条语句，故1w个请求从数据库得到的topic数据是一样的：即topic的点赞数 like_num 为0
      topic.like_num = topic.like_num + 1 #该条语句的作用不是like_num在自己基础上+1，而是like_num重新赋值为某个数字；该topic此时点赞数为0，1w个请求将自己接收到的点赞数 like_num 重新赋值为0+1 = 1
      topic.save()  #服务器执行1w次更新，且每一次都是将topic下的点赞数置为1
      # 以上操作相当于 update topic set like = 1 where id = 1
  ```
  F对象即可避免该情况的发生，当使用F对象更新时，会给该条数据上锁，其他的修改要等待释放锁后才可执行，且F对象不用从数据库中拿取而是直接修改，减少更新时间。
  ```python
  from django.db.Models import F
  def add_like(request, topic_id):
      topic = TopicModel.objects,filter(id=1)
      topic.like_num = F('like_num') + 1
      topic.save()
  # 相当于 update topic set like = like + 1 where id = 1
  ```
#### 查询数据的场景应用
查询哪些书的市场价高于其定价
```python
from django.db.Models import F
books = BookModel.objects.filter(market_pirce__gt = F('price'))
# 相当于 select * from book where (book.market_price > book.price)
for book in books:
    print(book.market_price, book.price)
```
### Q对象
* 复杂的查询条件，如与`&`、或`|` 、非`~`等操作借助Q对象
  ```python
  # 希望查找年龄大于20岁 或 name为Alan的所有用户
  from django.db.Models import Q
  users = UserModel.objects.filter(Q(age__gt=20)|Q(name='Alan'))
  ```
* 与`&`、或`|` 、非`~`等操作可以组合使用
  ```python
  Q(条件1)|Q(条件2)  # 两个条件符合一个即可
  Q(条件1)&Q(条件2)  # 两个条件全部符合
  Q(条件1)&~Q(条件2)  # 符合条件1且不符合条件2
  ```  

