# npm 安装
* [node.js 安装地址](https://nodejs.org/en/)
* 目前版本的node.js本身自带npm
* 安装完成之后，输入`node -v`与 `npm -v`进行检查
```shell
PS C:\windows\system32> node -v
v16.17.0
PS C:\windows\system32> npm -v
8.15.0
PS C:\windows\system32>
```

# 遇到的问题：系统上禁止脚本运行
* 当执行npm下载的包的命令时，发生如下报错
```shell
PS C:\Users\25384\FIFA_Z_Blog\docs> docsify serve docs
docsify : 无法加载文件 C:\Users\25384\AppData\Roaming\npm\docsify.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=
135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ docsify serve docs
+ ~~~~~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```
- 解决方法
  * 管理员权限打开`powerShell`，输入 `set-ExecutionPolicy RemoteSigned`
    ```shell
    PS C:\windows\system32> set-ExecutionPolicy RemoteSigned
    >>
    ```

  * 会弹出如下提醒，选择Y即可
    ```shell
    执行策略更改
    执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
    中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
    [Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): Y
    ```
  * 输入`get-ExecutionPolicy`，若返回`RemoteSigned`则证明成功
    ```shell
    PS C:\windows\system32> get-ExecutionPolicy
    RemoteSigned
    PS C:\windows\system32>
    ```

# 参考
* [系统脚本禁止运行](https://www.cnblogs.com/richerdyoung/p/12882901.html?ivk_sa=1024320u) 