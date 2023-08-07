# `ps -ef`
## 参数说明
* `ps`: process status 查看命令状态
* `-e`: 输出全部进程
* `-f`: 输出进程的详细信息
  
## 例子
```shell
[lighthouse@VM-16-7-centos ~]$ ps -ef
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0  2022 ?        00:34:23 /usr/lib/systemd/systemd --system --deserialize 21
root           2       0  0  2022 ?        00:00:08 [kthreadd]
root           3       2  0  2022 ?        00:00:00 [rcu_gp]
root           4       2  0  2022 ?        00:00:00 [rcu_par_gp]
root           6       2  0  2022 ?        00:00:00 [kworker/0:0H-kblockd]
root           8       2  0  2022 ?        00:00:00 [mm_percpu_wq]
root           9       2  0  2022 ?        00:02:34 [ksoftirqd/0]
root          10       2  0  2022 ?        00:47:32 [rcu_sched]
root          11       2  0  2022 ?        00:00:49 [migration/0]
```
## 输出的各字段含义

|字段名|说明|
|--|--|
|UID|进程所属用户|
|PID|进程ID号|
|PPID|该进程的父进程ID号|
|C|CPU资源占比|
|STIME|进程启动时间|
|TTY|登入者终端|
|TIME|CPU使用时间|
|CMD|运行指令|
  
## 显示指定进程的信息
* 配合`grep`来使用：`ps -ef | grep 进程名`
```shell
[lighthouse@VM-16-7-centos ~]$ ps -ef | grep nginx
lightho+  176321  174363  0 12:48 pts/1    00:00:00 grep --color=auto nginx
root     3617971       1  0 Jul07 ?        00:00:00 nginx: master process /usr/sbin/nginx
root     3617973 3617971  0 Jul07 ?        00:00:00 nginx: worker process
root     3617974 3617971  0 Jul07 ?        00:00:00 nginx: worker process
```

# `ps -aux`
## 参数说明
* `a`: 显示前台进程（当前终端下的进程）
* `u`：输出user信息
* `x`：输出后台进程

## 例子
```shell
[lighthouse@VM-16-7-centos ~]$ ps -aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.5 238264 11148 ?        Ss    2022  34:23 /usr/lib/systemd/systemd --system --deserialize 21
root           2  0.0  0.0      0     0 ?        S     2022   0:08 [kthreadd]
root           3  0.0  0.0      0     0 ?        I<    2022   0:00 [rcu_gp]
root           4  0.0  0.0      0     0 ?        I<    2022   0:00 [rcu_par_gp]
root           6  0.0  0.0      0     0 ?        I<    2022   0:00 [kworker/0:0H-kblockd]
```
## 各字段含义
|字段名|说明|
|--|--|
|USER|就是**UID**，即进程所属用户|
|PID|进程ID|
|%CPU|CPU资源占比|
|%MEM|内存使用占比|
|VSZ|`Virtual Memory Size`，虚拟内存使用量（KiB）|
|RSS|`Resident set size` 内存真实使用量（KiB）|
|TTY|登入者终端|
|STAT|进程状态，[Linux中进程状态的说明移步至此](./Linux_%E8%BF%9B%E7%A8%8B%E7%AE%80%E4%BB%8B.md)|
|START|进程启动时间|
|TIME|CPU使用时间|
|COMMAND|运行指令|