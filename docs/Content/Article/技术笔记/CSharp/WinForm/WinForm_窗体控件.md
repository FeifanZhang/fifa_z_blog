# 窗体简介
* 承载各种控件的“容器”

# SDI （单一窗体）
* 基本操作：
  * 修改窗体名称：选中窗体的cs文件后，右下方属性中修改文件名（不可直接修改文件名）
  * 添加新窗体：选中项目名称 -> 右键选择添加 -> 窗体
  * 修改程序启动时默认进入的窗体：Programs.cs中如下修改
    ```cs
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Windows.Forms;

    namespace MyFirstWinApp
    {
        internal static class Program
        {

            /// <summary>
            /// 应用程序的主入口点。
            /// </summary>
            [STAThread]
            static void Main()
            {
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);

                // 前面不做改动
                Application.Run(new FrmParent()); // 更改new 后面的窗体名

            }
        }
    }
    ```
* 属性
  * Text：左上角显示的文字

# MDI（多窗体）
## 添加子窗体
* 属性中isMidContianer默认为False，设置为True
* 父窗体代码文件中添加绑定事件，事件中加入如下代码
  ```cs

    private void ToolStripMenuItemNew_Click(object sender, EventArgs e)  // 父窗体FrmParent中， 菜单栏下的Click事件
    {
        // 1. 实例化 子窗体
        FrmChild childWin = new FrmChild();

        // 2. 设置当前窗体为定父窗体（在子窗体的Parent属性下也可设置）
        // 绑定后，仅能子窗口仅能在父窗口内拖拽
        // 若不进行该绑定，则 childWin可以独立于父窗口进行拖拽
        childWin.MdiParent = this;

        // 3. 设置子窗口的text，保证各个窗口都不一样
        childWin.Text = "Child" + this.MdiChildren.Length;
        
        // 4. show 就完了
        childWin.Show();
        // 若不设置show而设置 childWin.ShowDialog(); 是将子窗体设置为对话模式，无法选中父窗体失去焦点，除非子窗口关闭
    }
  ```
  * 注意：子窗体不要设置isMidParent为True

## 关闭子窗体
* 打开若干子窗体后，通过菜单栏关闭最上面的子窗体
* 父窗体代码文件中添加绑定事件，事件中加入如下代码
  ```cs
    private void ToolStripMenuItemClose_Click(object sender, EventArgs e)  // 绑定了菜单栏下的关闭按钮
    {
        // 若子干窗体最上面的，也就是处于激活状态的窗体
        Form frm = this.ActiveMdiChild;
        // 关就完了
        frm.Close();
    }
  ```

## 关闭全部子窗口
* 父窗体代码文件中添加绑定事件，事件中加入如下代码
    ```cs
    private void ToolStripMenuItemCloseAll_Click(object sender, EventArgs e)
    {
        foreach( Form frm in this.MdiChildren) // this.MidChildren 是指子窗体的list
        {
            Form fc = this.ActiveMdiChild;
            fc.Close();
        }
    
    }
    ```
* 简化写法
    ```cs
    private void ToolStripMenuItemCloseAll_Click(object sender, EventArgs e)
    {
        while (this.MdiChildren.Length != 0)
        {
            this.ActiveMdiChild.Close();
        }
    
    }
    ```

## 菜单栏中显示所有子窗口text属性
* 选中menuStrip -> MidWindowListItem属性 -> 选择menuStrip对应的组件
* 这样在对应的组件下拉时会显示所有子窗口的text，勾选即可选中该子窗体成为最上层激活的窗体

## 子窗体布局
* 通过菜单栏触发调整子窗口布局的事件
* 在父窗口文件添加绑定事件
    ```cs
    private void ToolStripMenuItemshuiping_Click(object sender, EventArgs e)  // 子窗口水平布局绑定事件
    {
        LayoutMdi(MdiLayout.TileHorizontal);
    }

    private void ToolStripMenuItemchuizhi_Click(object sender, EventArgs e) // 子窗口垂直布局绑定事件
    {
        LayoutMdi(MdiLayout.TileVertical);
    }

    private void ToolStripMenuItemcengdie_Click(object sender, EventArgs e) // 子窗口层叠布局绑定事件
    {
        LayoutMdi(MdiLayout.Cascade);
    }
    ```

## 小弹窗
* 绑定的事件内加入如下代码
    ```cs
    private void ToolStripMenuItemAbout_Click(object sender, EventArgs e)
    {
        MessageBox.Show("MSG on body", "右上角显示的信息", 
            MessageBoxButtons.各种按键样式,
            MessageBoxIcon.图片样式,
            MessageBoxDefaultButton.默认有焦点的按键（左到右Button1~3）, 
            MessageBoxOptions.文本格式);
    }
    ```
      * 各种按键样式：OK，OkCancel，AbortRetryIgnore等
      * 图片样式：body左侧图片
      * 默认有焦点的按键（左到右Button1~3）,具体按键编号以`各种按键样式`决定

## 关闭父窗体
* 通过菜单栏关闭整个父窗口
* 父窗体代码文件中添加绑定事件，事件中加入如下代码
    ```cs
    private void ToolStripMenuItemExit_Click(object sender, EventArgs e) // 绑定了菜单栏下的退出按钮
    {
        this.Close();
    }
    ```


