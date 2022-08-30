const {	addResponseEventListener, emitUIInteraction } = require('../basic2/app')

class Camera {
  constructor(cameraRange=60, cameraDistance=[1,1000]) {
    this.cameraRange = cameraRange
    this.cameraDistance = cameraDistance
  }
  // 设置底座场景中摄像机镜头视场角
  setCameraRange(deg){
    this.cameraRange = deg.cameraRange
    emitUIInteraction(deg)
  }
  // 设置底座场景中摄像机镜头可视距离
  setCameraDistance(dis){
    this.cameraDistance = dis.cameraDistance
    emitUIInteraction(dis)
  }
}

// let aaa = new mxxx.camera()
// aaa.setCameraRange({cameraRange: 40})

module.exports = Camera

