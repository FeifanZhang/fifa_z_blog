# for 循环
* 写法：`for [param] %I in (squence) do command`
* 参数解析
  * `params`: 
  |参数|操作对象|参数意义|是否延指定目录向下递归|
  |--|--|--|--|
  |`/f`|文件和目录|当前目录下的所有文件|否|
  |`/r`|文件和目录|显示当前目录下的所有目录|是|
  |`/d`|文件和目录|显示指定目录下的一层目录（不会进行穿透至下层）|否|
  |`/l`|一般参数|根据`squence`中的若干参数，进行升序输出||
  |空参||||

# 小命令
* 显示路径下，所有`.txt`结尾的文件:  `for /r D:\repository\ %%i in (*.txt) do (echo %%i)`