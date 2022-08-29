文章主要内容分类两个部分：
1. 首先是list中基本操作的时间复杂度及其特点
2. dict中基本操作的时间复杂度及其特点
3. set中中基本操作的时间复杂度及其特点

# list的时间复杂度及其特点
`i`、`a`为列表名称
`idx`为列表元素下标(类似命名的`idx_a`以及`idx_b`也是下标)
`obj`为插入或操作的元素

| 操作        | 示例                  | 时间复杂度       | 备注                                                                                            |
| ----------- | --------------------- | ---------------- | ----------------------------------------------------------------------------------------------- |
| index       | i[idx]                | O(1)             | 根据列表的`起始地址+偏移量`从而得到相应的数值，故时间复杂度与结果所在的位置无关                 |
| store       | i[idx] = obj          | O(1)             | 与index同理                                                                                     |
| length      | len(idx)              | O(1)             |                                                                                                 |
| append      | i.append(obj)         | O(1)             | 在列表最后位置添加一个元素                                                                      |
| pop         | i.pop() OR i.pop(idx) | O(1) OR O(n)     | 返回列表中最后一个元素时，复杂度为O(1),返回指定位置的元素，复杂度为O(n)                         |
| remove      | i.remove(obj)         | O(n)             | 无返回值，直接移除列表中第一个与obj值相等的元素                                                 |
| clear       | i.clear()             | O(1)             | 亦可写作`i = []`                                                                                |
| slice       | i[idx_a:idx_b:step]   | O(idx_b - idx_a) | 具体情况参考该篇文章[彻底搞懂Python切片操作](https://www.cnblogs.com/malinqing/p/11272485.html) |
| extend      | i.extend(a)           | O(len(a))        | 算法时间复杂度取决于列表`a`的长度，列表扩展的另一种写法：`i = i + a`                            |
| insert      | i.insert(idx, obj)    | O(N)             | 该操作会使`obj`元素插入列表的`index`位置，列表自动向后扩充                                      |
| sort        | i.sort                | O(Nlog n)        | 返回已排好序的列表                                                                              |
| max() min() | max(i) min(i)         | O(n)             | 返回列表中的最值                                                                                |
| in          | obj in i              | O(n)             | 需遍历列表，故复杂度为O(n)。返回值为boolean，一般与if连用                                       |
| == OR !=    | i == a                | O(n)             | 需要对i、a两个列表内全部数据进行比较                                                            |

1. 列表中，不需要遍历全部元素的操作，尤其是通过输入列表偏移量的方法（即方法传入的参数是元素的位置，如index、store以及pop等），其时间复杂度为O（1）。
2. 列表中查找元素速度会因为数据的增多而降低效率。
3. 列表的优势是占用空间少，内存消耗少。
4. 列表的缺点是其长度是在声明时就规定了其大小，当数据增加时，会需要扩容（JAVA中尤其明显，需要提前声明数组长度。而Python会在列表达到阈值时自行扩充）；而为了保持列表的有序性以及连续性，扩容时会将旧列表完整的copy至全新的更大的连续空间中。故该操作会占用大量空间。

# dict的时间复杂度  
| 操作         | 案例                             | 时间复杂度 | 备注                                                      |
| ------------ | -------------------------------- | ---------- | --------------------------------------------------------- |
| index        | d[k]                             | O(1)       |                                                           |
| store        | d[k] = 1                         | O(1)       |                                                           |
| length       | len(d)                           | O(1)       |                                                           |
| delete       | del d[k]                         | O(1)       |                                                           |
| get          | d.get(k)                         | O(1)       | 获取`k`值对应的`value`                                    |
| setdefault   | d.setdefault(k, default = value) | O(1)       | 与`get`类似，若`k`没有对应`value`，则将该键值对加入字典中 |
| pop          | d.pop(k)                         | O(1)       | 返回`k`所对应的`value`,并将该键值对从`d`中删除            |
| popitem      | d.popitem(k)                     | O(1)       | 返回`d`中最后一组键值对,并将该键值对从`d`中删除           |
| clear        | d.clear()                        | O(1)       | 与set_ = {} 以及 dict_ = dict()同理                       |
| view         | d.keys()                         | O(1)       |                                                           |
| constraction | dict(k:v)                        | O(len())   |                                                           |
| iteration    | d.keys()                         | O(N)       |                                                           |
|items()|for k, v in dic.items()|O(N)|和enumerate一样，遍历字典内键值对|
|search the key|key in d OR key not in d|O(1)|返回值为Boolean|

1. 字典插入和查找速度极快，不会因为数据的增多而降低效率。
2. 其代价就是使用空间换取时间。
3. 字典在查找输入的`index key`是否存在时，会先计算`index key`的hash值，由于hash值较长，故python会截取最低的若干位与字典表元中对应数位的hash值进行比较，找不到则抛出KeyError；若截取的hash值相等，但key值不等，则发生了哈希冲突，会截取新的hash片段重新比对。
4. 字典进行插入时，不需要考虑像列表一样扩容的问题，而是直接找一个可用空间存入新的键值对即可，因为其“见空就插”的特性，插入的位置可能远离字典的任何一个键值对，也可能在两个键值对中间，故字典具有散列性（字典内元素排列不连续）和无序性。

# set的时间复杂度

| 操作         | 案例          | 时间复杂度         | 备注                      |
| ------------ | ------------- | ------------------ | ------------------------- |
| length       | len()         | O(1)               |                           |
| add          | s.add()       | O(1)               |                           |
| containment  | x in/not in s | O(1)               | 比list或tuple的O(N)快很多 |
| remove       | s.remove()    | O(1)               |                           |
| discard      | s.discard()   | O(1）              |                           |
| pop          | s.pop()       | O(1)               |                           |
| clear        | s.clear()     | O(1)               |                           |
| construction | set(t)        | O(len(t)           | 取决于`t`的长度           |
| == or!=      | s != t        | O(len(s))          |                           |
| <= or =      | s <= t        | O(len(s))          |                           |
| >= or >      | s > t         | O(len(t))          |                           |
| union        | s t           | O(len(s) + len(t)) |                           |
| interaction  | s & t         | O(len(s) + len(t)) |                           |
| difference   | s - t         | O(len(s) + len(t)) |                           |
| symmetric    | s ^ t         | O(len(s) + len(t)) |                           |
| iteration    | for v in s:   | O(N)               |                           |
| copy         | s.cpoy()      | O(N)               |                           |

# 参考
[Python dict 时间复杂度_Python上的时间复杂度](https://blog.csdn.net/weixin_36372610/article/details/113582573)，文章除了介绍列表、字典、以及时间复杂度的大O表示法。

