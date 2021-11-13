---
title: Pytorch_张量
toc: true
mathjax: true
date: 2021-10-20 16:39:42
tags:
- Pytorch
- 张量
categories:
- [Pytorch, 张量]
---
# 张量（Tensor）定义
pytorch中的各种数值数据，都可称之为张量。类比计算机语言中的变量，就是pytorch中的张量。
# 张量分类
|名称|解释|Pytorch示例|
|--|--|--|
|0阶张量(scaler)|是一个标量，常数，0-D Tensor|scal = 345|
|1阶张量(vector)|是一个向量，1-D Tensor|scal = [345, 235, 555]|
|2阶张量(matrix)|是一个矩阵，2-D Tensor|scal = \[\[23,43,43],\[44,45,46]]|
|3阶张量|是一个立方体，3-D Tensor|scal = \[ \[ \[2], \[3] ], \[ \[45],\[88] ] ]|
|n阶张量|n层数组嵌套|...|
* 阶是指表示数组嵌套的层数。当维数>=3时，统称为多维张量
* 张量的第一维度，就是最外层数组、第二维度就是次外围数组、第三维度就是第二维度的子数组、...、第n维度就是n-1维度的子数组
# 创建张量
* 通过`torch.Tensor()`创建张量  
  该方法将已生成的`python列表`或`numpy列表`转化为张量，
  * 将python列表或序列转换成张量
      ```python
      import torch
      t1 = torch.Tensor([1, 2, 3]) # 将无嵌套的list转换为1维张量
      t2 = torch.Tensor([
        [1, 2, 3],
        [4, 5, 6]
      ])  # 将1层嵌套的list转换为2维张量
      ```
  * 将numpy转换成张量
    ```python
    import torch
    import numpy as np
    ay1 = np.arange(12).reshape(3,4)  # 创建元素个数为12的二维数组
    '''ay1 output
      [
       [ 0, 1, 2, 3 ]
       [ 4, 5, 6, 7 ]
       [ 8, 9, 10, 11]
      ]
    '''
    torch.Tensor(ay1)
    ```
* `torch自带api`进行创建
  ```python
  # 3行4列张量，无用数据填充
  ay1 = torch.empty(3, 4)

  # 3行4列张量，整数1填充
  ay2 = torch.ones([3, 4])

  # 3行4列张量，整数0填充
  ay3 = torch.zeros([3, 4])

  # 3行4列张量，随机数填充，随机数[0, 1)
  ay4 = torch.rand([3, 4])

  # 3行4列张量，随机数填充，随机数[1, 10)
  ay5 = torch.randint(1, 10, (3, 4))
  ay5 = torch.randint(low=1, high=10, size=(3, 4))

  # 3行4列张量，随机数填充，随机值分布式均值为0，方差为1，服从正态分布
  ay6 = torch.randn(3, 4)
  ```
# 张量的操作
## item()方法
* 当tensor中只有一个数据时，获取该数据（本质上为获取scalar）
  ```python
  a = torch.Tensor([[[1]]])
  print(a.item()) # 1

  a1 = torch.Tensor([2])
  print(a1.item()) #2

  a3 = torch.Tensor([1, 2])
  print(a3) # 报错，因为该张量中元素数量大于1个
  ```
## numpy()方法
* 将tensor转化为numarray
  ```python
  ay1 = torch.randn(3, 4)
  print(ay1) # 打印出来的是张量
  print(ay1.numpy())  #打印出来的是二维数组
  ```
## size()方法
### 不加参数
* 与`numpy.shape()`相似,`size()`不加参数时返回各个维度的长度
* 映射到数组上，`size()`就是从最外围数组长度（第一维度数组的size）、次外围数组的长度（第二维度的size）、次外围的子数组长度、...、最内层数组的长度（第n维数组的size）
    ```python
    ay1 = torch.randn(3, 4)  # 生成 3*4的二维张量
    print(ay1.size()) # 结果为torch.Size([3, 4]) 第一维度长度为3，第二维度长度为4
    ```
### 加参数
* `size(n)`则返回第n-1个维度的长度（n的取值范围为 [0, 该张量的最大维度)）
    ```python
    ay1 = torch.randn(3, 4)  # 生成 3*4的二维张量
    print(ay1.size(0)) # 结果为第1维度的长度值3
    print(ay1.size(1)) # 结果为第2维度的长度值4
    ```
* `size(n)`中的参数，除了正整数，负数也可以
  ```python
    ay1 = torch.randn(3, 4)  # 生成 3*4的二维张量
    print(ay1.size(-1)) # 结果为最大维度的长度值4
    print(ay1.size(-2)) # 结果为倒数第二个维度的长度值3
  ```
## view()方法
* **作用：** 与`numpy.reshape()`相似，根据view中给的新维度size参数生成一个新的张量，新张量中元素个数和元素值与原张量相等，原张量不受影响
* **原理：** 将原张量**拉伸**成1个list，根据view()中给的新维度size参数进行切分
* 参数：
  * view()后面所加的若干参数，参数代表每个维度的size，各个新维度参数相乘应等于原张量中元素的数量
  * view()的参数既可以是`view(第一维度size, 第二维度size, ..., 第n维度size)`，也可以是`view([第一维度size, 第二维度size, ..., 第n维度size])`
### 示例
  ```python
  ay1 = torch.randn(3, 4) # 第一个维度size为3，第二个维度size为4的矩阵张量
  '''
  ay1
  tensor([[ 0.1535,  0.1383,  0.5748,  0.7731],
        [ 1.2126,  0.0849,  0.0404, -0.9990],
        [ 1.1190,  0.3803,  0.6257, -0.4003]])
  '''
  ay2 = ay1.view(2, 6)  # 将ay1张量重新改为第一维度size为2， 第二维度size为6的矩阵张量
  '''
  tensor([[ 0.1535,  0.1383,  0.5748,  0.7731,  1.2126,  0.0849],
        [ 0.0404, -0.9990,  1.1190,  0.3803,  0.6257, -0.4003]])
  '''
  # ay2的元素数量与元素值与ay1相等

  ay3 = ay1.view(3, 2, 2)  # 将ay1张量重新改为第一维度size为3、第二维度size为2、第3维度size为2的立体张量
  '''
  tensor([[[ 0.1535,  0.1383],
         [ 0.5748,  0.7731]],

        [[ 1.2126,  0.0849],
         [ 0.0404, -0.9990]],

        [[ 1.1190,  0.3803],
         [ 0.6257, -0.4003]]])
  '''
  ```
* 若view中参数出现了-1，表示该维度的参数个数根据其他维度的size以及原张量的元素个数自动生成
* view(2, -1)表示第1维度size为2，第2维度则根据原张量元素以及新张量第一维度自动生成
* view(2, -1, 3)表示第1维度size为2，第3维度size为3，第2维度则是`原张量size%2%3=2`
  ```python
  ay1 = torch.randn(3, 4)
  '''
  tensor([[ 0.1258, -0.2668, -0.1096,  0.6650],
        [-1.1794,  1.3307, -1.5513, -0.3846],
        [-0.6519,  1.3361,  0.6089, -0.2207]])
  '''
  print(ay1.view([2, -1]))
  '''
  tensor([[ 0.1258, -0.2668, -0.1096,  0.6650, -1.1794,  1.3307],
        [-1.5513, -0.3846, -0.6519,  1.3361,  0.6089, -0.2207]])
  '''
  print(ay1.view([3, -1, 2]))
  '''
  tensor([[[ 0.1258, -0.2668],
         [-0.1096,  0.6650]],

        [[-1.1794,  1.3307],
         [-1.5513, -0.3846]],

        [[-0.6519,  1.3361],
         [ 0.6089, -0.2207]]])
  '''
  ```
## dim()方法
* 获取张量的阶数（即list嵌套数量）
  ```python
  ay1 = torch.randn(3, 4)
  print(ay1.dim()) # 2
  ```
## max(),min()方法
* 获取张量中的最大/最小值
  ```python
  ay1 = torch.randn(3, 4)
  print(ay1)
  print(ay1.max(), ay1.min())
  ```
## 转置
* 转置：将若干维度的元素进行交换
### t()方法
* 二维张量的转置
### transpose()方法
* 若是二维张量，则`transpose`可不加参数，与`t()`方法一样；若是高维张量，则需要填写交换的维度
* transpose(0,1)指1维度与2维度交换
### permute()方法
* permute负责3阶以上张量的转置
  ```python
  ay1 = torch.randn(3, 2, 2, 2)
  print(ay1.permute(1, 3, 2, 0)) #将1维度与2维度转置，2维度与4维度转置，4维度与1维度转置
  ```
## 取值&赋值&切片
* 与python多维列表无异
  ```python
  ay1[1, 2, 3] 
  ay1[1,:,:]
  ay1[1, 2, 3] = 18
  ```
### 张量相加
* 张量相加时，需注意**张量阶数**以及**每个维度的size** 相等
  ```python
  a = [[1,2,3,4], [5,6,7,8]]
  x = torch.rand(5, 3) 
  y = torch.ones(5, 3)
  print(x+y)
  print(torch.add(x, y))
  print(x.add(y))
  # 以上加法对x与y不产生影响，返回的结果会赋值给新的变量
  ```
* `x.add_(y)`方法会对将结果赋值给`x`，任何方法名后缀为下划线的方法都是将计算结果赋值给原张量
  ```python
  a = [[1,2,3,4], [5,6,7,8]]
  x = torch.rand(5, 3) 
  y = torch.ones(5, 3)
  print(x.add(y))
  ```

# 张量数据类型
## 常见数据类型
  |data type|dtype|tensor type|
  |--|--|--|
  |32-bit floating point|`torch.float32` or `torch.float`|`torch.FloatTensor`|
  |64-bit floating point|`torch.float64` or `torch.double`|`torch.DoubeTensor`|
  |16-bit floating point|`torch.float16` or `torch.half`|`torch.HalfTensor`|
  |8-bit floating point(unsigned)|`torch.uint8` |`torch.ByteTensor`|
  |8-bit floating point(signed)|`torch.int8` |`torch.CharTensor`|
  |32-bit integer (signed)|`torch.int32` or `torch.int`|`torch.IntTensor`|
  |64-bit integer (signed)|`torch.int64` or `torch.long`|`torch.LongTensor`|
  |16-bit integer (signed)|`torch.int16` or `torch.short`|`torch.ShortTensor`|
* **注意：** Pytorch默认的数据类型为`torch.float32`
## 创建张量时指定其类型
* 通过`dtype`创建
```python
a = [[1,2,3,4], [5,6,7,8]]
ay1 = torch.tensor(a, dtype=torch.float16)
print(ay1.dtype) # torch.float16

ay1 = torch.randn([3, 2, 2, 2], dtype=torch.float64)
print(ay1.dtype) # torch.float64
```
* 通过`Tensor Type`创建
```python
ay1 = torch.LongTensor([1, 2, 3])
print(ay1.dtype) # torch.int64

ay2 = torch.ShortTensor([1, 2, 3])
print(ay2.dtype)  # torch.int16
``` 
## 获取数据类型
直接通过`.dtype()`获得
```python
ay1 = torch.randn([3, 2, 2, 2], dtype=torch.float64)
print(ay1.dtype)
```
## 类型的修改
* 通过`type()方法`进行修改
  ```python
  a = [[1,2,3,4], [5,6,7,8]]
  ay1 = torch.tensor(a)
  print(ay1.dtype)  # torch.int64
  print(ay1.type(torch.int))  # tensor([[1, 2, 3, 4], [5, 6, 7, 8]], dtype=torch.int32)
  print(ay1.type(torch.float))  # tensor([[1., 2., 3., 4.],[5., 6., 7., 8.]]) 
  print(ay1.type(torch.short))  # tensor([[1, 2, 3, 4], [5, 6, 7, 8]], dtype=torch.int16)
  ```
* 通过`dtype()`直接修改
  ```python
  a = [[1,2,3,4], [5,6,7,8]]
  ay1 = torch.tensor(a)
  print(ay1.dtype)  # torch.int64
  print(ay1.short())  # tensor([[1, 2, 3, 4], [5, 6, 7, 8]], dtype=torch.int16)
  print(ay1.int())  # tensor([[1, 2, 3, 4], [5, 6, 7, 8]], dtype=torch.int32)
  print(ay1.double())  # tensor([[1., 2., 3., 4.], [5., 6., 7., 8.]], dtype=torch.float64)
  ```
 