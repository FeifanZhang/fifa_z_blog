# 正则表达式简介
|表达式|含义|
|--|--|
|`Regex.IsMatch()`|判断字符串是否匹配正则表达式|
|`Regex.Match()`|<b>提取</b> **一个** 表达式匹配的字符串|
|`Regex.Matches()`|<b>提取</b> **多个**表达式匹配的字符串|
|`Regex.Replace()`|<b>替换</b> **所有**表达式匹配的字符串|


# 是否匹配
* 字符串匹配邮政编号
```csharp
Bool res = Regex.IsMatch(inputString, "^[0-9]{6}$");  // 第一个参数是字符串，第二个是正则表达式（string）
```

# 转义问题
* 在正则表达式中，单字符`\`会被c# 渲染成转义符，若要匹配字符`\`，则需要在`\`之前加一个`\`防止转义
  ```csharp
  // 匹配\d两个字符 -> 正则表达式为 \\d
  // 匹配 \\d三个字符 -> 正则表达式为 \\\\d
  Bool res0 = Regex.IsMatch("\d", "\d");  // 结果为false
  Bool res1 = Regex.IsMatch("\d", "\\d");  // 结果为true
  Bool res2 = Regex.IsMatch("\\d", "\\\\d");  // 结果为true
  ```

# 提取匹配的内容
* `Match()`用法
    ```csharp
    Match match = Regex.Match("大家好，我是FIFA，今天是2010年10月10日", "[0-9]+");
    var val = match.Value;  // 返回匹配到的第一个字符串：2010
    var group0 = match.Groups[0].Value;  // ${字段1}
    var group1 = match.Groups[1].Value;  // 字段1
    ```

* `Matches()`用法
    ```csharp
    MatchCollection matches = Regex.Matches("大家好，我是FIFA，今天是2010年10月10日", "[0-9]+");
    foreach(Match item in matches)
    {
        Console.WriteLine(item.Value); // 打印2010, 10, 10
    }
    Console.WriteLine(matches.Count); // 3
    ```
* 提取组：对`Matches()`提取的字符串集合进行分组
  * 通过`()` 将正则表达式进行分组，出现了几对括号，就是对表达式进行了几次分组
    ```csharp
    // 下文的例子中，([0-9]+) 为第一组；([a-zA-Z]+)为第二组
    MatchCollection matches = Regex.Matches("大家好，我是FIFA，今天是2010年10月10日", "([0-9]+)([a-zA-Z]+)");
    var val = match.Value;  // 返回匹配到的第一个字符串：2010
    ```
  * 多个`()`嵌套时，按照左括号`(`在表达式的位置，判定该提取组为第几组
    ```csharp
    // 下文的提取组中：
    // (_(-(\d+)))([a-zA-Z]+) 为第0组,即整个正则表达式
    // (_(-(\d+))) 为第一组
    // (-(\d+)) 为第二组
    // (\d+) 为第三组
    // ([a-zA-Z]+) 为第四组
    MatchCollection matches = Regex.Matches("大家好！_-2020abc", "(_(-(\d+)))([a-zA-Z]+)");
    var group0 = matches.Groups[0].Value;  // _-2020abc
    var group1 = matches.Groups[1].Value;  // _-2020
    var group2 = matches.Groups[2].Value;  // -2020
    var group3 = matches.Groups[3].Value;  // 2020
    var group4 = matches.Groups[4].Value;  // abc
    ```

# 替换
```csharp
string res = Regex.Replace(condtion, colNamePattern, dr[colName].ToString())
```

# 参考
* [使用 Visual C# 和正则表达式匹配模式](https://learn.microsoft.com/zh-CN/troubleshoot/developer/visualstudio/csharp/language-compilers/match-pattern-regular-expression)
* [C#中正则表达式的使用](https://www.cnblogs.com/arxive/p/5795253.html)
