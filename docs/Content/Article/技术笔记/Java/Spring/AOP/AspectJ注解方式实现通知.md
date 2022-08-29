# 通知简介
* 通知（增强）：
  * 真正被增强的逻辑部分，称之为通知；希望add方法执行完后，加入**日志记录操作功能**，那么**日志记录的逻辑部分**称之为增强
  * 通知的类型：
    |通知语法|通知类型|介绍|
    |--|--|--|--|
    |`@Before`|前置通知|方法之前执行|
    |`@AfterReturning`|后置通知|方法之后执行，抛出异常则不会执行|
    |`@Around`|环绕通知|方法前后都执行|
    |`@AfterThrowing`|异常通知|方法出现异常时执行|
    |`@After`|最终通知|不论方法是否顺利执行完，还是发生异常，都会执行的通知，类似`try..catch..finally`中的`finally`|

# 基础使用
* 创建`User`类；通过`UserProxy`类前置增强`User`中的`add`方法
* User类创建
  ```java
  import org.springframework.stereotype.Component;

  @Component
  // 被增强的类
  public class User {
      public void add(){
          System.out.println("add ..");
      }
  }
  ```
* UserProxy,在其中对add方法进行前置增强
  ```java
    import org.aspectj.lang.ProceedingJoinPoint;
    import org.aspectj.lang.annotation.*;
    import org.springframework.stereotype.Component;

    @Component
    @Aspect // 生成代理对象
    // 增强类
    public class UserProxy {

        // 前置通知
        @Before(value="execution(* com.AspectJ.User.add(..))")  //  @Before 表示前置通知，value中填写切入点表达式
        public void before(){
            System.out.println("before ...");
        }

        // 后置通知 被增强方法执行完毕后立即执行
        @After(value="execution(* com.AspectJ.User.add(..))")  //  @After 表示后置通知，value中填写切入点表达式
        public void after(){
            System.out.println("after ...");
        }

        // 被增强的方法返回结果后执行
        @AfterReturning(value="execution(* com.AspectJ.User.add(..))")
        public void afterReturning(){
            System.out.println("afterReturning ...");
        }

        // 异常通知：抛出异常时才会执行
        @AfterThrowing(value="execution(* com.AspectJ.User.add(..))")
        public void afterThrowing(){
            System.out.println("afterThrowing ...");
        }

        // 环绕通知
        @Around(value="execution(* com.AspectJ.User.add(..))")
        public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable{
            // 被增强方法执行前执行的代码
            System.out.println("around before...");

            // 被增强的方法
            proceedingJoinPoint.proceed();

            //被增强方法执行后的代码
            System.out.println("around after...");
        }
    }
  ```
* 通过xml文件，添加以上两个类的注解扫描(`@Component`生效)，以及确定以上两个类之间的关系（`@Aspect`生效）
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xmlns:aop="http://www.springframework.org/schema/aop"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd
            http://www.springframework.org/schema/aop
            http://www.springframework.org/schema/aop/spring-aop.xsd">
        <!--开启注解扫描 将带有component注释的User UserProxy 进行加载-->
        <context:component-scan base-package="com.AspectJ">

        </context:component-scan>

        <!--开启Aspect生成对象，从前面context加载的类中找 Aspect 注解 将该对象生成代理对象-->
        <aop:aspectj-autoproxy>

        </aop:aspectj-autoproxy>

    </beans>
    ```

* 测试类走起！
    ```java
    import org.junit.Test;
    import org.springframework.context.ApplicationContext;
    import org.springframework.context.support.ClassPathXmlApplicationContext;

    public class testAspectJ {
        @Test
        public void testAOP(){
            ApplicationContext context = new ClassPathXmlApplicationContext("bean9.xml");
            User user = context.getBean("user", User.class);
            user.add();
        }
    }
    ```
* 输出
    ```bash
    around before...
    before ...
    add ..
    afterReturning ...
    after ...
    around after...
    ```

# 提取公共切入点
* 前一个例子中，若干个通知同时使用了一个切入点表达式`"execution(* com.AspectJ.User.add(..))"`，在开发时可以将其提取出来
* 仅需将Proxy中的切入表达式进行提取即可
    ```java
    import org.aspectj.lang.ProceedingJoinPoint;
    import org.aspectj.lang.annotation.*;
    import org.springframework.stereotype.Component;

    @Component
    @Aspect // 生成代理对象
    // 增强类
    public class UserProxy {

        //提取切入点
        @Pointcut(value = "execution(* com.AspectJ.User.add(..))")
        public void pointDemo(){

        }

        // value中填入提取的切入点名称 pointDemo
        @Before(value="pointDemo()")  
        public void before(){
            System.out.println("before ...");
        }

        @After(value="pointDemo()") 
        public void after(){
            System.out.println("after ...");
        }

        
        @AfterReturning(value="pointDemo()")
        public void afterReturning(){
            System.out.println("afterReturning ...");
        }

     
        @AfterThrowing(value="pointDemo()")
        public void afterThrowing(){
            System.out.println("afterThrowing ...");
        }

       
        @Around(value="pointDemo()")
        public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable{
           
            System.out.println("around before...");

            proceedingJoinPoint.proceed();

            System.out.println("around after...");
        }
    }
    ```

# 多个增强类增强同一个方法，设置增强类的优先级
* 通过`@order(整数类型)`，数字越小，优先级越高，0为最高，未添加Order的执行优先级最低
* 例子：`PersonProxy`与`UserProxy`同时添加了针对`User`的前置通知，规定`PersonProxy`优先级小于`UserProxy`
* `UserProxy`
    ```java
    import org.aspectj.lang.ProceedingJoinPoint;
    import org.aspectj.lang.annotation.*;
    import org.springframework.core.annotation.Order;
    import org.springframework.stereotype.Component;

    @Component
    @Aspect
    // 在此添加Order
    @Order(1)
    // 增强类
    public class UserProxy {

        //提取切入点
        @Pointcut(value = "execution(* com.AspectJ.User.add(..))")
        public void pointDemo(){

        }

        // 前置通知
        @Before(value="pointDemo()")  //  @Before 表示前置通知，value中填写切入点表达式
        public void before(){
            System.out.println("before ...");
        }
    }
    ```
* `PersonProxy`
    ```java
    import org.aspectj.lang.annotation.Aspect;
    import org.aspectj.lang.annotation.Before;
    import org.springframework.core.annotation.Order;
    import org.springframework.stereotype.Component;

    @Component
    @Aspect
    @Order(3)
    public class PersonProxy {
        @Before(value = "execution(* com.AspectJ.User.add(..))")
        public void before(){
            System.out.println("Person Before ...");
        }
    }
    ```
* 测试
    ```java
    import org.junit.Test;
    import org.springframework.context.ApplicationContext;
    import org.springframework.context.support.ClassPathXmlApplicationContext;

    public class testAspectJ {
        @Test
        public void testAOP(){
            ApplicationContext context = new ClassPathXmlApplicationContext("bean9.xml");
            User user = context.getBean("user", User.class);
            user.add();
        }
    }
    // 输出：
    // before ...
    // Person Before ...
    // add ..
    ```

