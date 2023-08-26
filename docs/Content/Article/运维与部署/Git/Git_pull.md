# git pull 简介
* 相当于 `git fetch`(远程库同步至本地) + `git merge`（本地合并）

# git pull 输出
* 在`dev`分支执行fetch命令，与远程`dev`分支进行同步
```cmd
git pull -v
POST git-upload-pack (277 bytes)                                                # 向远程库发送本地分支信息，判断分支是否需要同步
remote: Enumerating objects: 5，done.Counting objects: 100% (5/5)，done.remote
remote:Compressing objects: 100% (2/2)，done.
remote: Total 3 (delta 1)， reused 0 (delta 0),pack-reused 0
Unpacking objects: 100% (3/3)，done.
From https://github.com/git2022/git-demo
    d0c6c15..4b3a280    dev     -> origin/dev                                   # dev分支从 d0c6c15 更新至 4b3a280
=   [up to date]        master  -> origin/master
Update d0c6c15..4b3a280
Fast-forward                                                                    # merge时，通过fast-forward进行更新
file5.txt | +
1 file changed，1 insertion(+)
```

# git pull <远程主机名> <远程分支名>:<本地分支名>

|命令|说明|
|--|--|
|git pull|**本地当前分支名**与**远程分支名**相同，且远程主机默认`origin`|
|git pull origin|本地当前分支，寻找`origin`远程主机同名分支进行pull操作|
|git pull origin next|`origin`的`next`分支与本地当前分支进行pull操作|
|git pull origin mext:dev|`origin`的`next`分支与本地`dev`分支进行pull操作|

# git pull --rebase <远程主机名> <远程分支名>:<本地分支名>
* 参数使用与普通`git pull`无差别
* `--rebase`: `git fetch` + `git rebase`（将`merge`替换为`rebase`操作）


# 参考
* [git pull命令详解](https://haicoder.net/git/git-pull.html)
* [git pull命令](https://www.yiibai.com/git/git_pull.html?tdsourcetag=s_pcqq_aiomsg)