# 组件
* timer：
  * 显示事件用的组件，时间会通过其他控件进行表示
  * 拖拽部署后会在左下角显示
  * 使用方法
    ```cs
    private void Form1_Load(object sender, EventArgs e)
    {
        timer1.Start(); // 务必在父窗体中将timer设置start；通过 timer1.Stop()即可停止

    }

    private void timer1_Tick(object sender, EventArgs e) // timer1.Start()后的会自动调用该事件
    {
        label1.Text = DateTime.Now.ToShortTimeString(); //12:10
        label1.Text = DateTime.Now.ToLongTimeString(); //12:10:55
    }
    ```
  * 属性：
    * interval：单位为毫秒，周期性的调用tick函数进行时间更新

# 对话框
## 简介
对话框的特点是在关闭前无法对主窗体进行操作
组件中的对话框是c#内部针对若干需求的内置的对话框

## 对话框组件
* fontDialog
  * 该对话框中有所有字体设置信息
  * 使用方法
    ```cs
    private void btnFont_Click(object sender, EventArgs e)  //绑定的事件
    {
        if (fontDialog1.ShowDialog() == DialogResult.OK)  // 字体设置完毕后，若点击OK
        {
            textBox1.Font = fontDialog1.Font;  //将fontDialog中字体设置信息传递至textBox1来改变其中的字体
        }
    }
    ```
* colorDialog
  * 该对话框可以改变字体或控件的背景颜色
  * 使用方法
  ```cs
    private void btnColor_Click(object sender, EventArgs e)
    {
        if (colorDialog1.ShowDialog() == DialogResult.OK)
        {
            textBox1.ForeColor = colorDialog1.Color; // 将colorDialog颜色信息添加至字体颜色
            textBox1.BackColor = colorDialog1.Color; // 将colorDialog颜色信息添加至textBox的背景颜色

        }
    }
  ```
