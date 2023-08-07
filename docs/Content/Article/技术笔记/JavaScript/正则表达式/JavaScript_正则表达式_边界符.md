# 单词边界
* 将`the cat scattered his food all over the room`中的`cat`换成`dog`，使用普通匹配，会同时匹配到`cat`和`scattered`两个文本，通过**单词边界元字符**可以解决这个问题
* 语法：`\b单词\b`
```js
const reg0 = /cat/g  // 无单词边界 & 全局匹配
const reg1 = /\bcat\b/g  // 有单词边界 & 全局匹配
const str = "the cat scattered his food all over the room"
console.log(str.replace(reg0, "dog"));  // the dog sdogtered his food all over the room
console.log(str.replace(reg1, "dog"));  // the dog scattered his food all over the room
```

# 字符串边界
* 匹配字符串开头或结尾
## 匹配开头：`^表达式`
```js
// 匹配开头
const reg = /^a/
console.log(reg.test('a'))  // true
console.log(reg.test('abc'))  //true
console.log(reg.test('bc'))  //false
console.log(reg.test('bc a'))  // false (匹配的是字符串的开头，而不是单词的开头)
```

## 匹配结尾：`表达式$`
```js
// 匹配结尾
const reg = /c$/
console.log(reg.test('a'))  // false
console.log(reg.test('abc'))  // true
console.log(reg.test('bc'))  // true
```

## 元字符`^`与`$`结合使用
`^` 与 `$` 结合使用 表示必须精准匹配
```js
const reg = /^ac$/  // ^ ~ 同时使用 表示匹配的字符串必须是ac 不能有任何一个多的字符
console.log(reg.test('a c'))  // false
console.log(reg.test('ac '))  // false
console.log(reg.test('ac'))  // true
console.log(reg.test('abc'))  // false
console.log(reg.test('acd'))  // false
```