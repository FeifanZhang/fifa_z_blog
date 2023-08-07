# 表达式量词简介
|量词|说明|
|--|--|
|*|重复次数**\>=0**|
|+|重复次数**\>1**|
|?|重复次数为**0或1**|
|{n}|重复次数为**n次**|
|{n,}|重复次数**\>=n**|
|{n,m}|重复次数**\>=n**且**\<=m**|

# `*`
* 重复次数**\>=0**
```js
const reg = /^a*$/  // 整个字符串 要么只出现a 要么啥都没有
console.log(reg.test('a'))  // true
console.log(reg.test('aa'))  // true
console.log(reg.test('ac'))  // false
console.log(reg.test(' '))  // false （因为有空格）
console.log(reg.test(''))  // true（因为字符串为空，连空格都没有 满足a出现次数=0）
```
# `+`
* 重复次数**\>1**
```js
const reg = /^a+$/
console.log(reg.test('a'))  // true
console.log(reg.test('aa'))  // true
console.log(reg.test('ac'))  // false
console.log(reg.test(' '))  // false
console.log(reg.test(''))  // false
```
# `?`
* 重复次数为**0或1**
```js
const reg = /^a?$/
console.log(reg.test(''))  // true
console.log(reg.test('a'))  // true
console.log(reg.test('aa'))  // false
console.log(reg.test('bc'))  // false
console.log(reg.test(' '))  // false
```

# 自定义重复次数

```js
const reg = /^a{3}$/
console.log(reg.test(''))  // false
console.log(reg.test('aa'))  // false
console.log(reg.test('aaa'))  // true
console.log(reg.test('aaaa'))  // false
console.log(reg.test('abc'))  // false
```