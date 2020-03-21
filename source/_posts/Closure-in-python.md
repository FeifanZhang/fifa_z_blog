---
title: Closure in python
toc: true
date: 2020-03-12 14:09:42
tags:
- python
- closure
- decorator
categories:
- [python,closure]
---
外函数的局部变量被内函数调取，当外函数执行完销毁时，被调用的变量会和内函数绑定避免销毁。
<!-- more -->
## 一：Python的闭包函数
**注意：**
`var = func()`是将`func`函数执行完的结果赋值给`var`
`var = func`是将`func`这个函数对象赋值给`var`
```python
def outter_func():
    fs = []
    def inner_func(name):
        fs.append(name)
        print(fs)
    return inner_func

var = outter_func()
var('my') # print out ['my']
var('name') # print out ['my','name']
```
`outter_func`按顺序执行 -> 将`inner_func`函数对象作为结果返回给`var` -> 返回后`outter_func`及其局部变量自动销毁，
但`fs`被`inner_func`绑定，不会和`outter_func`一起销毁 -> 成为`inner_func`私有变量 -> 每次执行`var('par')`都会对`fs`造成累计改变。
var中存放的，是由`outter_func`返回的`inner_func`对象，通过`var('my')`调用的是含有`fs`的`inner_func('my')`
`fs`称为自由变量，可以用来记录闭包函数的每一次调用。
外函数返回的对象为函数。
---
## 二：装饰器(语法糖)
闭包函数中，返回值为对象这一特性的延伸。
外函数的`func`参数会和`func2`进行绑定
外函数的参数为函数对象，该对象在内函数中执行。
不影响原有函数功能，可添加新功能。
导入的第三方AIP无法重写时，可用装饰器进行修改。

```python
def func1(func):  # 外函数的参数是被装饰函数对象
    def func2():
        print('this is func2')
        return func()  # 返回的是函数func()的调用，即执行后的结果
    return func2  # 返回的是函数对象

@func1  
def myprint():
    print('hello')

myprint()  # 等同于 func1(myprint)()
```
函数`myprint`作为参数输入进`func1`中，且在内函数`func2`里被执行
外函数`func1`返回的则是内函数对象。
---
## 三：带参数的装饰器
在普通装饰器的基础上，增添一层函数来接收参数
```python
def func1(sex):
    def func2(func): # 内层和前面一样，在最外层嵌入一个`func1`来添加参数
        def func3():
            if sex == 'man':
                print('he is a man')
            if sex == 'woman':
                print('she is a woman')
            return func()
        return func3
    return func2

@func1(sex='man')
def man():
    print('human')

@func1(sex='woman')
def woman():
    print('human')

var1 = man
var2 = woman
var1() # he is a man human
var2() # she is a human woman
```
Django中，局部注销/添加 csrf token用到了带参数的装饰器。
