import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { operInteractive } from '../api/api.js'

interface Interactive {
  trigger: string; // 触发事件的方式 单击 双击
  event: string; // 触发的事件
  target: string; // 目标生命体的id
}
interface AllInteractives {
  life_entity_id: string; // 被绑定的生命体id
  interactives: Array<Interactive>;
}
interface DetailInteractive {
  life_entity_id?: string; // 被绑定的生命体id
  interactive_id: string; // 对应的事件id
  trigger: string; // 触发事件的方式 单击 双击
  event: string; // 触发的事件
  target: string; // 目标生命体的id
}

// 批量添加交互 给ue发也给接口发 1
export async function makeInteractiveById(AllInteractives:AllInteractives): Promise<{}>{
  const { data } = await operInteractive({
    "oper_type": "batchInsertInteractive",
    ...AllInteractives
  })
  let Message: []
  emitUIInteraction({
    // Category: "addPOIModel",
    Category: "makeInteractiveById",
    ...AllInteractives
  })

  let ueMsg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("makeInteractivebyIdResponse", (uedata?: string): {} => {
      ueMsg = JSON.parse(uedata)
      if(data.code==200){
        Message = data.data
        // console.log(Message)
        resolve({ueMsg, Message})
      }else{
        reject(new Error(data.msg))
      }
      return ueMsg
    })
  })
}

// 查询交互 从接口拿到数据 给前端 1
export async function queryInteractiveById(id: string): Promise<{}>{
  id = id.toString()
  const { data } = await operInteractive({
    "oper_type": "selectInteractive",
    "life_entity_id": id
  })
  let Message: []
  // emitUIInteraction({
  //   Category: "queryInteractiveById",
  //   id
  // })
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }
  })
}

// 批量更新交互 给ue发也给接口发 1
export async function setInteractive(DetailInteractive: Array<DetailInteractive>): Promise<{}>{
  DetailInteractive = JSON.parse(JSON.stringify(DetailInteractive).replaceAll('interactive_id', 'where_interactive_id'))
  const { data } = await operInteractive({
    "oper_type": "batchUpdateInteractive",
    "interactives": DetailInteractive
  })

  let Message: []
  emitUIInteraction({
    // Category: "addPOIModel",
    Category: "setInteractive",
    interactives: DetailInteractive
  })

  let ueMsg: {}
  // return new Promise<{}>((resolve, reject) => {
  //   if(data.code==200){
  //     Message = data.data
  //     // console.log(Message)
  //     resolve(Message)
  //   }else{
  //     reject(new Error(data.msg))
  //   }
  // })
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("setInteractiveResponse", (uedata?: string): {} => {
      ueMsg = JSON.parse(uedata)
      if(data.code==200){
        Message = data.data
        // console.log(Message)
        resolve({ueMsg, Message})
      }else{
        reject(new Error(data.msg))
      }
      return ueMsg
    })
  })
}
