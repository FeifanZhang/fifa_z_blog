四大域对象是JSP提供的四种属性的保存范围，保存范围是指设置的对象在多少个页面范围内可以继续使用

|范围名称|当前页面|服务端跳转（\<jsp:forward\>）|客户端跳转(\<a\>)|session有效（如重 开浏览器）|重启服务器|
|--|--|--|--|--|--|
|page范围|有效|无效|无效|无效|无效|
|request范围|有效|无效|无效|无效|无效|
|session范围|有效|有效|有效|无效|无效|
|application范围|有效|有效|有效|有效|无效|

# 案例
* `sender.jsp`设置域对象，`receiver.jsp`获取
* sender.jsp
  ```js
  <body>
    <%
      // page范围
      pageContext.setAttribute("name1", "zhangsan");

      //request范围
      request.setAttribute("name2", "lisi");
      
      // session范围
      session.setAttribute("name3", "wangwu");
      
      // application范围
      application.setAttribute("name4", "zhaoliu");
    %>

  </body>
  ```
* receiver.jsp
  ```js
  <body>
    <%
      //获取域对象中的值
      // page范围
      pageContext.getAttribute("name1");

      //request范围
      request.getAttribute("name2");
      
      // session范围
      session.getAttribute("name3");
      
      // application范围
      application.getAttribute("name4");
    %>
  </body>
  ```












