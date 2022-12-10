* 需求描述：根据给出的数据，绘制成图 & 显示；显示控件有限，需要左右，上下滚轮可以滚动查看
* 实施方案：两个panel（`parentPanel`和`childPanel`），`parentPanel`在下层，添加横竖滚轮;此基础上，叠加另外一个panel（`childPanel`）数据将在此panel上绘制成图 & 展示
* 问题：滚轮滑动时，上层的图片闪烁，将窗口放大后，图像可能消失
* 原因：因为每一次滚轮的移动，都会调用`paint()`方法对图形重新绘制，当绘制逻辑较复杂时，渲染时间较长，人眼就能看到图形的绘制过程，造成闪烁
* 优化：将`childPanel`替换为`pictureBox`，作图后生成一个Bitmap，将该Bitmap赋值在`pictureBox`上，这样滚轮滑动时，不会重新绘制图像，仅调整Bitmap位置，不会闪烁  
  
# 优化：转换为Bitmap
pictureBox中，直接嵌入bitmap而不是在其中调用GDI+画图，这样滚轮拖动时，不会重新绘制
```csharp
var bmp = new Bitmap(width, height);
var g = Graphics.FromImage(bmp);
// 绘制代码
....
// 绘制结束

this.pictureBox.Image = bmp;
```

# 为超长 or 超宽图片添加滚轮
* panel 上面叠加一个 pictureBox
* panel配置：`AutoScroll`、`HorizontalScroll.Visible`设置为`true`
* pictureBox配置：`SizeMode`设置为`PictureBoxSizeMode.AutoSize`；`Dock`设置为`None`