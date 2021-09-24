---
title: Vue_vue-router
date: 2020-03-24 03:49:21
toc: true
tags:
- vuerouter
categories:
- [Vue, vuerouter]
---
## vue-router简介
vue-router的功能是通过前端路由来调取对应的插件，和后端的url路由类似（后端是通过路由执行对应视图函数），
<!-- more -->
## vue-router基础使用
1. `npm install vue-router --save`安装
2. 如果创建vue app时，选择了vue-router，在src/router目录有一个有index.js 文件,内部搭好了router结构，直接按下面代码创建路由列表即可，如果创建vue app时，没选择加载vue-router 则按如下方法创建:
``` javascript 在项目根目录下创建 router.js 并在里面添加如下代码
import Vue from 'vue'
import VueRouter from 'vue-router'
// 以下是要添加路由的组件
import Nav from './components/homeComponents/Nav.vue'
import Login from './components/Login.vue'
// 将vue-router安装至vue中
Vue.use(VueRouter);
// 创建路由列表
const routes=[
    //单个路由均为对象类型，path代表的是路径，component代表组件
    //处理特殊情况的代码（例如重定向）写在最前面
    {
        // 如果输入的path为空 则重定向到'/login'
        path:'',
        redirect:'login'
    },
    {
        // path是和组件绑定的路径（不要写成url）
        path:'/homepage',
        component:Nav
    },
    {
        path:'/login',
        component:Login
    },

];

//实例化VueRouter并将routes添加进去
const router=new VueRouter({
//ES6简写，等于routes：routes
    routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router
```
3. 在main.js中。作如下修改：
```javascript
// 在main.js文件开头进行如下设置：
// 将vuex注册进入vue内
Vue.use(Vuex);
// 引入 router.js文件，下一步在文件的结尾处挂载
import router from './router.js'
Vue.config.productionTip = false;

// 在文件结尾的new Vue处，挂载引入的router文件
new Vue({
    render: h => h(App),
    // 将router挂载进app.vue
    router,
    // 添加history模式，使得加载的url为html模式（刷新不会出现xxx/#/login的情况）
    mode: 'history'
}).$mount('#app');
```
4. 在 App.vue的<templete>中，加入以下代码：
```html
<template>
  <div id="app">
    /*router-link在浏览器会被渲染为a标签*/
    /*router-link内，to后面的path则是a标签的链接*/
    /*不想将router-link渲染为a标签，增加tag属性转换为其他标签*/
    /*点击login和homepage两个button后，发现可以通过浏览器的后退返回到点击之前的页面状态，在单页面应用是不允许的，设置replace阻止返回*/
    /*replace的原理在下一章节 vue-router路由跳转解释*/
    <router-link to="/login" tag="button" replace>login</router-link>
    <router-link to="/homepage" tag="button" replace>homepage</router-link>
    /*router-view接收每个router-link对应path的组件并显示*/
    <router-view></router-view>
  </div>
</template>
```
使用history模式时，会出现用户在未登录的情况下，直接访问登录后的功能或页面，在后台要有机制去处理未授权的请求，前端axios也要注意从后台catch错误时，要如何处理（强行访问未授权的部分，应当是返回登录界面）

### router-link的用法解析
 `router-link`标签会渲染成a标签，通过tag来将其转化为其他标签，转换完，可添加class方便其进行渲染
```html
/*前端会渲染其成为class为submit的button*/
<router-link to="/login" tag="button" class="submit" replace>login</router-link>
```

## vue-router路由跳转
路由跳转，有两种实现：第一种是`replace`, 即路由跳转后，无法退回之前的状态（浏览器无法使用后退键），第二种就是`push`实现，即可以退回历史状态
``` javascript 在vue组件内如下实现
//路由必须是配置过的路由（参考文章前一部分）
// 跳转到不同的url，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。
this.$router.push('/homepage');
// 同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。
this.$router.replace('/homepage');
```

## 路由传参
### 动态路由（params传参）
类似http请求的RESTful样式（www.a.com/product/1 和 www.a.com/product/2 调用的是同一视图函数 将对应编号的product数据返回给前端）
以下是设置动态路由
``` javascript 在router.js的路由列表中如下设置
const routes=[
    //单个路由均为对象类型，path代表的是路径，component代表组件
    //特殊情况的代码写在最开始，
    {
        path:'',
        redirect:'login'
    },
    {
        //路由中 /:token即为动态的部分
        path:'/homepage/:token',
        component:Nav
    },
    {
        path:'/login',
        component:Login
    },
];
```
``` javascript 在vue组件中要跳转的部分添加如下代码
//将axios中返回响应体内的token和path做拼接
this.$router.replace("/homepage/"+res.data.token);
```
设置完成后，在被路由调用的组件内，拿到动态路由所传的值
```javascript 在被调用的组件内加入
computed:{
    token(){
        // $route所拿到的路由是目前正活跃的路由
        // $router是获取路由列表内所有的路由
        // params.后面跟的参数要和router.js 设置的路由参数一样
        return this.$route.params.token
    }
},
```
### query传参
当有路由嵌套时，无法通过params传参，此时要query传参。
``` javascript 在router.js中配置路由配置（常规配置）
{
    path:'/homepage',
    component:() => import('./components/homeComponents/Nav.vue')
},
```
``` javascript 在组件的文件内加入以下代码来传递参数
// replace内传递的为对象：向路径为 /homepage的组件传递 token为res.data.token内的值
this.$router.replace({path: '/homepage', query: {token: res.data.token}})
// 或者通过router-link来进行query传参
<router-link :to="{path:'/login', query:{token: this.res.res.data.token}}" tag="button" class="submit" replace>login</router-link>
```
``` javascript 在接收参数的组件内加入this.$query.token来接受参数
computed:{
    token(){
        // $route所拿到的路由是目前正活跃的路由
        // $router是获取路由列表内所有的路由
        return this.$route.query.token
    }
},
```

## 懒加载（按需加载）
vue的所有路由下的组件会打包在一个js文件中，当主页面加载时，其余页面也会同时加载。如果项目组件数量巨大，同时加载速度很慢，其中有些x组件需要及时加载（首页，新闻，产品推送），有些则不需要（设置，账户管理这些首页默认不会显示），设置懒加载项目打包时会分在不同js文件下，用户在使用组件时才会加载。
``` javascript 在router.js的路由列表中如下设置
const routes=[
    //单个路由均为对象类型，path代表的是路径，component代表组件
    //特殊情况的代码写在最开始，如果写在最后，后期可能会在后面加代码，特殊情况的代码就难找到了
    {
        path:'',
        redirect:'login'
    },
    {
        //路由中 /:token即为动态的部分
        path:'/homepage/:token',
        component:() => import('./components/homeComponents/Nav.vue')
    },
    {
        path:'/login',
        component:() => import('./components/Login.vue')
    },
];
```

## 路由的嵌套
路由的嵌套类似于后台路由的二次分配，在前端，有一个组件A 其路由为 /A, 他有两个子组件为A1和A2， 子组件的路由应为 /A/A1 和 /A/A2, 如何分配路径，就是路由的嵌套。
``` javascript 在router.js中配置路由
const routes=[
    {
        path:'/homepage',
        component:() => import('./components/homeComponents/Nav.vue'),
        //在父子件下加入children为关键字的子路由列表（懒加载形式）
        children:[
            {
                path: 'anniversary',
                component:() => import('./components/homeComponents/Anniversary.vue')
            },
            {
                path: 'clock',
                component:() => import('./components/homeComponents/Clock.vue')
            },
            {
                path: 'photos',
                component: () => import('./components/homeComponents/Photos.vue')
            },
            {
                path: 'words',
                component: () => import('./components/homeComponents/Words.vue')
            },
        ]
    },

];
```
```html 在vue的模板内这样调用
<div class="NavButtons">
    <h1>HomePage</h1>
    <div><router-link to="/homepage/photos" tag="button" class="submit" replace>照    片</router-link></div>
    <div><router-link to="/homepage/anniversary" tag="button" class="submit" replace>纪念日</router-link></div>
    <div><router-link to="/homepage/clock" tag="button" class="submit" replace>计    时</router-link></div>
    <div><router-link to="/homepage/words" tag="button" class="submit" replace>想说的话</router-link></div>
    <div><input type="button" name="" value="返    回" @click="returnToLogin"/></div>
</div>
```

## 路由导航守卫
路由跳转或在路由跳转时执行一些函数（类似于钩子函数），通过全局的路由导航守卫来监听并且执行。没有用过，等以后更新哈

## 遇到的问题
1. [Vue warn]: Unknown custom element: <submit> - did you register the component correctly? For recursive components, make sure to provide the "name" option.
router-link 的tag不能使用submit要用button

## 参考
[Vue路由（vue-router）详细讲解指南](https://www.cnblogs.com/dengyao-blogs/p/11562257.html)
[vue-router中文文档](https://router.vuejs.org/zh/)
[vue-router的push和replace的区别](https://blog.csdn.net/sinat_36729274/article/details/82114764)
