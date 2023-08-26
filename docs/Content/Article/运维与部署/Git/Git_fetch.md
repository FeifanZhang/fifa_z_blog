# fetch 简介
* 明确概念：本地所谓的**远程仓库分支信息**（如各分支的`commit`、`origin master`等），本质上是存储在`.git/`目录的`remote/`相关文件夹中的信息，并不是实时去远程库进行拉取！
* 同步远程库的分支、版本信息：远程创建新分支后，在本地通过`git remote -r`无法看到新建分支，先通过`git fetch`更新本地git远程库信息（`.git/refs/remote/`以及相关目录下的内容）后，才可查看
* 若远程分支被删除，`git fetch`命令不会删除其对应的本地分支


# fetch 用法 & 原理
## fast merge
* 本地仓库无新的版本提交，但远程仓库出现新版本的状况
* 本地仓库的版本控制如图所示
  ```mermaid
  gitGraph
  commit id: "1"
  commit id: "2"
  commit id: "3" tag: "【master】&【origin/master】"
  ```
* 当本地无新版本提交，而远程仓库出现新的commit时，通过`git fetch`，会更新本地`.git`目录下的远程仓库内容，此时`origin/master`移动至最新的commit，本地`master`则不会移动
  ```mermaid
  gitGraph
  commit id: "1"
  commit id: "2"
  commit id: "3" tag: "master"
  commit id: "新的commit1"
  commit id: "新的commit2" tag: "origin/master"
  ```
* 最后，通过`git merge origin/master`进行合并（`master`移动至最新的commit）
  ```mermaid
  gitGraph
  commit id: "1"
  commit id: "2"
  commit id: "3"
  commit id: "新的commit1"
  commit id: "新的commit2" tag: "【master】& 【origin/master】"
  ```

## 3 ways merge
* 本地与远程仓库同步
  ```mermaid
  gitGraph
  commit id: "1"
  commit id: "2"
  commit id: "3" tag: "【master】&【origin/master】"
  ```

* 远程与本地都有新版本提交, 此时`git fetch`后，`origin/master`会指向新的、与远程库版本对齐的分支 
* 注意：此时的`fetch_branch` 并不是一个真正意义上的分支，本质上存储在`.git/`目录下的远程库新版本信息
  ```mermaid
  gitGraph
  commit id: "1"
  commit id: "2"
  commit id: "3"
  branch fetch_branch
  checkout fetch_branch
  commit id: "远程新提交版本" tag: "origin/master"
  checkout main
  commit id: "本地新提交版本" tag: "master"
  ```
* 3 way merge 会在`main`上生成一个新的版本用于合并本地与远程的commit,`master` & `origin/master`都会指向该commit
  ```mermaid
  gitGraph
  commit id: "1"
  commit id: "2"
  commit id: "3"
  branch fetch_branch
  checkout fetch_branch
  commit id: "远程新提交版本"
  checkout main
  commit id: "本地新提交版本"
  merge fetch_branch id: "合并后的版本" tag: "【master】&【origin/master】"
  ```
* 此时本地比远程领先一个版本（因为合并后生成了新的版本），故通过`git push origin master`将其push到远程仓库主干

# pull 与 fetch 的区别
* `git pull` = `git fetch` + `git merge`
* 使用`pull`或`fetch` 的准则：判断本次merge是否有冲突
  * 若有冲突，通过`git fetch`拉取 -> 解决冲突 -> `git merge`
  * 确认无冲突，直接`git pull`；或`git fetch` -> `git merge`
  * 无法确认是否有冲突：`git fetch`拉取 -> `git diff origin/master master`判断是否有冲突，判断后按照前两个步骤处理

# git fetch
* 将**分支**同步至本地（此时本地master指针不会动，远程指针会移动）
* 输出分析
    ```cmd
    remote: Counting objects: 100% (140/140), done.
    remote: Compressing objects: 100% (49/49), done.
    remote: Total 81 (delta 26), reused 0 (delta 0), pack-reused 0
    Unpacking objects: 100% (81/81), 10.19 KiB | 77.00 KiB/s, done.
    From https://gitee.com/git_learning/learning
    02a6658..08a7131    dev_accumulation_0727 -> origin/dev_accumulation_0727  # 三列：commit id、本地分支名称、远程分支名称
    097f19f..f3b7771    master                -> origin/master
    * [new branch]      workspace             -> origin/workspace              # 远程新建的分支，而本地没有，本次fetch同步过来
    ```

# git fetch --prune
* 远程仓库删除某分支，但本地仓库仍存在该分支时，通过`--prune`删除本地分支
* 如：远程`dev`仓库已删除，但本地仓库仍存在
  ```cmd
  git fetch --prune
  From https://gitee.com/git_learning/learning      # fetch的远程路径
  - [deleted]       (none)      -> origin/dev       # 三列：操作、本地分支（）、远程分支
  ```