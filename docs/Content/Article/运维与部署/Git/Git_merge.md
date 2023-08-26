# git merge 简介
* merge 所操作的皆为**本地分支**

# git merge的输出
```cmd
git merge dev
Updating 8d44826..bd57d7d
Fast-forward
test.txt | 1 +
1 file changed, 1 insertion(+)
```
* `8d44826..bd57d7d`: 主干指针从`8d44826` 移动至 `bd57d7d`
* `test.txt | 1 +` 表示`test.txt`是本次新增的文件

# Fast merge
## fast merge场景
* `dev`分支从`main`分出
    ```mermaid
    gitGraph
    commit
    commit
    branch dev
    checkout dev
    commit
    ```

* `dev`分支进行开发 & 提交，且`main`没有变化
    ```mermaid
    gitGraph
    commit
    commit
    branch dev
    checkout dev
    commit
    commit
    ```

* `dev`合并至`main` 的情况，叫做fast merge
    ```mermaid
    gitGraph
    commit
    commit
    branch dev
    checkout dev
    commit
    commit
    checkout main
    merge dev
    ```

## 必要条件
* branch是从master分出来的
* 且master版本滞后于branch

## fast merge的本质
* 将master的指针从分支直接移动至branch最新版本
* `git merge`之前
  ```mermaid
  flowchart LR
  subgraph master/HEAD
  master_commit2
  end
  master_commit1 --> master_commit2
  branch_commit1 --> branch_commit2
  ```

* `git merge`后，`master`的 HEAD 直接移动至`dev`分支的最新commit
  ```mermaid
  flowchart LR
  subgraph master/HEAD
  branch_commit2
  end
  master_commit1 --> master_commit2 --> branch_commit2
  branch_commit1 --> branch_commit2
  ```
* 但在git用户层面，会封装成dev分支直接合并至main上

# 3 ways merge
## 3 way merge 场景
* `dev`分支从`main`分出
    ```mermaid
    gitGraph
    commit
    commit
    branch dev
    checkout dev
    commit
    ```
* `dev`分支进行开发 & 提交，且`main`也一直在变化
    ```mermaid
    gitGraph
    commit
    commit
    branch dev
    checkout dev
    commit
    commit
    checkout main
    commit
    ```
* `dev`合并至`main` 的情况，叫做3 way merge
    ```mermaid
    gitGraph
    commit
    commit
    branch dev
    checkout dev
    commit
    commit
    checkout main
    commit
    merge dev
    ```

## 本质
* 合并时，新添加一个commit用于merge两个分支
* merge之前
  ```mermaid
  flowchart LR
  subgraph master/HEAD
  master_commit3
  end
  master_commit1 --> master_commit2 --> master_commit3
  master_commit2 --> branch_commit1 --> branch_commit2
  ```
* merge之后,新添加一个commit，其parent源自于两个分支最新的commit
  ```mermaid
  flowchart LR
  subgraph master/HEAD
  master_merge_commit
  end
  master_commit1 --> master_commit2 --> master_commit3 --> master_merge_commit
  master_commit2 --> branch_commit1 --> branch_commit2 --> master_merge_commit
  ```

# 带冲突的 3 way merge
## 简介
* 与普通 3 ways merge一样，只是分支与主干在某个文件发生了内容冲突
* `git merge`时会提示哪些文件产生了冲突
* 其本质与`3 ways merge`无异，只是需要人工解决文件呢欧容冲突

## 处理冲突的方法
* 根据提示内容，在开发工具中进行冲突处理，处理时会给出几个选项
  * `accept current changes`: 以本地内容为主
  * `accept incoming changes`: 以合并过来的内容为主
  * `accept both changes`: 两分支的内容都保留
* 解决完某一文件的冲突，`git add filename`将处理完冲突的文件添加至git中
* 解决完全部冲突后，`git commit` 直接提交即可，不用`-m`参数，因为已经有一个commit在等待解决冲突

# git merge 参数 & 用法
# git merge local_branch
* 将名称为`local_branch`的本地分支合并到当前开发的本地分支

# git merge local_branch1 local_branch2
* 将名称为`local_branch1` & `local_branch2`的本地分支合并到所在的本地分支

# git merge --abort
* 该命令用于放弃当前的merge
* `git merge`、`git pull`在合并阶段冲突时，此时会暂停`merge`, 可以解决冲突后commit，或直接`git merge --abort`放弃合并分支
* merge出现冲突时，无法进行`git checkout`, `git branch`等分支命令操作

