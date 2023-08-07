# top简介
* 进程在不同时刻，其状态会改变的，而`ps`命令只能查看当前时刻进程的状态，想要实时查看进程信息，需要`top`指令
* `top`是一个交互式命令：会一直显示在终端页面，直到使用`ctrl + c` 或 `q`退出

# top输出
```shell
[lighthouse@VM-16-7-centos ~]$ top
top - 10:42:49 up 212 days, 15:59,  0 users,  load average: 0.07, 0.02, 0.00
Tasks: 104 total,   1 running, 103 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.3 us,  0.2 sy,  0.0 ni, 99.3 id,  0.0 wa,  0.2 hi,  0.0 si,  0.0 st
MiB Mem :   1826.8 total,    128.7 free,    335.7 used,   1362.3 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1306.2 avail Mem 

PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                                                                                                                                                                                                                                              
1   root      20   0  238264  11148   8240 S   0.0   0.6  34:25.84 systemd                                                                                                                        
2   root      20   0       0      0      0 S   0.0   0.0   0:08.07 kthreadd                                                                                                                       
3   root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_gp                                                                                                                         
4   root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_par_gp                                                                                                                                                   
```

## 各字段说明
|字段|说明|
|--|--|
|users|在线用户数|
|load average|1、5、15分钟的平均负载|
|Tasks|任务总数以及各状态下的任务数量|
|%Cpu(s)|`us`： user占用 <br/> `sy`：system占用<br/> `ni`：低优先级任务占用cpu<br/> `id`：空闲cpu状态<br/> `wa`：wait<br/>`hi`：硬中断<br/> `si`：软中断<br/> `st`：系统等待时间|
|MiB Mem|`total`: 整体内存<br/> `free`: 未使用内存<br/> `used`:已使用内存<br/>`buff/cache`:buff为缓冲区（内存写入硬盘时，两者之间的缓存），cache:如果某一数据经常从硬盘读取，则系统会写入内存的cache中，提高读取效率|
|MiB Swap|用的不多|
|PR|动态优先级（0-139），越小优先级越高，若数值为`rt`则表明优先级最高|
|NI|静态优先级（可人工调整，-20~19，一般为0）越小优先级越高|
|VIRT|虚拟内存|
|RES|常驻内存|
|RES|共享内存|
|S|线程状态|
|%CPU & %MEM|CPU & 内存使用率|
|TIME|CPU 占用时间|
|COMMAND|执行命令|

# 指令参数
* 输入`top`指令后，直接进入了**交互页面**，