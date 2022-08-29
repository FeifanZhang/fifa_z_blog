# 将集合属性注入xml 
* 对注入array、list以及map进行解释
* Course.java
    ```java
    public class Course {
    private String cname;

    public void setCname(String cname) {
        this.cname = cname;
    }
        
    }
    ```

* Stu.java
  ```java
  public class Stu {

    private String[] courses;
    
    private List<String> list;
    
    private Map<String, String> maps;
    
    private Set<String> sets;

    private List<Course> courseList;
    
    public void setCourseList(List<Course> courseList) {
      this.courseList = courseList;
    }

    public void setSets(Set<String> sets) {
      this.sets = sets;
    }

    public void setList(List<String> list) {
      this.list = list;
    }

    public void setMaps(Map<String, String> maps) {
      this.maps = maps;
    }

    public void setCourses(String[] courses) {
      this.courses = courses;
    }
    
  }
  ```

* Bean.xml
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <bean id="course1" class="com.spring.helloWorld.Course">
      <property name="cname" value="MyBatis框架"></property>
    </bean>
    <bean id="stu" class="com.spring.helloWorld.Stu">
    
      <!-- 注入array -->
      <property name="courses">
        <array>
          <value>"java"</value>
          <value>"sql"</value>
        </array>
      </property>
      
      <!-- 注入List -->
      <property name="list">
        <list>
          <value>"老张"</value>
          <value>"老王"</value>
        </list>
      </property>
      
      <!-- 注入List，但list内元素为对象类型 -->
      <property name="courseList">
        <list>
          <ref bean="course1"></ref>
        </list>
      </property>

      <!-- 注入map -->
      <property name="maps">
        <map>
          <entry key="java" value="JAVA"></entry>
        </map>
      </property>
      
      <!-- 注入Set -->
      <property name="sets">
        <set>
          <value>"老张"</value>
          <value>"老王"</value>
        </set>
      </property>
    </bean>
  </beans>
  ```