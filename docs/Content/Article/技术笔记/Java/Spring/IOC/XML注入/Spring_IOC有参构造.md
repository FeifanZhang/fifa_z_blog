# 有参构造方法
* 案例：通过Bean创建Book类并进行使用（Book类中属性仅为常规变量如string int等）
* Book.java中代码
  ```java
  public class Book {
    private String bname;
    private String bauthor;
    private String address;

    public void setBname(String bname) {
      this.bname = bname;
    }

    public void setBauthor(String bauthor) {
      this.bauthor = bauthor;
    }

    public void setAddress(String bauthor) {
      this.bauthor = address;
    }
    
  }
  ```
* Bean.xml
  ```xml
  <bean id="book" class="com.spring.helloWorld.Book">
      <!-- xml注入属性 bean中使用 property标签进行属性注入
      name:类里面的属性
      value：向属性注入的值
        -->
      <property name="bname" value="三国"></property>
      <property name="bauthor" value="我"></property>
      <!--设置null-->
      <property name="address">
        <null/>
      </property>
      <!--value带有特殊符号，使用CDATA防止转义-->
      <property name="bname" value="三国">
        <value>
          <![CDATA[<<南京>>]]>
        </value>
      </property>
  </bean>

  <bean id="book" class="com.spring.helloWorld.Book">
    <!-- 有参构造方法注入属性 bean中使用 constructor-arg标签进行属性注入
    name:类里面的属性
    value：向属性注入的值
      -->
    <constructor-arg name="bname" value="三国"></constructor-arg>
    <constructor-arg name="bauthor" value="我"></constructor-arg>
  </bean>
  ```

* 调用Book类并进行使用
  ```java
  public class Testing {

    public void test() {
      //加载spring文件
      // ClassPathXmlApplicationContext 所需的xml文件路径是从src文件夹开始
      ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
      
      // 获取配置创建的对象
      //getBean第一个string参数必须和xml中的id一致
      Book book = context.getBean("book", Book.class);
      System.out.println(book);
      book.testDemo();
    }
  }
  ```