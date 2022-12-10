# 准备工作
* 项目版本确认：必须是`.Net Framework 4.5.2`及以上的版本（通过项目`属性` -> `应用程序`的目标框架即可查看）
* 项目目标平台: 选项目`属性` -> `生成` -> `目标平台` -> `选择x86`；注意：务必保证整个解决方案的下属项目都是x86为目标平台

# 添加依赖
* Nuget中 直接添加`CefSharp`依赖
* 添加后，若引用中未出现`CefSharp`相关依赖，关闭重启vs即可

# 代码实现
在窗体或组件对应的`Load`事件中 添加Chrome加载代码
```csharp
private void FrmChrome_Load(object sender, EventArgs e)
{
    var url = "www.baidu.com";
    ChromiumWebBrowser webView = new ChromiumWebBrowser(url);
    this.Controls.Add(webView);  // 一定要先在control中添加 再进行Dock填充
    webView.Dock = DockStyle.Fill;
}
```

# 遇到的问题
* C# Winform 未能加载文件或程序集：项目框架版本问题，查看项目版本，务必保持至少是`.Net Framework 4.5.2`
* 项目的引用出现黄色小三角，双击后提示无法解析：项目平台的问题，务必保证**解决方案下的任一项目目标平台都为x86**