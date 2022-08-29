# django中使用原生sql语句
* 虽然Django的ORM实现了框架与数据库的解耦，但使用的灵活度以及查找效率对比原生sql语句仍有不足，所以Django也提供了使用原生数据库语句的查询接口。
* 用法：MyModel.objects.raw(sql语句,拼接参数)
* 返回值： RawQuerySet(仅支持基础操作，如循环遍历)
* 不推荐使用，因为可能会引起`sql注入攻击`
  ```python
  s1 = Book.objects.raw('select * from book where id=%s' %('1 or 1=1'))
  # 该结果可查询所有用户数据
  ```
* 为了避免攻击，使用Django推荐的拼接参数
  ```python
  s1 = Book.objects.raw('select * from book where id=%s', ['1 or 1=1'])
  # 前一个是自己拼接参数，这个是django帮你拼接，并解决sql注入问题
  ```
* 原理
  ```sql
  # 第一个拼接完是这个样子
  select * 
  from book
  where id = 1 or 1 = 1

  # 第二个是这个样子
  select * 
  from book
  where id = `1 or 1 = 1`  
  ```
  * 第二个将待拼接得参数变成了字符串，当sql发现id字段为int，但给出的筛选条件为字符串时，sql会拿字符串第一个字符作为数字去匹配，正好这里第一个字符为`1`，故where的筛选条件为`id=1`