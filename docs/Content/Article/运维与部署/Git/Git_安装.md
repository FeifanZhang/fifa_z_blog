* [官网下载](https://git-scm.com/download/win)

# 安装问题
## Centos 安装报错 Error: Failed to download metadata for repo ‘appstream‘: Cannot prepare internal mirrorlist
* 原因：centos官方已停止更新，需要切换镜像
* 方法：
  * 进入yum 的 repo 目录
    ```shell
    cd /etc/yum.repos.d/
    ```
  * 修改镜像
    ```shell
    sudo sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
    sudo sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
    ```
  * 缓存更新
    ```shell
    yum makecache
    ```
  * 运行update命令 & 安装git
    ```shell
    yum update -y
    yum -y install vim
    ```