* JSP语法的简化版
* 负责操纵域对象中的数据，无法操纵局部变量（局部变量即jsp文件`<% %>`代码块中的变量）
* 写法:`${域对象名称}`
* EL表达式寻找变量的优先级从小到大：pageContext -> request -> session -> application，若都没有则返回空字符串（传统jsp会返回null值）

# EL获取域对象数据
```js
// jsp设置域对象数据
<%
  pageContext.setAttribute("uname","zhangsan");
  request.setAttribute("uname","zhangsan");
  session.setAttribute("uname","zhangsan");
  application.setAttribute("uname","zhangsan");
%>

// el获取与对象数据
${pageContext.uname}
${request.uname}
${session.uname}
${application.uname}
```

# EL获取List、map以及javaBean
```js
<%
  // list
  List<String> list = new ArrayList<>;
  list.add("1");
  list.add("2");
  request.setAttribute("list", list);

  // map
  Map map = new HashMap();
  map.put("a","1");
  map.put("b","2");
  request.setAttribute("map", map);

  //javaBean
  User user = new User();
  user.setUname("zhangsan");
  user.setUpwd("zhangsan");
  request.setAttribute("user", user);
%>

<%--获取list--%>
${list[index]} <%--获取List指定下标数据 --%>
${list.size()} <%--获取集合长度--%>

<%--获取map--%>
${map["key"]} 或 ${map.key}

<%--获取JavaBean中的对象,属性字段切记提供get方法--%>
${user} <%--获取名称为user的对象--%>
${user.uname} <%--获取对象中的属性--%>
${user.getUname()} <%--通过对象中的get方法获取--%>
```










