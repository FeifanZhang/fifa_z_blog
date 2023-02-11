# Connection
* 定义：
  * 连接是从客户端到ORACLE实例的一条物理路径。连接可以在网络上建立，或者在本机通过IPC机制建立。通常会在客户端进程与一个专用服务器或一个调度器之间建立连接

# Process
```sql
-- 允许的最大进程数
select * from v$parameter where name = 'process';

-- 当前已用进程
select count(*) from v$process;

-- 查询某客户端连接至数据库的process详情
select * from v$process
where addr in (select paddr from v$session where terminal = 'FIFA') -- 客户端名称
```

# Session
## 定义：
  * 会话(Session) 是通信双方从开始通信到通信结束期间的一个上下文（Context）。这个上下文是一段位于服务器端的内存：记录了本次连接的客户端机器、应用程序、用户登录等信息

## 状态：
  * Active：会话正在进行
  * Inactive：
    * 会话处于等待状态（等待新的sql语句），通常是当前 DML 语句已经完成，但连接没有释放，这个可能是程序中没有释放，如果是使用中间件来连接的话，也可能是中间件的配置或者是 bug 导致
    * Inactive 对数据库本身没有什么影响，但是如果程序未及时 Commit，会导致占用过多会话。容易使 DB 的 session 达到极限值。如果达到了session 的最大值，可以通过增大 Processes 和 Sessions 参数的值来解决
  * Sniped：
    * 当Session变为Inactive状态的时长 IDLE_TIME 后，自动变为Sniped状态，此时Session失效，客户端使用Sniped状态的Session发送信息会报错`ORA-02396: exceeded maximum idle time, please connect again`
  * Killed:
    * 该状态也是占用系统资源的，且 killed 状态一般会持续较长时间，无法用 windows 下的工具 pl/sql developer 来 kill 掉，需要命令：`alter system kill session ‘sid,serial#’`

## session 与 process数量关系
  * 11g Oracle，session数量 =（process数量 * 1.1）+ 5
  * 12g Oracle：session数量 =（process数量 * 1.5）+ 22

## session 与 connection比较
  * 两者都是描述数据库与客户端的连接，但Session是逻辑层面的与服务器交互，而Connection是物理层面上的数据库与客户端的链接
  * 两者数量区别：
    * 1个用户对应1个session，但多个session可共享一个connection
    * `专用服务器模式`下，session与connection一一对应，数量相等
    * `共享服务器模式`下, 一个connection对应多个session，数量上 session >= connection
    * 共享服务器的 Multiplexing Session模式下， session数量 > connection数量，且二者并不一一对应

## 查询session信息
```sql
-- 最大允许会话数session
show parsameter session

-- 当前已用会话数量
select count(*) from v$session
```

# 参考
* [ORACLE中Connection和Session的基本概念](https://blog.csdn.net/woshinidabinge/article/details/81324705)
* [数据库Connection连接与Session会话的理解](https://blog.csdn.net/jimsonhappy/article/details/54707694)
* [oracle长时间连接的session,Oracle SNIPED状态的session 多长时间自动清理释放连接？](https://blog.csdn.net/weixin_39976251/article/details/116314449?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-116314449-blog-114013910.pc_relevant_3mothn_strategy_and_data_recovery&spm=1001.2101.3001.4242.2&utm_relevant_index=4)
