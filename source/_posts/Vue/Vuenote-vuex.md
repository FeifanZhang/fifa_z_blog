---
title: Vue笔记：vuex
date: 2020-03-24 03:49:21
toc: true
tags:
- vuex
categories:
- [Vue, vuex]
---
## vuex简介
Vuex 是一个专为 Vue.js集中式存储管理多个组件共享的变量。比如：多个兄弟组件之间共用同一个参数来调整自己的状态，传参的方法对于多层嵌套的组件将会非常繁琐。跨组件传参，有全局变量时，使用vuex传参。
<!-- more -->
## vuex使用
1. 首先通过`npm install vuex`来安装vuex
2. 在main.vue中，作如下声明：
```javascript
// 首先<script>下导入vuex
import Vuex from 'vuex'
// 将vuex安装进vue
Vue.use(Vuex);
const store = new Vuex.Store({
    // state用来声明变量并初始化
    state:{
        pageStatus: 0,
        token: ""
    },
    // state内的变量不能直接修改，通过调取mutations内的方法进行修改
    // mutation内实现了三个方法：pageStatus的加，减以及字符串token的赋值
    mutations:{
        // 将pageStatus变量 +1
        increase(state){
            state.pageStatus += 1;
        },
        // 将pageStatus变量 +1
        decrease(state){
            state.pageStatus -= 1;
        },
        // 将token赋值，注意要声明输入的参数str
        set_token(state, str){
            state.token = str
        }
    },
    // state内的变量不能直接获取，要通过getters方法声明
    getters:{
        // 获取 token
        get_token(state){
            return state.token
        }
    },
    actions:{
        
    }
});

new Vue({
    render: h => h(App),
    router,
    // 将store挂载进app.vue
    store
}).$mount('#app');
```
3. 在自定义的组件内，声明如下：
``` javascript 首先在computed获取变量,在methed获取变量对应的get set方法

//在 <script> 标签下导入
import {mapState} from 'vuex';

//在 <script> 下的computed获取全局变量，method中获取get set方法：
computed:{
    // 获取全局变量
    ...mapState(['pageStatus', "token"])
},
methed:{
    // 获取全局变量所对应的get set方法
    ...mapState(["increase", "decrease", "set_token"]),
    returnToLogin:function(){
        // 通过调用 main.js的mutations中decrease方法，使得 pageStatus -= 1
        this.$store.commit('decrease');
        // 通过 increase方法来改变token的值（即 global token = this.token）
        this.$store.commit('set_token', this.token);
        this.toClock();
}

```
4. 通过上述方法后，变量可以在vue的模板内进行调用
``` html vue组件的模板内
<div v-show="pageStatus == 0"></div>
```

## 遇到的异常
1.  [Vue warn]: The computed property "token" is already defined in data.
 组件中data声明的变量名称与vuex 中设置的全局变量一样导致报错，即vuex中有名为token的变量，组件的data中也声明了名为token的变量，解决方法：重新命名组件内的变量。


