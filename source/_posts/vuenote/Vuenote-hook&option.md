---
title: Vue笔记：钩子函数&options
date: 2020-03-24 03:49:21
toc: true
tags:
- hook
- options
categories:
- [vue, hook]
- [vue, options]
- [vue, computed]
---

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

### 计算属性
通过计算属性会进行缓存，多次调用时，只要与其相关的参数不变，计算属性只会计算一次
1. 基本使用
```javascript 在vue组件script标签下添加
data:{
    firstname: 'FIFA'
    lastname: 'z'
}
//我想输出时，将firstname和lastname进行拼接后输出
computed:{
    //以调用参数的形式调用此方法:<h2>{{this.fullname}}<h2>
    //因为是计算属性，是属性，所以命名时，用属性的方式命名（名词命名）
    //fullname，不是getfullname
    fullname(){
        return this.firstname+' '+this.lastname
    }
}
```
2. 计算属性的getter和setter方法
```javascript 添加位置和前面一样
computed:{
    fullname:{
        //计算属性一般为只读属性，所以几乎不会用到set方法
        //推荐前面的方法
        set(){
            //so sth
        }
        get(){
            return this.firstname+' '+this.lastname
        }
    }
}
```

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

