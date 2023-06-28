/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-06-16 09:09:56
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-06-26 17:42:22
 * @FilePath: \WebServers424\mxxx\src\webServer\index.ts
 * @Description: 
 * 
 */

interface wsParams{
  name: string
}
const getLauncherServer = (port: string, msgMap: Map<string, Function>):Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${port}`)
    
    ws.onopen = () => {
      console.log('WebSocket opening -----')
      resolve(ws)
    }
    ws.onmessage = (msgRaw) => {
      var msg: {type: string, name: string};
      try {
        msg = JSON.parse(msgRaw.data);
      } catch(err) {
        console.error(`cannot parse Streamer message: ${msgRaw}\nError: ${err}`);
      }
      // console.log(msg,msg.type)
      try {
        let key = msg.type // key
        msgMap.get(key)(msg) // 给value传msg  // 根据type拿到回调，给回调传值
      } catch (error) {
        console.log(error)
      }
    }
    ws.onclose = (e) => {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(function() {
        getLauncherServer(port, msgMap);
      }, 2000);
    }
  })
}

class mxLauncher {
  ws: WebSocket
  msgMap: Map<string, Function>
  constructor(ws: WebSocket, msgMap: Map<string, Function>) {
    this.msgMap = msgMap
    this.ws = ws
  }

  send(wsParams: wsParams){
    if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(wsParams))
    }
  }
  addResponseEventListener(type: string, cb: Function){
    this.msgMap.set(type, cb) // 根据type注册回调
  }
  getSceneByLauncher(wsParams: wsParams) {
    const data = {type: 'getData', ...wsParams}
    this.send(data)
    return new Promise<{}>((resolve, reject) => {
      this.addResponseEventListener(data.type, (res: {}) => {
        resolve(res)
      })
    })
  }
  openExeByLauncher(wsParams: wsParams) {
    const data = {type: 'openExe', ...wsParams}
    this.send(data)
    return new Promise<{}>((resolve, reject) => {
      this.addResponseEventListener(data.type, (res: {}) => {
        resolve(res)
      })
    })
  }
}

// 工厂函数
export async function createLuncherServer(port: string): Promise<mxLauncher> {
  const msgMap = new Map()
  const ws = await getLauncherServer(port, msgMap);
  return new mxLauncher(ws, msgMap);
}
