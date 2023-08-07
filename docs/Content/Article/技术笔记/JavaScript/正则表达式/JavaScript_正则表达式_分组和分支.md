# 分组

```js
// 将日期2023-07-29转换为2023/07/29
const reg = /^(\d{4})-(\d{2})-(\d{2})$/
const date = '2023-07-29'
console.log(date.replace(reg, '$2/$3/$1'))
```