# git remote 简介
* 查看远程仓库
* 修改远程仓库在本地的信息（本地别名、连接配置等）
* 无法直接操作远程库，只能修改远程库在本地的信息！

# git remote 命令
* 显示全部远程库名称
```cmd
git remote
origin
```
# git remote -v
* 显示全部远程库名称、url以及对应的操作（`pull` or `fetch`）
```cmd
git remote -v
origin  https://gitee.com/git_learning/learning.git (fetch)
origin  https://gitee.com/git_learning/learning.git (push)
```

# git remote add short_name remote_url
* 当前本地仓库连接至远程库
* `short_name`: 远程仓库在本地的别名
* `remote_url`: 远程仓库 url

# git remote rm short_name
* 删除远程仓库在本地的配置
* `short_name`: 远程仓库在本地的别名

# git remote rename old_name new_name
* 修改远程库在本地的别名
* `old_name`: 老的别名
* `new_name`: 新的别名

# git remote show remote_name
* 显示本地与远程分支的关联情况
```cmd
git remote show origin
* remote origin
  Fetch URL: https://gitee.com/dawn_8950/rdoss.git
  Push  URL: https://gitee.com/dawn_8950/rdoss.git
  HEAD branch: master
  Remote branches:                                                        # 远程库各分支与本地分支关联情况
    dev_feifan_zhang      tracked                                         # tracked: 远程分支 与 dev_accumulation_0727有关联
    master                stale (use 'git remote prune' to remove)        # stale:过期的，该分支在远程已被删除，但本地仓库仍有对应代码
    workspace             new (next fetch will store in remotes/origin)   # 远程新建分支，但本地没有，通过 git fetch添加至本地
  Local branches configured for 'git pull':
    dev_accumulation_0727 merges with remote dev_accumulation_0727
    dev_feifan_zhang      merges with remote dev_feifan_zhang
    master                merges with remote master
  Local refs configured for 'git push':
    dev_accumulation_0727 pushes to dev_accumulation_0727 (local out of date)
    dev_feifan_zhang      pushes to dev_feifan_zhang      (up to date)
    master                pushes to master                (local out of date)
```

# 参考
* [git remote 命令]http://www.codebaoku.com/git/git-remote.html()