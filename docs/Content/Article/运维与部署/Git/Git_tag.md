# git tag 简介

# git tag tag_name
```cmd
git tag v1.0
```
# git tag -a tag_name -m tag_message
* `tag_message`: 对tag的说明
```cmd
git tag v1.0 -m "version 1.0"
```

# git tag -a tag_name commit_SHA1_VALUE
* `commit_SHA1_VALUE`: 为commit_id为`commit_SHA1_VALUE`的版本创建tag
```cmd
git tag v1.0 b8a8
```
* 也可以添加tag message
```cmd
git tag v1.0 b8a8 -m "v1.0.1 origin"
```

# git tag -d tag_name
* 删除`tag_name`的tag