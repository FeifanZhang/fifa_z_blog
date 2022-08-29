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








