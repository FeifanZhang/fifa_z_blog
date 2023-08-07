# Tomcat内存管理机制简介
* tomcat 通过 jvm（java虚拟机）进行内存管理，jvm的内存分为**堆**和**非堆**内存，其中堆是java代码运行时所用到的内存；非堆内存则是jvm自身使用
## 堆（Heap）
* 定义：存储运行时的数据
* 存储内容：类实例，数组内存等
* 创建时间：jvm启动时创建
## 非堆（Non-Heap）
* 定义：除了堆以外的，内存皆为非堆内存
* 存储内容：方法区、JVM内部处理或优化所需内存（如JIT编译后的代码缓存）、类结构（运行时所用到的**常数池**、**字段**以及**方法数据**），方法以及构造方法的代码都在非堆内存中
* 创建时间：jvm启动时创建

# 堆 & 非堆内存分配
## 初始堆内存
* 由`-Xms`指定
* 默认为物理内存 1/64
* `-Xms`既是初始堆内存，也是最小堆内存
## 最大堆内存
* 由`-Xmx`指定
* 默认为物理内存 1/4
## 最大堆内存 & 初始分配关系
* 空余堆内存小于 **40%** 时，jvm会增大堆内存直到 `-Xmx`最大限制
* 空余堆大于 **70%** 时， jvm会减少堆内存直到`-Xms`最小限制
* 一般情况 `-Xms` 与 `-Xmx` 数值相等，以防每次垃圾回收后，都要调整堆的大小，造成tomcat效率降低

## 初始非堆内存
* 由`-XX:PermSize`指定
* 默认是物理内存的1/64

## 最大非堆内存
* 由`-XX:MaxPermSize`指定
* 默认是物理内存的1/4

## 堆 & 非堆内存参数
### jvm参数简介
|参数|介绍|默认值|堆 or 非堆内存|
|--|--|--|--|
|-server|一定要作为第一个参数，在多个CPU时性能佳||
|-Xms|java Heap初始大小|物理内存的1/64|堆内存|
|-Xmx|java heap最大值，建议 `物理内存 <= heap最大值 <= 物理内存的一半`|物理内存1/4|堆内存|
|-XX:PermSize|设定内存的永久保存区初始大小|64M|非堆内存|
|XX:MaxPermSize|设定内存的永久保存区最大值|64M|非堆内存|
|-XX:SurvivorRatio=2|生还者池的大小,如果垃圾回收变成了瓶颈，您可以尝试定制生成池设置|默认值2|非堆内存|
|-XX:NewSize|新生成的池的初始大小|缺省值为2M|非堆内存|
|-XX:MaxNewSize|新生成的池的最大大小|缺省值为32M|非堆内存|
|+XX:AggressiveHeap|会使得 Xms没有意义。这个参数让jvm忽略Xmx参数,疯狂地吃完一个G物理内存,再吃尽一个G的swap||
|-Xss|每个线程的Stack大小，“-Xss 15120” 这使得JBoss每增加一个线程（thread)就会立即消耗15M内存，而最佳值应该是128K|默认值512k|
|-verbose:gc|现实垃圾收集信息|
|-Xloggc:gc.log|指定垃圾收集日志文件|
|-Xmn|young generation的heap大小，一般设置为Xmx的 1/4 ~ 1/3|
|-XX:+UseParNewGC|缩短minor收集的时间|
|-XX:+UseConcMarkSweepGC|缩短major收集的时间 此选项在Heap Size 比较大而且Major收集时间较长的情况下使用更合适|
|-XX:userParNewGC|可用来设置并行收集【多核CPU】|
|-XX:ParallelGCThreads|可用来增加并行度【多核CPU】|
|-XX:UseParallelGC|设置后可以使用并行清除收集器【多核CPU】|


如果 JVM 的堆大小大于 1GB，则应该使用值：-XX:newSize=640m -XX:MaxNewSize=640m -XX:SurvivorRatio=16，或者将堆的总大小的 50% 到 60% 分配给新生成的池。调大新对象区，减少Full GC次数。

# 内存限制
JVM内存受限于**实际最大物理内存**、**操作系统位数**以及**操作系统类型**
## 32Bit
* Windows系统下最大为1.5G ~ 2G，若物理内存小于该范围以物理内存上限为准
* Linux系统下 2G ~ 3G，若物理内存小于该范围以物理内存上限为准

## 64Bit
* windows与Linux的限制仅为物理内存上限


# 参考
* [tomcat内存配置及配置参数详解](https://blog.csdn.net/Xin_shou__/article/details/129533153)
