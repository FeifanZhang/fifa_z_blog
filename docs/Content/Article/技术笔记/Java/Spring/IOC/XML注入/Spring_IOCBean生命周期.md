# 周期步骤
1. 构造器创建bean实例（xml里面的`bean`标签）
2. 为bean里面的属性设置数值 or 设置其他bean的引用（即`property`标签）调用set方法
3. 调用bean里面的初始化方法（在xml的`bean`标签下自行配置`init-method`）
4. 使用bean
5. 容器关闭时 bean销毁（在xml的`bean`标签下自行配置`destory-method`）

# 代码展示
* Order类
  ```java
  public class Orders {
      private String oname;

      public Orders(){
          System.out.println("第一步 执行无参数构造方法bean实例");
      }

      public void setOname(String oname){
          this.oname = oname;
          System.out.println("第二步 调用set设置属性值");
      }

      // 与xml的`bean`标签下的`init-method`绑定
      public void initMethod(){
          System.out.println("第三步 执行初始化方法");
      }

      // 与xml的`bean`标签下的`destory-method`绑定
      public void destoryMethod(){
          System.out.println("第五步 执行销毁方法");
      }
  }
  ```

* bean.XML
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
      <!--
        init-method会在初始化时调用绑定的方法
        destory-method会在初始化时调用绑定的方法
        -->
      <bean id="orders" class="com.company.bean.Orders" init-method="initMethod" destroy-method="destoryMethod">
          <property name="oname" value="手机"></property>
      </bean>
  </beans>
  ```

* 测试类
  ```java
  public class testDemo1 {
      @Test
      public void testBean(){

          ApplicationContext context = new ClassPathXmlApplicationContext("bean3.xml");
          Orders orders = context.getBean("orders", Orders.class);
          System.out.println("第四步 获取bean实例对象");

          // 手动销毁bean实例 系统自动调用destoryMethod
          ((ClassPathXmlApplicationContext) context).close();
      }
  }
  ```
* 最终输出的结果
  ```bash
  第一步 执行无参数构造方法bean实例
  第二步 调用set设置属性值
  第三步 执行初始化方法
  第四步 获取bean实例对象
  第五步 执行销毁方法
  ```

# 总结
1. 执行Orders中的无参构造
2. 调用Orders中的set方法设置数值
3. `bean.xml`根据**init-method** 调用绑定的Orders中的**initMethod**方法
4. 获取到创建的bean实例（即Orders的实例化对象）
5. Test文件中的`.close`方法进行对象销毁，销毁时`bean.xml`根据**destory-method** 调用绑定的Orders中的**destoryMethod**方法



