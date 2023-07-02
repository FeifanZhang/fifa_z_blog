# 坐标轴辅助器
* 简单模拟3坐标轴
* 红色 x；绿色y；蓝色轴
# 例子
* 黑色背景 + 坐标轴辅助器
```js
import * as THREE from "three";
import { OrbitControls } from'three/examples/jsm/controls/OrbitControls.js';

// 添加坐标轴辅助器
// 构造方法参数：坐标轴长度
const axesHelper = new THREE.AxesHelper(3.1415926);
// 将辅助器添加至场景中
scene.add(axesHelper);
```