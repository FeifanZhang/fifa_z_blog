# 并发简介
所有的计算任务都可以分为CPU密集型计算以及IO密集型计算，**CPU密集型计算（CPU bound）**如解压缩压缩，正则表达式，加密解密。**IO密集型计算（IO bound）**依赖外部磁盘或数据，以读写操作为主，如网络爬虫，文件处理以及数据库读写
|名称|优点|缺点|适用场景|关系|
|--|--|--|--|--|
|多进程|利用CPU多核进行计算|占用资源多，可启动数量少于线程|CPU密集型计算|一个进程包含多个线程|
|多线程|比进程轻量，占用资源少|只能并发执行，不能利用多CPU|IO密集型运行任务数量少|一个线程包含多个协成|
|多协程|内存开销少，启动数量多|支持的库有限制，代码实现复杂|用于IO密集型计算||
# 多进程

# 多线程
## threading 用法
## 线程间通信
queue.Queue
## 线程池

# 多协程

# 参考


