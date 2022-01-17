---
title: Python_匿名函数&高阶函数
toc: true
tags:
  - Python
  - 匿名函数
  - 高阶函数
categories:
  - - python
    - 匿名函数
date: 2020-03-15 20:17:09
---

lambda表达式可执行简单语句，多用于对list的处理。
## lambda表达式
<!-- more -->
### 表达式参数
* `lambda arg_list: expression`
* `arg_lists`是输入参数的形式，接受有的输入，比如:
  ```python
  a=1, 6
  *args
  **kargs
  [x, y]
  None
  ```
* `expression`则是简单的，单行语句，且需要的参数都在`arg_lists`中定义：
  ```python
  1
  None
  a+b
  1 if a > 0 else 2
  ```
### 表达式特性
**表达式有输入输出：** 输入为`arg_list`，输出为`expression`的返回值
**函数匿名：** lambda函数没有名称，不配拥有姓名
**功能有限：** 其格式已经决定了只能用于简单的语句结构

### 应用场景
#### 将lambda函数赋值给变量，使得lambda函数拥有姓名
```python
add = lambda x, y: x + y
add(1, 2) # 加法功能函数 输出为3
```
#### 用lambda函数替换掉别的函数
```python
time.sleep(3)  #程序sleep三秒
time.sleep = lambda x: print('HAHA')  # 将sleep函数的内部替换为lambda函数，无论sleep的输入是多少，都会执行print('HAHA')
```
#### lambda作为函数对象被返回给调用者
```python 闭包函数
def outter():
    fs = ['a', 'b', 'c']
    return lambda x: fs.pop()
a = outter()
print(a(1))  # 输出c
print(a(1))  # 输出b
```
### lambda表达式在递归的应用
leetcode 第144题
```python
def preorfer(root: TreeNode) -> List[int]:
    # 前序写法，中序后序类似 
    p = lambda x: [x.val] + p(x.left) + p(x.right) if x else []
    return p(root)
```
但是这种递归只能用于执行语句简单时，lambda不支持多分支，抛出异常等复杂语句。

## 高阶函数
### filter()
#### 参数 & 使用介绍
* 对list进行筛选，`filter(function, iterable)`
* **返回值**: filter对象
* **function**: 用于筛选元素的方法
* **iterable**: 可迭代的对象（如list）
#### 参数 & 使用介绍
  ```python
    def if_positive(x):
        return x > 0
    
    print(list(filter(if_positive, range(-3, 3))))
  ```
#### 匿名函数结合使用
* 此时lambda函数用于指定过滤列表元素的条件。
```python
print(list(filter(lambda x: x > 0, range(-3, 3))))
```

### sorted()
#### 参数 & 使用介绍
* 用于对list等可迭代对象进行排序，`sorted(iterable, key=None, reverse=True)`
* **返回值**: 新的list，原先的list不会有任何修改
* **iterable**: 可迭代的对象（如list）
* **key**: 用来进行比较的元素，
* **reverse**: `True`为降序，`False`升序（默认为False）

#### 匿名函数结合使用
* 此时lambda函数用于指定对列表中所有元素进行排序的准则。
```python
# 对如下list进行排序（以my_list中，tuple的第二个元素大小为基准升序排列）
my_list = [
    ('b', 2),
    ('a', 1),
    ('d', 4),
    ('c', 3)
]
print(sorted(my_list,key=lambda x: x[1]))
[('a', 1), ('b', 2), ('c', 3), ('d', 4)]
```

### map()
* 会根据提供的函数，对可迭代对象做映射
* 其效率高于列表生成式，但使用lambda会降低其运算效率
#### 参数 & 使用介绍
* `map(function, iterable)`
* **返回值**: map对象(一个生成器对象)，直接转换成list即可
* **function** : 输入对象中，每个元素的操作函数
* **iterable** : 可迭代对象
  ```python
  def square(x):
    return x**2
    
  my_list = [1, 2, 3, 4]
  print(list(map(square,my_list)))
  # [1, 4, 9, 16]
  ```
#### 匿名函数结合使用
* 此时lambda函数用于指定对列表中每一个元素的共同操作。
  ```python
  # lambda 单个参数
  my_list = [1, 2, 3, 4, 5, 6]
  res = map(lambda x: x**2, my_list)
  print(res)
  print(list(res))

  # lambda多参数
  my_list1 = [1, 2, 3, 4, 5, 6]
  my_list2 = [1, 2, 3, 4, 5, 6]

  res = map(lambda x, y: x ** y, my_list1, my_list2)
  print(res)
  print(list(res))
  ```

### reduce()
* reduce又称归约：如果没有`default_value`,则对集合中第1，2个元素操作，得到的结果和第三个元素进行操作，以此类推；若设置`default_value`，则对`default_value`与集合中第1个元素操作，得到的结果和第二个元素进行操作，以此类推。
#### 参数 & 使用介绍
* `reduce(function, iterable, default_value)`
* **返回值**：对应的结果
* **function**: 对两个元素的操作（方法应输入2个参数）
* **iterable**: 可迭代的对象
#### 匿名函数结合使用

* 先对集合中第1，2个元素操作，得到的结果和第三个元素进行操作，以此类推
```python
from functools import reduce  # 注意：需要导入

# 1-100的和
print(reduce(lambda x, y: x+y, range(1, 101)))  # 5050
print(reduce(lambda x, y: x+y, range(1, 101)， 100))  # 5150
```


## 参考
[团灭前中后序遍历的递归+迭代](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/solution/jian-ji-jing-dian-yi-dong-yi-ji-tuan-mie-qian-zhon/)
[lambda完整讲解](https://blog.csdn.net/zjuxsl/article/details/79437563)
