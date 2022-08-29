# 包含概述
* 某个页面作为header或footer会被各种页面引用，引用的页面通过include进行引用
* 静态包含
  * 引用和被引用的文件之间代码段的变量名不能相同
  * 在编译时，直接将被引用代码拼接至一个页面
* 动态包含
  * 引用和被引用的文件之间代码段的变量名可以相同
  * 编译时不会拼接到一起，运行时会进行拼接
  * 可传参
  * 动态包含若不需要传参，`<jsp:include>`与`</jsp:include>`双标签之间不要有任何内容

# 包含案例
* 有一个主体页面(`index.jsp`),在头部引入`header.jsp`，在尾部引入`footer.jsp`
* header.jsp
```html
<body>
  <h2>header</h2>
</body>
```
* index.jsp
  ```html
  <body>
    <!-- 静态包含 -->
    <%@include file="header.jsp" %>
    <h2>主体内容</h2>
    <!-- 无参数动态包含 -->
    <jsp:include page="header.jsp"></jsp:include>
    
    <% String str = "a"; %>
    <!-- 有参数动态包含 -->
    <jsp:include page="footer.jsp">
      <!--  name为参数名称，value为参数值，可传递代码段变量 -->
      <jsp:param value="<%=str %>" name="str"/>
    </jsp:include>
  </body>
  ```
* footer.jsp
  ```html
  <h2>footer</h2>
    <%
      // 获取动态包含的传参
      String uname = request.getParameter("str");
    %>
  </body>
  ```












