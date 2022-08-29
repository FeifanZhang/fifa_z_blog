# 位运算简介

|操作名称|简介|用途|
|---|---|---|
|与（&）运算|2个二进制数的对应数位`都是1则为1，否则是0`|用于判定是否为奇数|
|或 运算|2个二进制数的对应数位`1个为1则为1，否则是0`|用于判定是否为偶数数|
|异或（^）运算|2个二进制数的对应数位`数值不同则为1，相同是0`|算法中用于消除相等的数|
|左移（<<）运算|二进制数各数位向`左移动若干位，高位抛弃，低位补0`|n << x = $n * (2^x)$|
|右移（>>）运算|二进制数各数位向`右移动若干位，低位抛弃，高位补0`|n>>x = $n // 2^x$|

# 异或（^）运算
## a^a=0
a与自身进行异或计算时，二进制的每一位都相等，故每一位的结果都是0，进而最后的结果就是0。
## a^b^a=a^a^b=0^b=b
上述等式中a与b转化为二进制后，任何一个数位的可能性有一下四个：`a=b=0；a=b=1；a=1且b=0；a=0且b=1`。
1. 对a^b^a带入以上4种可能进行分析：
   1. 当`a=b=0`时结果为0。
   2. 当`a=b=1`时：1^1^1=0^1=1。
   3. 当`a=1且b=0`时：1^0^1=1^1=0。
   4. 当`a=0且b=1`时：0^1^0=1^0=1。无论哪种情况，a^b^a的结果都为b,因为2个a会相互抵消。
2. 对`a^a^b`进行分析：先分析前半部分`a^a`，因为两个数的二进制从低到高位的任一位置数值相等，故`a^a=0`，所以`a^a^b=0^b`。  

## 用途以及算法应用
当算法中有需要消除相等数值的操作时，可使用异或运算，代表性题目有[丢失的数字](https://leetcode-cn.com/problems/missing-number/) ：  
给定一个包含`[0, n]`中 n 个数的数组 nums ，找出`[0, n]`这个范围内没有出现在数组中的那个数。
```
示例 1：
输入：nums = [3,0,1]
输出：2
解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。

示例 2：
输入：nums = [0,1]
输出：2
解释：n = 2，因为有 2 个数字，所以所有的数字都在范围 [0,2] 内。2 是丢失的数字，因为它没有出现在 nums 中。

示例 3：
输入：nums = [9,6,4,2,3,5,7,0,1]
输出：8
解释：n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。

示例 4：
输入：nums = [0]
输出：1
解释：n = 1，因为有 1 个数字，所以所有的数字都在范围 [0,1] 内。1 是丢失的数字，因为它没有出现在 nums 中。
```
通过异或操作来消除数组中重复出现的数字
``` python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        result = 0
        for idx, num in enumerate(nums):
            result ^= (idx + 1)^ num
        return result
```

# 左移（<<）与右移（>>）运算
该操作使得二进制中每一位向左或右平移n个数位。  
代表性的题目有[比特位计数](https://leetcode-cn.com/problems/counting-bits/)  
给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。
```
示例 1:
输入: 2
输出: [0,1,1]

示例 2:
输入: 5
输出: [0,1,1,2,1,2]
```
啊~ 一个动态规划题目，动态规划的一个核心就是第n个解可以通过前n个解来求得。对于本题，将n分为奇数与偶数进行讨论。  
当n为奇数时：最低位一定是1，故`n>>1`时，由于各个数位右移动1位的缘故，最低位的1会丢失，所以n的二进制中1出现的次数等于第`n>>1`个解`+1`. 

| 数值    | 二进制 | 二进制中1的个数 |
| ------- | ------ | --------------- |
| 7       | 0111   | 3               |
| 3(7>>3) | 0011   | 2               |

当n为偶数时：最低位为0，故`n>>1`时，最低位的0的丢失不会影响二进制1出现的次数，所以n的二进制中1出现的次数等于第`n>>1`个解.  

| 数值    | 二进制 | 二进制中1的个数 |
| ------- | ------ | --------------- |
| 6       | 0110   | 2               |
| 3(6>>3) | 0011   | 2               |

动态规划的状态转移方程：
```
if i为偶数：
    result[n] = result[n>>1]
else 
    resut[n] = result[n>>1] + 1
```
[代码解法出处](https://leetcode-cn.com/problems/counting-bits/solution/yi-bu-bu-fen-xi-tui-dao-chu-dong-tai-gui-3yog/)
```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        res = [0] * (n + 1)
        for i in range(1, n + 1):
            res[i] = res[i >> 1] + (i & 1)
        return res
```

# 参考
1. [python 异或的应用
](https://blog.csdn.net/qq_23944915/article/details/108741782?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-2.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-2.control)  
2. [Python简单的位运算](https://blog.csdn.net/qq_42780731/article/details/107939545)  
 
