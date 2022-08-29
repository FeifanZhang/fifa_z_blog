# admin后台管理
* django提供了完整的后台管理数据库的接口以及图形化界面，供开发人员在开发过程中进行调用和测试
* django 通过收集已注册的模型类，为这些模型提供数据管理界面，供开发者使用

# 配置步骤
* 创建超级用户-该账户拥有后台管理的最高权限，在项目目录下输入如下指令：
  ```shell
  python3 manage.py createsuperuser
  ```

* 通过`runserver`指令启动服务器，浏览器输入`ip+端口+/admin/`即可访问
* 为了让自定义的model类可以通过admin进行数据管理，需要在model类同一目录下的`admin.py`文件进行注册
  ```python
  from django.db.contrib import admin
  from .models import Book
  admin.site.register(Book)
  ```
* admin中显示的数据是根据该模型类定义的`__str__`方法进行显示，通过模型管理器可以改变其在后台的显示样式
    ```python
  from django.db.contrib import admin
  from .models import Book

  class BookManager(admin.ModelAdmin):  # 一般管理器的类名为：模型名称+Manager
      # admin后台显示哪些列
      list_display = ['id', 'title', 'price']
      # 点击表中的哪些字段可跳转至修改页
      list_display_links = ['title']
      # 添加过滤器
      list_filter = ['price']
      # 添加搜索框
      search_field = ['title']
      # 可直接在列表中对数据进行修改(list_display_links中的列无效)
      list_editable = ['price']
  admin.site.register(Book, BookManager)
  ```
  除此之外，还要在Model字段定义中加入`verbose_name`来添加后台管理的数据表表头
  ```python
  # in models.py
  class Book(models.Model):
      title = models.CharField(verbose_name='书名')
      price = models.DecimalField(verbose_name='价格')
  ```