---
title: Django_static_file
toc: true
tags:
  - django
  - static_file
categories:
   - django
   - static_file
date: 2021-10-07 18:41:53
---
# 静态文件
CSS、JS、图片以及视频都算静态文件
## 配置static文件夹
* 在settings.py中找到 `STATIC_URL = '/static/'`，并添加 `STATICFILES_DIRS`：
```python
# 该行表示当url为 /static/XXX时，不会进入视图函数，而是寻找静态文件
STATIC_URL = '/static/' 

# STATICFILES_DIRS需自行添加，表示static文件夹的位置（本次演示static放置在一级目录下）
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)
```
* 将 static 文件夹添加至 `STATICFILES_DIRS` 表示的路径下即可
* static文件夹可以根据静态文件的不同类型，在其路径下继续分为 css、js以及image等文件夹
## 模板引用静态文件的方法
静态文件aha.png的文件路径为 `/static/image`
* **绝对路径以及相对路径的引用：** 在模板中如下引用
```html
<!--绝对路径引用-->
<img src="https://127.0.0.1/8080/static/image/aha.png">

<!--相对路径引用-->
<img src="/static/image/aha.png">
```
* **通过标签进行引用（推荐）：**  
```html
<!--首先加载 static 标签-->
{% load static %}
<!---->
<img src="{% static 'image/aha.png' %}">
```
* **推荐使用标签进行引用的原因：** 如果未来静态资源文件夹名称改变，则所有涉及文件夹路径的地方都要修改，第一种方法直接引用路径，故导致模板内大量url需修改；而第二种方法仅需修改settings.py中文件夹名称即可