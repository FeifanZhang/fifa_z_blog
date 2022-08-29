
## vue 钩子函数
### 特征介绍
| 生命周期 | 是否获取dom节点 | 是否可以获取data | 是否获取methods |
| ----------| --------------- | ---------------- | --------------- |
| beforeCreate    | 否              | 否               | 否              |
| created            | 否              | 是               | 是              |
| beforeMount   | 否              | 是               | 是              |
| mounted         | 是              | 是               | 是              |
| beforeUpdate | 是              | 是               | 是              |
| updated          | 是              | 是               | 是              |

## vue的options
1. el: 
    类型：string或HTMLElement
    决定Vue实例会挂载到哪一个DOM
2. methods：
   类型： function
   属于vue的方法，可在整个组件内进行调用
3. data:
    类型：obj或function（组件当中，data必须是函数）
    vue内部对应的数据对象
方法：定义在类里面
函数：free

## 参考
[vue中created与mounted区别](https://segmentfault.com/a/1190000020058583)

