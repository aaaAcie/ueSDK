import { myChannel } from '../utils/basic.js'
const { addResponseEventListener, emitUIInteraction } = myChannel

type data = {
  code: number,
  value: Array<{}> | {},
  msg: string
}
export function dealReturn(data: data): Promise<{}> {
  return new Promise((resolve, reject) => {
    if(data.code != 1001){
      console.error(new Error(data.msg))
    }
    resolve(data)
  })
}
// 处理 labelBelongs 返回 被labelNew.ts引用
export function dealLabelBelongsReturn(data: data){
  let Message: Array<{}> | {}
  return new Promise((resolve, reject) => {
    // resolve(data)
    if(data.code==1001){
      Message = data.value
      emitUIInteraction({
        Category: "addLabelBelongs",
        Message
      })
      addResponseEventListener("addLabelBelongsResponse", (uedata?: string): void => {
        let msg = JSON.parse(uedata)
        resolve({ueMsg: msg, ...data})
      })
    }else{
      console.error(new Error(data.msg))
      resolve(data)
    }
  })
}

// 处理 listenToExecutor 返回。被 dealGlobalEvents.ts 引用
export function dealGlobalEventsReturn(listenToExecutorParams){
  let Message: Array<{}> | {}
  return new Promise((resolve, reject) => {
    emitUIInteraction({
      Category: "listenToExecutor",
      ...listenToExecutorParams
    })
    addResponseEventListener("listenToExecutorResponse", (data?: string): void => {
      let msg = JSON.parse(data)
      resolve(msg)
    })
  })
}