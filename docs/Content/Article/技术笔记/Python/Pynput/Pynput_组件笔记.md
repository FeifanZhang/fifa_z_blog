# 组件

## QLabel
* 自身属性
  * 位置、大小、绑定子组件等
* 绑定事件
  * 有参函数（右键、左键、单击、双击）
  * 无参函数
* 绑定信号
  * 有参函数
  * 无参函数

## QPushButton

## QMenu
  ```python
  menu = QMenu()
  menu.addAction('删除脚本', lambda: self.del_event_clicked(row_num, col_num))
  ```

## QTableWeiget
* 自身属性
  * 位置、大小、合并单元格、绑定子组件等，cell_value_changed时 currentRow和column为0
* 绑定事件
  * 有参函数
  * 无参函数
  * 不同row 或col绑定不同的事件
* 绑定信号
  * 有参函数（右键根据col不同事件或菜单）
  * 无参函数

# QThread
## 意义
当程序中代码可能存在相互的阻塞时，通过QThread将其隔离开
* 绑定方法
* 简单示例


# 参考
* [PyQT5 中的QTableWidget 信号](https://blog.csdn.net/weixin_43928734/article/details/105939907)
* [QT: QTableWidget可编辑设置，设置部分可编辑](https://blog.csdn.net/sazass/article/details/114067748)
