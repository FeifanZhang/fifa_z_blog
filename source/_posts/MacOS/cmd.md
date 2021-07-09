---
title: The terminal command of MacOS
date: 2021-03-29 22:23:21
toc: true
tags: 
- MacOS
categories:
- [MacOS, cmd]
---
---
本文为关于MacOS黑窗口命令行的介绍，因为OS X 符合单一Unix规范（更严格说是BSD系）、Linux是类Unix系统（虽然并不完全兼容），故命令行的模式、参数以及内部逻辑与Linux较为相似。该篇博客初期会介绍一些基本用法，但随着学习的深入，尤其是vim及其相关命令行的应用部分，会使得内容结构的复杂度以及篇幅大量增加，为方便查找和学习，可能会将该博客拆解为一个系列（也不知道能不能做到那个时候哈哈哈哈，anyway，flag先立上）
<!-- more -->
以下关于命令行的举例，都会通过本人的hexo blog项目进行演示
## 特别提示：不要手贱用`sudo rm -rf /` !
好了，现在我们开始正式学习
## `ls` 
该命令可查看当前目录下的所有非隐藏文件
``` bash
feifanzhang@fifamba fifa_z_blog % ls
README.md        package-lock.json    source
_config.yml        package.json        themes
db.json            public
node_modules        scaffolds
feifanzhang@fifamba fifa_z_blog % 
```

### `ls -a`
 `-a`参数可查找当前目录下的所有文件（包括隐藏文件）
``` bash
feifanzhang@fifamba fifa_z_blog % ls -a
.                README.md          public
..               _config.yml        scaffolds
.DS_Store        db.json            source
.deploy_git      node_modules       themes
.git             package-lock.json
.gitignore       package.json
feifanzhang@fifamba fifa_z_blog % 
# 根据输入ls -a 和 ls 两个命令行的对比，我们发现多出了若干 . 开头的文件，这些就是隐藏文件
```

### `ls -l`
`-l`参数除显示当前目录下的所有非隐藏文件外，还会显示每个文件的权限、所属用户以及日期等信息
```bash
feifanzhang@fifamba fifa_z_blog % ls -l
total 1392
-rw-r--r--@   1 feifanzhang  staff      68 May 23  2020 README.md
-rw-r--r--@   1 feifanzhang  staff    2765 May 23  2020 _config.yml
-rw-r--r--@   1 feifanzhang  staff  497351 May 23  2020 db.json
drwxr-xr-x  281 feifanzhang  staff    8992 Mar 25  2020 node_modules
-rw-r--r--    1 feifanzhang  staff  139590 Mar 25  2020 package-lock.json
-rw-r--r--    1 feifanzhang  staff     693 Mar 25  2020 package.json
drwxr-xr-x   16 feifanzhang  staff     512 May 23  2020 public
drwxr-xr-x    5 feifanzhang  staff     160 Mar 25  2020 scaffolds
drwxr-xr-x   12 feifanzhang  staff     384 Mar 30 17:42 source
drwxr-xr-x    4 feifanzhang  staff     128 Mar 25  2020 themes
feifanzhang@fifamba fifa_z_blog % 
```

### `ls -al`
`-al`即`-a`和`-l`参数的结合，会显示当前目录下的所有文件的名称、每个文件的权限、所属用户以及日期等信息
``` bash
feifanzhang@fifamba fifa_z_blog % ls -al
total 1424
drwxr-xr-x   16 feifanzhang  staff     512 Mar 26 12:11 .
drwxr-xr-x+  37 feifanzhang  staff    1184 Mar 30 16:54 ..
-rw-r--r--@   1 feifanzhang  staff    8196 Mar 30 12:47 .DS_Store
drwxr-xr-x   17 feifanzhang  staff     544 May 23  2020 .deploy_git
drwxr-xr-x   14 feifanzhang  staff     448 May 31  2020 .git
-rw-r--r--    1 feifanzhang  staff      52 Mar 25  2020 .gitignore
```

## `cd`
``` bash
# ls命令可查看当前目录下的所有非隐藏文件
feifanzhang@fifamba fifa_z_blog % ls
README.md        package-lock.json    source
_config.yml        package.json        themes
db.json            public
node_modules        scaffolds
feifanzhang@fifamba fifa_z_blog % 

# 若要查看包含隐藏文件在内的所有文件，使用ls -a 进行查找
feifanzhang@fifamba fifa_z_blog % ls -a
.                README.md          public
..               _config.yml        scaffolds
.DS_Store        db.json            source
.deploy_git      node_modules       themes
.git             package-lock.json
.gitignore       package.json
feifanzhang@fifamba fifa_z_blog % 
# 根据输入ls -a 和 ls 两个命令行的对比，我们发现多出了若干 . 开头的文件，这些就是隐藏文件
```
## `mkdir`
## `vim`

## `lsof`
该命令意思为 list open file，即列出当前系统打开的文件、打开的进程以及进程打开的端口（TCP、UDP）该命令也体现出macOS与Linux设计理念相似之处：万物皆文件

### `lsof -i`
列出所有 TCP、UDP进程
``` bash
feifanzhang@fifamba fifa_z_blog % lsof -i
COMMAND    PID        USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
loginwind  127 feifanzhang    8u  IPv4 0x29127eb78e212a01      0t0  UDP *:*
wpsoffice  315 feifanzhang   23u  IPv4 0x29127eb794607631      0t0  TCP 172.20.10.2:64723->120.92.84.225:http (ESTABLISHED)
wpsoffice  315 feifanzhang   24u  IPv4 0x29127eb798745c19      0t0  TCP 172.20.10.2:64724->120.92.84.225:http (ESTABLISHED)
wpsoffice  315 feifanzhang   25u  IPv4 0x29127eb79da5c479      0t0  TCP 172.20.10.2:64725->120.92.84.225:http (ESTABLISHED)
wpsoffice  315 feifanzhang  143u  IPv6 0x29127eb78cd59a19      0t0  TCP [2409:8900:1d51:6d4d:1d81:653d:9c22:5d9f]:49994->[2409:8c04:1001:15:3::3fd]:http (CLOSE_WAIT)
```
#### `lsof -i:端口号`
列出对应端口的所有信息
```bash
COMMAND   PID        USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    12697 feifanzhang   34u  IPv6 0xd0d21ddf50a97b75      0t0  TCP *:terabase (LISTEN)
# 该进程是
```
#### `lsof -i@ip号`
### `lsof -h`
显示帮助信息

## `kill`
kill 命令用于将指定的信号值发给指定的进程，其格式为 kill -信号值:PID
### `kill -l`
列出所有的信号值
其中仅有9种信号进程会无条件执行

``` bash
feifanzhang@fifamba fifa_z_blog % kill -l
HUP INT QUIT ILL TRAP ABRT EMT FPE KILL BUS SEGV SYS PIPE ALRM TERM URG STOP TSTP CONT CHLD TTIN TTOU IO XCPU XFSZ VTALRM PROF WINCH INFO USR1 USR2

```
### `kill -信号值:PID`
### 参考
［Linux kill 命令详解］(https://www.cnblogs.com/wangcp-2014/p/5146343.html)
### 引用
[Linux lsof命令](https://blog.csdn.net/qq_27870421/article/details/92803453)

