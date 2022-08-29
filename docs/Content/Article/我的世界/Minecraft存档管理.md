
## IOS（国际版）
* 打开文件app -> `Minecraft`文件夹 -> `games`文件夹 -> `com.mojang`文件夹 -> `minecraftWorlds`文件夹
## Win10（国际版）
* 路径：
  * `C:\Users\用户名\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\minecraftWorlds`
  * `用户名`就是登录windows的用户名称
* 可能遇到如下问题
  * 找不到`AppData`文件夹：该文件夹为默认隐藏，在`我的电脑`->`查看`->选中`设置显示隐藏的项目`即可找到
  * `LocalState`内为空：证明Minecraft下载后没有开启过，开启一次游戏后`LocalState`内的文件会自动生成

# 存档迁移方案
## 接地气方案
* 将Minecraft的存档文件夹设置为共享，并与iphone文件系统进行连接即可实现存档的转移
* 注意：手机与电脑要连接同一个Wifi（或是电脑连接手机热点）
* 优点：方便，快捷，**免费！**
* 缺点：只能进行存档迁移，且只支持win10与IOS之间的迁移

## REALMS
* 官方解决方案，[MC官方基岩版服务器](https://www.minecraft.net/zh-hans/realms/bedrock)
* 优点：无论是在win10、Switch或是任何基岩版我的世界都可使用
* 缺点：贵，而且因为国内网易垄断代理，任何国际版的服务都会很卡（翻墙即可解决）

## 自建服务器
* 官方提供了[开箱即用的服务器](https://www.minecraft.net/zh-hans/download/server/bedrock)
* 优点：相当于自建`REALMS`，还不花钱！
* 缺点：如果与服务器一个局域网内，没有啥问题，如果不在一个局域网，还需要搞外网穿透或是网络映射，需要点儿技术（[可参考这位大佬](https://www.bilibili.com/read/cv4246984/)）

# 参考
* [iPhone与win10无线共享文件](https://jingyan.baidu.com/article/e3c78d646588847d4d85f500.html)



