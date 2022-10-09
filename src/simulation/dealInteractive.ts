import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
interface Interactive {
  trigger: string; // 触发事件的方式 单击 双击
  event: string; // 触发的事件
  target: string; // 目标生命体的id
}
interface AllInteractives {
  id: string; // 被绑定的生命体id
  interactives: Array<Interactive>;
}
// 给ue发也给接口发
export function makeInteractiveById(AllInteractives:AllInteractives): Promise<{}>{
  emitUIInteraction({
    // Category: "addPOIModel",
    Category: "makeInteractiveById",
    ...AllInteractives
  })
  let msg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("makeInteractivebyIdResponse", (data?: string): {} => {
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

export function queryInteractiveById(id: string): Promise<AllInteractives>{
  emitUIInteraction({
    Category: "queryInteractiveById",
    id
  })
  let msg: AllInteractives
  return new Promise<AllInteractives>((resolve, reject) => {
    addResponseEventListener("queryInteractiveByIdResponse", (data?: string): AllInteractives => {
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
