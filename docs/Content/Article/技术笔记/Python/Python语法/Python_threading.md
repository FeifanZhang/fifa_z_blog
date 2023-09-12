# 线程概念简介
* 线程是进程的实际运作单位
* 一个进程中至少包含一个线程，这个线程称为主线程
* 创建线程的开销远小于创建进程的开销
* 多线程是可以并行的：当多个线程被分配至不同CPU内核时即可实现，但该过程由操作系统控制，无法人为干预（Python只能实现并发，无法实现并行）

# 线程示例
* `start()`、`join()`、`daemon`的使用方法与[进程](./Python_multiProcessing.md)一样
* 阻塞`join()`与守护进程`daemon`同时设置时 以阻塞为准
```python
from threading import Thread
import time

def func1(a):
    print(f'子线程{a}\t开始\n')
    time.sleep(2)
    print(f'子进程{a}\t结束\n')


if __name__ == '__main__':
    t_list = []
    for i in range(3):
        sub_t = Thread(target=func1, args=(i,))
        sub_t.daemon = True
        sub_t.start()
        t_list.append(sub_t)
    for t in t_list:
        t.join()
    print(f'主线程结束')
'''
子线程0	开始
子线程1	开始
子线程2	开始
子进程2	结束
子进程1	结束
子进程0	结束
主线程结束

'''
```

# 进程与其线程资源、变量共享
* 进程中的变量，在线程中也可以使用，并被操作

```python
from threading import Thread

def func1():
    global n
    n -= 2
    print(f'子线程n的数值{n}')


if __name__ == '__main__':
    n = 10
    print(f'进程开始时n=={n}')
    sub_t = Thread(target=func1)
    sub_t.start()
    sub_t.join()
    print(f'进程n结束时n=={n}')
'''
输出结果：
进程开始时n==10
子线程n的数值8
进程n结束时n==8
'''
```

# 线程池
* 线程池使用场景：当任务数量大于线程数时，线程的理想状态是执行完一个任务后，继续执行其他任务而不是被销毁
* 优势：避免重复的创建&销毁线程
* 注意：线程所执行的方法，**参数数量只能有一个**，若希望传入多个参数，可使用列表、元组等类型进行传参
* 进程 & 线程关系：所有线程执行完毕，进程才会结束
```python
from multiprocessing import Pool
import time

params_list = [_ for _ in range(5)]

def func1(a):
    print(f'{a}开始')
    time.sleep(1)
    print(f'{a}结束')


if __name__ == '__main__':
    pool = Pool(2)  # 创建2个线程 & 存放在内存
    pool.map(func1, params_list)  # 实例化线程 参数1：方法；参数2：列表（元素类型为func1的参数类型）
    pool.close()
    print('进程结束')
'''
输出参数：
0开始
1开始
0结束
2开始
1结束
3开始
2结束
4开始
3结束
4结束
主线程结束
'''
``` 
