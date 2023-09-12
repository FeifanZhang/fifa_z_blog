# 参数
* 通过`Process`创建进程
* 子进程不能将执行结果返回给父进程，需要进程通信解决

|参数|类型|说明|是否必填|
|--|--|--|--|
|target|方法|进程执行的方法|是|
|args|元组|执行的方法对应的参数|否|


# 多进程并发（`Process.start()`）
* 通过输出体现两件事情
  * 主线程、单参数进程、双参数进程按照代码顺序触发
  * 执行时没有阻塞且进程间相互独立，才会出现主进程先执行完，两个子线程仍在执行的情况
* `start`时，子进程分配内存、资源、进入就绪状态，在此之前子进程只是一个变量

```python
from multiprocessing import Process

def func1(a):
    print('单参数子进程开始执行')

def func2(a, b):
    print('双参数子进程,开始执行')
    return a + b


if __name__ == '__main__':
    print('主进程开始')

    sub_p1 = Process(target=func1, args=(1,))  # 单参数时，务必这样输入参数：args = (args, )逗号不能少，表示参数的输入是可迭代获取的
    sub_p1.start()  # 子进程进入就绪状态

    sub_p2 = Process(target=func2, args=(1, 2))  # 多参数时，args=(arg1, arg2,)可以，args=(arg1, args2)也可以
    sub_p2.start()

    print('主进程结束')

'''
输出结果：
主进程开始
主进程结束
单参数子进程开始执行
双参数子进程,开始执行
'''
```


# 进程阻塞(`Process.join()`)
* 通过`join()`方法实现进程的阻塞
* `join()`阻塞的是该语法后面的代码，之前的代码不做任何限制

```python
from multiprocessing import Process
import time


def func1(a):
    print(f'子进程{a}\t开始执行')
    time.sleep(0.5)
    print(f'子进程{a}\t执行结束')


if __name__ == '__main__':
    p_list = []
    print('主进程开始')
    for i in range(3):
        sub_p1 = Process(target=func1, args=(i,))
        sub_p1.start()
        p_list.append(sub_p1)
    for p in p_list:
        p.join()
    print('主进程结束')
```

# 守护进程(`Process.daemon = True`)
* 主进程结束时，无论子进程处于何种状态，也一并结束
* 在进程`start()`之前设置是否为守护进程
* 守护进程内无法创建新的进程
    ```python
    from multiprocessing import Process
    import time

    def func1(a):
        print(f'子进程\t开始')
        time.sleep(2)
        print(f'子进程\t结束')

    if __name__ == '__main__':
        sub_p1 = Process(target=func1, args=(3,))
        sub_p1.daemon = True
        sub_p1.start()
        print(f'主进程结束')
    '''
    输出结果：
    主进程结束
    '''
    # 输出中可以看出，子进程未开始时，主进程就已结束；由于子进程是守护进程故强行结束
    ```
  

* 当子进程同时使用【守护进程】和【阻塞】时，**以阻塞为最高优先级**
    ```python
    from multiprocessing import Process
    import time

    def func1(a):
        print(f'子进程\t开始')
        time.sleep(2)
        print(f'子进程\t结束')

    if __name__ == '__main__':
        sub_p1 = Process(target=func1, args=(3,))
        sub_p1.daemon = True
        sub_p1.start()
        sub_p1.join()
        print(f'主进程结束')

    '''
    子进程	开始
    子进程	结束
    主进程结束
    '''
    # 输出可知，因为阻塞的存在，系统执行完子进程后，主进程才关闭
    ```

# 进程之间数据隔离
* 子进程可通过输入参数、全局变量（`global`）来获取主进程的数值，但无法修改主进程的参数
* `global`关键字在不同场景的用法
  * 普通场景使用时，表示即将使用全局变量
  * 在进程中使用时，表示给子进程创建一个与【全局变量同名同值】的变量
```python
from multiprocessing import Process

ticketNum = 10  # 主进程变量
def func1(a):
    global ticketNum  # 本质是在func1中，创建一个同名同值的变量
    print(f'子进程票{ticketNum}张')
    ticketNum -= a
    print(f'子进程执行完毕，票剩余{ticketNum}张')  # 此时子进程ticketNum = 7；而主进程ticketNum = 10未改变


if __name__ == '__main__':
    sub_p1 = Process(target=func1, args=(3,))
    sub_p1.start()  
    sub_p1.join()
    print(f'func1执行完毕，主进程票剩余{ticketNum}')

'''
子进程票10张
子进程执行完毕，票剩余7张
func1执行完毕，主进程票剩余10
'''
```