[官方文档](https://pyautogui.readthedocs.io/en/latest/)已经将用法介绍得十分透彻了，文章仅记录使用时遇到的问题以及如何避免

# 键盘监听
下面的代码是监听键盘的一个示例，当需要将监听到的键盘值转换成string时，需要用到`Key.name`方法

```python
# 监听按下的按键
with Listener(on_press=on_press) as listener
    listener.join()  # 开始监听
listener.stop()  # 停止监听

def on_press(key):  # 方法负责实现监听到键盘时，所采取的动作
    print(key.name)  # 当key为字母按键时，key.name会报错 因为字母按键的key类型是 __win32.KeyCode类型 没有name属性，而非字母的按键（1~0、f1~f12、各种功能键）的类型为keyboard.Key 有name属性
```

注意：监听到的是**非字母的按键**（1~0、f1~f12、各种功能键） 才会有key.name （通过`Except`或是`type(input) == Key`判断是否为非字母键盘）

* 方式一：`try except`
    ```python
    # 监听按下的按键
    with Listener(on_press=on_press) as listener
        listener.join()
    listener.stop()

    def on_press(key):
        try:
            print(key.name) 
        except AttributeError as e:
            print(key)
    ```

* 方式二：`type`判断
    ```python
    # 监听按下的按键
    with Listener(on_press=on_press) as listener
        listener.join()
    listener.stop()

    def on_press(key):
        if type(key) == keyboard.Key
            print(key.name)
        else:
            print(key)
    ```

# 阻塞监听
```python
# 监听按下的按键
with Listener(on_press=on_press) as listener
    listener.join()
listener.stop()

def on_press(key):
    print(key)
```
与其他模块一起使用时 会因为监听而阻塞其他部分（如GUI），所以很多情况，会使用**非阻塞监听**来监听用户的操作

# 非阻塞监听
```python
class ListenerThread():
    def __init__(self, cheat_status):
        self.__listener = Listener(on_press=self.on_press)

    def on_press(self, key):
        print(key)

    def start(self):  # 直接在需要启用监听的方法中 调用listener的start即可
        self.__listener.start()  # 不再是join

    def stop(self):  # 直接在需要关闭监听的方法中 调用listener的stop即可
        self.__listener.stop()
```

# 参考
* [详解Python中pyautogui库的最全使用方法](https://blog.csdn.net/wowotuo/article/details/123017700)
* [PyautoGui官网文档](https://pyautogui.readthedocs.io/en/latest/)
