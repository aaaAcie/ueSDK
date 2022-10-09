// 场景设置
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'


// 天气
export function changeWeather(weather: '晴天无云' | '多云' | '雾天' | '阴天' | '晴天有云' | '雨天' | '太阳雨' | '雷雨' | '沙尘' | '沙尘暴' | '雪天' | '暴风雪' | '太阳雪'): Promise<{}> {
  emitUIInteraction({
    Category: "changeWeather",
    weather
  })
  let msg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("changeWeatherResponse", (data?: string): {} => {
      try {
        msg = JSON.parse(data)
        // msg = data
        resolve(msg)
      } catch (error) {
        reject(new Error(error))
      }
      return msg
    })
  })
}

// 关卡
// 读取关卡
export function readPass(): Promise<{}> {
  emitUIInteraction({
    Category: "readPass"
  })
  let msg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("readPassResponse", (data?: string): {} => {
      try {
        msg = JSON.parse(data)
        // msg = data
        resolve(msg)
      } catch (error) {
        reject(new Error(error))
      }
      return msg
    })
  })
}

// 关卡切换
export function changePass(pass: string): Promise<{}> {
  emitUIInteraction({
    Category: "changePass",
    pass
  })
  let msg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("changePassResponse", (data?: string): {} => {
      try {
        msg = JSON.parse(data)
        // msg = data
        resolve(msg)
      } catch (error) {
        reject(new Error(error))
      }
      return msg
    })
  })
}

// 修改时间
export function changeTime(time: string): Promise<{}> {
  emitUIInteraction({
    Category: "changeTime",
    time
  })
  let msg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("changeTimeResponse", (data?: string): {} => {
      try {
        msg = JSON.parse(data)
        // msg = data
        resolve(msg)
      } catch (error) {
        reject(new Error(error))
      }
      return msg
    })
  })
}
