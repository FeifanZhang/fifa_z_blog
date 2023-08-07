

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


# tomcat部署(Linux服务器)
* 将项目的war包拷贝至`tomcat`的`webapps`路径下
* 切换至`tomcat`的`bin`路径下，运行`startup.sh`，如果之前已启动tomcat则先运行`shutdown.sh`后，再运行`startup.sh`
* 若出现问题，切换至`logs`目录下，查看日志
  ```shell
  tail catalina.out /*查看catalina.out全部内容，不推荐使用，因为日志内容太多*/
  tail -x catalina.out /*查看最后x行的日志内容*/
  tail -f catalina.out /*查看文本实时的更新内容*/
  ```
* 查看tomcat运行详情
```shell
ps -ef | grep java
```

# wget 查看端口是否能被访问
wget是一个下载工具，可以通过该工具访问nginx来判断服务是否成功启动
```
wget http://xxx.xx.xx.xx:端口号
```

# 文件操作
## 压缩文件

  ```shell
  tar -zcvf 压缩的文件夹名称.tar.gz 压缩的文件夹名称
  ```

## 解压缩文件

  ```shell
  tar -zxvf 压缩的文件夹名称.tar.gz
  ```

## rz sz命令

* `rz`、`sz`命令是Linux与Windows进行文件传输的命令工具，传输协议基于[ZModem](https://baike.baidu.com/item/Zmodem%E5%8D%8F%E8%AE%AE/1444157?fr=aladdin)
* sz: 将文件从远程的linux服务器发送至本地机器
* rz: 将本地文件上传至linux服务器
* 前期准备工作：安装工具
    ```shell
    yum install lrzsz
    ```
* 使用
    ```shell
    sz filename # 输入后 会有弹框选择下载到本地的路径
    rz # 输入后 会弹框选择从本地上传到服务器的文件
    ```
  