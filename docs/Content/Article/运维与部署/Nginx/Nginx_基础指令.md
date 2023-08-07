# nginx
nginx的任何语法，需要先进入`sbin/`目录下才可以使用
## 启动
  ```shell
  systemctl start nginx
  ```
## 重启
  ```shell
  nginx -s reload
  ```

## 关闭nginx
### **优雅关闭（推荐）**
```shell
nginx -s quit
```

### 硬核关闭
```shell 
nginx -s stop
```

### 通过Linux命令关闭（略粗暴，实在没招再用）
* 进程命令停止
```shell
pkill nginx
```

* `systemctl` 停止
```shell
systemctl stop nginx
```
  
### 三个关闭的区别
|命令名称|使用场景|层级|
|--|--|--|
|`nginx -s quit`|优雅关闭：nginx会在执行完当前请求后关闭|nginx层面停止|
|`nginx -s stop`|略显粗暴关闭：nginx不管当前是否有在执行的请求，直接关闭|nginx层面停止|
|`pkill nginx` & `systemctl stop nginx`|超级粗暴关闭：不由nginx自己决定，linux直接将其关闭|操作系统层面停止|


## 查看nginx相应pid，端口等信息(建议使用超级权限(`sudo`)进行操作)
  ```shell
  sudo netstat -tnulp | grep nginx
  ```

## 检查config文件语法(建议超级用户权限(`sudo`)进行操作)
  ```
  sudo nginx -t
  ```

## 指定config配置文件
  ```shell
  sudo nginx -c 文件路径
  ```

## 查看nginx版本
  ```shell
  [lighthouse@VM-16-7-centos ~]$ nginx -v
  nginx version: nginx/1.14.1
  ```

# 开放端口
项目部署完成后，外界可能无法访问，但通过`wget`命令发现通过服务器内部是可以访问的，大概率就是服务器未将端口开放至外界；通过如下步骤，可将指定端口进行开放
* 打开配置文件
    ```
    vi /etc/sysconfig/iptables
    ```

* 将如下信息加入文件
    ```
    -A INPUT -p tcp -m tcp --dport 端口号 -j ACCEPT
    ```

* 保存退出 & 重新启动iptables服务
    ```shell
    service iptables restart
    ```