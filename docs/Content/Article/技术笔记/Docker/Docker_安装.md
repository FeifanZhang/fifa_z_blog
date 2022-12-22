# Centos 安装 Docker
* Centos仅发行版本内核支持Docker，保证系统版本为Centos7或以上、64位系统，其他系统内核版本为3.10以上
  ```shell
  uname -r
  ```

* Docker已包含在Centos-Extra 软件源，可直接通过yum下载
  ```shell
  yum -y install docker
  ```

* 启动docker后台服务
  ```shell
  sudo service docker start
  ```

* [注册一个dokcerHub](https://hub.docker.com/)，如果有账号的话直接跳过，进行下一步

* centos登录docker（登陆时填写`username`务必全小写！）
  ```
  sudo docker login 
  ```

* 测试运行 `hello world`，`sudo docker run hello-world`启动后，看到如下显示表明已成功
  ```shell
  [lighthouse@VM-16-7-centos ~]$ sudo docker run hello-world
    Unable to find image 'hello-world:latest' locally
    latest: Pulling from library/hello-world
    2db29710123e: Pull complete 
    Digest: sha256:faa03e786c97f07ef34423fccceeec2398ec8a5759259f94d99078f264e9d7af
    Status: Downloaded newer image for hello-world:latest

    Hello from Docker!
    This message shows that your installation appears to be working correctly.

    To generate this message, Docker took the following steps:
    1. The Docker client contacted the Docker daemon.
    2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
        (amd64)
    3. The Docker daemon created a new container from that image which runs the
        executable that produces the output you are currently reading.
    4. The Docker daemon streamed that output to the Docker client, which sent it
        to your terminal.

    To try something more ambitious, you can run an Ubuntu container with:
    $ docker run -it ubuntu bash

    Share images, automate workflows, and more with a free Docker ID:
    https://hub.docker.com/

    For more examples and ideas, visit:
    https://docs.docker.com/get-started/

    [lighthouse@VM-16-7-centos ~]$ 
  ```

# 参考
* [CentOS Docker 安装](http://edu.jb51.net/docker/docker-centos-install.html)