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
|HEAD|文件|该文件指向当前工作分支的最新提交|
|ORIG_HEAD|文件|`git merge`、`git pull`之前 `HEAD`指向的版本（40位的`commit_id`），用于回滚操作|
|FETCH_HEAD|文件|`git fetch`执行后，生成的文件，当前本地分支连接的远程分支最新commit的SHA1值|
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

## objects保存数据逻辑
* 分支或是修改文件，objects仅保存的增量或修改信息，不会重复保存相同信息
* 因为是根据**文件内容**做的校验，所以当**两个文件的名称不同**，但**文件内容相同**时，objects目录下**仅会有一条SHA-1记录保存**

## objects下的文件类型&内容
* commit，tree（workspace的文件夹信息），blob（workspace的文件内容信息）
* blob对象：存储添加 or 修改的文件内容信息
* tree对象：存储blob对象对应的文件名 & hash值
* commit对象：`git commit`所提交的tree对象对应的hash值 & 作者 + 提交者信息
* tag对象：用于存放tag相关信息，`git tag`命令会对其造成改变
* `git add`、`git rm` 时 blob类型文件会发生改变
* `git commit` 时，会让 tree类型和commit类型文件发生改变, 但blob结对不会改变
* 执行改变缓存区文件的命令时（`git add` 或 `git rm`等）时会导致`objects`目录下的文件发生改变

## 查看文件类型
* 通过`git cat-file -t hashcode`进行查看对象类型，**注意：hashcode 参数务必文件夹名称（SHA-1前两位）+ 文件名（SHA-1后38位）**
    ```cmd
    PS D:\git_learning\source_code\.git\objects\00> git cat-file -t 001070b677ab3a705a8e6dd16f89578bbd47c4d8
    blob
    ```

## 查看文件内容
* 通过`git cat-file -p hashcode`进行查看对象内容，**注意事项同上**

### BLOB类型
* 若对象为blob类型，则显示文件内容
```cmd
PS D:\git_learning\source_code\.git\objects\00> git cat-file -p 001070b677ab3a705a8e6dd16f89578bbd47c4d8
hello world
```

### COMMIT类型
* 对象为commit类型，包含**tree对象 & 对应hash值**、本次commit的 **username** 、**邮箱**、**时间戳**、**时区**、**commit message**
```cmd
git cat-file -p dObde7c
tree 29d3f358addb2b6e16ebfb981716fa75cc562ee7          # tree 对象 & 对应hash值（hash值后38位即tree文件文件名，前两位为文件夹名称）
author FIFA <feifan_z@qmail.com> 1590009304 +0200      # 作者信息（名字 + 邮箱 + 时间戳 + 时区）
committer FIFA <feifan_z@gmail.com> 1590009304 +0200   # commit信息（名字 + 邮箱 + 时间戳 + 时区）
1st commit message
```

### TREE类型
* 对象为tree类型，包含文件权限、文件类型、hash值、文件名（`git ls-files -s` 出来的信息）
```cmd
git cat-file -p 29d3f3
100644 blob ca5a43e53e012b6fd3b2a8a06ebb6c2ee24a24e5   file1.txt
```

### TAG类型

```cmd
git cat-file -p c267
object b8a8bc8c63394642e490b113e6541330e892dec8           # 指向的commit的SHA1值
type commit                                               # 指向对象的类型：commit
tag v1.0.0                                                # tag名称
tagger Peng Xiao <xiaoquwl@gmail.com> 1594161583 +0200    # tag创建人、邮箱、时间戳、时区
version v1.0.1                                            # tag信息
```

## 查看文件大小
* 通过`git cat-file -s hashcode`进行查看对象类型，**注意事项同上**，显示文件大小
```cmd
PS D:\git_learning\source_code\.git\objects\00> git cat-file -s 001070b677ab3a705a8e6dd16f89578bbd47c4d8
181
```

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

## heads
  * 保存的是本地分支，文件名是本地分支名称（文件与本地分支一一对应），文件内容是该分支最新的`commit`的hash值
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
  * 若两个分支同步，则所指向的hash值相等（都指向同一个commit）
    ```cmd
    PS D:\git_learning\source_code\.git\refs\heads> cat .\master
    50e9c6531cf84d2cafff162c90f47da9f5008a9b
    PS D:\git_learning\source_code\.git\refs\heads> cat .\dev_feifan_zhang
    50e9c6531cf84d2cafff162c90f47da9f5008a9b  # master & dev_feifan_zhang 两个分支同步，故保存的commit文件的hash值相等
    ```

## remotes 
* 文件夹为远程主机信息，文件夹内为该主机对应的远程分支
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

## tags 
* tags目录保存的是本地仓库的tag和head信息。每个文件名为tag_name，文件内容是该tag指向的commit的 SHA1 值
* `git tag`命令添加tag，该目录下会生成对应文件
* `git tag -d`删除tag 本质就是删除该目录下的同名文件

# HEAD
* 文件类型，用于存储当前**开发所在的分支**
  ```cmd
  PS D:\git_learning\source_code\.git> cat head
  ref: refs/heads/master
  ```
* 指向当前分支的最新commit
* `git checkout` 时，该文件内容会被改写
  ```cmd
  PS D:\git_learning\source_code\.git> cat head
  ref: refs/heads/master
  PS D:\git_learning\source_code\.git> git checkout dev
  ref: refs/heads/dev
  ```

# ORIG_HEAD
* 文件类型，记录`git merge` 之前的commit id
* 只有`git merge`后 才会生成该文件
* 文件存在意义：`git reset`进行回滚时，会根据该文件所记录的commit id 进行回滚

# FETCH_HEAD
* 第一行，表示当前本地分支连接的远程仓库最新commit SHA1值
* 剩下若干行为其他分支
```cmd
cat .git/FETCH_HEAD
ce8735168b320bd7afca62cd19ebe1dcc2cc4ba6    branch 'master' of https://github.com/git2022/git-demo 
d0c6c15dd11263bf41334ae2b6cee3b962fc7f9c    not-for-merge branch 'dev' of https://github.com/git2022/git-demo
```

# index
* 通过`git ls-files` 查看暂存区的全部文件名称 & 其路径
* 通过 `git ls-files -s` 查看暂存区文件的文件权限、哈希值以及文件名（查询的是`objects`路径下的tree类型文件）
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

# config
* 获取本地配置信息（当前分支、连接的远程仓库等）
```cmd
cat .git/config
[core]
        repositoryformatversion = 0
        filemode = false
        bare = false
        logallrefupdates = true
        symlinks = false
        ignorecase = true
[remote "origin"]
        url = https://github.com/FeifanZhang/fifa_z_blog.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
```

* `[remote "origin"]`: 该内容在连接远程仓库（`git remote add origin 远程仓库url`）后才有
* 

# 参考
* [Git目录结构和作用详解](https://www.itzhimei.com/archives/3613.html)
* [.git 目录的内部结构](https://cloud.tencent.com/developer/article/2215345?areaSource=102001.18&traceId=6SC4YVecRcwJ_SOvz2jpU)