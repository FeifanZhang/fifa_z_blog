// 将文章引用的相对路径转换为根目录起始的相对路径
function replace_local_url(md)  
{
    const replace_reg = /\..*?\.md/g
    
    for(const local_md_url of md.matchAll(replace_reg))
    {        
        let url_prev = location.href.substring(0, location.href.lastIndexOf('/'))
        let url_back = local_md_url[0].replace('.md', '')
        md = md.replace(local_md_url[0], `${url_prev}/${url_back}`)
        
    }
    return md
}

// 将 mermaid 语法块每行最后的空格去掉
function reshape_mermaid(md)  
{
    const replace_reg = /```mermaid(.|\n)*?```/g
    for(const mermaid of md.matchAll(replace_reg))
    {
        md = md.replace(mermaid[0], mermaid[0].replaceAll(/[ ]{1,}\n/g, '\n'))
    }
    return md
}

// 将 cmd 语法块中的单行空格移除
function reshape_cmd(md)  
{
    const replace_reg = /```cmd(.|\n)*?```/g
    for(const cmd of md.matchAll(replace_reg))
    {
        md = md.replace(cmd[0], cmd[0].replaceAll(/[ ]{0,}\n/g, ''))
    }
    return md
}