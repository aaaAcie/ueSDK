/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-01-16 09:44:34
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-06-28 12:21:00
 * @FilePath: \WebServers424\mxxx\src\initModel\initUE.ts
 * @Description: 
 * 
 */
// const { load,hideOverlay,closews } = require('../basic2/app')
const { load,closews,passStats,emitUIInteraction,addResponseEventListener } = require('../basic2/myApp')
import { selectAllView } from '../api/api.js'
import { BASE_URL } from '../utils/basic.js'
type ConnectStatus = "origin" | "read" | "bind" | "preview" | "edit" | "refresh";
interface ConnectParams {
  url: string // 底座连接地址
  domId: string // 底座dom，⼤屏有固定的底座位置
  resolution?: string // 底座分辨率
  options?: {
    status: ConnectStatus
  } // 可选剩余参数
  successCallback?: (ws: WebSocket, ueMsg:{}) => {} // 连接成功回调⽅法
  errorCallback?: (v?) => {} // 连接失败回调⽅法 
}

export class initUE implements ConnectParams {
  url: string
  domId: string
  stats: object
  resolution?: string // 底座分辨率
  options?: {
    status: ConnectStatus
  } // 可选剩余参数
  successCallback?: (ws: WebSocket, ueMsg:{}) => {} // 接收当前的websocket连接实例
  errorCallback?: (v?) => {}
  constructor(parameters: ConnectParams) {
    this.url = parameters.url
    this.domId = parameters.domId
    this.successCallback = parameters.successCallback
    this.errorCallback = parameters.errorCallback
    this.options = parameters.options
  }
  // 返回streamingVideo的dom实例
  connect(projectData={project_id: '1', pass_id: 'demoProject_1', EVRSceneName:''}):Promise<HTMLElement> {
    let { project_id, pass_id, EVRSceneName } = projectData
    let obj = {
      Category: "sendMaterialAndChangePass",
      pass_id,
      baseURL: BASE_URL + '/mix/selectAllView',
      project_id,
      baseURL2: BASE_URL + '/material/selectMaterial',
      // origin read bind preview edit refresh
      status: this.options?.status, // origin read preview 其他的状态在initScene的changeUEStatus方法中。
      EVRSceneName: '' // 默认增加EVRSceneName
    }
    // update EVRSceneName
    if (EVRSceneName?.length>0) {
      console.log('EVRSceneName: ', EVRSceneName)
      obj['EVRSceneName'] = EVRSceneName
    }

    selectAllView(pass_id).then(({data}) => {
      if (data.code === 1001) {
        console.log(data.value)
      }
    })
    console.log('向ue发送的数据 ======== ',obj)

    return new Promise((resolve,reject) => {
      console.log(this.url)
      let streamingVideo = null
      let Message: {}
      // load(this.url)
      load(this.url, this.domId).then((ws:WebSocket) => {
        // 连接成功后 可以在这里给ue发消息，发送当前项目的默认关卡
        // pass_id
        setTimeout(() => {
          addResponseEventListener("sendMaterialAndChangePassResponse",(uedata) => {
            uedata = JSON.parse(uedata)
          })
          emitUIInteraction(obj)
          // 接收到ue初始化完成的信号，执行成功回调。
          addResponseEventListener("InitPassCompleteResponse",(uedata) => {
            let ueMsg: {} = JSON.parse(uedata)
            if(ueMsg['Success'].toString() === 'true'){
              this.successCallback(ws, ueMsg)
            }else{
              // 因为selectAllView接口报错，调用失败回调
              this.errorCallback(ueMsg)
              console.log('ue初始化失败--------------', ueMsg)
            }
            console.log('接收到ue初始化完成--------------',uedata)
          })
        }, 1000)

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
