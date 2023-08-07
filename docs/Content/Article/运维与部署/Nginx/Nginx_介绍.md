# Nginx功能
## HTTP服务器
Nginx本质欸静态资源服务器，若一个网站只是静态资源的话，可以通过该方式进行部署

## FTP服务器
该类型服务器会提供一个静态资源上传功能，其他应用如需静态资源即可从中获取

## 反向代理
反向代理（Reverse Proxy）即作为**代理服务器**接收网络中的请求，然后将这些请求转发给内部网络的服务器，并将内网服务器的结果返回给请求方

## 负载均衡
Nginx会将大量请求分摊到多个操作单元上执行，如大型项目会同时用到Web服务器、FPT服务器以及企业关键应用服务器等，从而共同完成工作任务

# Nginx优点
* **高并发支持**: 单机支持10w+并发（取决于内存大小，极限甚至到百万），得益于Nginx在Linu环境是呀哦那个了epollIO多路复用模型
* **内存消耗低**：同类型Web服务中，Nginx内存消耗量小于Apache，一般情况下10k非活跃`Http Keep-Alive`链接在Nginx中仅小号**2.5M内存**
* **高扩展性**：低耦合模块设计，丰富第三方模块支持
* **高可靠性**：经过十几年各种复杂场景 & 大公司的生产环境验证，且Nginx由master进程和worker进程组成，worker出现问题，master进程可以快速开启新的worker进程提供服务

# Nginx安装
* yum指令安装(安装时一路点击`y`)
```shell
yum install nginx
```
* 安装完成后，检查nginx状态
```shell
[lighthouse@VM-16-7-centos ~]$ systemctl status nginx
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; vendor preset: disabled)
   Active: active (running) since Fri 2023-07-07 08:32:13 CST; 1 day 4h ago
  Process: 3617970 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)
  Process: 3617967 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)
  Process: 3617965 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
 Main PID: 3617971 (nginx)
    Tasks: 3 (limit: 11506)
   Memory: 9.2M
   CGroup: /system.slice/nginx.service
           ├─3617971 nginx: master process /usr/sbin/nginx
           ├─3617973 nginx: worker process
           └─3617974 nginx: worker process
```
状态为`active` 表明已开启，最下方的`CGroup`可以看出1个`master`和2个`worker`