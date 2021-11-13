---
title: Django_url
toc: true
tags:
  - django
  - url
categories:
   - django
   - url
date: 2021-09-30 03:54:53
---
# path 转换器
转换器用于传递参数，当转换器匹配到路由内对应的数据时，按照关键字传参的方式传递给视图函数。
## 转换器的使用
* 在`urls.py`中写入url
```python
urlpatterns = [
    path('home/<int:age>', views.home)
]
```
* 在`views.py`中实现对应的视图函数,并将转换器匹配到的数据以`关键字的形式`传入函数
```python
def home(request, age):  # urls中，会匹配int型变量并名称为age，故视图函数需将age作为参数传入 
    print(age)
```
## 转换器类型   
  
|转换器类型|作用|例子|
|--|--|--|
|str|匹配除/以外的非空字符串| **login/user/\<str:passsword>** 匹配 **login/user/123456** |
|int|匹配0或任何正整数，返回int| **page/\<int:page>** 匹配 **page/100**|
|slug|任意ASCII字母、数字、连字符以及下划线组成的短标签|**title/\<slug:title>** 匹配 **title/who-is-it**|

## 关键字传参

# 分布式路由
django项目同名文件夹下的`urls.py`主路由文件不处理具体请求，而是将其分发至各个应用，由各个应用对请求进行处理。
## 配置分布式路由
* 在主路由(即项目同名文件夹下的`urls.py`)中调用 `include`模块:
```python
from django.urls import path, include

urlpatterns = [
  path('一级路由/', include('应用名称.urls'))
]
```
* 在对应的应用文件夹下创建`urls.py`, 内部代码与主路由中代码完全一致(除了不再调用`include`，因为已经不需要继续分发路由了)，用来处理请求。
```python
from django.urls import path
from . import views

urlpatterns = [
    path('二级路由/', views.view_fun_name),
]
```



# url书写规范
前端需要后端处理数据时，会通过写入标签的url(如a标签的href以及form表单的action属性)进行传递，浏览器对标签中url的书写有一定的规范
## 绝对地址
字面意思： http://127.0.0.1:8000/page/1
## 相对地址
### / 开头的相对地址：
* 若HTML标签的url以`/`开头，浏览器会将地址栏中的 **协议、ip以及端口号 + 待拼接的url** 进行拼接
* 若url为`/home/1`： 当前url为http://127.0.0.1:8000/page/3 则会变为http://127.0.0.1:8000`/home/1`
### 非 / 开头的相对地址：
* 浏览器会将地址栏中的 **当前url中最后一个/之前的内容** 加上 **待拼接url** 进行拼接
* 若url为`/home/1`： 当前url为http://127.0.0.1:8000/page/3 则会变为http://127.0.0.1:8000/page/`home/1`  

绝对地址优点是不会出错，但写法太过死板；相对地址写法灵活，但两种表示方法逻辑复杂。url的反向代理解决了两种url写法的缺点，并使得写法极其灵活。
# url反向解析
url反向解析是指在`视图函数`或`HTML模板`中，直接调用url名称，Django通过`url.py`中每条url的名称来计算出相应的路由
``` python 
# 在Django项目的 urls.py文件中，为路由添加name
path(路由, 视图函数名称, name='别名')
```
jinjia2模板中通过url关键字使用，分别对应普通情况，位置传参以及关键字传参
```
{% url '别名' %}
{% url '别名' ’参数1‘ ’参数2‘ ... '参数n' %}
{% url '别名' key1=’参数1‘ key2=’参数2‘ ... keyn='参数n' %}
```
对应到html中这样使用：
```html
<a href="{% url '别名' %}">普通url反向解析</a>
<a href="{% url '别名' ’参数1‘ ’参数2‘ ... '参数n' %}">位置传参url反向解析</a>
<a href="{% url '别名' key1=’参数1‘ key2=’参数2‘ ... keyn='参数n' %}">关键字传参url反向解析</a>
```
在视图函数中，则通过django的reverse方法进行反向解析（用于重定向）
```python
from django.url import reverse
def test_url(request):
    return HttpResponseRedirect(reverse('url的name', args=[], kwargs={}))
# arg 和 kwargs 针对path转换器中的传参
```