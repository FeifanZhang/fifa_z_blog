# IOC简介
* Inversion of control 控制反转
* IOC负责管理`对象的调用和创建过程`，来降低对象之间的耦合度

# IOC基础技术
* XML解析：
  * 通过XML格式对bean进行配置，启动时会对其中的XML进行解析
  * eclipse中创建 bean.xml: 右键->new->spring bean configuration file->写好文件名创建完成
* 工厂模式：
  * 通过一个工厂类，将相互调用的两个类进行解耦
  * 普通方式直接调用会增加两个类的耦合度，当调用的类增多时，会变得非常混乱，所以引入一个中间类（即工厂类），使两个类的耦合度降低
* 反射：通过类的名称去寻找这个类并将其实例化

# IOC接口
* IOC的本质：一个工厂容器，通过解析xml文件和反射技术拿到对应的类并实例化
* Spring为IOC提供了两种实现方式：`BeanFactory` 和 `ApplicationContext`

## BeanFactory
* Spring内部使用的接口，不提供给开发者进行使用
* 特点：加载配置文件时**不会创建对象**，在获取、使用对象时才会创建对象

## ApplicationContext
* BeanFactory的子接口，功能更强大，面向开发人员使用
* 特点：加载配置文件时**直接创建对象**，即服务器启动时就会创建对象
* ApllicationContext实现类
  * ClassPathXmlApplicationContext：xml文件的相对路径
  * FileSystemXmlApplicationContext：绝对路径

## Bean管理定义
* Bean管理是指两个操作：Spring创建对象以及Spring注入属性
  * 对象创建：相当于java的new关键词，将类实例化
  * Spring注入属性：给类中的属性进行赋值