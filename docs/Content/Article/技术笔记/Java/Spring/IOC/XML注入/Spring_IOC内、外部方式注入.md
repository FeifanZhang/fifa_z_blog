# 内部、外部方式注入bean
* 当 **属性类型为自定义对象** 时使用
* 内部和外部注入的主要区别在bean.xml的写法上

# 使用方法
* 使用场景：需创建一个UserService类，该类中含有一个类型为UserDao的属性
* 创建 `UserDao` 类
  ```java
  // code in UserDao.java
  public interface UserDao {
    public void update();
  }
  ```

* `UserDaoImpl` 实现 `UserDao`接口（该类用于xml中实例化UserDao类）
  ```java
  public class UserDaoImpl implements UserDao {

    @Override
    public void update() {
      // TODO Auto-generated method stub
      System.out.println("dao upd...");
    }

  }
  ```

* `UserService`类 (该类中的属性为UserDao)
    ```java
    public class UserService {
      
      // 创建user类型属性，生成set方法
      
      private UserDao userDao;

      // 必须写set方法，不然xml文件中会报错
      public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
      }
      
      public void add(){
        userDao.update();
      }

    }
    ```

* Bean2.xml中（实例化`UserService` 和 内部的`UserDao`属性）
  * 无论内部还是外部注入，xml创建dao类对象时，要实例化其实现类（`UserDaoImpl`）而不是接口本身
  * 外部注入
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
      <!--service dao对象进行创建 
        1. 首先xml中实例化 userDao类
        2. 在xml中实例化userService，并将实例化的userDao注入其中
      -->
      <!-- 首先创建userDao类对象时，不能实例化其接口，要实例化其实现类 -->
      <bean id="userDaoImpl" class="com.spring.helloWorld.dao.UserDaoImpl"></bean>
      
      <bean id="userService" class="com.spring.helloWorld.service.UserService">
        <!-- 属性为对象时，通过ref进行创建，
          name属性：类里面的属性名称
          ref：bean中实例化的id -->
        <property name="userDao" ref="userDaoImpl"></property>
      </bean>
    </beans>
    ```

  * 内部注入
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
      <!--service dao对象进行创建 
        1. 首先xml中实例化 userDao类
        2. 在xml中实例化userService，并将实例化的userDao注入其中
      -->
      <!-- 首先创建userDao类对象时，不能实例化其接口，要实例化其实现类 -->
      <bean id="userDaoImpl" class="com.spring.helloWorld.dao.UserDaoImpl"></bean>
      
      <bean id="userService" class="com.spring.helloWorld.service.UserService">
        <!-- 在对象内部直接初始化自定义的类，叫做内部注入 -->
        <property name="userDao">
          <bean id="userDao" class="com.spring.helloWorld.dao.UserDaoImpl">
            <!--可以嵌套Proprety标签对该对象内属性进行赋值-->
          </bean>
        </property>
      </bean>
    </beans>
    ```

* 外界调用`UserService`
  ```java
  public class Testing {

    public void test() {
      //加载spring文件
      ApplicationContext context = new ClassPathXmlApplicationContext("bean2.xml");
      
      // 获取配置创建的对象
      //getBean第一个string参数必须和xml中的id一致
      UserService userService = context.getBean("userService", UserService.class);
      userService.add();
      System.out.println(userService);
    }
  }
  ```

# 总结
1. 使用场景：实例化`UserService`类，该类中含有`UserDao`类型属性
2. 实现`UserDao`类这个接口（即`UserDaoImpl`实现）
3. 在xml文件中实例化`UserDaoImpl`以及`UserService`
4. 在其他地方加载xml文件，通过该xml文件对`UserService`进行实例化