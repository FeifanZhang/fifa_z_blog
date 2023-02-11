# ORA-12638
## 报错场景
* 开发环境下，连接Oracle数据库，会有该报错
## 报错原因
连接ORACLE时，认证方式为**操作系统认证**：若连接数据库的用户为操作系统admin权限，则无需输入账号密码，直接登录，但实际开发过程中，开发环境是本地，而数据库在另一台服务器，所以该验证无法奏效，此时应该使用**口令文件登录**：即直接输入账号密码登录
## 解决方法
1. 打开Net manager
2. 本地 -> 概要文件 -> Oracle高级安全性 -> 验证分页
3. 将所选方法中的`NTS`选中后，点击<kbd><</kbd>进行移除

# ORA-22992
## 报错场景
* 跨库获取数据，或执行`insert into`时报错

## 报错原因
跨库`查询`或`插入`的表，包含`BLOB`或`CLOB`字段

## 解决方法
查询这种表时，切记不得使用`select * `
若必须跨库查询`BLOB`或`CLOB`类型字段，通过建立临时表，将数据库数据导入临时表，对临时表进行查询，具体[移步至此文章](https://blog.csdn.net/weixin_39836876/article/details/112063848?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-112063848-blog-52728456.pc_relevant_multi_platform_whitelistv3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-112063848-blog-52728456.pc_relevant_multi_platform_whitelistv3&utm_relevant_index=1)


# 参考
[ORA-12638: 身份证明检索失败的解决方法](https://blog.csdn.net/jumtre/article/details/83271431)
[ORA-22992: 无法使用从远程表选择的 LOB 定位器](https://blog.csdn.net/zwj1030711290/article/details/70792704)

