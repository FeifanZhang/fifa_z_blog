# 文件路径操作
## os.listdir
* 显示path下所有文件(包含扩展名)以及文件夹名称（不包含路径）组成的list
* 需要访问相应文件或目录需配合`os.path.join`组合成路径进行访问
    ```python
    print(os.listdir('/Users/feifanzhang/PycharmProjects/ai'))
    # ['freshMan.py', 'venv', '.idea']
    ```

## os.getcwd
* 获得当前文件所在文件夹的绝对路径
    ```python
    print(os.getcwd())
    # /Users/feifanzhang/PycharmProjects/ai
    ```

## os.path
该函数用于对**文件或文件夹的路径** 进行操作
### os.path.join(path1, path2, path3)
将若干路径拼接成一个路径，在拼接时，不用考虑`/`等路径格式规范，函数会自动帮助补全
  ```python
  print(os.path.join(os.getcwd(), 'folder1', 'folder2')) # 在拼接时，只需输入文件夹名称即可，拼接时path函数会对拼接位置加入 \ 连接符进行处理

  # /Users/feifanzhang/PycharmProjects/ai/folder1/folder2
  ```

### os.path.abspath(relative_path)
给出文件或文件夹的相对路径，返回其绝对路径
  ```python
  print(os.path.abspath('.'))  # 当前目录绝对路径
  print(os.path.abspath('..')) # 上一级目录绝对路径
  print(os.path.abspath('../untitled')) 
  # /Users/feifanzhang/PycharmProjects/ai
  # /Users/feifanzhang/PycharmProjects
  # /Users/feifanzhang/PycharmProjects/untitled
  ```

### os.path.split
以路径最后一个`\`为分隔，分隔路径与文件名，返回值tuple的第一项为路径，第二项为文件名。若路径中无文件名，则输出路径与空文件名。
  ```python
    abs_path = os.path.abspath(__file__)
    print(os.path.split(abs_path))
    # ('/Users/feifanzhang/PycharmProjects/ai', 'freshMan.py')
  ```

### os.path.splitext
* splitext的全称是 **split extend**，将文件拓展格式与前面分离
* 以文件名的`.`作为分隔，将文件路径与文件格式进行分离
  ```python
    abs_path = os.path.abspath(__file__)
    print(os.path.splitext(abs_path))
    # ('/Users/feifanzhang/PycharmProjects/ai/freshMan', '.py')
  ```

### os.path.splitdrive
* 将文件路径所在的盘（C,D,E,F盘）与后面路径分隔，
* 以文件路径第一个`\`进行分隔（但MAC OS 无效，因为该系统无盘符分区）
    ```python
        abs_path = os.path.abspath(__file__)
        print(abs_path)
        print(os.path.splitdrive(abs_path))
        # /Users/feifanzhang/PycharmProjects/ai/freshMan.py
        # ('', '/Users/feifanzhang/PycharmProjects/ai/freshMan.py')
    ```

### os.path.dirname
* 返回文件/文件夹路径的上一级绝对目录
* 无论输入的路径是否为绝对路径，返回的一律为绝对路径
  ```python
  abs_path = path.abspath(r'./Users/feifanzhang/PycharmProjects/ai')
  abs_folder = (r'/Users/feifanzhang/PycharmProjects/ai')
  print(path.dirname(abs_path))  # /Users/feifanzhang/PycharmProjects/ai
  print(path.dirname(abs_folder))  # /Users/feifanzhang/PycharmProjects
  ```

### os.path.basename
* 返回该路径所指的文件/文件夹的名称
  ```python
  abs_path = path.abspath(r'./testing.txt')
  abs_folder = (r'/Users/feifanzhang/PycharmProjects/ai')
  print(path.basename(abs_path))  # testing.txt
  print(path.basename(abs_folder))  # ai
  ```

# 文本文件处理
## 文件权限
### 读模式
* 任何读权限的文件在不存在时系统不会去创建，且指针会从0位置开始
* **r:** 普通读模式，该文件只能读，不能写
* **r+:** 文件能读能写，写的话则会从指针位置逐渐覆盖文件内容
  ```python
    abs_path = r'/Users/feifanzhang/PycharmProjects/ai/'
    with open(os.path.join(abs_path, 'testing.txt'), mode='r+', encoding='utf-8') as f:  # 文件初始内容为 abcdefg
        f.seek(1)  # 将指针指向第一个字符后面的位置（即第二个字符之前）
        f.write('h')  # 文件内容更改为 ahcdefg
        f.write('z')  # 文件内容更改为 ahzdefg
  ```

### 写模式
* 任何写权限的文件不存在时系统会自动创建，若文件已存在，则会将内容全部清空
* **w：** 普通写模式，文件能写，不能读
* **w+:** 该模式下可以读取新写入的信息

### 追加模式
* 任何追加权限下的文件不存在时会自动创建，默认是在文件的最后一个位置写入
* 若文件不存在则自动创建
* **a:** 可以追加写入，但无法读取
* **a+:** 可以追加写入，可读取但指针`seek(0)`才可以从头读取

### x模式
* 该模式下，创建一个全新的可写入但不可读取的文件
* 文件不存在直接创建，若存在则直接抛出异常

### b模式
* 通过二进制进行读写
* 除任何格式文件均可使用该模式
* 不能指定`encoding`参数

### t模式
* 读写都是以字符串为单位
* 仅针对文本文件
* 必须指定 `encoding`参数

## 指针的操作
* 无论是写，读还是追加操作，都是以指针为基准，对其后面的内容进行操作
* 写、读以及追加操作后，指针的位置也会发生改变
* `tell`方法可以提供指针目前的位置，`seek`方法可以改变指针的位置

### tell
* 返回指针以开头为参照，目前的位置
  ```python
    # 文件内容为：
    '''
    abcdefg
    hijkmln
    opqrst
    '''
    with open(os.path.join(abs_path, 'testing.txt'), mode='rb') as f:
      f.seek(8, 0)
      f.seek(3, 1)
      print(f.tell())  # 11
  ```

### seek(移动的字符数，控制模式)
* 控制模式0：以**文件开头**为参照使指针进行移动(b或t模式下都可使用)
* 控制模式1：以**本行内容的开头**为参照使指针进行移动(只能在b模式下使用)
  ```python
    # 读取文件的内容如下（\n在txt文件中不会显示）：
    '''
    abcdefg
    hijkmln
    '''
    with open(os.path.join(abs_path, 'testing.txt'), mode='rb') as f:
      f.seek(8, 0)  # 以文件开头为参照，向后移动8个字符（到达第二行开头）
      f.seek(3, 1)  # 以所在行为参照，向后移动三个字符
      print(f.read())  #  b'kmln'
  ```

* 控制模式2：以**文件结尾**为参照使指针移动(只能在b模式下使用)
## 文件内容处理
### with open
* 通过该函数进行文件处理可免去关闭句柄的麻烦
* **mode**是模式参数（前面提及的w, r, a, b, t等模式）
* **encoding**是编码参数(b模式下为二进制编码，不得填写该参数，其余模式下可使用如`utf-8`,`gbk`等其他编码格式)
* 通过`,`将希望同时操作的若干文件同时打开
  ```python
  with open(testing1_path, mode='w', encoding='utf-8') as f1, open(testing2_path, mode='rb') as f2:
      passs
  ```

### read readline readlines
* read是直接将所有内容全部读出，返回一个字符串，可通过`read(size)`指定读取的文件大小
  ```python
    # 读取文件的内容如下（\n在txt文件中不会显示）：
    '''
    abcdefg
    hijkmln
    opqrst
    '''
    with open(os.path.join(abs_path, 'testing.txt'), mode='rb') as f:
        print(f.read())
        # b'abcdefg\nhijkmln\nopqrst'
        f.seek(0)
        print(f.read(4))
        # b'abcd'
  ```
* readlines也是将所有内容全部读出，通过`\n`将文本进行切割，返回一个list
  ```python
    # 读取文件的内容如下（\n在txt文件中不会显示）：
    '''
    abcdefg
    hijkmln
    opqrst
    '''
    with open(os.path.join(abs_path, 'testing.txt'), mode='rb') as f:
        print(f.readlines())
        # [b'abcdefg\n', b'hijkmln\n', b'opqrst']
  ```
* readline则是生成器，一次只返回一行的信息
  ```python
    # 读取文件的内容如下（\n在txt文件中不会显示）：
    '''
    abcdefg
    hijkmln
    opqrst
    '''
    with open(os.path.join(abs_path, 'testing.txt'), mode='rb') as f:
    while True:
        i = f.readline()
        if i:
            print(i)
        else:
            break
        '''
        b'abcdefg\n'
        b'hijkmln\n'
        b'opqrst'
        '''
  ```

### 音频文件处理
```python
import os
import wave
import numpy as np
import pylab as plt

def cut_audio(audio_path):
    CutTimeDef = 30 #截断文件
    CutFrameNum =0
    wav_file = wave.open(audio_path, 'rb')
    nchannels, sampwidth, frameate, nframe = wav_file.getparams()[:4]
    CutFrameNum = frameate*CutTimeDef
    str_data = wav_file.readframes(nframe)
    wav_file.close()
    wave_data = np.fromstring(str_data, dtype=np.short)
    wave_data.shape = -1, 2
    wave_data = wave_data.T
    temp_data = wave_data.T
    StepNum = CutFrameNum
    StepTotalNum = 0
    haha = 0
    seg_wav_lst = []
    os.makedirs(os.path.splitext(audio_path)[0])
    while StepTotalNum < nframe:
        seg_wav = os.path.join(os.path.splitext(audio_path)[0], str(StepTotalNum)+'.wav')
        temp_dataTemp = temp_data[StepNum * (haha):StepNum * (haha + 1)]
        haha = haha + 1
        StepTotalNum = haha * StepNum
        temp_dataTemp.shape = 1, -1
        temp_dataTemp = temp_dataTemp.astype(np.short)
        f = wave.open(seg_wav, 'wb')
        f.setnchannels(nchannels)
        f.setsampwidth(sampwidth)
        f.setframerate(frameate)
        f.writeframes(temp_dataTemp.tostring())
        f.close()
        seg_wav_lst.append(seg_wav)
    return seg_wav_lst
```
---
# 参考
1. [python os模块中函数os.path.split、os.path.splitdrive、os.path.splitext、os.listdir的区别](https://blog.csdn.net/weixin_42540470/article/details/81002921)
2. [python文件的读写权限以及相关应用read、write和文件指针](https://www.cnblogs.com/mihoutao/p/10684371.html)
3. [python文件操作：文件指针移动、修改](https://www.cnblogs.com/wuzhengzheng/p/9692368.html)


