// import { ue4, ue } from './ue.js'
import { ue4, ue } from './ue4.js'



export function sendToUE (fnName: String, value?: any): void {
  // 给ue发消息
  ue4({
    // Category: "addPOIModel",
    Category: fnName,
    value
  })
}

export function receiveFromUE (fnName: String, cb?: Function): void {
  // 接收ue的消息
  ue.interface[fnName] = cb
}