# .gitignore简介
* `.gitignore`文件中所记录的路径或文件不会纳入git版本控制
* 项目中，如日志文件，临时文件以及工具生成的文件是不需要上传至git的，所以通过`.gitignore`文件对其进行忽略
* 一般用于项目根目录，其内容用于说明哪些文件不用上传至git

|语法格式|说明|举例|
|--|--|--|
|`xxx`|表示忽略**\.gitignore路径**下的所有**xxx文件**|`a.json`表示：`/a/a.json`、`/a/b/c/a.json`，只要是叫做`a.json`的文件，全部忽略|
|`/xx`|表示忽略**\.gitignore路径路径**下的**xx文件**|`/bin.json`表示`.gitignore`同路径的`bin.json`文件|
|`xx/`|表示忽略**当前.gitignore路径**下的**xx目录以及目录下所有文件**，**但不忽略xx文件**|
|`#`|注释||
|`!`|表示否定，即满足该条件的文件或路径会被再次包含在版本控制中，注意：**如果该文件的父级目录已被忽略，则该文件仍会被忽略**|
|`[]`|与正则表达式一样，匹配字符串|`a[mn]z`会匹配到`amz`和`anz`|
|`**`|表示**多级**或**0级**目录|`a/**/b`表示：`a/b`、`a/c/b`、`a/x/y/b`等；`**`可表示多级目录，也可表示0级（如`a/b`）|
|`*`|正则表达式：匹配**\/以外**的任何字符（0或n次）|`*.json`: 忽略全部`.json`结尾的文件|
|`?`|正则表达式：匹配**/以外**的任何字符（1次）|

# 常用示例
```shell
# 注释
*.log       # 忽略项目中 .log结尾的文件
!sql.log    # 不忽略 sql.log 文件
/.idea      # 忽略当前 .gitignore 文件同路径的 .idea 文件
/*.log      # 忽略当前 .gitignore 文件同路径的 .log 格式文件（即.log结尾的文件）
/.idea/     # 忽略当前 .gitignore 文件同路径的 .idea 目录
.idea       # 同上
/**/log/    # 忽略所有路径下的 log 目录
/**/log     # 忽略所有路径下的 log 文件
/**/*.log   # 忽略所有路径下的 log 格式文件（即.log结尾的文件）
```

# `git check-ignore` 调试`.gitignore` 文件
* 用于调试`.gitignore`文件
* 当项目中`.gitignore`文件数量很多，且匹配规则复杂时，会导致部分不希望被忽略的文件给忽略掉，可以通过`git check-ignore` 查询具体哪个`.gitignore`文件忽略掉的

## `git check-ignore -v`
* 先通过 `git status --ignored` 查询所有被忽略的文件 or 文件夹
  ```shell
  PS D:\git_learning\source_code> git status --ignored  

  Ignored files:
    (use "git add -f <file>..." to include in what will be committed)
          .idea/
          proj.a/target/
          proj.b/target/
          proj.c/target/
  ``` 
* 若 `Ignored files` 中含有不希望被忽略的文件，通过`git check-ignore -v [dir|filename]`进行查询
  ```shell
  PS D:\git_learning\source_code> git check-ignore -v .idea
  .gitignore:21:.idea     .idea  # 表示根目录的.gitignore文件 -> 第21行 -> .idea 匹配&忽略 
  PS D:\git_learning\source_code>
  ```


# 查看被忽略的文件
## `git status`命令可查看被忽略的文件(untracked files)
* 只有未commit时可以看到
```shell
D:\git_learning\source_code> git status
Untracked files:
(use "git add <file>..." to include in what will be committed)
    .gitignore
    test.txt
```

## `git status --ignored` 也可以
* 通过输出的`Ignored files`项进行查看
```shell
PS D:\git_learning\source_code> git status --ignored  

Ignored files:
  (use "git add -f <file>..." to include in what will be committed)
        .idea/
        proj.a/target/
        proj.b/target/
        proj.c/target/
``` 

# 修改 .gitignore的注意事项
* 若文件已经被`track`,及纳入版本管理中，仅修改`.gitignore` 文件是没用的需执行以下步骤：
  * 从暂存区删除对应文件
    * 推荐：
      * 从暂存区删除特定的**文件**：`git rm filename`
      * 从暂存区删除**递归删除文件夹以及其下的所有数据**：`git rm -r dir_name`
    * 不推荐：从暂存区删除全部文件 `git rm -r --cached .` 
  * 重新写入暂存区 `git add .`
  * commit代码至本地仓库 `git commit -m 'commit msg'`

# 常用项目的`.gitignore`
* github中搜索[gitignore](github.com/github/gitignore) 来查看不同语言项目的`.gitignore` 文件

# 参考
* [Git忽略规则(.gitignore配置）及其不生效原因和解决](https://www.codenong.com/cs106792436/)
* [如何使用.gitignore忽略Git中的文件和目录](https://blog.csdn.net/Q1761991696/article/details/123572766)