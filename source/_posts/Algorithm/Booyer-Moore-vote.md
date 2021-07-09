---
title: 摩尔投票法
toc: true
tags:
  - python
  - leetcode
  - Booyer-Moore-vote
categories:
  - - algorithm
    - Booyer-Moore-vote
date: 2021-06-10 10:48:09
---
# 摩尔投票法
摩尔投票法解决的是一个无序数组中，找到出现次数大于元素总数（即数组长度）1/2的元素。会从以下几个方面对算法进行介绍：
1. 算法简介
2. 算法原理
3. 算法的实现
4. 算法限制
<!-- more -->
---
## 算法简介
摩尔投票法解决的是一个无序数组中，找到出现次数大于总数（即数组长度）1/2的元素，算法的先决条件是该元素一定存在，元素的出现次数限定了数组中只存在一个元素满足要求（不可能有两个元素的出现次数同时超过总数的1/2）。通俗的说，我们已经知道一定有数值出现次数大于总数的1/2，算法则是将其找出来。
## 算法原理
将数组中的元素根据数值分成若干组，则必定有一组的元素数量比剩余组的元素数量之和还要多（因为算法的先决条件摆在这里，即一定存在一个数值出现次数大于总数1/2），我们暂且称其为most组。算法的思路，是从任意一组中挑出一个元素，挑选其他组的一个元素“同归于尽”，因为most组中元素数量比其他组的元素之和还要多，故most组一定会有元素“幸存”，即使遇到所有的组都选择和most组“同归于尽”这种极端情况，most组也不会“绝户”（人口优势摆着）。从中我们能发现，该算法的核心是让一个元素去和任意一个数值不相等的元素“同归于尽”，然后循环此操作即可求出结果。
## 算法的实现
在算法的实现中，对其进行了简化：先开辟一个新的数组pk组，然后原数组的指针依次遍历第0位至最后一位元素，被指针遍历到的元素只有两种结果：“同归于尽”或“加入”：若与pk组内元素数值相同，则“加入”pk组：pk组数量+1；反之则与pk组”同归于尽”：即pk组数量-1，无论是”同归于尽”还是“加入”，指针所指元素肯定是要从原数组中“被移除”的：即指针后移。若pk组内为空，则证明pk组内元素全部“战死”，或pk组从未有元素加入（即指针指向原数组第0位时，pk组为默认的空值）。pk组内为空则命令指针所指元素加入pk组：pk组数量+1.该方法确保了”同归于尽“发生在不同数值的元素间（即你和我一样，就加入；否则便同归于尽），而且仅需遍历一遍原数组，极大的减少了时间复杂度。
```Python风格的伪代码实现
def booyer_moore_vote(nums[int]) -> int:
  pk组 = []
  for 通过指针遍历nums内元素:
    if pk组内为空：
      指针所指元素加入pk组
    elif 指针所指元素数值 != pk组内元素数值:
      pk组元素 -= 1
    else:
      pk组元素 += 1
  return pk组内元素数值
```
## 算法限制
算法简介中已经说明，该算法适用前提为已确定数组中含有出现次数大于总数（即数组长度）1/2的元素，若不符合该条件会出现什么情况？
例如数组`nums = [3,3,3,1,1,1,2]`,不存在出现次数大于总数（即数组长度）1/2的元素。整个过程会是pk组有3个数值为3的元素依次加入，直到“遇见”数值为1的元素，pk组内的3个3会被nums内的3个1消耗掉，当指针指向最后一个元素时，pk组已经为空，故该元素进入pk组，成为最后的赢家。简单一点说，该算法极易引起大团体互相攻击，导致几个大团体”相互毁灭”：而人数极少的小团体躲在“数组最后的位置”获得胜利。
