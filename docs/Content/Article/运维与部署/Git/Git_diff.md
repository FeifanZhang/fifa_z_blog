# git diff简介
* 查看不同commit id、branch以及工作区&本地仓库的代码的差异
|命令|说明|
|--|--|
|`git diff`|输出工作区 & 暂存区区别|
|`git diff filename`|查看某个文件工作区与暂存区的内容差异|
|`git diff index filename`|显示暂存区与`index`版本本地库的内容差异，index是`git reflog`中的版本指针索引，可查询任何版本本地库与现暂存区的代码差异，如果查询当前版本本地库与暂存区的内容差异，则使用`git diff HEAD filename`即可|
|`git diff --cached`|索引区 & 代码仓库之间的区别|
|`git diff branch1 branch2`|两个分支最新代码的全部区别|
|`git diff branch1 branch2 path`|两分支最新代码的`path`路径下的全部区别|
|`git diff branch1 branch2 filename(带路径)`|两分支最新代码的`filename`文件的全部区别|

* `branch1` & `branch2`不仅是本地，还可以是远程的（`git diff branch1 origin/branch2`）


# git diff 示例
```cmd
index b9a904d..a3f6df4 100644
--- "a/Git_diff.md"
+++ "b/Git_diff.md"
@@ -1,2 +1,7 @@
 # git diff简介
-* 查看不同commit id、branch以及工作区&本地仓库的代码的差异
\ No newline at end of file
+* 查看不同commit id、branch以及工作区&本地仓库的代码的差异
+
+# git
+
+# 参考
+* [git diff 命令](https://blog.csdn.net/liuxiao723846/article/details/109689069)
```

# 输出内容解析
* `index b9a904d..a3f6df4 100644`: 
  * `b9a904d`是差异文件在**暂存区的哈希值**
  * `a3f6df4`是差异文件在**工作区的哈希值**
* `--- "a/Git_diff.md"`:
  * `---`: 减号表示索引区
  * `a/Git_diff.md`表示索引区Git_diff.md内容
* `+++ "b/Git_diff.md"`
  * `+++`: 加号代表工作区
  * `b`:工作区Git_diff.md内容
* `@@ -1,2 +1,7 @@`
  * 定义：表示一个差异
  * `-1,2` : 索引区的1行开始，显示2行
  * `+1,7`: 工作区的1行开始，显示7行
* `@@ -a,b +c,d @@`一直到下一个`@@ -a,b +c,d @@`之前，都是该文件diff内容，每行开头字符的不同代表不同含义
  * `+`开头：工作区内容
  * `-`开头：暂存区内容
  * 空格开头：工作区 & 暂存区内容一致


# 参考
* [git diff 命令](https://blog.csdn.net/liuxiao723846/article/details/109689069)