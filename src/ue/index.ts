/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-07-18 15:02:26
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-09-19 17:02:58
 * @FilePath: \WebServers424\mxxx\src\ue\index.ts
 * @Description: 
 * 
 */
// import { ue4, ue } from './ue.js'
// import { ue4, ue } from './ue4.js'
import { getMyUE } from './myUE.js'

const ue = getMyUE()
const ue4 = ue.interface.broadcast

export function sendToUE (fnName: String, value?: any): void {
  // 给ue发消息
  ue4(fnName, value)
}

export function receiveFromUE (fnName: String, cb: Function): void {
  // 接收ue的消息
  ue.interface[fnName] = cb
}

export function emitUIInteraction (value: any): void {
  // 给ue发消息
  let Category = value.Category
  ue4(Category, value)
  console.log("%c[发送ue消息 -->]", "background: pink; color: black" , value);
}

export function addResponseEventListener(fnName: String, cb: Function): void {
  // 劫持cb，拦截到cb里获取的response
  const next = (response) => {
    console.log("%c[收到ue消息 <--]", "background: pink; color: black" , response);
    cb(response)
    return 
  }
  // 接收ue的消息
  ue.interface[fnName] = next
}

// export function getUE(): { ue4: {}, ue: {} } {
//   this.ue = ue
//   return {ue4, ue}
// }
export const getUE = (): { ue4: {}, ue: {} } => {
  global.ue = ue
  return {ue4, ue}
}
getUE()
// export class outsideUE {
//   constructor () {
    
//     this.ue = ue
//   }
//   sendToUE(fnName: String, value?: any){
//     // 给ue发消息
//     ue4(fnName, value)
//   }
//   receiveFromUE(fnName: string, cb: Function){
//     // 接收ue的消息
//     ue.interface[fnName] = cb
//   }
// }