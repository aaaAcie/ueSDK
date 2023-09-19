/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-02-23 09:43:55
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-02-23 09:51:20
 * @FilePath: \WebServers424\mxxx\src\demo\demo.ts
 * @Description: 
 * 
 */
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'


// 交互
export function demoInteractiveSend(action: string): Promise<{}> {
  emitUIInteraction({
    Category: "demoInteractive",
    action
  })

  let ueMsg: {}
  let msg2: String
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("demoInteractiveResponse", (uedata?: string): {} => {
      try {
        uedata = JSON.parse(JSON.stringify(uedata))
        // ueMsg = uedata['Message']
        resolve({uedata})
      } catch (error) {
        reject(new Error(error))
      }
      return uedata
    })
  })
}