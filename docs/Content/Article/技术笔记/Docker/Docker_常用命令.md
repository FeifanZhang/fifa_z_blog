# 帮助启动类命令
* 启动Docker
    ```shell
    systemctl start docker
    ```
* 停止Docker
    ```shell
    systemctl stop docker
    ```
* 重启Docker
    ```shell
    systemctl restart docker
    ```
* 设置开机启动
    ```shell
    systemctl status docker
    ```
* 查看Docker状态
    ```shell
    systemctl enable docker
    ```
* 查看Docker概要信息
    ```shell
    docker info
    ```
* 查看Dcoker文档
    ```shell
    docker --help  # 查看总体文档
    docker 具体命令 --help  # 查看 具体命令 的帮助文档
    ```

# 镜像命令
* 查看本地的Docker镜像（`sudo docker images`）
  ```shell
  [lighthouse@VM-16-7-centos ~]$ sudo docker images
  REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
  hello-world   latest    feb5d9fea6a5   15 months ago   13.3kB
  ```
  * REPOSITORY： 镜像的仓库源
  * TAG：Docker image的标签版本号（默认为latest，如果需要特定版本，可以进行指定）
  * IMAGE ID: 镜像ID
  * CREATED: 镜像创建时间
  * SIZE: 镜像大小
  * 一般情况，会使用`REPOSITORY:TAG` 来定义不同镜像

* 查找DockerHub上的镜像
  * 普通查找（`sudo docker search 镜像名`）
    ```shell
    [lighthouse@VM-16-7-centos ~]$ sudo docker search hello-world
    NAME                                       DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
    hello-world                                Hello World! (an example of minimal Dockeriz…   1945      [OK]       
    kitematic/hello-world-nginx                A light-weight nginx container that demonstr…   153                  
    tutum/hello-world                          Image to test docker deployments. Has Apache…   90                   [OK]
    dockercloud/hello-world                    Hello World!                                    20                   [OK]
    crccheck/hello-world                       Hello World web server in under 2.5 MB          15                   [OK]
    vad1mo/hello-world-rest                    A simple REST Service that echoes back all t…   5                    [OK]                
    ansibleplaybookbundle/hello-world-db-apb   An APB which deploys a sample Hello World! a…   2                    [OK]
    ppc64le/hello-world                        Hello World! (an example of minimal Dockeriz…   2                  
    ```
    * OFFICIAL：官方认证
    * AUTOMATED
    * 搜索结果会以STARS + OFFICIAL 进行排名,除非有特定要求，否则以第一个镜像为主
  * 分页查找（`sudo docker search --limit 数字 镜像名称`）
    ```shell
    [lighthouse@VM-16-7-centos ~]$ sudo docker search --limit 3 hello-world  # --limit number 分页查找
    NAME                  DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
    hello-world           Hello World! (an example of minimal Dockeriz…   1945      [OK]       
    rancher/hello-world                                                   4                    
    okteto/hello-world                                                    0   
    ```
