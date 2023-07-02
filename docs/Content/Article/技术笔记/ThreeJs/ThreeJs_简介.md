# 简介
* [官方文档](https://threejs.org/)
* 搭建学习环境：
  * [官方文档](https://threejs.org/) 进入[Three.js Github项目](https://github.com/mrdoob/three.js/) & 下载源码并打开
  * 在源码根目录下 运行`npm install` 安装 node_modules
  * Terminal 出现如下指令 证明开启成功

    ```shell
    PS C:\Users\25384\Learn\three.js-dev> npm start

    > three@0.153.0 start
    > npm run dev


    > three@0.153.0 dev
    > concurrently --names "ROLLUP,HTTP" -c "bgBlue.bold,bgGreen.bold" "rollup -c utils/build/rollup.config.js -w -m inline" "servez -p 8080 --ssl"

    [ROLLUP] rollup v3.21.7
    [ROLLUP] bundles src/Three.js → build/three.module.js...
    [HTTP] server started on ::8080 for path: C:\Users\25384\Learn\three.js-dev
    [HTTP] available on:
    [HTTP]    https://localhost:8080
    [HTTP]    https://172.20.10.2:8080
    [HTTP]    https://127.0.0.1:8080
    [HTTP] press CTRL-C to stop the server.
    [ROLLUP] created build/three.module.js in 1.6s
    [ROLLUP] bundles src/Three.js → build/three.module.min.js...
    [ROLLUP] created build/three.module.min.js in 3.4s
    [ROLLUP] bundles src/Three.js → build/three.cjs...
    [ROLLUP] created build/three.cjs in 1.3s
    [ROLLUP] bundles src/Three.js → build/three.js...
    [ROLLUP] created build/three.js in 1.2s
    [ROLLUP] bundles src/Three.js → build/three.min.js...
    [ROLLUP] created build/three.min.js in 3.6s
    ```
* 根据`available on` 给出的 url 进入threeJs文档
  * `/docs/`是文档
  * `/editor/`可进行threeJs3D物体编辑

# PARCEL打包工具
* [官方文档](https://v2.parceljs.cn/)，注意这是parcel v2版本的官网；1、2两版有些许的兼容性问题，[v1官网在此](https://www.parceljs.cn/getting_started.html)，下面介绍的使用方法默认为v2
## PARCEL、ThreeJs引入 & 运行:
  * 命令行直接安装PARCEL
  
    ```cmd
    npm install --save-dev parcel   
    ```
    若出现`Invalid Version:` 提示，升级npm （`npm update`）后重新执行该命令
  
  * 在`package.json`文件下添加parcel对应的任务脚本（`<your entry file>` 就是需要打包的入口文件的相对路径）
    ```json
    {
        "scripts": {
            "dev": "parcel <your entry file>", /*这里添加打包入口文件(html), 后面执行 npm run dev 时 就会调用parcel命令打包文件*/
            "build": "parcel build <your entry file>"
        }
    }
    ```
  * 安装 threeJs
   ```cmd
   npm install three --save
   ```
  * 运行项目
    ```cmd
    npm run dev
    ```

## threeJs实例
简单的场景：黑色场景 + 黄色立方体
```js
import * as THREE from "three"
import { Color } from "three";

// 1. 创建场景
const scene = new THREE.Scene();

// 2. 实例化相机
// 2.1 创建相机（观察视角）
const camera = new THREE.PerspectiveCamera(75, // 视野角度
    window.innerWidth / window.innerHeight,  // 相机的宽高比 (即浏览器窗口的宽高比)
    0.1, 1000);  // 视野范围（当物体在近段与远端之间才会进行显示）

// 2.1 设置相机位置
camera.position.set(0, 0, 10);

// 2.3 将相机添加至场景
scene.add(camera);

// 3. 加入内容
// 3.1 实例化立方体信息
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// 3.2 实例化材质
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});

// 3.3 根据立方体信息 & 材质创建实体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 3.4 初始化物体位置
// 输入参数： x, y, z, 若不及逆行位置设置 默认为 (0, 0, 0) 即屏幕中心
cube.position.set(5, 0, 0);

// 或是直接对 x,y, z 任意坐标单独操作
cube.position.x = 0;

// 3.5 几何体添加至场景
scene.add(cube);

// 4. 创建渲染器
// 4.1 初始化渲染器 输入参数：json类型 用于抗锯齿
const renderer = new THREE.WebGLRenderer({ antialias: true });

// 4.2 设置渲染尺寸 & 大小
renderer.setSize(window.innerWidth, window.innerHeight);

// renderer的渲染的本质就是将对应内容投射至canvas上
// 4.3 将renderer渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 4.4 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera);

```