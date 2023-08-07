# 定义
* Buffer（缓冲区）类似于**数组的对象**，表示固定长度的字节序列
* 本质是一段内存空间，专门处理**二进制数组**

# 特点
* Buffer大小固定且无法调整
* Buffer性能好，可直接对计算机进行操作
* 每一个元素大小为1字节（byte）
  
# 创建Buffer
## alloc
* 该方法创建的buffer 每一个二进制位都会归0
```js
let buf = Buffer.alloc(10);
console.log(buf)  // <Buffer 00 00 00 00 00 00 00 00 00 00>
```


## allocUnsafe 
* 该方法创建的buffer中 可能会包含旧的内存数据，但速度快于alloc
```js
let buf_2 = Buffer.allocUnsafe(100000);
console.log(buf_2)  // <Buffer 50 01 69 e2 6f 01 00 00 20 2e c3 e4 6f 01 00 00 00 80 00 00 00 00 00 00 80 d9 c2 e4 6f 01 00 00 03 00 00 00 00 00 00 00 50 db c2 e4 6f 01 00 00 03 00 ... 99950 more bytes>
// 可以看出buffer中含有未归零的旧数据
```


## from 
* 将数组转换成buffer的样子（各元素为16进制）
```js
let buf_3 = Buffer.from('hello')
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
console.log(buf_3)  // <Buffer 68 65 6c 6c 6f>  buffer中的元素是hello 单词转换成ASCII码16进制的数值
console.log(buf_4)  // <Buffer 69 6c 6f 76 65 79 6f 75> 是数组中的个元素转换成16进制的值
```

# Buffer 与字符串转换
* 转换时，默认为`utf-8`进行转换
```js
let buf = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
console.log(buf)  // <Buffer 69 6c 6f 76 65 79 6f 75>
console.log(buf.toString())  // iloveyou
```

# Buffer元素查看
```js
let buf = Buffer.from('hello')
console.log(buf)  // <Buffer 68 65 6c 6c 6f>

// 转换成10进制
console.log(buf[0])  // 104
console.log(buf[0].toString())  // 104

// toString(2) 表示转换成二进制，与 toString() 区别极大
console.log(buf[0].toString(2))  // 1101000 (应该是8位，头一位0省略，完整应为01101000)
```
