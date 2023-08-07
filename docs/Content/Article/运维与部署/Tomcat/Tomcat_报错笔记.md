# Exception in thread "http-apr-8082-exec-2" Exception in thread "commons-pool-EvictionTimer"
* 原因：Tomcat内存溢出导致
## 解决方法1：idea配置tomcat扩大运行内存
* idea 打开tomcat的【edit configurations】-> VM Options -> 将如下配置填入
    ```
    -Xms2048m
    -Xmx2048m
    -XX:MaxPermSize=4096m
    -Drebel.spring_plugin=true
    -Drebel.spring_mvc_plugin=true
    -Drebel.hibernate_plugin=true
    ```
## 解决方法2：tomcat conf直接配置进行内存扩大
* tomcat conf 文件加入如上配置
# 参考
* [Idea 中通过tomcat运行web项目报Exception in thread "http-apr-8082-exec-2"](https://blog.csdn.net/qq_35872777/article/details/82752621)