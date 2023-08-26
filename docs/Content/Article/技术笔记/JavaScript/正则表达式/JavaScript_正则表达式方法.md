# 定义正则表达式
* `const 变量名 = /正则字符串/`
```js
const reg = /前端/  // 查看字符串是否包含前端字样
const reg1 = /abc/  // 查看字符串是否包含abc字样
```

# test
* 查看字符串是否匹配正则表达式
* 返回值：布尔类型
```js
const reg = /前端/
console.log(reg.test("学前端太难了"))  // true
console.log(reg.test("学后端太难了"))  // false
```

# exec
* 查找符合规则的字符串
* 返回值：数组（具体形式代码示例中说明）
```js
const reg = /前端/ 
let res0 = reg.exec("学前端太难了") // [ '前端', index: 1, input: '学前端太难了', groups: undefined ]
let res1 = reg.exec("学好前端太难了")  // [ '前端', index: 2, input: '学前端太难了', groups: undefined ]
// 返回值说明：
// 数组0元素: 正则表达式字符串
// 数组1元素：正则匹配到的第一个字符的位置（0为字符串起始位置）
// 数组2元素：groups为分组
```

# replace
* 替换符合规则的字符串
* 返回值：替换后的字符串
* 注意：该方法为**字符串提供的方法**，而**非正则表达式！**
```js
const reg = /前端/
const str = "学前端太难了"
console.log(str.replace(reg, "java")) // 学java太难了
```
* **但若出现多个匹配的子串，该方法只会替换第一个匹配到的子串**
    ```js
    const reg = /前端/
    const str = "学前端太难了，前端挣得不少"
    console.log(str.replace(reg, "java")) // 学java太难了，前端挣得不少
    ```
* 若希望替换全部匹配到的子串，正则对象加入**修饰符**`g`（表示全局变量）
    ```js
    const reg = /前端/g  // g表示全局变量：替换全部匹配到的子串
    const str = "学前端太难了，前端挣得不少"
    console.log(str.replace(reg, "java")) // 学java太难了，java挣得不少
    ```

# match
* 可在字符串内检索指定的值 or 找到一个或多个正则表达式的匹配
* 返回值：数组
  * 正则表达式为全局类型：返回全部匹配到的子串
  * 正则表达式非全局类型：格式与`exec`方法相同

```js
const reg = /前端/
const str = "学前端太难了，前端挣得不少"
console.log(str.match(reg))  // [ '前端', index: 1, input: '学前端太难了，前端挣得不少', groups: undefined ]

// 全局类型
const reg1 = /前端/g
const str1 = "学前端太难了，前端挣得不少"
console.log(str1.match(reg1))  // [ '前端', '前端' ]
```

# 修饰符
|修饰符|说明|
|--|--|
|i|`ignore`缩写，正则表达式匹配时忽略大小写|
|g|`global`缩写，匹配所有满足表达式的结果|

## ignore示例
```js
const reg_a = /a/
const reg_A = /A/
const reg_ignore = /A/i
const str = "abcde"
console.log(reg_a.test(str))  // true
console.log(reg_A.test(str))  // false
console.log(reg_ignore.test(str))  // true
```

## global 示例
```js
const reg = /前端/g  // g表示全局变量：替换全部匹配到的子串
const str = "学前端太难了，前端挣得不少"
console.log(str.replace(reg, "java")) // 学java太难了，java挣得不少
```
## 修饰符混合使用
```js
const reg = /java/ig
const str = "学JAVA太难了，Java挣得不少"
console.log(str.replace(reg, "前端"));  // 学前端太难了，前端挣得不少
```
