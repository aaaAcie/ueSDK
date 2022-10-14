// 场景设置
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { operPoint, selectAllView } from '../api/api.js'

interface WeatherParams{ 
  weather: '晴天无云' | '多云' | '雾天' | '阴天' | '晴天有云' | '雨天' | '太阳雨' | '雷雨' | '沙尘' | '沙尘暴' | '雪天' | '暴风雪' | '太阳雪',
  where_pass_id: string
}
interface TimeParams{ 
  time: string,
  where_pass_id: string
}
// 天气 跟ue通信并向接口提交 1
export async function changeWeather(weatherParams: WeatherParams): Promise<{}> {
  const { data } = await operPoint({
    "oper_type": "updatePoint",
    ...weatherParams
  })
  let Message: number

  if(data.code==200){
    Message = data.data
    // console.log(Message)
  }
  emitUIInteraction({
    Category: "changeWeather",
    weather: weatherParams['weather']
  })
  let ueMsg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("changeWeatherResponse", (uedata?: string): {} => {
      try {
        ueMsg = JSON.parse(uedata)
        resolve({ ueMsg, Message })
      } catch (error) {
        reject(new Error(error))
      }
      return ueMsg
    })
  })
}

// 关卡
// 读取关卡 从接口拿到数据 给前端 1
export async function readPass(project_id: string): Promise<{}> {
  project_id = project_id.toString()
  const { data } = await operPoint({
    "oper_type": "selectPoint",
    project_id
  })
  let Message: []

  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}

// 关卡切换 只跟ue通信 并向ue发消息
export async function changePass(pass_id: string): Promise<{}> {
  emitUIInteraction({
    Category: "changePass",
    pass: pass_id
  })
  // let ueMsg: {}
  // return new Promise<{}>((resolve, reject) => {
  //   addResponseEventListener("changePassResponse", (uedata?: string): {} => {
  //     try {
  //       ueMsg = JSON.parse(uedata)['Message']
  //       // msg = data
  //       resolve(ueMsg)
  //     } catch (error) {
  //       reject(new Error(error))
  //     }
  //     return ueMsg
  //   })
  // })
  return Promise.resolve({"Success":true})
}

// 修改时间 跟ue通信并向接口提交 1
export async function changeTime(timeParams: TimeParams): Promise<{}> {
  const { data } = await operPoint({
    "oper_type": "updatePoint",
    ...timeParams
  })
  let Message: number

  if(data.code==200){
    Message = data.data
    // console.log(Message)
  }
  emitUIInteraction({
    Category: "changeTime",
    time: timeParams['time']
  })
  let ueMsg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("changeTimeResponse", (uedata?: string): {} => {
      try {
        ueMsg = JSON.parse(uedata)
        // msg = data
        resolve({ ueMsg, Message })
      } catch (error) {
        reject(new Error(error))
      }
      return ueMsg
    })
  })
}
