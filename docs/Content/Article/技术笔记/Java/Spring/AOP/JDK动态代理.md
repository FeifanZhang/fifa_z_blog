* Loader类加载器
* 增强方法所在的类实现的接口，支持多个接口
* 实现接口 InvocationHandler 创建代理对象，写增强的方法

* 例子：UserDao接口，UserDaoImpl实现，希望拓展UserDaoImpl中的add方法
* UserDao
    ```java
    public interface UserDao {
        public int add(int a, int b);

        public String update(String id);
    }
    ```
* UserDaoImpl
    ```java
    public class UserDaoImpl implements UserDao{
        @Override
        public int add(int a, int b) {
            return a+b;
        }

        @Override
        public String update(String id) {
            return id;
        }
    }
    ```
* JDKProxy 实现add方法的扩展
    ```java
    import java.lang.reflect.Array;
    import java.lang.reflect.InvocationHandler;
    import java.lang.reflect.Method;
    import java.lang.reflect.Proxy;
    import java.util.Arrays;

    public class JDKProxy {
        public static void main(String[] args){

            // newProxyInstance的第二个参数
            Class[] interfaces = {UserDao.class};

            // newProxyInstance 第三个参数对象实例化所需参数
            UserDaoImpl userDaoImpl = new UserDaoImpl();

            // 创建接口实现类的代理对象 返回值为接口
            // 第一个参数为当前类的类加载器
            // 第二个参数为add方法所在的接口类（UserDao）， 支持多个接口
            // 第三个是接口实现类的代理对象，实例化该对象时，将userDaoImpl传入
            UserDao dao = (UserDao) Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new UserDaoProxy(userDaoImpl));
            int res = dao.add(1, 3); // dao调用add方法时，会直接触发UserDaoProxy的invoke方法
            System.out.println(res);
        }
    }

    // 创建接口实现类代理对象
    class UserDaoProxy implements InvocationHandler{
        // 将被增强的方法传入，有参构造传入
        private Object obj;
        public UserDaoProxy(Object obj){  // 此处传入的是 userDaoImpl
            this.obj = obj;
        }

        // 增强逻辑
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            // 被增强方法之前执行
            System.out.println("被增强的方法之前执行"+":传递的参数... ");

            // method 传入的是被增强的方法 即add方法
            System.out.println("被增强的方法"+method.getName());
            // args传入的是执行被增强方法的参数 [1, 3]
            System.out.println("被增强方法传入的参数"+Arrays.toString(args));

            // 执行被增强方法 dao.add(1,3)
            Object res = method.invoke(obj, args);

            // 被增强方法之后执行
            System.out.println("被增强方法之后执行... ");
            return res;
        }
    }
    ```