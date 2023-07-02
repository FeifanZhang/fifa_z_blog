# 判断当前选中的页面
```c#
var selectedPage = tabbedControlGroup.SelectedTabPage;  // 获取选中页面
var selectedTabName = tabbedControlGroup.SelectedTabPage.Name; //选中的页面名称
var selectedPageIndex = tabbedControlGroup.SelectedTabPageIndex;  // 选中页面的index值（0开始）
var selectedName = tabbedControlGroup.SelectedTabPageName;  // 显示选中tab页的名称，但当刚进入界面，没有点击过任何一个tab页时，此处返回空
```
* 判断当前选中tab页时，推荐使用`tabbedControlGroup.SelectedTabPage`