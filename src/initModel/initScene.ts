// 场景设置
// import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { myChannel } from '../utils/basic.js'
const { addResponseEventListener, emitUIInteraction } = myChannel

// import { operPoint, selectAllView } from '../api/api.js'
import { BASE_URL } from '../utils/basic.js'
import { 
  selectPoint,
  updatePoint,
  insertPoint,
  deletePointById
} from '../api/point.js'

interface WeatherParams{ 
  weather: '晴天无云' | '多云' | '雾天' | '阴天' | '晴天有云' | '雨天' | '太阳雨' | '雷雨' | '沙尘' | '沙尘暴' | '雪天' | '暴风雪' | '太阳雪',
  where_pass_id: string
}
interface TimeParams{ 
  time: string,
  where_pass_id: string
}
interface InitShotParams{ 
  initShot: string, // 镜头id
  where_pass_id: string
}
// 天气 跟ue通信并向接口提交 1 已重构
export async function changeWeather(weatherParams: WeatherParams): Promise<{}> {
  const { data } = await updatePoint({
    // "oper_type": "updatePoint",
    ...weatherParams
  })
  let Message: number

  emitUIInteraction({
    Category: "changeWeather",
    weather: weatherParams['weather']
  })
  let ueMsg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("changeWeatherResponse", (uedata?: string): {} => {
      if(data.code==1001){
        Message = data.value
        // console.log(Message)
        ueMsg = JSON.parse(JSON.stringify(uedata))
        resolve({ ueMsg, Message })
      }else{
        reject(new Error(data.msg))
        
      }
      return ueMsg
    })
  })
}

// 关卡
// 读取关卡 从接口拿到数据 给前端 1 已重构
export async function readPass(project_id: string): Promise<{}> {
  project_id = project_id.toString()
  const { data } = await selectPoint({
    // "oper_type": "selectPoint",
    project_id
  })
  let Message: []

  return new Promise<{}>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}

// 关卡切换 只跟ue通信 并向ue发消息
export async function changePass(pass_id: string, EVRSceneName:string=''): Promise<{}> {
  if (EVRSceneName.length > 0) {
    emitUIInteraction({
      Category: "changePass",
      pass_id,
      baseURL: BASE_URL + '/mix/selectAllView',
      EVRSceneName
    })    
  }else{
    emitUIInteraction({
      Category: "changePass",
      pass_id,
      baseURL: BASE_URL + '/mix/selectAllView'
    })
  }

  // return Promise.resolve({"Success":true,"Message": "xxxx"})
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("InitPassCompleteResponse", (uedata?: string): void => {
      let ueMsg: {} = JSON.parse(JSON.stringify(uedata))
      if(ueMsg['Success'].toString() === 'true'){
        resolve(ueMsg)
      }else{
        // 因为selectAllView接口报错，调用失败回调
        reject(ueMsg)
        console.log('ue初始化失败--------------', ueMsg)
      }
    })
  })
}

// 修改时间 跟ue通信并向接口提交 1 已重构
export async function changeTime(timeParams: TimeParams): Promise<{}> {
  const { data } = await updatePoint({
    // "oper_type": "updatePoint",
    ...timeParams
  })
  let Message: number

  emitUIInteraction({
    Category: "changeTime",
    time: timeParams['time']
  })
  let ueMsg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("changeTimeResponse", (uedata?: string): {} => {
      if(data.code==1001){
        Message = data.value
        // console.log(Message)
        ueMsg = JSON.parse(JSON.stringify(uedata))
        resolve({ ueMsg, Message })
      }else{
        reject(new Error(data.msg))
        
      }
      return ueMsg
    })
  })
}

// 设置初始镜头 已重构
export async function setInitShot(initShotParams: InitShotParams): Promise<{}> {
  const { data } = await updatePoint({
    // "oper_type": "updatePoint",
    ...initShotParams
  })
  let Message: number
  emitUIInteraction({
    Category: "setInitShot",
    shot_id: initShotParams['initShot']
  })
  let ueMsg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("setInitShotResponse", (uedata?: string): {} => {
      if(data.code==1001){
        Message = data.value
        // console.log(Message)
        ueMsg = JSON.parse(JSON.stringify(uedata))
        resolve({ ueMsg, Message })
      }else{
        reject(new Error(data.msg))
        
      }
      return ueMsg
    })
  })
}

// 切换ue状态 只跟ue通信 并向ue发消息
interface projectData{ 
  project_id: string,
  pass_id: string,
  EVRSceneName: string,
  status: string
}
export async function changeUEStatus(projectData: projectData): Promise<{}> {
  let { project_id, pass_id, EVRSceneName, status } = projectData
  let obj = {
    Category: "sendMaterialAndChangePass",
    pass_id,
    baseURL: BASE_URL + '/mix/selectAllView',
    project_id,
    baseURL2: BASE_URL + '/material/selectMaterial',
    // origin read bind preview edit
    status: status, // bind edit
    EVRSceneName
  }
  // 默认增加EVRSceneName
  obj['EVRSceneName'] = "Test3"
  console.log('向ue发送的数据 ======== ',obj)
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("sendMaterialAndChangePassResponse",(uedata) => {
      uedata = JSON.parse(JSON.stringify(uedata))
    })
    emitUIInteraction(obj)
    // 接收到ue初始化完成的信号，执行成功回调。edit没发，origin,read,bind,preview发了
    addResponseEventListener("InitPassCompleteResponse",(uedata) => {
      let ueMsg: {} = JSON.parse(JSON.stringify(uedata))
      if(ueMsg['Success'].toString() === 'true'){
        // this.successCallback(ueMsg)
        resolve(ueMsg)
      }else{
        // 因为selectAllView接口报错，调用失败回调
        // this.errorCallback(ueMsg)
        console.log('ue初始化失败--------------', ueMsg)
        reject(ueMsg)
      }
      console.log('接收到ue初始化完成--------------',uedata)
    })
  })
}