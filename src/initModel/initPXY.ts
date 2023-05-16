import { enterApp, closeApp, emitUIInteraction, addResponseEventListener, getFnMap } from '../pxy/pxy'
import { selectAllView } from '../api/api.js'
import { BASE_URL } from '../utils/basic.js'
// import '../pxy/jquery.min.js'

interface ConnectParams {
  url?: string // 底座连接地址
  domId: string // 底座dom，⼤屏有固定的底座位置
  config: {
    serverAddr: string // server地址
    testAppId: string // 平行云上的AppId
  }
  resolution?: string // 底座分辨率
  options?: object // 可选剩余参数
  successCallback?: () => {} // 连接成功回调⽅法
  errorCallback?: () => {} // 连接失败回调⽅法 
}

export class initUEPXY {
  url?: string
  domId: string
  stats: object
  config: {
    userLocalIP: true
    server: string
    webclient: string
    serverAddr: string // server地址
    testAppId: string // 平行云上的AppId
  }
  resolution?: string // 底座分辨率
  options?: object // 可选剩余参数
  successCallback?: ({ poster, initMouseEvent, emitUIInteraction, addResponseEventListener }) => {}
  errorCallback?: (v?) => {}
  constructor(parameters: ConnectParams) {
    // this.url = parameters.url
    this.domId = parameters.domId
    this.successCallback = parameters.successCallback
    this.errorCallback = parameters.errorCallback
    const {serverAddr, testAppId} = parameters.config
    this.config = {
      userLocalIP: true,
      server: "http://" + serverAddr + "/", // server
      webclient: "http://" + serverAddr + "/webclient", // client
      // webclient: "http://192.168.0.122:8080/", // debug client
      // testAppId: "745612252752642048",
      testAppId,
      serverAddr
      // testAppUrl: "http://127.0.0.1:8080/cloudlark/webclient/#/?appServer=192.168.0.223&appPort=10002&taskId=123456&debugTask=true&logLevel=info&",
    }
  }
  // 返回streamingVideo的dom实例
  connect(projectData={project_id: '1', pass_id: 'demoProject_1', EVRSceneName:''}):Promise<{}> {
    let { project_id, pass_id, EVRSceneName } = projectData
    let obj = {
      Category: "sendMaterialAndChangePass",
      pass_id,
      baseURL: BASE_URL + '/mix/selectAllView',
      project_id,
      baseURL2: BASE_URL + '/material/selectMaterial'
    }
    // 增加EVRSceneName
    if (EVRSceneName?.length>0) {
      obj['EVRSceneName'] = EVRSceneName
    }
    console.log(obj)

    return new Promise((resolve,reject) => {
      // console.log(this.url)
      let streamingVideo = null
      let Message: {}

      enterApp(this.config, this.domId).then((data: { poster: {}, initMouseEvent: Function }) => {
        const { poster, initMouseEvent } = data
        setTimeout(() => {
          console.log('kaiqilm?????');
          
          addResponseEventListener("sendMaterialAndChangePassResponse",(uedata) => {
            uedata = JSON.parse(uedata)
            console.log('---------------------------',uedata);
          })
          emitUIInteraction(obj)
          this.successCallback({ poster, initMouseEvent, emitUIInteraction: Function, addResponseEventListener: Function })
        },1000)
        resolve({'success': true})
      }).catch((reason) => {
        this.errorCallback(reason)
        console.log('failed', reason)
      })
    })
  }

  disconnect():void {
    // 底座关闭连接 
    closeApp(this.domId)
    // try {
    //   let box = document.getElementById("streamingAudio")
    //   box.remove()
    // } catch (error) {
    //   console.log(error)
    // }
  }
  // 当前连接状态
  // getStats():object{
  //   this.stats = passStats()
  //   return this.stats
  // }
  // 保存
  save(){
    // savedataResponse
    emitUIInteraction({
      Category: "SaveMeshData"
    })
  }
  getMap(){
    getFnMap()
  }
}

