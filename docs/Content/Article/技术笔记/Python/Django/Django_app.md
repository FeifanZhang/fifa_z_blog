# Django应用
随着Django项目中功能的增加，会导致 `views.py中视图函数`以及`urls.py中路径`过多（总不可能一个项目几十个程序员可这俩文件里写东西吧~，git每天都是冲突），为了对每个功能模块进行解耦，django诞生了应用这个概念，实现了各个模块之间从url到视图函数的彻底隔离。
# 配置app
* 打开黑窗口，在django项目根目录下输入 `python3 manage.py startapp 应用名称`来创建应用（应用名称不得使用python中自带的关键字）。
* 创建完成后，项目根目录下会多出一个与应用同名的文件夹，且文件夹下内容如下：
```bash
|____django_app
|  |____migrations 存放数据库迁移文件
|  |  |____ __init__.py  
|  |____ __init__.py  用于python包的管理
|  |____admin.py 配置后台管理
|  |____apps.py  应用相关配置
|  |____models.py 数据库ORM代码，链接数据库
|  |____tests.py  测试用例
|  |____views.py  视图函数
```
* 将创建完成的app注册到 `settings.py` 中（在 `INSTALLED_APPS` 列表最后添加创建的app名称即可）:
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app_name' # 最后一行加入app名称
]
```

# 应用内部的模板
* 为了进一步增强应用的独立性，django提供了在应用路径下存储模板的方法。
* 当页面过于复杂时，可以将全局模板（如`header`和`footer`）存放至**项目根目录下的templates**中，将每个app独有的模板内容存放至**自身app的templates**中

## 配置方法
* 在app下创建 `templates` 文件夹
* `settings.py`中，将`TEMPLATES`配置项中的`APP_DIRS`设置为True:
```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True, # 设置为True
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

**注意：同一个项目的模板不管是否在同一个templates文件夹中，都不能重名！** 
* 如果`app内html模板`与`根目录templates下的html模板`重名，则调取`根目录templates下的html模板`
* `多个app内html模板重名`,则以`settings.py`中`INSTALLED_APPS`的注册顺序进行模板调取。
