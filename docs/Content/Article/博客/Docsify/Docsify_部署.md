# nginx + docsify 部署
## git安装
```shell
sudo yum install git
```
## npm安装
```shell
sudo yum install npm
```
## docsify-cli安装
```shell
sudo yum install docsify-cli
```

## nginx安装
### 安装nginx
```shell
sudo yum install nginx
```
### 修改nginx.conf
* 进入目录
```shell
cd /etc/nginx
```
* 备份`nginx.conf` 文件
```shell
sudo cp nginx.conf ./nginx.conf.bak
```
* 打开 `nginx.conf`
```shell
sudo vim nginx.conf
```
* 修改如下部分：
`user nginx;` -> `user root;`
```shell
server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;  # 改为服务器ip
        root         /usr/share/nginx/html/;  # 博客所在目录（一般为index.html所在位置）
        index        index.html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```
# docker + nginx + docsify部署
