# git init
* 文件夹下使用 `git init` 之后，在目录下会生成`.git`文件夹，文件夹内部文件如下
```cmd
D:\git_learning\.git>dir
2023/08/06  15:03    <DIR>          ..
2023/08/06  15:03               130 config
2023/08/06  15:03                73 description
2023/08/06  15:03                23 HEAD
2023/08/06  15:03            451499 index
2023/08/06  15:03    <DIR>          hooks
2023/08/06  15:03    <DIR>          info
2023/08/06  15:03    <DIR>          objects
2023/08/06  15:03    <DIR>          refs
```
|名称|目录or文件|说明|
|--|--|--|
|hooks|目录|脚本目录，在git操作时被调用，如提交代码时运行的`pre-commit`钩子|
|refs|目录|包含了git引用信息，如分支、标签等，用于跟踪代码提交的历史记录|
|objects|目录|git提交代码的实际数据|
|config|文件|git本地配置信息（用户信息、远程仓库等）|
|heads|文件|该文件指向当前工作分支的最新提交|
|index|文件|存储缓存区的文件|

# hooks
* hooks文件夹内，是针对各种git操作的钩子函数示例：`pre-commit.sample` 是 执行`commit`前会触发的钩子函数
```cmd
PS D:\git_learning\source_code\.git\hooks> ls
    Mode                 LastWriteTime         Length Name
    ----                 -------------         ------ ----
    -a----         2023/7/30     10:53            478 applypatch-msg.sample
    -a----         2023/7/30     10:53            896 commit-msg.sample
    -a----         2023/7/30     10:53           4726 fsmonitor-watchman.sample
    -a----         2023/7/30     10:53            189 post-update.sample
    -a----         2023/7/30     10:53            424 pre-applypatch.sample
    -a----         2023/7/30     10:53           1643 pre-commit.sample
    -a----         2023/7/30     10:53            416 pre-merge-commit.sample
    -a----         2023/7/30     10:53           1374 pre-push.sample
    -a----         2023/7/30     10:53           4898 pre-rebase.sample
    -a----         2023/7/30     10:53            544 pre-receive.sample
    -a----         2023/7/30     10:53           1492 prepare-commit-msg.sample
    -a----         2023/7/30     10:53           2783 push-to-checkout.sample
    -a----         2023/7/30     10:53           3650 update.sample
```

# objects
## objects 路径下文件&文件夹名称取值规则
* 首先git管理的工作区（workspace）文件内容的**SHA-1** hash校验值，总长度40位
* **取前两位作为文件夹名称**，前2位作为文件夹是为了快速索引
  ```cmd
  PS D:\git_learning\source_code\.git\objects> ls
      Mode                 LastWriteTime         Length Name
      ----                 -------------         ------ ----
      d-----          2023/8/3     23:56                00
      d-----          2023/8/3     23:57                01
      d-----          2023/8/3     23:57                02
      d-----          2023/8/3     23:57                05
      d-----          2023/8/3     23:57                06
      d-----          2023/8/3     23:56                07
      d-----          2023/8/3     23:57                08
      d-----          2023/8/3     23:57                09
      d-----          2023/8/3     23:57                0a
      d-----          2023/8/3     23:57                0b
  ```
* **后38位作为文件名**
  ```cmd
  PS D:\git_learning\source_code\.git\objects> cd 00
  PS D:\git_learning\source_code\.git\objects\00> ls
      Mode                 LastWriteTime         Length Name
      ----                 -------------         ------ ----
      -ar---          2023/8/3     23:56            132 1070b677ab3a705a8e6dd16f89578bbd47c4d8
      -ar---          2023/8/3     23:56            283 22bc51aa60d3ae0d2e166a53e77ca1af50c816
      -ar---          2023/8/3     23:56           2166 6c739716fce05ce8976564cfb8ff854ae3a020
      -ar---          2023/8/3     23:56           1385 90df1b62799b727a5335f7209a442015d8a42b
      -ar---          2023/8/2     14:48             45 9829e28eb93e21910f84964e9a28279ee82441
  ```

## objects保存数据逻辑：
* 分支或是修改文件，objects仅保存的增量或修改信息，不会重复保存相同信息
* 因为是根据**文件内容**做的校验，所以当**两个文件的名称不同**，但**文件内容相同**时，objects目录下**仅会有一条SHA-1记录保存**

## objects下的文件类型&内容
* commit，tree（workspace的文件夹信息），blob（workspace的文件内容信息）
## 查看文件类型
* 通过`git cat-file -t hashcode`进行查看对象类型，**注意：hashcode 参数务必文件夹名称（SHA-1前两位）+ 文件名（SHA-1后38位）**
    ```cmd
    PS D:\git_learning\source_code\.git\objects\00> git cat-file -t 001070b677ab3a705a8e6dd16f89578bbd47c4d8
    blob
    ```
* 查看文件内容：通过`git cat-file -p hashcode`进行查看对象内容，**注意事项同上**，若对象为blob类型，则显示文件内容
    ```cmd
    PS D:\git_learning\source_code\.git\objects\00> git cat-file -p 001070b677ab3a705a8e6dd16f89578bbd47c4d8
    hello world
    ```
* 查看文件大小：通过`git cat-file -s hashcode`进行查看对象类型，**注意事项同上**，显示文件大小
  ```cmd
  PS D:\git_learning\source_code\.git\objects\00> git cat-file -s 001070b677ab3a705a8e6dd16f89578bbd47c4d8
  181
  ```
* 执行改变缓存区文件的命令时（`git add` 或 `git rm`）时会导致`objects`目录下的文件发生改变

# refs
* 存储git各种引用的目录，包括分支（heads）、远程分支（remotes）和标签（tags）
  ```cmd
    PS D:\git_learning\source_code\.git\refs> ls
        Mode                 LastWriteTime         Length Name
        ----                 -------------         ------ ----
        d-----          2023/8/3     23:57                heads
        d-----         2023/7/30     10:54                remotes
        d-----         2023/7/30     10:53                tags
  ```

* `heads`：保存的是本地分支，文件名是本地分支名称（文件与本地分支一一对应），文件内容是commit id
  ```cmd
  PS D:\git_learning\source_code\.git\refs\heads> ls
    Mode                 LastWriteTime         Length Name
    ----                 -------------         ------ ----
    -a----          2023/8/2     15:23             41 dev_others
    -a----          2023/8/3     14:19             41 dev_feifan_zhang
    -a----          2023/8/3     23:57             41 master
  PS D:\git_learning\source_code\.git\refs\heads> cat .\master
  50e9c6531cf84d2cafff162c90f47da9f5008a9b
  ```
* `remotes`: 文件夹为远程主机信息，文件夹内为该主机对应的远程分支
  ```cmd
  PS D:\git_learning\source_code\.git\refs\remotes> ls
    Mode                 LastWriteTime         Length Name
    ----                 -------------         ------ ----
    d-----          2023/8/3     15:41                origin  # 远程机名称为origin
  PS D:\git_learning\source_code\.git\refs\remotes\origin> ls  # origin路径下的全部远程分支名称
    Mode                 LastWriteTime         Length Name
    ----                 -------------         ------ ----
    -a----          2023/8/3     14:20             41 dev_feifan_zhang
    -a----          2023/8/3     14:50             41 dev_fifa_zhang
    -a----         2023/7/30     10:54             32 HEAD
    -a----          2023/8/3     15:41             41 master
  ```
* `tags`: tags目录保存的是本地仓库的tag和head信息。一个tag对应一个和tag同名的文件，文件内容是该tag对应commit id

# HEAD
* 一个文件，用于存储当前的开发所使用的分支，`git checkout` 时，该文件内容会被改写
  ```cmd
  PS D:\git_learning\source_code\.git> cat head
  ref: refs/heads/master
  ```

# index
* 通过`git ls-files` 查看暂存区的全部文件名称 & 其路径
* 通过 `git ls-files -s` 查看暂存区文件的文件权限、哈希值以及文件名
  ```cmd
  PS D:\git_learning\source_code\.git> git ls-files -s
  100644 db4a1490254687655f863447c84e46404d4de99c 0       .gitignore
  100644 aa3b0fffde165e735a3adcd7064887fb4be919cd 0       proj.a/pom.xml
  100644 3226c0076882881755fcb78baebf13a94df56d3f 0       proj.a/newFile1.java
  100644 1d53a08d2d308d2fa586463ab600116ac3cc9b7c 0       proj.a/newFile2.java
  ```
* index只有在执行过`git add`后才会出现
* `git add`的本质：index中写入add的文件名以及路径，并在`objects`中添加文件内容的hash值
* `git status`的本质：
  * `untracked file`：index中没有的文件
  * `modified`： **index中文件的hash值**与**工作区的对应文件的hash值**不相等

# 参考
* [Git目录结构和作用详解](https://www.itzhimei.com/archives/3613.html)
* [.git 目录的内部结构](https://cloud.tencent.com/developer/article/2215345?areaSource=102001.18&traceId=6SC4YVecRcwJ_SOvz2jpU)