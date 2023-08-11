# checkout 简介
* checkout命令的本质 本质就是将当前指针移动到特定的`commit`上，这个commit可能是当前分支，也可能是其他分支，所以该命令可以有切换分支的功能

|命令|说明|指针位置|
|--|--|--|
|git checkout branch_name|将指针切换至某分支最新的commit||
|git checkout -b branch_name|||
|git checkout commit_id|||

# git checkout branch_name
* 切换至`branch_name`分支下的“顶端”（即最新的commit）


# git checkout -b branch_name
* 创建进的分支，再切换至该分支
* 本质是`git branch` + `git checkout`

# git checkout -b new_branch from_branch
* 从`from_branch` 新建一个`new_branch` 并切换至`new_branch`分支

# git checkout commit_id
## 参数 & 用法
* `commit_id`参数: `git log` 可查询每个commit对应的commit_id （本质是`commit`时，生成的SHA-1 哈希值）
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
* 根据查到的`commit_id` 切换到对应commit
  ```cmd
  git checkout bf44ecba617  # 切换至第一次commit
  git log
    commit bf44ecba617a0a50a067f85a8b449c1e37a8409d (HEAD)  # HEAD指向第一次提交
    Author: FeifanZhang <zhangff970329@163.com>
    Date:   Sun Jul 2 15:59:28 2023 +0800
  ```

## 基于历史commit修改内容的步骤
* 若需要基于**历史commit**进行修改，通过`git checkout -b `基于**该历史commit**新建分支后，在分支上进行修改
  ```cmd
  git checkout -b dev_branch  # 基于第一次commit生成分支
  git log
    commit bf44ecba617a0a50a067f85a8b449c1e37a8409d (HEAD -> dev_branch)  # HEAD不再直接指向第一次commit，而是指向新的分支名称，该分支指向第一次commit
    Author: FeifanZhang <zhangff970329@163.com>
    Date:   Sun Jul 2 15:59:28 2023 +0800
  ```
* 返回某个分支最新的commit，直接`git checkout branch_name`即可（返回master分支）
  ```cmd
  git checkout master
  ```