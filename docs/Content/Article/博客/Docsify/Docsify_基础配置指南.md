# Docsify 插件
## 代码高亮
* [Docsify原生高亮（Prism）简介](https://docsify.js.org/#/language-highlight)，默认支持如下语言代码高亮
  * markup, html, xml, svg, mathml, ssml, atom, rss，css，clike，javascript（js）
* [Prism额外支持的语言](https://cdn.jsdelivr.net/npm/prismjs@1/components/)
* 在index.html中加入如下代码
    ```html
    <div id="app"></div>
    <script>
        window.$docsify = {
        //...
        }
    </script>
    <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
    <!--将对应的语言js包进行引入-->
    <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-csharp.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-bash.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-java.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-python.min.js"></script>
    ```

## 复制代码块
* [Docsify复制代码块教程](https://docsify.js.org/#/plugins?id=copy-to-clipboard)
* 在index.html中加入如下代码
    ```html
    <body>
    <div id="app"></div>
    <script>
        window.$docsify = {
            // 复制代码块的相关配置
            copyCode: {
                buttonText: '点击复制',
                errorText: '复制失败！',
                successText: '复制成功'
            },
        }
    </script>
    <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
    <!--引入复制代码块-->
    <script src="//cdn.jsdelivr.net/npm/docsify-copy-code/dist/docsify-copy-code.min.js"></script>
    </body>
    ```

## KaTex公式
* KaTex的公式与hexo支持的mathJax语法格式是一样的，对于博客迁移还是很友好的
* 在index.html中加入如下代码
    ```html
    <head>
    <!-- 引入 KaTex css 样式渲染-->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css"/>
    </head>
    <body>
    <div id="app"></div>
    <script>
        window.$docsify = {
        //...
        }
    </script>
    <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
    <!--  引入 KaTex -->
    <script src="//cdn.jsdelivr.net/npm/docsify-katex@latest/dist/docsify-katex.js"></script>
    </body>
    ```

## 分页
* [Docsify分页教程](https://docsify.js.org/#/plugins?id=pagination)

## Zoom Image
* [Docsify图片详情教程](https://docsify.js.org/#/plugins?id=zoom-image)

## 字数统计 & 阅读时间
* 在index.html中添加如下代码
    ```html
    <div id="app"></div>
    <script>
        window.$docsify = {
            // 字数统计的相关配置
            count: {
                countable: true,
                fontsize: '0.9em',
                color: 'rgb(90, 90, 90)',
                language: 'chinese'
            },
        }
    </script>
    <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
    <!-- 引入字数统计 -->
    <script src="//unpkg.com/docsify-count/dist/countable.min.js"></script>
    ```

## mermaid流程图
* mermaid的语法和渲染标识在hexo与docsify中是通用的，对迁移非常友好
* 在index.html中添加如下代码
    ```html
    <head>
        <!--添加mermaid css样式-->
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.css">
    </head>
    <body>
        <div id="app"></div>
        <script>
            window.$docsify = {
                // mermaid 配置
                var num = 0;
                mermaid.initialize({ startOnLoad: false });

                // 添加mermaid 在 markdown中的渲染逻辑
                markdown: {
                    renderer: {
                        code: function(code, lang) {
                            if (lang === "mermaid") {
                                return (
                                    '<div class="mermaid">' + mermaid.render('mermaid-svg-' + num++, code) + "</div>"
                                );
                            }
                            return this.origin.code.apply(this, arguments);
                        }
                    }
                },
            }
        </script>
        <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
        <!-- 添加mermaid js文件 -->
        <script src="//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    </body>
    ```

## 昼夜交替主题
* 在index.html中添加如下代码
    ```html
    <head>
        <!-- 昼夜交替主题的 css -->
        <link 
        rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/docsify-darklight-theme@latest/dist/style.min.css"
        title="docsify-darklight-theme"
        type="text/css"
        />
    </head>
    <body>
        <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
        <!-- 对应的 js 文件 -->
        <script 
            src="//cdn.jsdelivr.net/npm/docsify-darklight-theme@latest/dist/index.min.js"
            type="text/javascript">
        </script>
    </body>
    ```
## 导航栏
* [Docsify导航栏教程](https://docsify.js.org/#/custom-navbar)

## 全局搜索
* [Docsify全局搜索教程](https://docsify.js.org/#/plugins?id=full-text-search)
