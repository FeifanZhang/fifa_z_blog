# git rebase使用场景
* 真实开发时，不同小组会在自己的分支上开发，完成一个功能后合并到主干上发布，多个分支相互合并或创建分支会让整个git路径显得很乱
  ```mermaid
  gitGraph
  commit
  branch dev1
  branch dev2
  checkout dev1
  commit
  commit
  checkout dev2
  commit
  commit
  checkout main
  merge dev1
  merge dev2
  ```
* 这时用`git rebase`可以很好的避免这种情况

# git rebase的原理
* 当需要合并分支前的git graph
  ```mermaid
  gitGraph
  commit id: "1" tag: "branch_commit"
  branch dev1
  commit id: "2" tag: "dev_1st_commit"
  commit id: "3"
  checkout main
  commit id: "4"
  commit id: "5" tag: "latest_master_commit"
  ```
* 若通过 `git merge`合并
  ```mermaid
  gitGraph
  commit id: "1" tag: "branch_commit"
  branch dev1
  commit id: "2" tag: "dev_1st_commit"
  commit id: "3"
  checkout main
  commit id: "4"
  commit id: "5" tag: "latest_master_commit"
  merge dev1
  ```
* 若通过 `git rebase`合并，会执行两个步骤
  * 在`merge`前，将dev1的首次commit（dev_1st_commit）的父节点（branch_commit）切换成最新的主干节点（latest_master_commit）。**注意**：此时`dev1`分支上的所有commit id都会重新计算，因为分支的节点从`branch_commit`切换至`latest_master_commit`
    ```mermaid
    gitGraph
    commit id: "1" tag: "branch_commit"
    commit id: "4"
    commit id: "5" tag: "latest_master_commit"
    branch dev1
    commit id: "6" tag: "dev_1st_commit"
    commit id: "7"
    ```
  * 切换后，执行`git merge`命令
    ```mermaid
    gitGraph
    commit id: "1" tag: "branch_commit"
    commit id: "4"
    commit id: "5" tag: "latest_master_commit"
    branch dev1
    commit id: "6" tag: "dev_1st_commit"
    commit id: "7"
    checkout main
    merge dev1
    ```
  * 这样，git graph不再是以前各个分支相互、合并、分离；使得合并记录简洁
  
# git rebase 用法限制
* `git rebase`之前，保证该分支，或是该分支的分支内容全部提交，无正在开发的部分。若强行`git rebase`，该分支的commit id全部修改，会对未提交的开发造成影响
* `git rebase`
* 若主干上的**最新版本**与**分支的首次commit版本**出现冲突，仍需要手动解决

# git rebase用法

## git rebase branch
* 将当前分支rebase至`branch`
```cmd
git checkout dev1   # 切换至dev1分支
git rebase master   # 将当前dev1分支，rebase至master
```

## git rebase --continue
* 解决冲突后，`git add`刷新操作，无需`git commit` 直接`git rebase --continue`继续rebase后续操作


## git rebase --abort
* 打断当前的rebase操作，恢复至rebase前的状态
* 一般用于放弃解决`git rebase`带来的冲突，回到之前的状态
