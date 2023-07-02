# 轨道控制器
* 使相机围绕目标进行轨道运动

```js
import * as THREE from "three";
import { Color } from "three";

// 导入轨道控制器
import { OrbitControls } from'three/examples/jsm/controls/OrbitControls.js';

//========下面是轨道控制器==========

// 创建轨道控制器
// 构造方法参数：相机(无比添加至场景中) & 渲染器的canvas组件
const controls = new OrbitControls(camera, renderer.domElement);

function render() {
    // 使用渲染器，通过相机将场景渲染进来
    renderer.render(scene, camera);

    // 告诉浏览器 下一帧更新时，继续执行render函数
    requestAnimationFrame(render);  

}

render(); // 初始帧渲染
```