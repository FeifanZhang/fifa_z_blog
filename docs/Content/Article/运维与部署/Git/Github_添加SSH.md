# Centos 添加ssh
## 检查git和ssh是否安装

```shell
[lighthouse@VM-16-7-centos docs]$ ssh
usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface]
           [-b bind_address] [-c cipher_spec] [-D [bind_address:]port]
           [-E log_file] [-e escape_char] [-F configfile] [-I pkcs11]
           [-i identity_file] [-J [user@]host[:port]] [-L address]
           [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]
           [-Q query_option] [-R address] [-S ctl_path] [-W host:port]
           [-w local_tun[:remote_tun]] destination [command]
[lighthouse@VM-16-7-centos docs]$ git --version
git version 2.27.0
```

## 配置 git config
```shell
git config --global user.name “你的名称”
git config --global user.email “你的邮箱”
git config --global user.password “xxxxx密码”
```

* 检查配置项
```shell
git config --list
```

## 创建SSH
* 进入 shh目录
```shell
$ cd ~/.ssh
$ ls
```

* 创建 ssh
```shell
$ ssh-keygen -t rsa
```
一直回车即可

* 打开 & 复制ssh key
```shell
$ cat id_rsa.pub
```
复制其中的内容

## SSH加入 github ssh key
登录**Github**后，Setting -> SSH and GPG keys -> New SSH key -> 将上一步的内容复制到`Key`中 -> Add SSH key

# 参考
* [CentOS 7 下git clone配置使用](https://blog.csdn.net/widsoor/article/details/127949770)