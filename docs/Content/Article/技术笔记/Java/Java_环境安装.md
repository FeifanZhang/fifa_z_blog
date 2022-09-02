# 安装步骤
* [点击官网链接下载安装包](https://www.oracle.com/java/technologies/downloads/)
* 疯狂点击下一步，记住绝对路径（如`C:\Program Files\Java\jdk-17.0.1`）,后面配置变量时要用
* 此电脑 -> 属性 -> 高级系统设置 -> 环境变量中的**系统变量**，**注意！不是~~用户变量~~！而是系统变量！**
  |变量名|变量值|是否已存在|
  |--|--|--|
  |`JAVA_HOME`|JAVA安装的绝对路径（`C:\Program Files\Java\jdk-17.0.1）`|若首次安装Java，则该变量不会存在|
  |`PATH`或`Path`(无所谓大小写)|`%JAVA_HOME%\bin` & `%JAVA_HOME%\jre\bin`|存在|
  |`CLASSPATH`|`.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar`|有些电脑存在，有些不存在|

* 调出cmd，输入`java`、`javac`看是否安装成功

```shell
C:\Users\25384>java
用法：java [options] <主类> [args...]
           （执行类）
   或  java [options] -jar <jar 文件> [args...]
           （执行 jar 文件）
   或  java [options] -m <模块>[/<主类>] [args...]
       java [options] --module <模块>[/<主类>] [args...]
           （执行模块中的主类）
   或  java [options] <源文件> [args]
           （执行单个源文件程序）

 将主类、源文件、-jar <jar 文件>、-m 或
 --module <模块>/<主类> 后的参数作为参数
 传递到主类。

 其中，选项包括：

    -cp <目录和 zip/jar 文件的类搜索路径>
    -classpath <目录和 zip/jar 文件的类搜索路径>
    --class-path <目录和 zip/jar 文件的类搜索路径>
                  使用 ; 分隔的, 用于搜索类文件的目录, JAR 档案
                  和 ZIP 档案列表。
    -p <模块路径>
    --module-path <模块路径>...
                  用 ; 分隔的目录列表, 每个目录
                  都是一个包含模块的目录。
    --upgrade-module-path <模块路径>...
                  用 ; 分隔的目录列表, 每个目录
                  都是一个包含模块的目录, 这些模块
                  用于替换运行时映像中的可升级模块
    --add-modules <模块名称>[,<模块名称>...]
                  除了初始模块之外要解析的根模块。
                  <模块名称> 还可以为 ALL-DEFAULT, ALL-SYSTEM,
                  ALL-MODULE-PATH.
    --list-modules
                  列出可观察模块并退出
    -d <module name>
    --describe-module <模块名称>
                  描述模块并退出
    --dry-run     创建 VM 并加载主类, 但不执行 main 方法。
                  此 --dry-run 选项对于验证诸如
                  模块系统配置这样的命令行选项可能非常有用。
    --validate-modules
                  验证所有模块并退出
                  --validate-modules 选项对于查找
                  模块路径中模块的冲突及其他错误可能非常有用。
    -D<名称>=<值>
                  设置系统属性
    -verbose:[class|module|gc|jni]
                  为给定子系统启用详细输出
    -version      将产品版本输出到错误流并退出
    --version     将产品版本输出到输出流并退出
    -showversion  将产品版本输出到错误流并继续
    --show-version
                  将产品版本输出到输出流并继续
    --show-module-resolution
                  在启动过程中显示模块解析输出
    -? -h -help
                  将此帮助消息输出到错误流
    --help        将此帮助消息输出到输出流
    -X            将额外选项的帮助输出到错误流
    --help-extra  将额外选项的帮助输出到输出流
    -ea[:<程序包名称>...|:<类名>]
    -enableassertions[:<程序包名称>...|:<类名>]
                  按指定的粒度启用断言
    -da[:<程序包名称>...|:<类名>]
    -disableassertions[:<程序包名称>...|:<类名>]
                  按指定的粒度禁用断言
    -esa | -enablesystemassertions
                  启用系统断言
    -dsa | -disablesystemassertions
                  禁用系统断言
    -agentlib:<库名>[=<选项>]
                  加载本机代理库 <库名>, 例如 -agentlib:jdwp
                  另请参阅 -agentlib:jdwp=help
    -agentpath:<路径名>[=<选项>]
                  按完整路径名加载本机代理库
    -javaagent:<jar 路径>[=<选项>]
                  加载 Java 编程语言代理, 请参阅 java.lang.instrument
    -splash:<图像路径>
                  使用指定的图像显示启动屏幕
                  自动支持和使用 HiDPI 缩放图像
                  (如果可用)。应始终将未缩放的图像文件名 (例如, image.ext)
                  作为参数传递给 -splash 选项。
                  将自动选取提供的最合适的缩放
                  图像。
                  有关详细信息, 请参阅 SplashScreen API 文档
    @argument 文件
                  一个或多个包含选项的参数文件
    -disable-@files
                  阻止进一步扩展参数文件
    --enable-preview
                  允许类依赖于此发行版的预览功能
要为长选项指定参数, 可以使用 --<名称>=<值> 或
--<名称> <值>。


C:\Users\25384>javac
用法: javac <options> <source files>
其中, 可能的选项包括:
  @<filename>                  从文件读取选项和文件名
  -Akey[=value]                传递给注释处理程序的选项
  --add-modules <模块>(,<模块>)*
        除了初始模块之外要解析的根模块; 如果 <module>
                为 ALL-MODULE-PATH, 则为模块路径中的所有模块。
  --boot-class-path <path>, -bootclasspath <path>
        覆盖引导类文件的位置
  --class-path <path>, -classpath <path>, -cp <path>
        指定查找用户类文件和注释处理程序的位置
  -d <directory>               指定放置生成的类文件的位置
  -deprecation                 输出使用已过时的 API 的源位置
  --enable-preview             启用预览语言功能。要与 -source 或 --release 一起使用。
  -encoding <encoding>         指定源文件使用的字符编码
  -endorseddirs <dirs>         覆盖签名的标准路径的位置
  -extdirs <dirs>              覆盖所安装扩展的位置
  -g                           生成所有调试信息
  -g:{lines,vars,source}       只生成某些调试信息
  -g:none                      不生成任何调试信息
  -h <directory>               指定放置生成的本机标头文件的位置
  --help, -help, -?            输出此帮助消息
  --help-extra, -X             输出额外选项的帮助
  -implicit:{none,class}       指定是否为隐式引用文件生成类文件
  -J<flag>                     直接将 <标记> 传递给运行时系统
  --limit-modules <模块>(,<模块>)*
        限制可观察模块的领域
  --module <模块>(,<模块>)*, -m <模块>(,<模块>)*
        只编译指定的模块，请检查时间戳
  --module-path <path>, -p <path>
        指定查找应用程序模块的位置
  --module-source-path <module-source-path>
        指定查找多个模块的输入源文件的位置
  --module-version <版本>        指定正在编译的模块版本
  -nowarn                      不生成任何警告
  -parameters                  生成元数据以用于方法参数的反射
  -proc:{none,only}            控制是否执行注释处理和/或编译。
  -processor <class1>[,<class2>,<class3>...]
        要运行的注释处理程序的名称; 绕过默认的搜索进程
  --processor-module-path <path>
        指定查找注释处理程序的模块路径
  --processor-path <path>, -processorpath <path>
        指定查找注释处理程序的位置
  -profile <profile>           请确保使用的 API 在指定的配置文件中可用
  --release <release>
        为指定的 Java SE 发行版编译。支持的发行版：7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
  -s <directory>               指定放置生成的源文件的位置
  --source <release>, -source <release>
        提供与指定的 Java SE 发行版的源兼容性。支持的发行版：7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
  --source-path <path>, -sourcepath <path>
        指定查找输入源文件的位置
  --system <jdk>|none          覆盖系统模块位置
  --target <release>, -target <release>
        生成适合指定的 Java SE 发行版的类文件。支持的发行版：7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
  --upgrade-module-path <path>
        覆盖可升级模块位置
  -verbose                     输出有关编译器正在执行的操作的消息
  --version, -version          版本信息
  -Werror                      出现警告时终止编译


C:\Users\25384>
```

# 参考
* [Windows 10 配置Java 环境变量](https://www.runoob.com/w3cnote/windows10-java-setup.html)


