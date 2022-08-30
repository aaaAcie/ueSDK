
const myadd = require('./src/add.js')
const {  myHandleResponseFunction, setRes } = require('./src/basic/basicSetting')

// const webRtcPlayer = require('./src/basic2/webRtcPlayer')
const {	addResponseEventListener, emitUIInteraction, emitCommand, onExpandOverlay_Click, load } = require('./src/basic2/app')
const camera = require('./src/simulation/camera')

// export * from './src/basic2/app'
// export * from './src/basic/basicSetting'

// 向外暴露需要的成员
module.exports = {
  ...myadd,

  addResponseEventListener,
  emitUIInteraction,
	emitCommand,
	onExpandOverlay_Click,
	load,

  // basicSetting
  myHandleResponseFunction,
	setRes,

  //
  camera
}