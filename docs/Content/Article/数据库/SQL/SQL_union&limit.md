# union
* 查询职位为`manager` & `salesman`的员工
  * 常规做法：`select * from emp where job in ('manager', 'salesman');`
  * union关键词
    ```sql
    select * from emp where job = 'manager' 
    union
    select * from emp where job = 'salesman'; 
    ```
* 使用`union`时,两个`select`选择的列一定要一样

## union优势
* union在表连接中的查询效率高，因为对于表连接，每连接一次新表，匹配次数满足笛卡尔积，union可以减少匹配次数时，完成两个结果集拼接

# union all
* 与`union`类似，不同点是union在获取并集后，会进行去重（`distinct()`）,而`union all`则会保留全部结果

# limit
* 取出查询结果的一部分，通常在分页查询中使用
* `mysql`中，`limit`在`order by`之后执行
* 用法
  * `limit n`: 取前n条数据
  * `limit start_index, length`
    * `start_index`起始下标（默认0开始）
    * `length`长度

## 例题
* 将员工按薪资排序，显示前5名
  ```sql
  select * 
  from emp
  order by sal desc
  limit 5;
  ```
* 将员工按薪资排序，显示[3, 5]名
  ```sql
  select *
  from emp
  order by sal
  limit 2, 3;
  ```

## 分页
* 通过输入页码`page_num`和每页显示的信息条数`page_size`来得出`limit`的参数
* `page_num`和`page_size`是从前端传来
* 通用公式：`limit (page_num-1) * page_size, page_size`

## limit与 offset一起使用
* `offset n`表示从头除去前n条数据: `offset 1`表示除去前一条数据；`offset 2`表示除去前二条数据
* 经常与`limit`一起使用：`limit 1 offset 2`意为获取第三个数据，因为`offset 2`会移除前两条数据，`limit 1`则获取`offset`移除后的第一条数据（即移除前的第三条数据）








