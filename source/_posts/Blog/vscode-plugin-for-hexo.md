---
title: VSCode plugin for hexo
date: 2021-06-18 23:05:21
toc: true
tags: 
- hexo
- vscode
categories:
- [hexo,vscode]
---
在 2015 年，微软开源了 Visual Studio Code 这一轻量级的代码编辑器，VS Code 除了方便写代码，其生态提供的各式插件可满足日常的博客编写需求。今天我就来介绍一下如何利用 VS Code，在全平台上打造一个完全免费的编写 Markdown 的极佳环境。文章[免费好用的全平台 Markdown 编辑器，你可以自己「做」一个](https://sspai.com/post/53327)详细介绍了在windows环境下如何使用这些插件，本文将聚焦于在MacOS下如何高效使用这些插件。
<!--more-->
# VS Code 插件安装
在VS Code中安装任何插件的步骤基本相同（包括下文介绍的若干插件安装方法），点击VS Code主页面左侧`Extensions`进入插件搜索界面   
{% asset_img vscode-plugin-install0.png %}   
点击上方搜索框，搜索想要的插件名称   
{% asset_img vscode-plugin-install1.png %}   
点击`install`进行安装（该插件已安装完毕，所以只会显示`disable`和`uninstall`）   
{% asset_img vscode-plugin-install2.png %}
# VS Code 控制面板
很过插件除了快捷键以外，还有快捷指令，这些指令通过快捷键`shift + command + P`呼出命vs code的控制面板，通过输入框可进行快速搜索。
{% asset_img vscode-panel0.png %}
# Markdown Preview Enhanced
该插件可实时渲染md文件内容样式，除了支持原始的md语法，也支持`mermaid`和`mathjax`插件的语法渲染，当然vscode自带md预览，但好像并不支持`mermaid`和`mathjax`插件的渲染。该插件拥有以下好处：
* 实时渲染markdown文件，所以任何改动都会实时显示在预览中。
* 预览的显示区域滑动与编辑区的滑动是同步的。
* 支持大量插件的实时预览。
* 以上这些都可自行设置开关。
## 使用
{% asset_img vscode-plugin-md-preview0.png %}  
打开后的预览是这个样子：   
{% asset_img vscode-plugin-md-preview1.png %}  
## 快捷指令
`shift + command + P`呼出命令控制面板，通过输入框可进行快速搜索：

| 命令名称                 | 命令                | 说明                                   |
|--|--|--|
| open preview to the side | 侧边框打开预览      |                                        |
| toggle scroll sync       | 开/关预览滑动同步   |                                        |
| toggle live update       | 开/关预览的实时更新 | 关闭的话，预览会在md文件保存后更新预览 |
| insert table             | 插入表格            |                                        |
| insert page break        | 插入断页符          |   |                                     |
# Markdown All in one
## 快捷指令
`shift + command + P`呼出命令控制面板，通过输入框可进行快速搜索：  

| 命令名称                              | 命令                   | 说明                                                                               |
|--|--|--|
| formate document                      | markdown表格自动补齐   | 将鼠标光标移至表格任意一行，使用快捷命令即可，该命令会将本篇文章中所有表格进行补齐 |
| create / update table of contents     | 创建/更新目录          | 将鼠标移至希望生成目录的一行后进行此操作                                           |
| add / update / remove section numbers | 添加/更新/移除章节编号 ||
## 快捷键
下表是`Markdown`语法的快捷键，用于将文字赋予格式、或进行某种操作，下表中为MacOS下的快捷键， windows下的快捷键参考文章[免费好用的全平台 Markdown 编辑器，你可以自己「做」一个](https://sspai.com/post/53327)中`快捷键`部分，对文字进行操作时，需先选中要操作的文字，再通过快捷键进行操作。

| 快捷键      | 操作     |
|--|--|
| command + b | **加粗** |
| command + i | *斜体*   |

---
# 参考
1. [免费好用的全平台 Markdown 编辑器，你可以自己「做」一个](https://sspai.com/post/53327)
2. [VS Code 插件 Markdown All in One](https://sspai.com/post/53327) 
3. [VS Code中markdown插件](https://www.jianshu.com/p/1c62da2a10bc)

