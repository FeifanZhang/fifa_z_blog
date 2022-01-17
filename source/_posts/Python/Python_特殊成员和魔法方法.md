---
title: Python_特殊成员和魔法方法
toc: true
tags:
  - python
  - magic_method
categories:
  - - python
    - magic_method
date: 2021-12-12 19:15:09
---
# 魔法方法
* 魔法方法是python内置方法，一般不会主动调用，目的是为了给python的解释器进行调用，几乎每个魔法方法都有一个对应的内置函数，或者运算符，当我们对这个对象使用这些函数或者运算符时解释器会调用类中的对应魔法方法，可以理解为重写这些python的内置函数
|魔法方法|含义|调用情境|
|--|--|--|
|`__new__(cls, *args, **kwargs)`|第一次创建某个类时调用|`a = Cat()`时调用，之后在创建Cat类时不会调用|
|`__init__(self, *args)`|构造器，实例化类时会进行调用|`a, b = Cat(name=mike), Cat(name=mimi)`类被创建两次，`init`被调用两次|
|`__del__(self)`|析构器，一个实例被销毁时调用|`del a`时会被调用|
|`__doc__`|||
```python
class Cat():
  def
```
# 参考
[python魔法方法是什么](http://www.py.cn/jishu/jichu/12501.html)



