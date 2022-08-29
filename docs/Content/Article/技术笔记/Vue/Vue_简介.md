# Vue安装
* [nodeJs](http://nodejs.cn/)下载并安装
* webpack安装
  ```
  npm install webpack
  ```

* 安装完后在项目文件夹下输入`vue -g @vue-cli --force`加载脚手架
* 初始化vue项目
  ```powershell
  C:\Users\FIFA_Zhang\Desktop\Blog> vue create app
  ```

* 关闭eslint校验功能
  * 在根目录下的`vue.config.js`文件中添加如下代码
    ```js
    const { defineConfig } = require('@vue/cli-service')
    module.exports = defineConfig({
        transpileDependencies: true,
        
        // 关闭eslint校验的代码
        lintOnSave: false
    })
    ``` 
* 开启服务器
  ```powerShell
  PS C:\Users\FIFA_Zhang\Desktop\Blog\app> npm run serve 
  ```

# 遇到的问题
* vue: 无法加载文件因为在此系统上`禁止运行脚本`
  * 在powerShell中以管理员运行，输入如下命令
    ```powerShell
    PS C:\WINDOWS\system32> get-ExecutionPolicy
    Restricted
    PS C:\WINDOWS\system32> set-ExecutionPolicy RemoteSigne

    执行策略更改
    执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如
    https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies
    帮助主题所述。是否要更改执行策略?
    [Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): A
    PS C:\WINDOWS\system32> get-ExecutionPolicy -List
            Scope ExecutionPolicy
            ----- ---------------
    MachinePolicy       Undefined
    UserPolicy       Undefined
        Process       Undefined
    CurrentUser       Undefined
    LocalMachine    RemoteSigned

    PS C:\WINDOWS\system32>
    ```