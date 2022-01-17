---
title: Python_is&==&isinstance&type
toc: true
tags:
  - python
  - is
  - ==
  - isinstance
  - type
categories:
  - - Python
    - is&==
date: 2022-01-07 21:20:09
---
# Python判断相等
## is
* `is`用于比较变量所指向的**id**是否相等（即变量是否指向同一个地址）
* 当判断对象是否为`None`的时候，应使用`is None`进行判断，因为在Python中`None`是以单例模式存在
    ```python
    a = [1, 2]
    b = a
    c = [1, 2]
    # a,b的id相等，c的id与ab不相等
    print(id(a), id(b), id(c))  # 140222476617024 140222476617024 140222476617088
    print(f"a is b: {a is b}")  # True
    print(f"a is c: {a is c}")  # True
    print(f"b is c: {b is c}")  # False
    b.append(3)
    print(id(a), id(b))  # 140222476617024 140222476617024
    print(a, b)  # [1, 2, 3] [1, 2, 3]

    # None: 单例模式
    a = None
    b = a
    c = None
    print(id(a), id(b), id(c))  # 4432645744 4432645744 4432645744
    print(f"a is b: {a is b}")  # True
    print(f"a is c: {a is c}")  # True
    print(f"b is c: {b is c}")  # True
    ```
* 虽然一些常用整数也是单例模式，但不建议用`is`进行比较
    ```python
    a = 1
    b = a
    c = 1
    print(id(a), id(b), id(c))  # 4432788128 4432788128 4432788128
    ```
## ==
* 判断两个变量值是否相等，两个变量指向的地址中，存放的**数值**是否相等
* `==`底层是调用类的`__eq__`方法

## `is`与`==`比较
* `is`的计算速度比`==`快，毕竟只比较2个变量指向的id
*  
# Python判断对象的类
## isinstance
## type

# 参考




