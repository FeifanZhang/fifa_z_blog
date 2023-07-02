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
# 基础操作
## 调整镜像
使用npm默认的链接配置进行包管理时，会因为些众所周知的原因导致网络不稳定，切换成淘宝镜像后可解决该问题
* 配置淘宝镜像
```shell
npm config set registry https://registry.npm.taobao.org
```
* 配置后验证是否成功
```shell
npm config get regisrty
```
* 输出淘宝镜像url则代表镜像切换成功
```shell
https://registry.npm.taobao.org
```

## 基础包管理
### 初始化项目
```shell
npm init
```
会生成`package.json`文件，文件基础结构如下所示
```json
scripts  // 配置供terminal运行的指令
dependencies  // 生产环境下的依赖以及其版本号
devDependencies // 开发环境下的依赖以及其版本号，比如babel、webpack以及测试用工具都会存放至该处
```

### 安装
* 全局安装
```shell
npm install -g pkg_name
```
包不会安装在`node_modules`目录中，不写入`package.json`, `npm install`时不会下载模块

* 生产环境安装
```shell
npm install pkg_name
npm install pkg_name --save
npm install pkg_name -D
```
`--save`：包不会安装在`node_modules`目录中，写入`package.json`的`dependencies`, `npm install`时会下载模块到项目目录

* 开发环境安装
```shell
npm install pkg_name --save-dev
npm i pkg_name -S
```
`--save-dev`：包不会安装在`node_modules`目录中，写入`package.json`的`devDependencies`, `npm install`时会下载模块到项目目录

* 安装指定版本
```shell
npm install pkg_name@1.6
npm install pkg_name@lastest
```

### 查看npm依赖包
```shell
npm list
``` 
### 查看npm安装目录（View）
```shell
npm root view -g // 查看全局安装目录
npm root view  // 查看当前项目的安装目录
```

### 卸载
```shell
npm remove pkg_name
npm remove pkg_name -g
```

### 更新
```shell
npm update pkg_name
```

# 遇到的问题(Win10 & Win11)：系统上禁止脚本运行
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