---
title: Vue_axios
date: 2020-03-24 03:49:21
toc: true
tags: 
- axios
categories:
- [Vue, axios]
---
## axios简介
每个前端框架，都会有类似ajax的异步请求来从后台获取参数（通常是通过钩子函数调用），Vue则是通过axios进行异步请求。
<!-- more -->
## axios使用（集合血与泪之后的推荐方案）
在vue组件内直接加入axios，会导致高耦合，如果要修改某些aixos配置，需要找到各个组件内的axios请求进行修改，如果axios停止维护，所有组件内的异步请求需要全部修改。所以需要将axios从组件内抽离和封装来解耦，
1. axios 异步请求的建立：
```javascript 在新建的文件./src/request.js中添加如下代码
import axios from 'axios'
// 设置全局的基础url
axios.defaults.baseURL = 'http://127.0.0.1:8000';
// 通过export导出多个实例 export default只能导出一个实例
export function loginRequest(config){
    //创建axios实例
    const loginRequest = axios.create({
        url: '/api/login/confirmAuth/',
        timeout: 10000,
        method: 'post',
        headers:{
            'Content-Type': 'application/json',
        }
    });
    // 发送真正的网络请求
    return loginRequest(config)
    //如果有一天，此axios无法使用，在loginRequest内重构新代码，return Promise(config)即可
}
```

2. axios在组件中使用（建立请求以及处理响应）：
```javascript 在Vue组件内导入js文件并直接调用
//封装request模块
import {loginRequest} from "../request";

methods: {
    login:function(){
        //直接引用request中封装好的loginRequest即可
        // data是请求体中的参数，用于post请求
        loginRequest({
            data: {
                "username": this.usr,
                "password": this.pwd,
                }
        }).then(res =>{ // 在then里面，拿取返回的结果并进行进一步操作（跳转，或初始化参数）
            console.log(res.status);
            if (res.status == 200){
                // res.data.token：拿取返回的响应体内的参数token
                this.$router.replace({path: '/homepage', query: {token: res.data.token}})
            }
        }).catch(res => {
            // 通过不同的状态码来确定不同的处理方式
            if(res.response.status === 403){
                this.$router.replace({path: '/login'});
            }
        })
    }
},
```

## axios传参
1. params传参
params是在url后面的参数，用于get请求
```javascript 将上文的请求改为params传参
loginRequest({
    url: '/api/login/confirmAuth/',
    // 此处添加 params参数的内容
    // params是在url后面的参数，用于get请求
    params: {
        "username": a,
        "password": b,
        }
}).then(res =>{
    console.log(res.status);
    if (res.status == 200){
        this.$router.replace({path: '/homepage', query: {token: res.data.token}})
    }
}).catch(res => {
    console.log(res);
})
// 最后得到的url是 /api/login/confirmAuth?username=a&password=b
```
2. data传参
data传参参考上文axios的使用，data是放置在请求体内的参数，用于post请求
## axios全局设置
全局设置会使得设置的aixos参数在前端任意组件内都可使用，在request.js文件中如下设置
```javascript
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers['Content-Type'] = 'application/json';
```

## 并发axios
## 拦截器
## 遇到的问题
main.js不能用use配置 Uncaught (in promise) TypeError: Cannot read property 'protocol' of undefined

## 参考
[Axios（自定义配置新建一个 axios 实例并且封装起来）](https://blog.csdn.net/JEFF_luyiduan/article/details/88890962)
[Axios发送请求时params和data的区别](https://www.cnblogs.com/cwzqianduan/p/8675356.html)
