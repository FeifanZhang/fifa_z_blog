---
title: Pytorch_线性回归
toc: true
mathjax: true
date: 2021-10-24 11:43:42
tags:
- Pytorch
- 线性回归
categories:
- [Pytorch, 线性回归]
---
# 手动实现线性回归
## 需要的函数
### `requires_grad()`和`grad_fn`
生成张量时，需要设置`requires_grad = True`来表示后序pytorch会将张量的操作记录到`grad_fn`变量中，从而自动计算梯度
  ```python
  x = torch.ones([2, 2], requires_grad=True)
  print(x)  # tensor([[1., 1.], [1., 1.]], requires_grad=True)
  y = x + 1
  print(y.grad_fn)  # <AddBackward0>
  z = y * 2
  print(z.grad_fn)  # <MulBackward0>

  # 使用 with torch.no_grad()来关闭requires_grad
  with torch.no_grad():
    b = (z*z)
    print(b.requires_grad)  # False
    print(b.grad_fn)  # None
  ```
### `backward()`函数
当前向计算完成，且具体过程通过`grad_fn`记录后，使用`backward`函数来计算梯度并将结果 **累加至**`grad`中，故每次反向传播之前，需要把梯度置为0
* 注意：
  * 当`requires_grad = True`时不能将张量直接转化到`numpy`而是需要`tensor.detach().numpy()`
  * 或者直接使用`tensor.data()`获取数据内容，不带有梯度等属性
## 手动实现
基础模型为$y = wx+b$，其中$w, b$是参数，数据集则是$y = 3x+0.8$中$x,y$的对应值，所以模型在经过多次训练后$w, b$应该会趋近于3, 0.8，所以具体步骤如下所示：
1. 准备数据集
2. 计算预测值$y_{predict}$
3. 计算损失，将参数梯度设置为0，进行反向传播
4. 更新$w, b$的值
   ```python
    import torch
    import numpy as np
    from matplotlib import pyplot as plt

    # 通过y = 3x + 0.8来生成训练集，500个x,y坐标集合
    x = torch.rand([500, 1])
    y_true = x * 3 + 0.8

    # 生成初始的w, b的值以及学习率
    study_rate = 0.01
    w = torch.rand([1, 1], requires_grad=True, dtype=torch.float32)
    b = torch.tensor(0, requires_grad=True, dtype=torch.float32)
    y_predict = torch.matmul(x, w) + b

    # 共进行50000次的学习
    for i in range(50000):
        # 首先更新预测值（即模型算出的结果）
        y_predict = torch.matmul(x, w) + b
        # 其次计算损失
        loss = (y_true - y_predict).pow(2).mean()
        # 因为梯度是累加的，所以要清空上一轮循环加入的梯度
        if w.grad is not None:
            w.grad.data.zero_()
        if b.grad is not None:
            b.grad.data.zero_()
        # 反向传播求得梯度
        loss.backward()
        # 通过求得的梯度对w, b进行更新
        w.data = w.data - (study_rate * w.grad)
        b.data = b.data - (study_rate * b.grad)
    # 通过函数进行展示
    plt.figure(figsize=(20, 8))
    plt.scatter(x.numpy().reshape(-1), y_true.numpy().reshape(-1))
    plt.plot(x.numpy().reshape(-1), y_predict.detach().numpy().reshape(-1), c='r')
    plt.show()
   ```
# pytorch自带API
## nn.Module
* 用于自定义网络的基类
  * \_\_init__
  * forward:
    * 完成一次前向计算的过程，
    * __call__方法自动调用
  * nn.Linear()
    * __init__实例化时，`self.linear = nn.Linear(每个input的特征数量）, 每个output的特征数量)`
  * 该模型是线性模型（y = wx + b）
## 优化器类
用于更新参数的方法
  * `torch.optim.SGD(参数，学习率)`
  * `torch.optim.Adim(参数，学习率)`
    * 参数通过`model.parameters()`获取，`model`是自定义的网络类
    * 学习率默认为`0.001`
  * 实例
  ```python
  opt = optim.SGD(model.parameters(), lr=le-3)
  opt.zero_grad()  # 梯度设置为0
  loss.backward()  # 计算梯度
  opt.step()  # 更新参数
  ```
## 损失函数
###  `nn.MSELoss()`
* 均方误差,常用于分类问题，公式为：$loss = \cfrac{1}{N} \sum_{I=1}^{N} (y_{trueI} - y_{predictI})^2$
### `nnCrossEntropyLoss()`
* 交叉熵损失，常用于回归逻辑，公式为$loss = \sum_{I=1}^{N} (y_{trueI} - log \cdot \cfrac{1}{y_{predictI}})$
### 损失函数使用方法
```python
model = Lr() # 实例化模型
cri = nn.MSELoss()  # 实例化损失函数
opti = opitm.SGD(model.parameters(), lr=le-3)  # 实例化优化器
for i in range(100):
  y_predict = model(x_true)  #向前计算预测值
  loss = cri(y_ture, y_predict)  # 根据损失函数得到损失
  loss.backward()
  opti.step()  # 更新参数的值
```
## 将手动实现的线性回归改为API
```python
import torch
from torch import nn
from torch.optim import SGD
import numpy as np
from matplotlib import pyplot as plt

# 通过y = 3x + 0.8来生成训练集，500个x,y坐标集合
x = torch.rand([500, 1])
y_true = x * 3 + 0.8

# 定义模型
class MyLinear(nn.Module):
    def __init__(self):
        super(MyLinear, self).__init__()
        self.linear = nn.Linear(1, 1)

    def forward(self, x):
        return self.linear(x)


# 实例化模型、优化器以及损失函数
my_model = MyLinear()
opti = SGD(my_model.parameters(), lr=0.001)
loss_fn = nn.MSELoss()
y_predict = my_model(x)
# 共进行50000次的学习
for i in range(50000):
    y_predict = my_model(x)  # 向前计算一步
    loss = loss_fn(y_true, y_predict)  # 根据结果计算loss
    opti.zero_grad()  # 之前的梯度清零
    loss.backward()  # 计算梯度
    opti.step()  # 更新参数


plt.figure(figsize=(20, 8))
plt.scatter(x.numpy().reshape(-1), y_true.numpy().reshape(-1))
plt.plot(x.numpy().reshape(-1), y_predict.detach().numpy().reshape(-1), c='r')
plt.show()
```
