`Math`函数提供了各种高级数学计算（三角、反三角函数，绝对值、最大、最小值计算，大数字运算，log运算，次幂计算，余数，四舍五入）

# 四舍五入
## Round() 函数
* 与`Java` 和 `SQL`中的`Round()` 单纯的四舍五入不同，`C#`采取的是银行家舍入（Banker's rounding）
* 银行家舍入：IEEE制定的四舍五入标准，其逻辑如下
  * 四舍六入五判断
  * 五后非0则进一
  * 五后为0，若前一位奇数则进一；反之舍去
```cs
// 四舍六入
Math.Round(3.14, 1);  // 3.1
Math.Round(3.16, 1);  // 3.2

// 五判断
Math.Round(3.151, 1);  // 5后非0则进一：3.2

// 五后为0，前一位奇偶决定
Math.Round(3.15, 1);  // 前一位奇数，进1：3.2
Math.Round(3.25, 1);  // 前一位偶数，5舍去：3.2
Math.Round(3.75, 1);  // 前一位奇数，不管是否大于5 直接进1：3.8
Math.Round(3.65, 1);  // 前一位偶数，即使大于5，也要舍去：3.6

```

## 中国式四舍五入
```cs
Math.Round(3.14, 1, MidpointRounding.AwayFromZero);  // 3.1
Math.Round(3.16, 1, MidpointRounding.AwayFromZero);  // 3.2

Math.Round(3.151, 1, MidpointRounding.AwayFromZero);  //3.2

Math.Round(3.15, 1, MidpointRounding.AwayFromZero);  // 3.2
Math.Round(3.25, 1, MidpointRounding.AwayFromZero);  // 3.3
Math.Round(3.75, 1, MidpointRounding.AwayFromZero);  // 3.8
Math.Round(3.65, 1, MidpointRounding.AwayFromZero);  // 3.7
```

# 参考
* [Math.Round函数详解](https://www.cnblogs.com/king0207/p/13941701.html)
* [C#中Math.Round()](https://blog.csdn.net/qq_39956202/article/details/107837263)