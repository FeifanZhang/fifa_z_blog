# 模型层
* **模型层（Model）：** 负责与数据库进行沟通，Django自带 SQLite数据库，可用于测试，但实际生产中会用mysql数据库进行数据的存储。
* **模型：** 
  * python中的一个类，由django.db.models.Model派生而来。
  * 一个模型类代表一张数据表
  * 模型类中的属性与数据库的字段一一对应
  * 模型是与数据交互的接口，是表示与操作数据库的方式

# 模型层常用字段
## 关系字段
### Autofield
* 作为表的的主键使用，是一个带有自增属性的Integer， 在models.py中不用去定义，django会自动生成
* 在models.py中如下定义
    ```python 
    class TestModel(models.Model):
        id = models.AutoField(primary_key=True)
    ```

### ForignKey
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

### ManyToManyField
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

* 在视图函数中，多对多这样添加作者的书
```python 
author.book.add(book1, book2)
```

### OneToOneField
即一对一字段，通过用来将一条数据补常用的数据单独存放，例如对于作者来说，姓名、作品等是常被查询的，而地址、生日这些是补常用的，就可以将这部分数据通过一对一字段对应分表存放。和外键的使用一样

## 字符串类
charfield和textfield没有本质区别，官方文档给出的区别是：长字符串使用textfield，短字符串使用charfield
### CharField
长度小于64（即`max_length<=64`时，使用charfield）
### TextField
长度小于64（即`max_length>64`时，使用textfield）
```python
word = models.CharField("word", max_length=64, default="case_for_charfield", null=False)
word = models.TextField("word", max_length=255, default="case_for_textfield", null=False)
```

## 数字类
### IntegerField
不带有小数点的整数，
```python
priority = models.IntegerField(default=0)
```

### DecimalField
带有精度的十进制数字，关键词`max_digits`以及`decimal_places`必须设置：
* `max_digits`：位数总数：小数点前位数+小数点后位数
* `decimal_places`：小数点后位数最大值
* `max_digits`必须大于`decimal_places`
```python
# 小数点前后位数相加最大为3，小数点后数位不能超过2
models.DecimalField( max_digits=3, decimal_places=2 )
```

### FloatField
浮点类型，double

## Bool类
### BooleanField
python的布尔类型，且不能为空（必须设置 `default=true/false`），
```python
owner = models.BooleanField("owner", default=True)
```

### NullBooleanField
可以为空的布尔值
```python
owner = models.NullBooleanField("owner")
```

## 时间类
用来表示日期，时间类会有3个参数：
* auto_now: 每次保存对象时，自动设置该字段为当前时间（取值为True/False）
* auto_now_add: 对象第一次被创建时，自动设置当前时间（取值True/False）
* default:设置当前时间(取值为字符串格式时间，如'2019-01-01')
* 以上三个参数只能三选一

### DateField
时间字段，只有年月日
### TimeField
时间字段，储存几时几分
### DateTimeField
时间字段，包括年月日和几时几分
```python
# 设置了auto_now_add，使得DateTimeField的值为创建时的时间
date_created = models.DateTimeField("date_created", auto_now_add=True)
```

## 文件类
### FileField
### ImageField
该模型类对应数据库中的varchar，不是将图片存储为字符串 而是存储图片路径，图片本体需存储在media文件夹中
#### 创建media文件夹
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

#### 创建ImageField
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

## 其他
### enum
enum属于字段或整数类类，是一系列常量的的集合，在models.py中如下定义：
```python
owner = models.CharField(choices=(('xiaohong', "female"), ('xiaoming', "male")), default='xiaohong', max_length=128)
```
增删改查`owner`的时候，输入键值对的key（即`xiaohong`和`xiaoming`），来控制`owner`的值

### EmailField
用于存储邮箱，在数据库中仍以varchar形式存储，但django会设计正则表达式使其满足邮箱格式
# 字段选项
* primary_key: 数据库的每张表都会默认设置id字段作为主键，若某列将其设置为true，则数据表会以此为主键。
* null：该选项默认False，即加入`default`选项增添默认值；若设置为True，则允许该列为空
* default：所在列的默认值，配合 `null = False`使用
* db_index：设置为True，则为该列增加索引
* unique：设置为True，表示该字段在数据库中的值唯一
* db_column：指定该列的名称，不指定的话则列与属性同名
* verbose_name：设置该字段在admin界面上显示的名称（默认为属性名称）
* blank: 设置为True则该字段为可以空；False则该字段必须填写。

# 字段类型与python数据类型的对应关系
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
| String         | FileField()      |
| String         | ImageField()      |

# 关系映射
在设计数据库时，为了让数据库容易扩展，通常不会把所有数据放在一张表中，所以需要一种机制去表示各个表之间的数据关系
## 一对一映射
  * 例如：一个身份证号对应一个人
  * 在ORM中，通过外键`oneToOneField(类名， on_delete=XXX)`进行数据关联
  * 参数解释：
    * **类名：** 就是要关联的模型类（又称被引用的数据类型）名称
    * **on_delete=XXX:** 是级联删除规则,当被引用的类中数据删除时，与之一对一关联数据的删除规则
      * models.CASCADE：模拟SQL的`ON DELETE CASCADE`:引用的数据删除后，会带着本条数据一起删除
      * models.PROTECT：发现有关联的数据，直接抛出ProtectedError不予删除（等同于mysql的RESTINCT）
      * SET_NULL: 被引用的数据删除后，该条数据直接将设置ForignKey为null，前提是要设置外键的`null = True`
      * SET_DEFAULT：被引用的数据删除后，该条数据直接将设置ForignKey为默认值，前提是要设置外键的`default`值
    * 举例
        ```python
        class Author(model.Model):
            name = models.CharField('作家',max_length=20)
            ...
        class Wife(model.Model):
            name = models.CharField('妻子', max_length=20)
            husband = models.oneToOneField(Author, on_delete=models.CASCADE)
        ```

## 一对多映射
  * 例如：一个班级会有多个学生
  * 一对多需要在 **'多'** 的那些表中设置外键`ForeignKey('类名', on_delete=XXX)`
    ```python
    class Publisher(models.Model):
        name = models.CharField('出版社名称', max_length=20)
    class Book(models.Model):
        name = models.CharField('书籍名称', max_length=20)
        publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    ```

## 多对多映射
  * 如：作家与其著作的关系：一个作家可以有多本著作，一本著作也会有多个作家联名撰写
  * 这种情况下，需要建立第三张表来维护这种数据关系，但Django通过`manyToMantField(MyModel)`字段自动生成
    ```python
    class Author (models.Model):
        name = models.CharField('作家姓名', max_length = 20)

    class Book(models.Model):
        title = models.CharField('书名', max_length = 20)
        authors = models.manyToManyField(Author)
    ```

---
# 参考
* [Django中的Model中的字段类型、字段选项与关系类型](https://blog.csdn.net/weixin_38654336/article/details/79843458)
* [Django的AutoField字段](https://blog.csdn.net/weixin_34013044/article/details/86014920)
* [django中的关系字段](https://www.cnblogs.com/Kingfan1993/p/9931447.html)
* [django 框架模型之models常用的Field，这些Field的参数、及常见错误原因及处理方案](https://blog.csdn.net/weixin_37773766/article/details/80330221)


