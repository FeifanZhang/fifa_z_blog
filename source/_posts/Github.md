---
title: Github使用方法
toc: true
mathjax: true
date: 2021-07-03 17:10:36
tags:
- github
categories:
- github
---

<!--more-->
# 基本概念
对Github中出现的专有名词（尤其是本文中出现的专有名词）进行“入门扫盲级”的介绍，有了解的可以直接跳过。
## Git工作区域简介
* **工作区（Working Directory）**：该区域在电脑本地，对项目代码的修改进行记录和管理。
* **暂存区**：当**工作区**内项目进行了部分改动但未经测试，不宜提交至仓库中时，可先存储至**缓存区**（仍在本地电脑），待代码测试合格后，再统一提交至**仓库**。
* **仓库（Repository）**：仓库负责管理被托管的项目。每个项目对应一个仓库，仓库除了存放代码，还会记录每一次提交的代码修改，方便进行版本控制。仓库分为本地方仓库以及远程仓库，本地仓库在本地电脑上，设置`git config --global user.name "Your Name"`以及`git config --global user.email you@example.com`即可使用。远程仓库即github云端仓库，用以实现代码的备份、线上托管以及多人协同开发。
Github三大工作区域的介绍以及三者的关系就介绍到这里，三个区域的创建以及代码如何在三个区域中进行流转请参考文章后面部分[Github创建首个项目](#github创建首个项目)。
## 仓库的操作
* **创建分支仓库（Fork）**：当用户想将其他人的开源项目做修改以便自己使用时，通过该功能**创建分支仓库**到自己的主页中，该分支仓库包括项目全部代码，且与被分支的项目完全独立（即在分支仓库内的任何修改不会对原有项目产生任何影响），同时可以在该分支上继续分支，各个分支之间互不影响。
* **发起请求（Pull Request）**：书接上文，用户**Fork**一个项目后，进行了修改，发现修改后的项目比原版还要好，你想让更多人受益，可以原版项目**发起请求**。项目创始人收到请求后，会review代码以及测试，对方同意你的修改，便会合并（Merge）到源代码仓库中，那么你对项目的修改就会出现在原版项目代码里了。这就是开源项目的好处，为项目努力的不仅仅是项目创始人，还有许许多多“轮子”的使用者一起优化“轮子”。
* **克隆（Clone）**：克隆是将线上的开源项目下载至本地仓库，克隆后的本地仓库除项目代码以外，也包含整个项目的历史版本修改信息，用户也可将修改后的代码直接push到远程仓库。
* **收藏（Star）**：将项目收藏方便下次查看，Star是衡量项目活跃度的其中一个指标，一般来讲收藏的破百，就是个好项目了。除Star之外，活跃度可以根据Issue的数量、前几次发布更新的时间和内容以及StackoverFlow的讨论程度来综合判断项目是否活跃，以防止因第三方轮子停止更新而带来的技术风险。
* **关注（Watch）**：当关注的项目有更新，系统会自动发送更新提醒。
* **问题(Issue)**：发现了项目中代码BUG或其他问题，且没有找到原因或解决方法时，可以提出一个**Issue**用来讨论。

# Github创建首个项目
* 在准备上传的项目根目录下，使用`git init`初始化该项目的本地仓库，创建完毕后，通过`ls -al`指令可以看到多了两个文件：`.git`和`.gitignore`，`.git`负责记录版本控制，`.gitignore`内写明了项目中不需要上传的文件（如具体的项目环境依赖、hexo生成的public静态网页等）。
* 使用命令`git add .`将已有项目的所有文件放入暂存区中,`git add filename`则是将指定文件放入暂存区。
Hint: through “ls -al” to see if the project have .git file, which mean the project might in other git repository, using “rm -rf .git/” to remove the .git file so that the project would not belong to any repository.
* 使用 `git commit -m "更新描述"` 提交暂存区代码至本地仓库。
* `git remote add 简写 远程仓库url` 建立本地仓库和远程仓库的连接，这一步骤需要两个参数：`简写`和`远程仓库url`,简写表示该分支的名称，一般为origin，`远程仓库url`是用户github账号下创建的远程仓库链接。
* 使用`git push -u origin master`将本地仓库代码更新至远程仓库。
* 可以使用 `git status`查看项目每个文件的当前状态（即文件目前是在工作区、暂存区还是在仓库中）。文件名显示为红色，且显示`untracked files或Changes not staged for commit`，表明该文件在工作区；文件名为绿色且显示`Changes to be committed`，表明文件是在暂存区。
