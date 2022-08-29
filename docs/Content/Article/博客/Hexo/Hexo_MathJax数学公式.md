博客中，会需要展示一些复杂的数学公式，NexT主题提供了第三方服务扩展来满足此类需求，仅对渲染器进行更换并在NexT主题包下的`config.yml`中进行适当修改即可。该文章[Hexo NexT 主题对数学公式的支持](https://www.jianshu.com/p/8424da4dd673)提到了`MathJax`与`KaTeX`两个渲染引擎的调用，本篇文章就着重介绍`MathJax`的使用。
以下安装方法来自文章[Hexo 搭建个人博客指南](https://www.jianshu.com/p/c9beedaf08e4)，本文介绍了从安装Hexo所需环境、创建博客、SEO优化以及数学公式插件的安装。
# MathJax安装
由于Hexo默认的渲染器`hexo-renderer-marked`不支持`MathJax`，所以需要卸载该渲染器并安装新的渲染器`hexo-renderer-pandoc`或`hexo-renderer-kramed`.
## 更换`hexo-renderer-kramed`  
`hexo-renderer-kramed` 引擎是在默认的渲染引擎 `hexo-renderer-marked` 的基础上修改了一些 bug，两者比较接近，也比较轻量级，替换命令如下：
``` bash
npm un hexo-renderer-marked
npm i hexo-renderer-kramed
```
## 更换`hexo-renderer-pandoc`
`hexo-renderer-pandoc` 引擎十分靠谱，使用该renderer之前请确保你已经安装了Pandoc，并卸载之前的 renderer，安装 pandoc renderer：
``` bash
npm uninstall hexo-renderer-marked --save
# 如果之前是 kramed 引擎，则 npm uninstall hexo-renderer-kramed --save
npm install hexo-renderer-pandoc --save
```
注意，如果使用该引擎，那么书写 Markdown 时需要遵循[Pandoc 对 Markdown 的规定](https://pandoc.org/MANUAL.html#pandocs-markdown)。
## `themes/next/config.yml`修改配置参数
将`NexT`主题下的`config.yml`文件中的参数`per_page`、`enable`以及`mhchem`的数值改为`true`
``` yml
math:
  # Default (true) will load mathjax / katex script on demand.
  # That is it only render those page which has `mathjax: true` in Front-matter.
  # If you set it to false, it will load mathjax / katex srcipt EVERY PAGE.
  per_page: true

  # hexo-renderer-pandoc (or hexo-renderer-kramed) required for full MathJax support.
  mathjax:
    enable: true
    # See: https://mhchem.github.io/MathJax-mhchem/
    mhchem: true

```
在需要展示数学公式的文章抬头添加参数`mathjax: true`，即可对本文的数学公式进行渲染

``` yml
title: Python-bit-operation
toc: true
mathjax: true
date: 2021-06-16 12:14:42
tags:
- python
- bit-operation
categories:
- [python,bit-operation]
```
---
# 参考
1. 文章[Hexo NexT 主题对数学公式的支持](https://www.jianshu.com/p/8424da4dd673)除介绍`MathJax`引擎的安装外，还提供了`KaTeX`引擎的安装方法。  
2. [Hexo 搭建个人博客指南](https://www.jianshu.com/p/c9beedaf08e4)
3. [MathJax 官网](https://www.mathjax.org/)   
4. 文章[Mathjax与KaTex渲染数学公式](https://github.com/csjiabin/hexo-theme-next/blob/master/source/_posts/Mathjax%E4%B8%8EKaTex%E6%B8%B2%E6%9F%93%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F.md)介绍了`MathJax`和`KaTex`的使用场景以及两个引擎的底层语法。
5. [Mahtjax公式教程](https://blog.csdn.net/dabokele/article/details/79577072)是一个快速上手教程
6. [Mathjax矩阵乘法](https://blog.csdn.net/harrycomeon/article/details/96283564)