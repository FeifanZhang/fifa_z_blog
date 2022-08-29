## next主题下mermaid安装
可直接通过[hexo-filter-mermaid-diagrams的官方安装指南](https://github.com/webappdevelp/hexo-filter-mermaid-diagrams)查询mermaid安装流程，一手资料永远是最好的！
## icarus主题下mermaid安装
### 安装参考
我的主题是icarus，没有after_foot.ejs文件，所以和[hexo-filter-mermaid-diagrams的官方安装指南](https://github.com/webappdevelp/hexo-filter-mermaid-diagrams)的step3有些差别，这里我除了官网的文档，还参考了一位和我使用[同一主题的博主](https://maologue.com/Create-diagrams-on-Hexo-with-mermaid/)的配置方法，和他的唯一区别是我的icarus是最新版，他的老一些。要看他的博客可能需要“科（v）学（p）上（n）网”。
### 安装流程
首先通过npm下载hexo-filter-mermaid-diagrams：
```shell
npm i hexo-filter-mermaid-diagrams
```
其次在`hexo根目录`下的`_config.yml`文件的最后面加入如下配置：
```yml
# mermaid chart
mermaid: ## mermaid url https://github.com/knsv/mermaid
  enable: true  # default true
  version: "7.1.2" # default v7.1.2
  options:  # find more api options from https://github.com/knsv/mermaid/blob/master/src/mermaidAPI.js
    #startOnload: true  // default true
```
提示：如果需要类图，在`_config.yml`文件中设置`external_link: false`。
最后，需要在自定义主题文件下添加代码，使用的主题不一样，添加的位置也不一样，使用icarus主题的可以参考本篇文章，我参考了[前面说的这位博主](https://maologue.com/Create-diagrams-on-Hexo-with-mermaid/)；next主题网上很多可以搜到，其他主题移步[官方文档查看](https://github.com/webappdevelp/hexo-filter-mermaid-diagrams)。
在`\themes\icarus\layout\common\footer.ejs`中添加mermaid渲染：
```ejs
<div class="level-end">
<% if (Object.keys(links).length) { %>
    <div class="field has-addons is-flex-center-mobile has-mt-5-mobile is-flex-wrap is-flex-middle">
    <% for (let name in links) {
            let link = links[name]; %>
    <p class="control">
        <a class="button is-white <%= typeof(link) !== 'string' ? 'is-large' : '' %>" target="_blank" rel="noopener" title="<%= name %>" href="<%= url_for(typeof(link) === 'string' ? link : link.url) %>">
            <% if (typeof(link) === 'string') { %>
            <%= name %>
            <% } else { %>
            <i class="<%= link.icon %>"></i>
            <% } %>
        </a>
    </p>
    <% } %>
    </div>
<% } %>
//included mermaid
<% if (theme.mermaid.enable) { %>
  <script src='https://unpkg.com/mermaid@<%= theme.mermaid.version %>/dist/mermaid.min.js'></script>
  <script>
    if (window.mermaid) {
      mermaid.initialize({theme: 'neutral'});
    }
  </script>
<% } %>
</div>
```
//included mermaid处为添加的代码。
不要把//included mermaid复制进去，这个注释只是说明复制的位置和代码。如果复制了，页脚会把它也渲染进页面。

---
## UML图语法
### 官方文档
* 语法参考[官方文档](https://mermaid-js.github.io/mermaid/#/)。如果画图语法错误，没有报错，只会在文章中空白显示，图中不要使用中文标点符号，否则编译器无法进行识别。
* 以下是几种常用的官方教程：[流程图官方教程](https://mermaid-js.github.io/mermaid/#/flowchart)、[时序图官方教程](https://mermaid-js.github.io/mermaid/#/sequenceDiagram)、[类图官方教程](https://mermaid-js.github.io/mermaid/#/classDiagram)、[饼图官方教程](https://mermaid-js.github.io/mermaid/#/pie)、[甘特图官方教程](https://mermaid-js.github.io/mermaid/#/gantt)。

### 辅助画图神器
* 这里推荐一个[在线mermaid编辑器](https://mermaidjs.github.io/mermaid-live-editor/ )，可将图转化为png或svg文件。网上的mermaid语法格式因为markdown编辑器不一而存在差异，本方法仅测试hexo下的可用性，其他种类的博客请酌情使用。
* 强烈推荐：`vscode plugin for hexo`文中使用的插件`Markdown Preview Enhanced`内置mermaid渲染引擎，可以实时渲染编辑的UML图。

