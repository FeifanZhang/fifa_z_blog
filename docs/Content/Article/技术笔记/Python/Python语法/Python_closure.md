# Python的闭包函数
**注意：**
`var = func()`是将`func`函数执行完的结果赋值给`var`，此时函数已经执行完毕。
`var = func`是将`func`这个函数对象赋值给`var`，此时函数还未执行
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
`outter_func`按顺序执行 -> 将`inner_func`函数对象作为结果返回给`var` -> 返回后`outter_func`及其局部变量自动销毁，但`fs`被`inner_func`绑定，不会和`outter_func`一起销毁 -> 成为`inner_func`私有变量 -> 每次执行`var('par')`都会对`fs`造成累计改变。var中存放的，是由`outter_func`返回的`inner_func`对象，通过`var('my')`调用的是含有`fs`的`inner_func('my')``fs`称为自由变量，可以用来记录闭包函数的每一次调用。对象`var`为闭包：即含有函数+自由变量的"包裹"。

# 装饰器(语法糖)
## 简介
闭包函数中，返回值为对象这一特性的延伸。外函数的`func`参数会和`func2`进行绑定。外函数的参数为函数对象，该对象在内函数中执行。不影响原有函数功能，可添加新功能。导入的第三方AIP无法重写时，可用装饰器进行修改。
## 作用
某功能需要执行一个函数（print("hello")），并计算函数的运行时间，若函数逻辑与计时功能一同封装，则函数耦合性、可读性降低（可读性降低是因为计时功能为次要功能，与主要逻辑混杂会降低可读性）。
```python
def display_time(func):  # 外函数的参数是被装饰函数对象，装饰器函数为辅助函数,该案例中辅助函数用来计算主函数的运行时间
    def wrapper():
        t1 = time.time()
        func()  # 返回的是函数func()的调用，即执行后的结果
        t2 = time.time()
        print(t2 - t1)
    return wrapper  # 返回的是函数对象

@display_time  
def myprint():
    print('hello')

myprint()  # 等同于 display_time(myprint)()
# 函数`myprint`作为参数输入进`display_time`中，且在内函数`wrapper`里被执行，外函数`display_time`返回的则是内函数对象 + `myprint`的“包裹”。
```

# 带参数的装饰器
在上一个装饰器函数的基础上，在主函数中输入参数：`myprint`中自定义想要print的字符串
```python
def display_time(func): 
    def wrapper(*args):  # *args表示位置参数：不知道输入参数的个数时，使用该参数，该案例中，可能会有若干主函数使用该装饰器，不同函数输入的参数个数会不一样。
        t1 = time.time()
        func(*args) 
        t2 = time.time()
        print(t2 - t1)
    return wrapper 

@display_time  
def myprint(str__):
    print(str__)
myprint("ahahaha")
```
Django中，局部注销/添加 csrf token用到了带参数的装饰器。

# 实现一个类中的装饰器
```python
class Tool:
    def upd_log_file(func):
        def inner(self):
            func(self)
            with open('./log.txt', mode='w', encoding='utf-8') as f:
                f.write('FIFA ! ')
        return inner

    @upd_log_file
    def func_test(self):
        print('in to func_test !')
```
