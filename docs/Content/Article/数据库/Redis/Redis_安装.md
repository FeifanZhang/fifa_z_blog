* windows安装
[Github](https://github.com/microsoftarchive/redis/releases)上微软目前在维护windows版
* 一路next即可，记住安装的路径
# redis接入已有项目
* 对于Spring项目，打开`redis.properties`文件，会有以下内容
```yml
  doss.redis.hostName = 127.0.0.1
  doss.redis.port = 7368
  doss.redis.password = xxxx
  doss.redis.maxTotal = 100
  doss.redis.maxIdle = 10
  doss.redis.minIdle = 2
  doss.redis.testOnBorrow = true
```
* 尤其关注`port` `hostname`以及`password`的设置
* 打开 redis目录下的 redis.windows.conf文件，将以上`port` `hostname`以及`password`填入文件中
```yml
  # 设置password(通过关键字 requirepass进行设置)
  requirepass xxxxx
  # 设置port
  port 7368
  # 设置hostname
  bind 127.0.0.1
```

# 启动redis
配置完成后 进入redis目录下，输入`redis-server.exe redis.windows.conf`启动Redis，启动后出现如下画面即表明启动成功
```cmd
D:\Redis>redis-server.exe redis.windows.conf
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 3.0.504 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 7368
 |    `-._   `._    /     _.-'    |     PID: 16620
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

[16620] 14 Apr 15:16:08.729 # Server started, Redis version 3.0.504
[16620] 14 Apr 15:16:08.729 * DB loaded from disk: 0.000 seconds
[16620] 14 Apr 15:16:08.729 * The server is now ready to accept connections on port 7368
```
