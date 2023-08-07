# Kill命令
* `kill`命令本质是向**指定的进程发送信号**，只是**默认发送的为终止信号**，一般情况下，终止一个前台进程使用 `Ctrl + C` 即可。后台进程需使用 `kill` 命令终止。先使用 `ps`、`top` 等命令获得进程的 PID，然后使用 kill 命令来杀掉该进程
* 用法：
```shell
kill -信号参数 PID
```
## 参数1：信号参数
* `kill -l`列出全部
```shell
[lighthouse@VM-16-7-centos ~]$ kill -l
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
 6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
16) SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP
21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ
26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO       30) SIGPWR
31) SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
63) SIGRTMAX-1  64) SIGRTMAX
```
* `kill`常用的信号参数：
    * 1 (SIGHUB): 重新加载该进程
    * 9 (SIGKILL): 强制停止进程
    * 15（SIGTERM）：完美地停止一个进程（即进程完成当前任务后停止）

## 参数2：PID
* PID是进程号，每一个进程的`PID`唯一

## kill 命令示例
```shell
kill pid # 默认参数为15，即安全停止进程
kill -15 pid # 同上
kill -9 pid  # 不管三七二十一 彻底杀死进程
```

# killall命令
* 该命令用于杀死进程名相同的所有进程
* `kill` 通过 **PID** 操作进程，而`killall`通过**进程名称**操作对应的**若干进程**（如进程名为nignx的，有三个进程：master和两个worker，可以直接`kill` master进程；或直接`killall nginx` 关闭全部的三个进程）
* 进程名必须完全正确 不然直接报错

## killall 示例
```shell
killall -9 mysql # 杀死mysql的全部进程
killall -9 nginx # 杀死ningx的全部进程
```

# pkill命令
* 与 `killall` 类似，但功能更加强大：可以操作某个用户，或是终端开启的进程
```shell
pkill mysql         # 结束 mysql 进程
pkill -u mark,danny # 结束mark,danny用户的所有进程
w  # 使用w命令查询本机已经登录的用户
pkill -9 -t pts/1  # 强制杀死从pts/1虚拟终端登陆的进程
```

# 参考
* [【Linux随笔】Killall 、Kill 、Pkill三个命令之间的区别](https://cloud.tencent.com/developer/article/1847239)