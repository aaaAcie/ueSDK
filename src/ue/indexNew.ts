/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-09-19 16:55:20
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-09-19 17:15:00
 * @FilePath: \WebServers424\mxxx\src\ue\indexNew.ts
 * @Description: 
 * 
 */

const responseEventListeners = new Map();

export function sendToUE (data: string): void {
  // 给ue发消息
  if(global.ue){
    global.ue.web?.js_call_ue_with_params(data);
  }
}

export function emitUIInteraction (data: any): void {
  // 如果不是字符串
  if(typeof data !== 'string'){
    data = JSON.stringify(data)
  }
  // 给ue发消息
  // sendToUE(data)
  global.ue?.web?.js_call_ue_with_params(data);
  console.log("%c[发送ue消息 -->]", "background: pink; color: black" , data);
}

export function addResponseEventListener(fnName: String, cb: Function): void {
  // 劫持cb，拦截到cb里获取的response
  const next = (response: string) => {
    console.log("%c[收到ue消息 <--]", "background: pink; color: black" , response);
    cb(response)
    return 
  }
  // 接收ue的消息
  responseEventListeners.set(fnName, next);
}


export const getUE = () => {
  // 接收ue消息 ue会调用这个函数，往这个函数传入值
  global.CallJsWithTime = (data: String) => {
    try {
      data = JSON.stringify(data)
      responseEventListeners.get(data)(data)
    } catch (error) {
      console.log(`ue发送了${data}事件，请注册对应的回调`)
    }
  }
  
  // 接收CallJsWithParams，解析data对象中的Category字段，which代表函数名
  global.CallJsWithParams = (data: Object) => {
    let fnName = ''
    try {
      data = JSON.parse(JSON.stringify(data))
      fnName = data['Category']
      responseEventListeners.get(fnName)(data)
    } catch (error) {
      console.log(`ue发送了${fnName}事件，请注册对应的回调`, data)
    }
  }
}

getUE()
