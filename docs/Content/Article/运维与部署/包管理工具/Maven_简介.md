# IDEA 安装
* 创建新项目后，new 一个 maven module
![](./../../../../img/Maven/Maven_简介0.png)

# 更换Maven镜像
* Maven的默认配置是国外服务器，需要更换成国内以便增加访问速度
* 在settings.xml文件中加入如下代码
  ```xml
  <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                            https://maven.apache.org/xsd/settings-1.0.0.xsd">
  
        <!--若settings文件已存在，将该代码替换已有镜像-->
        <mirrors>
          <mirror>  
              <id>alimaven</id>  
              <name>aliyun maven</name>  
              <url>http://maven.aliyun.com/nexus/content/groups/public/</url>  
              <mirrorOf>central</mirrorOf>          
          </mirror>  
        </mirrors>
  </settings>
  ```

# 通过 Maven 添加依赖
* 在其中的 pom.xml中添加对应插件的`<dependency>`
* 具体`<dependency>`的对应代码[网站](https://mvnrepository.com/artifact/org.mybatis/mybatis)在这里进行查找
![](./../../../../img/Maven/Maven_简介1.png)
* 添加后的pom.xml如所示
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>

        <groupId>com.fifa</groupId>
        <artifactId>mb_demo</artifactId>
        <version>1.0-SNAPSHOT</version>
        <!--项目依赖打包格式-->
        <packaging>jar</packaging>

        <!--该标签下加入依赖-->
        <dependencies>
            <!--myBaits-->
            <dependency>
                <groupId>org.mybatis</groupId>
                <artifactId>mybatis</artifactId>
                <version>3.5.8</version>
            </dependency>

            <!--MySQL 驱动-->
            <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>8.0.29</version>
            </dependency>

            <!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api -->
            <dependency>
                <groupId>org.junit.jupiter</groupId>
                <artifactId>junit-jupiter-api</artifactId>
                <version>5.8.2</version>
                <scope>test</scope>
            </dependency>
        </dependencies>
        
        <properties>
            <maven.compiler.source>18</maven.compiler.source>
            <maven.compiler.target>18</maven.compiler.target>
        </properties>

    </project>
    ```
* 添加完毕后，右键 -> Maven -> Reload Project 重新加载
![](./../../../../img/Maven/Maven_简介2.png)

# 参考
* [如何在IDEA中配置阿里云maven镜像](https://blog.csdn.net/qq_45455225/article/details/122306028)
