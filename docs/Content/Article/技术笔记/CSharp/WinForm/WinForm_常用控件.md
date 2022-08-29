# 控件与事件绑定
* GUI设计页面
  * 每个GUI的属性和绑定方法的设置
  * 每个控件选中后右下角有如下操作
    * 属性：如控件大小，外观，名称等
    * 事件：根据控件的不同状态（如选中，未选中，关闭，开启）进行了划分，针对这些划分进行事件绑定
* .Designer.cs
  * 进行控件的注册以及与事件的绑定，该部分代码自动生成
  * 当控件名称修改后，对应的绑定事件需要手动删除
* 事件编写
  * GUI设计页面切换至代码层面即可进行事件的编写
  * 获取控件属性的方法：`控件名.属性名称`，属性名称可以从`GUI设计页面寻找`，也可以<kbd>Ctrl</kbd> + <kbd>J</kbd>开启

# 公共控件

## 用户输入类
用户输入类控件一般不需要与逻辑事件进行绑定，仅仅是输入完成后进行各式检查或输入值的获取
### TextBox
  * 普通文本框，输入文字
  * 属性
    * passwordChar: 不会显示输入内容，而显示自定义的字符，如输入密码时的*
    * multiline：true则可输入多行，False仅能输入一行
    * scrollBars：添加`multiline`后，可在此添加滚动条
    * text：获取输入值

### maskedTextBox
  * 有格式限制的输入框
  * 属性
    * Mask：选择输入的格式
    * text：获取输入值

## 用户选择类
用户选择类较为复杂，除选择完成后获取信息以外，需要绑定事件进行各种逻辑判断
### checkbox
  * 复选框

### checkListBox
  * 白框，选中后 <kbd>右键</kbd>-><kbd>编辑项</kbd> 增加/减少`checkbox`
  * 属性：
    * SelectedIndex：选中项的索引，0开始
    * SelectedItem：选中项的名称

### radioButton
  * 单选
  * radioButton设置分组：添加容器中（如groupBox，panel），在同一容器中的radiobutton互斥，不同容器的相互独立

### ComboBox
  * 下拉选择
  * 属性：
    * item：添加/删除下拉集合
    * text：设置默认值
    * dropDownStyle：
      * DropDown：选择后可以从框内删除
      * DropDownList：选中结果后无法从框内删除
      * Simple：当下拉选择太多时，可设置滑轮，除此之外与DropDown一样

### DateTimePicker
  * 选择时间
  * 属性
    * format：时间显示格式，custom是自定义格式，通过customFormat自定义格式，完整时间的显示格式`yyyy-dd-MM HH:mm:ss`

### linkLabel
  * 可添加超链接的label
  * 添加超链接
    * 设置LinkClicked事件，并在该事件添加如下语句
      ```cs
      using System.Diagnostics;  // 在文件开头引用
      Process.Start("www.baidu.com");  //  在事件中引用
      ```

  * 前两个字是一个链接，后两个字是一个链接
    * 在窗口加载的方法中初始化linklabel
      ```cs
      llbl.Links.Add(0, 2, @"www.baidu.com");  // Add(startIndex, length, string)
      llbl.Links.Add(2, 2, @"www.bing.com");
      ```

    * 设置LinkClicked事件，并在该事件添加如下语句
      ```cs
      string url = e.Link.LinkData.ToString();
      Process.Start(url);
      ```

### numericUpDown
  * 显示整数数字，按钮可以调整数字大小
  * 属性
    * maximum：数字等于该值时无法继续增大
    * increment：数字等于该值时无法继续减小
    * minimum：每次点击后变化的数值
    * value：起始值

### treeView
#### 简介
  * 可编辑树状节点，通过<kbd>右键</kbd>-><kbd>编辑节点</kbd>进行编辑
  * https://blog.csdn.net/Missna/article/details/5517855 treeNode内各种变量
  * https://blog.csdn.net/qq_36248777/article/details/93862283

#### 使用方法
* TreeView
  * selectedNode: 直接获取被选中的TreeNode
  * Nodes:获取本级的 TreeNodeCollection
  * 
* TreeNodeCollection
  * 底层为list，可去查看 c#数据结构
  * 增删查改
    * add(TreeNode)
    * remove(TreeNode)
    * indexOf(TreeNode): 返回TreeNode索引，-1代表不存在
    * Insert(index, TreeNode)
* TreeNode
  * Level：返回层级 0 为第一级
  * Parent：返回父节点
  * LastNode，FirstNode，NextNode，PrevNode
  * FullPath: 返回节点的全路径：格式为`节点1\节点2\节点3`
  * Nodes：该节点下的 `TreeNodeCollection`
  ```mermaid
  flowchart TB
      subgraph List_TreeNode
        direction RL
        TreeNode1 --> TreeNode2 --> TreeNode3
      end
    TreeView --Nodes--> TreeNodeCollection --> List_TreeNode

  ```
## 其他
### toolTip
  * 当鼠标放在控件上不动时，会显示对应的Tip
  * **使用方法：** 添加toolTip后，每个控件会多出 **杂项** 这个属性分类，其中添加控件的Tip即可
  * 属性
    * toolTipTitle：当鼠标放在控件上不动时，会显示两行tip：toolTipTitle的和控件自身的


# 容器
## panel
  * 类似于DIV，可以独立布局，还可以让其它控件及容器在它的内部再次布局
  * 属性
    * border：边框 默认为None，程序运行时不会有边框显示，但设计时会用虚线标出

## groupBox
  * 该但容器左上角可设置文字，除此之外与panel无异

## tabLabel
  * 设置与浏览器一样的tab显示
  * 属性
    * tabPage：设置tab页面集合，在该属性下可以修改每个tab的属性（如text color等）
    * dock：tablabel随着主窗体的变化而自适应
      * none（默认）
      * fill：充满主整个窗体的自适应
      * top：tablabel紧贴上边，长宽充满主窗体，下边固定
      * bottom：tablabel紧贴底部，长宽充满主窗体，上边固定

## splitContainer
  * 单纯的将父容器进行分割，分割成左右两块，启动后可以拖拽该容器的边框改变两个subcontainer的大小
    * 属性：
      * dock与tablabel一样
      * borderStyle：边框
      * padding：subcontainer左上右下与父容器边框的距离
      * splitterDistance：设置中间边线的位置

## tableLayoutPanel
  * 表格容器
  * 使用方法
    * 选中表格后右上角三角按钮可选择添加或删除行和列
  * 属性
    * columnSpan：将若干列合并成一列
    * rowSpan：将若行列合并为一行

# 菜单 & 工具栏
## menuStrip：
  * 菜单栏，例如vs 2022上`文件` `编辑` `视图`等最上面的菜单
  * 使用方法：
    * 拖拽在窗体后在visual studio左下角显示，位置与`toolTip`一样
    * 在输入菜单选项名时，右侧可输入同级另一选项，而下方可编辑二级菜单
  * 属性
    * items：用于添加新的菜单选项
      * menuItem，combox，separator，textbox：菜单选项的样式
    * text：菜单选项名

## toolStrip
  * 工具栏，使用方法与menuStrip一样，代表的是菜单栏下级菜单（不会隐藏在工具栏中）
    * 使用方法：
      * 加入窗体的方式与menuStrip一样
      * 下拉菜单选择样式
    * 属性
      * displayStyle：image（仅显示图片），text（仅显示文字），imageAndText（同时显示图片与文字）
      * text：工具栏的按键文字
      * image：工具栏的图片样式
      * imageScaling：图片是否自适应按键

## statusStrip
  * 状态栏，显示在窗体最下面
  * 属性
    * textImageRelation：图片与文字的位置关系
    * 其余属性与前面的各种Strip一致

## contextMenuStrip
  * 点击鼠标右键显示的菜单
    * 使用方法
      * 设置与menuStrip无异
      * 设置完成后，在主窗体的contextStripMenu属性中选中对应的contextMenuStrip即可
      * 除主窗体外，menuStrip，toolStrip同样方法设置contextMenuStrip

