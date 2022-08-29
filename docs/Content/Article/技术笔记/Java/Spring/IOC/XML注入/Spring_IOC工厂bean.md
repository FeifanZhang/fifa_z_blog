# 工厂Bean & 普通Bean
* 普通Bean：配置文件中定义的Bean类型即是返回类型（前面说到的都是普通Bean）
* 工厂Bean：在配置文件中定义bean类型可以和返回类型不一样

# 基础实现
* 创建实现`FactoryBean`接口的工厂类
  ```java
  package com.company.factoryBean;
  import org.springframework.beans.factory.FactoryBean;
  public class MyBean implements FactoryBean<Course> {

      // 定义返回的bean对象 原始是object 需要改成所需的类型
      @Override
      public Course getObject() throws Exception {
          // TODO 在此实例化后返回
          return null;
      }

      @Override
      public Class<?> getObjectType() {
          return null;
      }

      @Override
      public boolean isSingleton() {
          return false;
      }
  }
  ```

* xml 文件
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
      <!--实例化工厂类-->
      <bean id="myBean" class="com.company.factoryBean.MyBean">
      </bean>
  </beans>
  ```

* 系统会根据`MyBean`这个`FactoryBean`类中重载的方法返回类型去实例化对应的类

# 设置Bean是单实例或多实例
* xml文件中，实例化的类添加scope属性，属性值分为`singleton`和`prototype`
  * singleton （默认值）
    * 单例模式
    * 加载xml配置文件时，直接创建单例对象
  * prototype
    * 多实例对象
    * 在调用`.getBean()`方法时创建多实例对象
* 举例说明
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
      <!--实例化工厂类-->
      <bean id="book" class="com.spring.helloWorld.Book" scope="singleton">
        <property name="list" ref="bookList"></property>
      </bean>
  </beans>
  ```