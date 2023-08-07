# `Service` 简介
* service是一个脚本命令，`etc/init.d/`目录下
* 但`Centos8`以后的Linux系统已经不再使用（或是说`Systemctl`已对其进行完全替代和兼容），具体原因可查看该目录下的`README`文件(`vim /etc/init.d/README`) 会得到如下结果
    ```
    You are looking for the traditional init scripts in /etc/rc.d/init.d,
    and they are gone?

    Here's an explanation on what's going on:

    You are running a systemd-based OS where traditional init scripts have
    been replaced by native systemd services files. Service files provide
    very similar functionality to init scripts. To make use of service
    files simply invoke "systemctl", which will output a list of all
    currently running services (and other units). Use "systemctl
    list-unit-files" to get a listing of all known unit files, including
    stopped, disabled and masked ones. Use "systemctl start
    foobar.service" and "systemctl stop foobar.service" to start or stop a
    service, respectively. For further details, please refer to
    systemctl(1).

    Note that traditional init scripts continue to function on a systemd
    system. An init script /etc/rc.d/init.d/foobar is implicitly mapped
    into a service unit foobar.service during system initialization.

    Thank you!
    ```

# Systemctl 
## 简介
* `systemd`是Linux系统最新的初始化系统(init),作用是提高系统的启动速度，减少启动的进程数量，尽量并发启动。`systemd`对应的进程管理命令是`systemctl`
* 兼容`service`，也会访问/etc/init.d目录，查看执行相关程序
* Linux一直采用init进程（即Service）启动。串行启动时间长，启动脚本复杂。Systemd取代了initd，成为系统的第一个进程（PID= 1），管理系统的服务、系统资源，不同的资源统称为 Unit
* 命令文件路径：`/usr/lib/systemd/system/sshd.service`
* 一句话：能用`Systemctl`就不用`Service`

## 简单命令
### 服务器相关命令
```shell
# 重启系统
$ sudo systemctl reboot

# 关闭系统，切断电源
$ sudo systemctl poweroff

# CPU停止工作
$ sudo systemctl halt

# 暂停系统
$ sudo systemctl suspend

# 让系统进入冬眠状态
$ sudo systemctl hibernate

# 让系统进入交互式休眠状态
$ sudo systemctl hybrid-sleep

# 启动进入救援状态（单用户状态）
$ sudo systemctl rescue
```

### 服务器开机数据查询
* 开机相关数据通过`systemd-analyze`指令查看
```shell

# 查看启动耗时
$ systemd-analyze                                                                                       

# 查看每个服务的启动耗时
$ systemd-analyze blame

# 显示瀑布状的启动过程流
$ systemd-analyze critical-chain

# 显示指定服务的启动流
$ systemd-analyze critical-chain atd.service

```

### 主机信息查询
```shell

# 显示当前主机的信息（包含名称、内核、操作系统等）
$ hostnamectl

# 设置主机名。
$ sudo hostnamectl set-hostname 主机名

```

### 主机本地化设置
```shell

# 查看本地化设置
$ localectl

# 设置本地化参数。
$ sudo localectl set-locale LANG=en_GB.utf8
$ sudo localectl set-keymap en_GB

```
### 主机时区设置
```shell

# 查看当前时区设置
$ timedatectl

# 显示所有可用的时区
$ timedatectl list-timezones                                                                                   

# 设置当前时区
$ sudo timedatectl set-timezone America/New_York
$ sudo timedatectl set-time YYYY-MM-DD
$ sudo timedatectl set-time HH:MM:SS

```

### 当前登录用户信息
```shell

# 列出当前session
$ loginctl list-sessions

# 列出当前登录用户
$ loginctl list-users

# 列出显示指定用户的信息
$ loginctl show-user ruanyf

```

### 服务、进程控制命令
```shell
# 设置为开机自启
systemctl enable 服务名

# 取消开机自启
systemctl disable 服务名

# 查看是否开机自启
systemctl is-enabled 服务名

# 启动服务
systemctl start 服务名

# 停止服务
systemctl stop 服务名

# 重启服务
systemctl restart 服务名

# 查看服务状态
systemctl status 服务名
```
* 常用服务名：
 * 防火墙：firewalld
 * 通过yum安装的依赖，服务名与依赖名相同：`nginx`、`mysql`等
# 参考
* [Linux管理工具systemctl与service](https://www.jianshu.com/p/bb2d68fb2987)
* [Systemctl 详解](https://www.jianshu.com/p/3dd6b57a16bf)