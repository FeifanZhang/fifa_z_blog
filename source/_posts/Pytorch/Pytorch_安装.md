---
title: Pytorch_安装
toc: true
mathjax: true
date: 2021-10-18 12:17:42
tags:
- Pytorch
- 人工智能
categories:
- [Pytorch, 安装]
---
# Pytorch安装
* 通过[官网](https://pytorch.org/get-started/locally/)进行安装，安装时需注意以下几个选项：
  * PyTorch Build：一般选择 `stable`版本
  * Compute Platform：`CUDA`选项是英伟达提供的计算架构，该框架使得GPU能够解决复杂的计算问题。当操作系统选择linux或windows才可选择CUDA，Mac只能使用CPU
  * 导入完成后，在python文件中输入如下代码：
  ```python
  import torch
  print(torch.__version__)
  # 若输出版本号，则安装成功
  ```
