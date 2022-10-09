// const { load,hideOverlay,closews } = require('../basic2/app')
const { load,closews,passStats,emitUIInteraction } = require('../basic2/myApp')



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
  connect():Promise<HTMLElement> {
    return new Promise((resolve,reject) => {
      console.log(this.url)
      let streamingVideo = null
      // load(this.url)
      load(this.url, this.domId).then((ws) => {
        // 连接成功后 可以在这里给ue发消息，发送基本配置
        emitUIInteraction({
          // Category: "addPOIModel",
          Category: "基本配置",
          
        })
        this.successCallback(ws)
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
