---
title: Python_logging
toc: true
tags:
  - python
  - logging
categories:
  - - python
    - logging
date: 2022-01-04 12:14:09
---
# 日志库级别
|级别|数值|意义|
|--|--|--|
|DEBUG|10|详细信息，用于调试|
|INFO|20|正常运行时产生的一些信息|
|WARNING|30|可正常运行，但有可能发生错误|
|ERROR|40|问题严重以至于部分功能无法执行|
|CRITICAL|50|严重错误，程序无法运行|  
* 默认情况下，只输出warning级别及以上的日志
```python
    logging.debug("debug")
    logging.info('info')
    logging.warning('warning')
    logging.error('error')
    logging.critical('critical')
    # WARNING: root:warning
    # ERROR: root:error
    # CRITICAL: root:critical
```
# basicConfig()生成日志
## level参数
* 默认输出的日志级别的warning及以上，改变输出日志最低等级
  ```python
      logging.basicConfig(level=logging.DEBUG)
      logging.debug("debug")
      logging.info('info')
      logging.warning('warning')
      logging.error('error')
      logging.critical('critical')
      # DEBUG: root:debug
      # INFO: root:info
      # WARNING: root:warning
      # ERROR: root:error
      # CRITICAL: root:critical
  ```
## filename参数
* 将日志输出至相应文件
  ```python
      logging.basicConfig(level=logging.DEBUG)
      logging.debug("debug")
      logging.info('info')
      logging.warning('warning')
      logging.error('error')
      logging.critical('critical')
      # DEBUG: root:debug
      # INFO: root:info
      # WARNING: root:warning
      # ERROR: root:error
      # CRITICAL: root:critical
  ```
* log内容不会输出至黑窗口，多次执行产生的日志不会对log文件进行覆盖而是追加
## filemode参数
* `filemode='w'`多次执行的日志信息对log文件进行覆盖
  ```python
      logging.basicConfig(filename='a.log', filemode='w', level=logging.DEBUG)
      logging.debug("debug")
      logging.info('info')
      logging.warning('warning')
      logging.error('error')
      logging.critical('critical')
  ```
* `filemode='a'`多次执行的日志信息对log文件进行追加
  ```python
      logging.basicConfig(filename='a.log', filemode='a', level=logging.DEBUG)
      logging.debug("debug")
      logging.info('info')
      logging.warning('warning')
      logging.error('error')
      logging.critical('critical')
  ```
## format参数
* 输出的日志信息格式默认为`DEBUG:root:detail message`，`format`参数可自定义日志的输出格式  
  
|占位符|作用|
|--|--|
|``|显示日志级别|
|`%(asctime)s`|显示时间|
|`%(message)s`|显示日志内容|
|`%(filename)s`|产生日志的文件名|
|`%(lineno)s`|日志在文件的哪一行产生(即log语句的位置)|

```python
    logging.basicConfig(format="%(asctime)s | %(levelname)s | %(message)s | %(filename)s | %(lineno)s | %(message)s",
                        level=logging.DEBUG)
    logging.debug("debug")
    logging.info('info')
    logging.warning('warning')
    logging.error('error')
    logging.critical('critical')
    # 2022 - 01 - 04 23: 21:30, 347 | DEBUG | debug | freshMan.py | 109 | debug
    # 2022 - 01 - 04 23: 21:30, 347 | INFO | info | freshMan.py | 110 | info
    # 2022 - 01 - 04 23: 21:30, 347 | WARNING | warning | freshMan.py | 111 | warning
    # 2022 - 01 - 04 23: 21:30, 347 | ERROR | error | freshMan.py | 112 | error
    # 2022 - 01 - 04 23: 21:30, 347 | CRITICAL | critical | freshMan.py | 113 | critical
```

## datafmt参数
* 日志时间信息的格式化输出
* `%Y-%m-%d %H:%M:%S`
```python
    logging.basicConfig(datefmt='%Y-%m-%d %H:%M:%S',format="%(asctime)s | %(levelname)s | %(message)s | %(filename)s | %(lineno)s | %(message)s",
                        level=logging.DEBUG)
    logging.debug("debug")
    # 2022-01-04 23:23:50 | DEBUG | debug | freshMan.py | 109 | debug
```
# logging模块组件生成日志
```mermaid
flowchart LR

创建一个logger并设置默认等级 --> 创建屏幕StreamHandler --> 设置日志等级
创建一个logger并设置默认等级 --> 创建文件FileHandler --> 设置日志等级
设置日志等级 --> formatter --> 用formatter渲染的所有handler --> 将所有Handler加入logger --> 程序调用logger
```
## handlers处理器
* 记录器产生的日志发送至目的地(如文件，短信以及email等)
* 一个记录器可对应多个处理器
* 若不指定输出级别，则默认使用loggers的输出级别
* handler 日志输出级别不得低于logger，若低于则按logger日志级别进行输出
  
|名称|描述|参数|
|--|--|--|
|`StreamHandler()`||
|`FileHandler()`|将所有日志写入一个文件中|
|`RotatingFileHandler()`|按照文件大小生成多个log文件|
|`TimedRotatingFileHandler()`|按照时间生成多个log文件|
|`setFormatter()`|设置handler对象信息格式|


## formatters格式化器
* 日志结构和消息字段

  |占位符|描述|
  |--|--|
  |`%(asctime)s`|日志产生的时间|
  |`%(created)f`|`time.time()`生成时间戳|
  |`%(filename)s`|生成日志的程序名称|
  |`%(funcName)s`|调用日志的函数名称|
  |`%(levelname)s`|日志级别（debug，warning，error等）|
  |`%(levelno)s`|日志对应级别的数值|
  |`%(lineno)d`|生成日志在代码哪一行|
  |`%(module)s`|生成日志的模块名|
  |`%(msecs)d`|日志生成的毫秒部分|
  |`%(message)s`|具体日志信息|
  |`%(name)s`|日志调用者|
  |`%(pathname)s`|生成日志的文件的完整路径|
  |`%(process)d`|日志 ID 进程|
  |`%(processName)s`|进程名称|
  |`%(thread)d`|生成日志的线程 ID |
  |`%(threadName)s`|线程名称|
* 可以在`d`,`s`等占位符前加入格式化输出语句使得日志格式对齐
* `%(levelname)8s`代表levelname长度为8空格补齐

## loggers记录器

|名称|描述|参数|
|--|--|--|
|`logging.getLogger(__name__)`|提供应用程序代码直接使用接口，对象是单例对象|`__name__`参数默认为`root`|
|`setLevel()`|设置日志记录等级，默认为Warning，`handler`的setLevel不得低于`logger`|`logging.DEBUG/INFO/WARNING/ERROR/CRITICAL`|
|`addHandler()` |绑定处理器|参数为handler对象名称|
|`removeHandler()`|移除处理器|参数为handler对象名称|

## filters过滤器(可选)
* 提供更好的粒度控制，决定哪些日志会被输出
* 根据logger.getLogger()设置的name进行过滤
* logger和handler都可添加过滤器

## 举例
```python

# handler
consoleHandler = logging.StreamHandler()
consoleHandler.setLevel(logging.INFO)
fileHandler = logging.FileHandler(filename='demo.log')
fileHandler.setLevel(logging.WARNING)
# -------------------------------------------------------

# logger
# logging.getLogger(__name__)
logger = logging.getLogger()
print(logger, type(logger))  # <RootLogger root (WARNING)> <class 'logging.RootLogger'>
log = logging.getLogger('app log')  # 修改name参数
print(log, type(log))  # <Logger app log (WARNING)> <class 'logging.Logger'>

# setLevel()
logger.setLevel(logging.DEBUG)
print(logger, type(logger))
# <RootLogger root (DEBUG)> <class 'logging.RootLogger'>

# addHandler() & removeHandler()
logger.addHandler(consoleHandler)
logger.addHandler(fileHandler)

# -------------------------------------------------------

# formatter
fmt = logging.Formatter('%(asctime)s | %(levelname)8s | %(filename)s : %(lineno)d | %(message)s')
consoleHandler.setFormatter(fmt)
fileHandler.setFormatter(fmt)

# 通过自定义logger输出日志内容
logger.debug('debug')
logger.info('info')
logger.warning('warning')
logger.error('error')
logger.critical('critical')

# 通过logger获取错误信息
a = 'abc'
try:
    int(a)
except Exception as e:
    logger.exception(e)
```

