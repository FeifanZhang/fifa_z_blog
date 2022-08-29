# 用户信息查询
```sql
# 查看所有用户
select * from dba_users;
select * from all_users;
select * from user_users;

# 用户权限查看
select * from dba_sys_privs; -- 不同grantee所包含的权限 
select * from user_sys_privs; -- 当前用户的系统权限
select * from user_tab_privs; -- 当前用户对数据库表的权限
```
# 用户信息更改

# 参考
* [如何查看oracle用户具有的权限和角色](https://www.cnblogs.com/qlqwjy/p/8404959.html)










