---
title: Python lambda expression
toc: true
tags:
  - lambda
  - recursion
  - binary tree
categories:
  - - python
    - lambda
date: 2020-03-15 20:17:09
---

lambda表达式可执行简单语句，多用于对list的处理。
## lambda表达式
<!-- more -->
### 表达式参数
lambda arg_list: expression
`arg_lists`是输入参数的形式，接受有的输入，比如:
```python
a=1, 6
*args
**kargs
[x, y]
None
```
`expression`则是简单的，单行语句，且需要的参数都在`arg_lists`中定义：
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
#### lambda作为参数被python函数使用
##### filter()
此时lambda函数用于指定过滤列表元素的条件。例如filter(lambda x: x % 3 == 0, [1, 2, 3])指定将列表[1,2,3]中能够被3整除的元素过滤出来，其结果是[3]
##### sorted()
此时lambda函数用于指定对列表中所有元素进行排序的准则。例如sorted([1, 2, 3, 4, 5, 6, 7, 8, 9], key=lambda x: abs(5-x))将列表[1, 2, 3, 4, 5, 6, 7, 8, 9]按照元素与5距离从小到大进行排序，其结果是[5, 4, 6, 3, 7, 2, 8, 1, 9]。
##### map()
此时lambda函数用于指定对列表中每一个元素的共同操作。例如map(lambda x: x+1, [1, 2,3])将列表[1, 2, 3]中的元素分别加1，其结果[2, 3, 4]。
##### reduce()：先对集合中第1，2个元素操作，得到的结果和第三个元素进行操作，以此类推
此时lambda函数用于指定列表中两两相邻元素的结合条件。例如reduce(lambda a, b: '{}, {}'.format(a, b), [1, 2, 3, 4, 5, 6, 7, 8, 9])将列表 [1, 2, 3, 4, 5, 6, 7, 8, 9]中的元素从左往右两两以逗号分隔的字符的形式依次结合起来，其结果是'1, 2, 3, 4, 5, 6, 7, 8, 9'。

---
## lambda表达式在递归的应用
leetcode 第144题
```python
def preorfer(root: TreeNode) -> List[int]:
    # 前序写法，中序后序类似 
    p = lambda x: [x.val] + p(x.left) + p(x.right) if x else []
    return p(root)
```
但是这种递归只能用于执行语句简单时，lambda不支持多分支，抛出异常等复杂语句。

---
## 参考
[团灭前中后序遍历的递归+迭代](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/solution/jian-ji-jing-dian-yi-dong-yi-ji-tuan-mie-qian-zhon/)
[lambda完整讲解](https://blog.csdn.net/zjuxsl/article/details/79437563)
