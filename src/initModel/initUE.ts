// const { load,hideOverlay,closews } = require('../basic2/app')
const { load,closews,passStats,emitUIInteraction,addResponseEventListener } = require('../basic2/myApp')
import { selectAllView } from '../api/api.js'
import { BASE_URL } from '../utils/basic.js'

interface ConnectParams {
  url: string // 底座连接地址
  domId: string // 底座dom，⼤屏有固定的底座位置
  resolution?: string // 底座分辨率
  options?: object // 可选剩余参数
  successCallback?: () => {} // 连接成功回调⽅法
  errorCallback?: () => {} // 连接失败回调⽅法 
}

export class initUE {
  url: string
  domId: string
  stats: object
  resolution?: string // 底座分辨率
  options?: object // 可选剩余参数
  successCallback?: (ws: WebSocket) => {} // 接收当前的websocket连接实例
  errorCallback?: (v?) => {}
  constructor(parameters: ConnectParams) {
    this.url = parameters.url
    this.domId = parameters.domId
    this.successCallback = parameters.successCallback
    this.errorCallback = parameters.errorCallback
  }
  // 返回streamingVideo的dom实例
  connect(projectData={project_id: '1', pass_id: 'demoProject_1'}):Promise<HTMLElement> {
    let { project_id, pass_id } = projectData
    console.log({
      Category: "sendMaterialAndChangePass",
      // pass_id: "demoProject_1",
      pass_id,
      baseURL: BASE_URL + '/mix/selectAllView',
      project_id,
      // project_id: "1",
      baseURL2: BASE_URL + '/operMaterial'
    })
    return new Promise((resolve,reject) => {
      console.log(this.url)
      let streamingVideo = null
      let Message: {}
      // load(this.url)
      load(this.url, this.domId).then((ws) => {
        // 连接成功后 可以在这里给ue发消息，发送当前项目的默认关卡
        // pass_id
        setTimeout(() => {
          addResponseEventListener("sendMaterialAndChangePassResponse",(uedata) => {
            uedata = JSON.parse(uedata)
          })
          emitUIInteraction({
            Category: "sendMaterialAndChangePass",
            // pass_id: "demoProject_1",
            pass_id,
            baseURL: BASE_URL + '/mix/selectAllView',
            project_id,
            // project_id: "1",
            baseURL2: BASE_URL + '/operMaterial'
          })
          this.successCallback(ws)
          // emitUIInteraction({
          //   Category: "sendMaterial",
          //   pass_id: "demoProject_1",
          //   baseURL: BASE_URL + '/selectAllView'
          // })
        },1000)

        // this.successCallback(ws)
        streamingVideo = document.getElementById("streamingVideo")
        resolve(streamingVideo)

      }).catch((reason) => {
        this.errorCallback(reason)
        console.log('failed', reason)
      })

    })
  }

  disconnect():void {
    // 底座关闭连接 
    closews()
    try {
      let box = document.getElementById("streamingAudio")
      box.remove()
    } catch (error) {
      console.log(error)
    }
  }
  // 当前连接状态
  getStats():object{
    this.stats = passStats()
    return this.stats
  }
  // 保存
  save(){
    // savedataResponse
    emitUIInteraction({
      Category: "SaveMeshData"
    })
  }
}
