# MyBaits与其他持久化技术
* JDBC
  * SQL加载Java代码，导致耦合度较高
  * 维护不易且实际开发中SQL有变化
  * 代码冗长，开发效率低
* Hibernate & JPA
  * 程序中的复杂SQL框架无法实现
  * 内部自动生产的SQL不容易做优化
  * 全映射的自动框架，查询时是将整张表的全部字段进行查询，效率自然底下
  * 反射操作过多，导致数据库性能下降
* MyBaits
  * 轻量级，性能出色
  * SQL与JAVA编码分开：Java代码专注于逻辑，SQL专注于数据
  * 开发效率稍逊于`Hibernate`，但可以接受

# 下载安装
* [2013年MyBaits迁移至Github](https://github.com/mybatis/mybatis-3)，源码的Readme中`Download Latest`
* 配置maven文件，具体配置方法参照[Maven简介](../../包管理工具/Maven/Maven_简介.md)
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