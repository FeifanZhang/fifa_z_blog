# 是否匹配
```csharp
Bool res = Regex.IsMatch(inputString, pattern);  // 第一个参数是字符串，第二个是正则表达式（string）
```

# 获取匹配的内容
```csharp
Match res = Regex.Match(flowConditionStr, colNamePattern);
var group0 = res.Groups[0].Value;  // ${字段1}
var group1 = res.Groups[1].Value;  // 字段1
```

# 替换
```csharp
string res = Regex.Replace(condtion, colNamePattern, dr[colName].ToString())
```