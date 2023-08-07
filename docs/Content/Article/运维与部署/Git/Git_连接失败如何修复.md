# 获取Github IP地址

## Chinaz获取
* 通过网址`https://ip.chinaz.com/github.com` 直接获取

## ping获取
* `ping` 指令会获取显示github的 ip（**20.205.243.166**）
```cmd
C:\Users\25384>ping github.com

正在 Ping github.com [20.205.243.166] 具有 32 字节的数据:
```

# 修改hosts文件
* 文件路径：`C:\Windows\System32\drivers\etc\hosts`
* 在最后添加`github` **IP** 和**url**：IP和url 中间空两个空格
```md
## hgspeed start
127.0.0.1  api.steampowered.com
127.0.0.1  img.youtobe.com
127.0.0.1  steamcommunity.com
127.0.0.1  steampowered.com
127.0.0.1  steamuserimages-a.akamaihd.net
127.0.0.1  store.steampowered.com
127.0.0.1  www.steamcommunity.com
127.0.0.1  www.steampowered.com
20.205.243.166  github.com 
20.205.243.166  www.github.com
## hgspeed end
```

# 刷新dns缓存

```cmd
C:\Users\25384>ipconfig /flushdns

Windows IP 配置

已成功刷新 DNS 解析缓存。
```
# 以后每出现一次连接问题，需重复以上步骤

# 参考
* [国内Windows无法访问Github的解决办法](https://iymark.com/articles/2777.html)