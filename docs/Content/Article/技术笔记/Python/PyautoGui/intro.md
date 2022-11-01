# 鼠标
## 监听
## 控制
### 点击
### 双击

# 键盘
## 监听
* 监听到的 Key 除字母以外 才会有key.name （通过`type(input) == Key`判断）
* 阻塞
```python
# 监听按下的按键
with Listener(on_press=on_press) as listener
    listener.join()
listener.stop()
```
* 非阻塞
## 控制
### type一整句话
### 按下某个键
### 按下若干按键（包含字母以及特殊按键）
### 松开某个键

# 参考
* [详解Python中pyautogui库的最全使用方法](https://blog.csdn.net/wowotuo/article/details/123017700)
