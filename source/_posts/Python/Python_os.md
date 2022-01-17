---
title: Python_os
toc: true
tags:
  - python
  - os
categories:
  - - python
    - os
date: 2021-12-05 23:04:09
---
# 系统相关变量&操作
## os.name
* 查看操作系统类型，具体类型如下所示
  |操作系统类型|值|
  |--|--|
  |linux macOS|posix|
  |windows|nt|
  |java虚拟机|java|
  ```python
  print(os.name)
  # posix
  ```
## os.environ
```python
print(os.environ)
# environ({'__CFBundleIdentifier': 'com.jetbrains.pycharm', 'PATH': '/Users/feifanzhang/PycharmProjects/ai/venv/bin:/Users/feifanzhang/.yarn/bin:/Users/feifanzhang/.config/yarn/global/node_modules/.bin:/Library/Frameworks/Python.framework/Versions/3.8/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin', 'PYTHONPATH': '/Users/feifanzhang/PycharmProjects/ai', 'SHELL': '/bin/zsh', 'PYTHONIOENCODING': 'UTF-8', 'OLDPWD': '/Applications/PyCharm CE.app/Contents/bin', 'SECURITYSESSIONID': '186a6', 'USER': 'feifanzhang', 'COMMAND_MODE': 'unix2003', 'TMPDIR': '/var/folders/3c/y20wk5494dg_ww1fwjkxwlzr0000gn/T/', 'LaunchInstanceID': '3A64C700-6B4F-4E64-81B8-E738B41A64E0', 'PS1': '(venv) ', 'SSH_AUTH_SOCK': '/private/tmp/com.apple.launchd.poLC7UNHV2/Listeners', 'VIRTUAL_ENV': '/Users/feifanzhang/PycharmProjects/ai/venv', 'XPC_FLAGS': '0x0', 'PYTHONUNBUFFERED': '1', 'VERSIONER_PYTHON_VERSION': '2.7', '__CF_USER_TEXT_ENCODING': '0x1F5:0x0:0x0', 'LOGNAME': 'feifanzhang', 'LC_CTYPE': 'en_US.UTF-8', 'XPC_SERVICE_NAME': 'application.com.jetbrains.pycharm.136090.136835', 'PWD': '/Users/feifanzhang/PycharmProjects/ai', 'PYCHARM_HOSTED': '1', 'HOME': '/Users/feifanzhang', '__PYVENV_LAUNCHER__': '/Users/feifanzhang/PycharmProjects/ai/venv/bin/python'})
```
# 文件&目录相关操作
# 执行命令&进程管理




