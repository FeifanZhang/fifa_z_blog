# git add 简介
* `git v1.x` 与 `git v2.x` 在该命令上会有不同，本文以`git v2.x`为准进行介绍

# git add dir_file
* 将指定文件放入暂存区
* `dir_file`: 带有相对路径的文件名，相对路径以项目根目录起始
* 若文件存在于`gitignore`中，则无法添加

# git add -f dir_file
* 将指定文件放入暂存区
* `dir_file`: 带有相对路径的文件名，相对路径以项目根目录起始
* 无论文件是否`gitignore`中，直接强制添加

# git add path
* 将指定目录下的所有变化，放入暂存区

# git add .
* 将当前目录下的全部变化放入暂存区
* 等同于`git add -A` 和 `git add --all`

# git add -u
* 将状态为被追踪（tracked）文件的修改提交至暂存区，注意：**未追踪**或是**新增但未添加至暂存区**的文件不会被提交

