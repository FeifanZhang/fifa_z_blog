# checkout
* `checkout`就是`git clone`
* 注册[SVNBucket账号](https://svnbucket.com/)
* 创建完毕后新建空项目，并复制路径
* 在本地workfolder中右键选中`SVN Checkout`中文`SVN 检出`

# commit
* workfolder编辑完成后，右键选中`SVN Commit`
* 选择提交的文件并编辑commit message
* 提交完成后，会在SVNBucket网站中有提交的代码以及提交记录

# update
* 进行提交之前，`update`来获取最新的代码,保持本地代码的版本与主干一致

# repo-browser
* 可以查看该`url`下的所有代码
* 一般该`url`包含三个文件:`trunk(主干代码)`,`branch(分支代码)`以及`tag(发版时的代码快照)`

## copy to...
* 将选中的文件/文件夹，复制到对应的地方
* 在发版时，会将当前`trunk`的代码，`copy to` 一份至`tag`分支，用于保存一份版本快照，未来因为一些原因要进行版本回滚时，直接使用`tag`分支保存的代码即可

# TortoiseSVN
## 查看日志
* 鼠标右键选中`TortoiseSVN`,通过`showlog`查看日志

## 撤销
* 使用场景：代码未提交时还原至修改前
* 方法1：左键单击选中撤销的文件，鼠标右键选中`TortoiseSVN`选择`SVN还原`
* 方法2：commit显示变更列表时，单击选中撤销更改的文件，右键选择`SVN还原`

## 恢复
* 使用场景：代码已提交，想撤销本次提交
* 方法：
    1. 鼠标右键选中`TortoiseSVN`,通过`showlog`查看日志
    2. 选中撤销的提交，右键选择`revert changes from this revision`
    3. 本地代码修改完毕，但远程库的代码仍是错误提交的版本，所以需要重新提交一次

## 回滚
* 使用场景：回滚至以前的提交版本
* 方法：
    1. 鼠标右键选中`TortoiseSVN`,通过`showlog`查看日志
    2. 选中撤销的提交，右键选择`revert to this revision`
    3. 回滚仅适用于本地代码，若远程库需要回滚则重新提交

# 查看文件变更内容
* 方法1：右键选中`SVN Commit`，下方会有更新文件列表，双击打开查看变更
* 方法2：鼠标右键选中`TortoiseSVN`,通过`showlog`查看日志，下方会有更新文件列表，操作同上

# 添加忽略
* 使用场景：有些临时存储文件不需要上传至远程库，添加忽略防止其上传