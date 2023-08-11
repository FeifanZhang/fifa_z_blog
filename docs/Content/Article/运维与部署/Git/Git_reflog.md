# reflog 简介
* 定义：记录导致HEAD指针每一次改变的日志
* 引起head指针变化的指令
  |指令|指令说明|
  |--|--|
  |git checkout|切换分支|
  |git commit|提交|
  |git reset commit|重置|
  |git checkout commit|签出提交|
  |git merge|合并|
  |git rebase|基变|
  |git pull|`fetch` + `merge`|
  |git clone|代码copy至本地，本质上是初始化ref|

* 与`git log`区别
  |命令|日志范围|
  |--|--|
  |`git log`|HEAD以及之前的全部操作日志|
  |`git reflog`|当前分支的全部操作变更日志|


# git reflog

```cmd
git reflog
897fb06 (HEAD -> master) HEAD@{0}: checkout: moving from tmp to master
d0bde7c (tmp) HEAD@{1}: checkout: moving from d0bde7cdf111e2033c949b0e8aaa8c6b01169277 to tmp
d0bde7c (tmp) HEAD@{2}:checkout: moving from master to dObde7cd
897fb06 (HEAD -> master) HEAD@{3}: checkout: moving from dev to master
ab2fb9f HEAD@{4}: commit: 1st commit from dev branch
897fb06 (HEAD -> master) HEAD@{5}: checkout: moving from master to dev
897fb06 (HEAD -> master) HEAD@{3}: commit: 3rd commit
2e4624f HEAD@{7}: commit: 2nd commit
dObde7c(tmp) HEAD@{8}: commit (initial): 1st commit
```

* 输出解析
|内容|说明|用法|
|--|--|--|
|`897fb06`|操作的hash值前7位，若信息类型为commit，可根据该哈希值（commit_id）回滚至对应的commit|
|`HEAD@{n}`|表示head指针移动的情况，n = 0表示最后一次移动|`git reset --hard HEAD@{n}`退回至n次指针移动的状态|
|`aster@{one.week.ago}`|master分支在本地|

# 参考
* [【学了就忘】Git操作 — 51.git reflog命令](https://www.jianshu.com/p/7e4cef3863e7)