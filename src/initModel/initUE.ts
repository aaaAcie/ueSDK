// const { load,hideOverlay,closews } = require('../basic2/app')
const { load,hideOverlay,closews,passStats } = require('../basic2/myApp')



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
  ws: any
  domId: string
  stats: object
  constructor(parameters: ConnectParams) {
    this.url = parameters.url
    this.domId = parameters.domId
  }
  connect():void {
    console.log(this.url)
    load(this.url)
  }
  disconnect():void {
    // 底座关闭连接 
    closews()
    hideOverlay()
  }
  // 当前连接状态
  getStats():object{
    this.stats = passStats()
    return this.stats
  }
}
