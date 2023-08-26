# git log 简介
* 显示log后，此时光标会停在最后的`:`后面，`空格键`向后翻页查找更早期记录，`上下键`进行翻页，`b键`往回翻一页查看近期记录，`q键`退出。 

|命令|说明|
|--|--|
|git log|commit信息、date、commit 信息等，各种命令中是最全的|
|git log --pretty=oneline |一个commit一行显示|
|git log --pretty=short|相比`oneline` 多出`Author`信息|
|git log --pretty=full|相比较`short` 多出`Commit`人信息|
|git log --pretty=fuller|相比较`fuller` 多出了`CommitDate`信息|

# git log & 输出介绍

```cmd
git log
commit ece313ca086e2f91160ba460603e995912d1dd69 (HEAD -> master)  # commit 对应的id
Author: FeifanZhang <zhangff970329@163.com>                       
Date:   Mon Aug 7 20:53:29 2023 +0800
    添加了git系列文章、oracle系列文章（未完成）、nodejs系列文章（未完成）
commit bf44ecba617a0a50a067f85a8b449c1e37a8409d (origin/master, origin/HEAD)
Author: FeifanZhang <zhangff970329@163.com>
Date:   Sun Jul 2 15:59:28 2023 +0800
```

* `commit ece313ca086e2f91160ba460603e995912d1dd69`
* `(HEAD -> master)`：本地仓库所指向的commit
* `(origin/master, origin/HEAD)`：远程仓库（origin）的master和HEAD所指向的commit
* 由此可看出，本地库(本地master)的版本提前于远程（origin/master）,通过`git push`上传代码后，对齐两者版本

# git log --pretty
* 输出简要的log日志
## git log --pretty=oneline
* 显示内容：每一次的commit信息，且在一行重显示
  * commit_id
  * 显示远程库所指向的commit（`(origin/master, origin/HEAD)`）或 本地库指向的commit（`(HEAD -> master)`）
  * commit message
```cmd
git log --pretty=oneline
e5889deb2b264363d0c6e1bfa78aca8e3b5dc610 (HEAD -> master) 添加git系列文章
ece313ca086e2f91160ba460603e995912d1dd69 添加了git系列文章、oracle系列文章（未完成）、nodejs系列文章（未完成）
bf44ecba617a0a50a067f85a8b449c1e37a8409d (origin/master, origin/HEAD) 添加了oracle，c# 相关文章
c6e224f75c1be4972517039c278376116196ead3 oracle 2 articles;csharp 3 articles
```
* 可以看出，**远程库** 与**本地库** 有版本差异，`git push`即可对齐

## git log --pretty=short
* 简短显示每次commit的信息（commit id、作者以及commit message）
```cmd
PS C:\Users\25384\FIFA_Z_Blog> git log --pretty=short
commit e5889deb2b264363d0c6e1bfa78aca8e3b5dc610 (HEAD -> master)
Author: FeifanZhang <zhangff970329@163.com>
    添加git系列文章
commit ece313ca086e2f91160ba460603e995912d1dd69
Author: FeifanZhang <zhangff970329@163.com>
    添加了git系列文章、oracle系列文章（未完成）、nodejs系列文章（未完成）
```

## git log --pretty=full
```cmd
PS C:\Users\25384\FIFA_Z_Blog> git log --pretty=full 
commit e5889deb2b264363d0c6e1bfa78aca8e3b5dc610 (HEAD -> master)
Author: FeifanZhang <zhangff970329@163.com>
Commit: FeifanZhang <zhangff970329@163.com>
    添加git系列文章
commit ece313ca086e2f91160ba460603e995912d1dd69
Author: FeifanZhang <zhangff970329@163.com>
Commit: FeifanZhang <zhangff970329@163.com>
    添加了git系列文章、oracle系列文章（未完成）、nodejs系列文章（未完成）
```

## git log --pretty=fuller
```cmd
git log --pretty=fuller
commit e5889deb2b264363d0c6e1bfa78aca8e3b5dc610 (HEAD -> master)
Author:     FeifanZhang <zhangff970329@163.com>
AuthorDate: Fri Aug 11 09:08:08 2023 +0800
Commit:     FeifanZhang <zhangff970329@163.com>
CommitDate: Fri Aug 11 09:08:08 2023 +0800

    添加git系列文章

commit ece313ca086e2f91160ba460603e995912d1dd69
Author:     FeifanZhang <zhangff970329@163.com>
AuthorDate: Mon Aug 7 20:53:29 2023 +0800
Commit:     FeifanZhang <zhangff970329@163.com>
CommitDate: Mon Aug 7 20:53:29 2023 +0800
```
# git log -p
* 展开每次提交的内容差异，输出结果介绍参考`git diff`命令介绍

## git log -p 示例
```cmd
PS C:\Users\25384\FIFA_Z_Blog> git log -p
commit e5889deb2b264363d0c6e1bfa78aca8e3b5dc610 (HEAD -> master)
Author: FeifanZhang <zhangff970329@163.com>
Date:   Fri Aug 11 09:08:08 2023 +0800
    添加git系列文章
diff --git a/docs/Content/Article/_sidebar.md b/docs/Content/Article/_sidebar.md
index d5cdb24..8580550 100644
--- a/docs/Content/Article/_sidebar.md
+++ b/docs/Content/Article/_sidebar.md
@@ -208,6 +208,7 @@
                * [代码规范_命名规则](./Content/Article/计算机基础/代码规范/代码规范_命名规则.md)
                * [代码规范_注释](./Content/Article/计算机基础/代码规范/代码规范_注释.md)
        * **其他小知识**
+               * [Cron表达式](./Content/Article/计算机基础/其他小知识/Cron表达式.md)
                * [不同语言注释符](./Content/Article/计算机基础/其他小知识/不同语言注释符.md)
                * [数据格式](./Content/Article/计算机基础/其他小知识/数据格式.md)
        * **正则表达式**
```

## git log -p -n
* `n`:数字，表示仅显示最近的两次更新记录

# git log --stat
* 显示每次commit各改动文件的增改行数
```cmd
commit e5889deb2b264363d0c6e1bfa78aca8e3b5dc610 (HEAD -> master)
Author: FeifanZhang <zhangff970329@163.com>
Date:   Fri Aug 11 09:08:08 2023 +0800
    添加git系列文章
 docs/Content/Article/_sidebar.md                   |  2 +
 .../_sidebar.md"                                   |  1 +
 .../Cron\350\241\250\350\276\276\345\274\217.md"   | 39 +++++++++++
 .../_sidebar.md"                                   |  1 +
 .../Git/Git_.git\347\273\223\346\236\204.md"       | 78 +++++++++++++++++-----
 .../Git/Git_branch.md"                             | 29 +++++++-
 .../Git/Git_checkout.md"                           | 55 +++++++++++++++
 .../Git/Git_reflog.md"                             | 45 +++++++++++++
 ...237\272\347\241\200\346\246\202\345\277\265.md" | 71 ++++++++++++++++----
 .../Git/_sidebar.md"                               |  1 +
 .../_sidebar.md"                                   |  1 +
 docs/_sidebar.md                                   |  2 +
 12 files changed, 294 insertions(+), 31 deletions(-)
```

# git log --graph
* `git log`缺点：只能通过时间线性显示每个commit，一旦存在分支之前的merge时，`git log`无法应对。
* `git log --graph`对每一个commit会显示`git log --pretty=short`的信息，但会通过图形化显示二维的各commit `merge`关系

# 参考
* [git log 的使用](https://www.jianshu.com/p/0805b5d5d893)