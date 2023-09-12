# 协程简介
* 也称为**微线程**，让程序通过一个线程，实现多个任务的并发
* 优点：
  * 相比较线程的切换，协程切换消耗资源小，故协程的并发效率更高
* 目前Python的主流框架 Django、fastApi、tornado、aiohttp都会使用协程
* 协程在Python中的具体实现
  * 第三方包`greenlet`
  * `yield`关键字
  * `asyncio`装饰器（python v3.4及以上）
  * **官方推荐！** `async`、`await`关键字（python v3.5及以上）

# Asyncio简介
* Python对协程的官方实现
* `Asyncio`优点（减少线程的阻塞）
  * 当线程遇到阻塞时，操作系统会让CPU会执行其他线程，故减少线程内阻塞可获取更久的CPU服务。而线程内的协程在阻塞时，`Asyncio`会立刻切换至其他协程，让线程不会被阻塞，从而获取更久的CPU服务时间
* `Asyncio`识别阻塞需注意的问题
  * `Asyncio`无法识别Python全部阻塞（如`time.sleep()`函数），若遇到无法识别的阻塞，协程异步就会失效
  * `Asyncio`可识别的阻塞：网络请求、Task对象、协程对象、Future对象
* 协程函数：函数通过`async`关键词进行定义的函数
* 协程对象：执行协程函数时，函数本身并不会执行，而是返回一个协程对象

```python
async def func1():  # 协程函数的声明
    pass

coroutine_obj = func1()  # 此时返回的是协程对象
```


# 事件循环
* 意义：协程放入`asyncio`后，asyncio会执行该任务直到阻塞，在列表中循环遍历其他可执行的任务 & 执行，循环一直持续直到所有任务结束
* 用途：运行异步任务、执行回调函数、网络IO操作，简而言之，协调&执行各任务，**让任务所在的线程减少阻塞，尽可能多的抢占CPU时间**
* 同一时间，只能有一个事件循环运行

## 协程在`asyncio`中执行的流程
* `创建一个任务列表` -> `不停循环访问该列表` -> `访问时删除执行完成的任务` & `执行已就绪的任务` -> `直到全部任务执行结束` -> `跳出循环程序停止`
* 协程的基本架构如下为代码所示
    ```python
    任务列表 = [任务1, 任务2, 任务3, ..., 任务n]
    while True:
        可执行任务列表 = 【任务列表】已就绪的任务

        移除【任务列表】已完成完成的任务

        for 就绪任务 in 可执行任务列表:
            执行【就绪任务】

        任务列表全部完成，跳出循环
    ```
* 以上伪代码对应如下代码
  * Python 3.7以前
    ```python
    import asyncio
    loop = asyncio.get_event_loop()  # 生成一个事件循环
    loop.run_until_complete(task)  # 将任务放进`任务列表`
    ```
  * Python 3.7 以后（`asyncio`将`get_event_loop`与`run_until_complete`封装成`run`方法）
    ```python
    import asyncio
    asyncio.run(task) # 生成事件循环 & 同时将任务放入`任务列表` 该任务列表可以是协程，也可以是task
    ```

## `asyncio.get_running_loop()` 
* 获取当前正在执行的loop
* 返回值：正在运行的loop对象，没有直接抛出异常（`RuntimeError`）
```python
try:
    loop = asyncio.get_running_loop()
except RuntimeError as e:  # 没有正在执行的 loop 直接抛出异常
    pass
     
``` 

## `asyncio.get_event_loop()`
* 返回当前正在执行的loop；若没有则实例化一个新的loop
```python
loop = asyncio.get_event_loop()
```

## `asyncio.new_event_loop()`
* 实例化新的线程
* 返回值：loop对象

## `asyncio.set_event_loop(loop)`
* 将loop绑定当前线程
* 输入参数：loop对象

# 单协程（async）示例
```python
import asyncio

#  示例用于Python 3.7及以上版本
async def func1(a):
    print(f'协程{a}开始')
    print(f'协程{a}结束')

if __name__ == '__main__':
    for i in range(3):
        task = func1(i)
        asyncio.run(task)
```

# 阻塞（await）示例
* `await`含义
  * **切换协程，保证线程不阻塞**：当前线程内，`await`会将当前协程置于阻塞状态，切换至其他【就绪的协程】继续执行（保证【线程不阻塞】）
  * **阻塞执行完毕后，切换至就绪状态**：待`await`关联函数执行完毕后，会将该协程重新置于就绪状态，以保证未来该协程的继续执行
* 用法：`await` + `可等待对象`（协程对象、Future对象、Task对象）
## await + 协程对象
* 此时会直接执行协程对象 & 捕获协程对象的返回值
    ```python
    import asyncio
    async def func1():
        print(f'func1 开始')
        resp = await func2()  # func1 被阻塞 & 执行func2 & 捕获返回值
        print(f'func1 结束 {resp}')

    async def func2():
        print(f'func2 开始')
        await asyncio.sleep(2)
        print(f'func2 结束')
        return "func2 finished"  # func1捕获的返回值

    if __name__ == '__main__':
        task = func1()
        asyncio.run(task)
    '''
    输出结果
    func1 开始
    func2 开始
    func2 结束
    func1 结束 func2 finished
    '''
    ```

# Future对象
* 简介：`Task`的父类，Task类内部对于`await`结果的处理是基于`Future`而来
* 用途：遇到`await`时，用于帮助保存函数当前的执行状态 & 等待`await`返回值
* `Asyncio`的底层类，几乎不会直接调用，一般用其子类`Task`

# Task对象
* 对协程的封装；该层封装便于知晓协程的执行状态、返回值以及异常

## Task函数

|函数|说明|返回值|
|--|--|--|
|`result()`|获取任务的返回值（协程对象的`return`）|函数的返回值|
|`done()`|查看当前是否为【无异常、未取消】的任务|布尔类型|
|`cancel()`|取消任务，执行后task会抛出`CancelledError`异常`cancelled()`检查是否取消成功|无|
|`exception()`|查看任务是否有异常|无异常返回None；被取消抛出`CancelledError()`；未执行完抛出`InvalidStateError()`|

## task与协程的转换
|语法|参数|返回值|说明|适应版本|
|--|--|--|--|--|
|`asyncio.create_task(协程对象)`|协程对象|task对象|将【协程】转换至【task对象】|高版本|
|`asyncio.ensure_future(协程对象)`|协程对象|task对象|将【协程】转换至【task对象】|低版本|




## 为Task对象添加回调函数
* 参数限制：回调函数只能有一个参数且**该参数必须为对应的task对象**
* `task.result()`可以获取task对象的返回值
```python
import asyncio
from random import random


async def func(i):
    print(f'{i}协程开始')
    await asyncio.sleep(random())
    print(f'{i}协程结束')
    return f'协程{i}整挺好！'  # return的结果 会通过 task.result()进行结果


def call_back_func(task):  # 此时输入的参数为对应的task对象
    print(f'{task.result()}')  # task.result()获取协程函数的返回值


if __name__ == '__main__':
    tasks = []
    for cor in [func(_) for _ in range(3)]:
        tsk = asyncio.ensure_future(cor)  # 协程转换至task对象
        tsk.add_done_callback(call_back_func)   # 添加回调函数（回调函数不能写参数，其默认参数为task对象），call_back_func会在该task结束后调用
        tasks.append(tsk)
    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.wait(tasks))
```

# 多协程示例
* 创建一个任务列表
* 将整个列表`asyncio.run(asyncio.wait(tasks))` 方式放入协程 & 执行
```python
import asyncio
from random import random


async def func1(a):
    print(f'{a}开始')
    await asyncio.sleep(random())
    print(f'{a}结束 ')


if __name__ == '__main__':
    tasks = []
    for i in range(3):
        tasks.append(func1(i))
    asyncio.run(asyncio.wait(tasks))
'''
输出结果
0开始
2开始
1开始
1结束 
2结束 
0结束 
'''
```

# `Asyncio`调用线程
* 并不是所有函数或工具包都会支持多协程（如`requests`），所以经常需要协程与线程配合进行异步混合执行
* `asyncio.to_thread(func, /, *args, **kwargs)`支持多线程
```python
import asyncio
import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)  # 忽略https警告信息

async def download_img(url):
    print(f'开始下载{url}')

    # 创建线程去执行【requests.get方法】并设置阻塞
    response = await asyncio.to_thread(requests.get, url, None, verify=False)  # verify=False 不进行ssl证书验证
    print(f'下载完成{url}')


if __name__ == '__main__':
    urls = [
        'https://up.enterdesk.com/edpic_source/7f/db/c0/7fdbc067cb38b6ffb295430ddae8757b.jpg',
        'https://up.enterdesk.com/edpic_source/5d/02/49/5d024927d520c1592c094bded711e8f2.jpg',
        'https://up.enterdesk.com/edpic_source/6c/b2/27/6cb227d74b70a682d99e3f9b3b53c4a6.jpg'
    ]
    tasks = [download_img(_) for _ in urls]  # 创建协程任务列表
    asyncio.run(asyncio.wait(tasks))  # 启动协程
```

# 参考
* [python协程(2): asyncio的核心概念与基本架构（含任务创建执行标准用法](https://blog.csdn.net/qq_37674086/article/details/113879117)
* [Asyncio之事件循环EventLoop的使用](https://zhuanlan.zhihu.com/p/69210021)