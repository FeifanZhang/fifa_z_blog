---
title: Hexo_NexT主题
date: 2021-06-23 13:08:21
toc: true
tags: 
- hexo
- NexT
categories:
- [hexo,NexT]
---
在技术类博客中，会需要展示一些复杂的数学公式，NexT主题提供了第三方服务扩展来满足此类需求，仅对渲染器进行更换并在NexT主题包下的`config.yml`中进行适当修改即可。该文章[Hexo NexT 主题对数学公式的支持](https://www.jianshu.com/p/8424da4dd673)提到了`MathJax`与`KaTeX`两个渲染引擎的调用，本篇文章就着重介绍`MathJax`的使用。
<!-- more -->

# hexo博客框架
``` bash hexo博客架构
.
├── .deploy          #部署文件夹
├── public           #html源码，hexo g生成
├── scaffolds        #模板
├── scripts          #扩展脚本
├── source           #文章源码
|   ├── _drafts      #草稿
|   └── _posts       #文章
├── themes           #主题
|   ├── next         #NexT主题
├── _config.yml      #博客配置
└── package.json     #应用程序数据
```

``` bash NexT主题架构
├── .github                #github信息
├── languages              #多语言
|   ├── _en.yml            #默认语言
|   └── zh-CN.yml          #简体中文
|   └── zh-TW.yml          #繁体中文
├── layout                 #布局，根目录下的*.swig文件是对主页，分页，存档等的控制
|   ├── _custom            #可以自定义的模板，覆盖原有模板
|   |   ├── head.swig      #文首样式
|   |   ├── header.swig    #头部样式
|   |   ├── sidebar.swig   #侧边栏样式
|   ├── _macro             #可以自定义的模板，覆盖原有模板
|   |   ├── post.swig      #文章模板
|   |   ├── reward.swig    #打赏模板
|   |   ├── sidebar.swig   #侧边栏模板
|   ├── _partial           #局部的布局
|   |   ├── head           #头部模板
|   |   ├── search         #搜索模板
|   |   ├── share          #分享模板
|   ├── _script            #局部的布局
|   ├── _third-party       #第三方模板
|   ├── _layout.swig       #主页面模板
|   ├── index.swig         #主页面模板
|   ├── page               #页面模板
|   └── tag.swig           #tag模板
├── scripts                #script源码
|   ├── tags               #tags的script源码
|   ├── marge.js           #页面模板
├── source                 #源码
|   ├── css                #css源码
|   |   ├── _common        #*.styl基础css
|   |   ├── _custom        #*.styl自定义局部css
|   |   └── _mixins        #mixins的css
|   ├── fonts              #字体
|   ├── images             #图片
|   ├── js                 #javascript源代码
|   └── lib                #引用库
├── _config.yml            #主题配置文件
└── README.md              #说明文件

```
---
# 参考
[Hexo-NexT主题自定义配置高阶教程](https://blog.bill.moe/hexo-theme-next-config-optimization/)