# 安装步骤
* [点击官网链接下载安装包](https://www.oracle.com/java/technologies/downloads/)
* 疯狂点击下一步，记住绝对路径（如`C:\Program Files\Java\jdk-17.0.1`）,后面配置变量时要用
* 设置环境变量中的**系统变量**，**注意！不是~~用户变量~~！而是系统变量！**
  |变量名|变量值|
  |--|--|
  |`JAVA_HOME`|JAVA安装的绝对路径（`C:\Program Files\Java\jdk-17.0.1）`|
  |`PATH`|`C:\Program Files\Java\jdk1.8.0_261\bin` & `C:\Program Files\Java\jdk1.8.0_261\jre\bin`|
  |`CLASSPATH`|`.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar`|

* 调出cmd，输入`java`、`javac`看是否安装成功

# 参考
* [Windows 10 配置Java 环境变量](https://www.runoob.com/w3cnote/windows10-java-setup.html)


