# git branch 参数简介

|指令|说明|
|--|--|
|git branch|查看本地分支名称|
|git branch -r|查看远程分支名称|
|git branch -a|查看本地 & 远程分支名称|
|git branch -d|删除本地分支|
|git branch -D|强制删除本地分支|
|git branch -f|强制|
|git branch -m|移动或重命名本地分支|
|git branch -M|强制移动或重命名本地分支|

# 查看分支
## git branch
* 查看**本地全部**的分支
* \* 开头的分支是当前所在分支
```cmd
PS D:\xxx\source_code> git branch
dev_accumulation_0727
* dev_feifan_zhang
master
```
## git branch -r
* 查看**全部远程**分支
```cmd
PS D:\xxx\source_code> git branch -r
origin/HEAD -> origin/master
origin/dev_accumulation_0727
origin/master
```
## git branch -a

* 查看**本地 & 远程全部**分支
* \* 开头的分支是当前所在分支
* 红色为远程分支，绿色为本地分支
```cmd
PS D:\xxx\source_code> git branch -a
  dev_accumulation_0727
* dev_feifan_zhang
  master
  remotes/origin/HEAD -> origin/master
  remotes/origin/dev_accumulation_0727
  remotes/origin/master
```

# 新建分支
## git branch -f branch_name
* 新建分支，但并不切换至新分支，而是仍在当前分支
* `branch_name` 是新建分支名称

# 删除分支
## git branch -d branch_name
* 删除名称为`branch_name`的**本地分支**

## git branch -d -r branch_name
* 删除名称为 `branch_name` 的**远程分支**
* 删除后，通过`push`命令推送到服务器
```cmd
git branch -d -r origin/dev_branch

git push origin : dev_branch
```
## git -D branch_name
* 强制删除`git -D branch_name`, 相当于 `git -d -f branch_name`

# 重命名分支
## 重命名本地&远程的正确操作顺序
* 先删除远程待修改分支
* 修改本地分支名称（`git branch -m`）
* push本地分支到远程（`git push`）

## git branch -m old_branch_name new_branch_name
* 重命名本地分支
* `old_branch_name`: branch当前名称
* `new_branch_name`: branch新名称

## git branch -M old_branch_name new_branch_name
* 与强制重命名，除此以外与`-m`参数无异

# 参考
* [git branch用法总结，查看、新建、删除、重命名](https://blog.csdn.net/afei__/article/details/51567155?utm_medium=distribute.pc_relevant.none-task-blog-OPENSEARCH-2.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-OPENSEARCH-2.control)
