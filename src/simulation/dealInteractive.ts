// import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { myChannel } from '../utils/basic.js'
const { addResponseEventListener, emitUIInteraction } = myChannel

// import { operInteractive } from '../api/api.js'
import { 
  selectInteractive,
  deleteInteractiveById,
  insertInteractive,
  updateInteractive
} from '../api/Interactive.js'

interface Interactive {
  trigger: string; // 触发事件的方式 click | dbclick | mouseenter | mouseleave
  event: string; // 触发的事件 show | hide | highlight | unhighlight | toggleHignlight | focus | move | 
  params?: string; //  事件的参数，拼接方式： "direction=up&distance=10"; 
  target: Array<string>; // 目标生命体的id
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
  target: Array<string>; // 目标生命体的id
}
interface listenToExecutorParams{
  ancestors: string, // 类的 ancestors
  event: string // 需要类去执行的事件
}
// 批量添加交互 给ue发也给接口发 1未测试 已重构
export async function makeInteractiveById(AllInteractives:AllInteractives): Promise<{}>{
  const { data } = await insertInteractive({
    // "oper_type": "batchInsertInteractive",
    ...AllInteractives
  })
  let Message: []
  Message = data.value
  emitUIInteraction({
    // Category: "addPOIModel",
    Category: "makeInteractiveById",
    // AllInteractives: Message
    AllInteractives // 直接拿前端的入参 后端的出参不太稳定（靠谱）
  })


  let ueMsg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("makeInteractivebyIdResponse", (uedata?: string): {} => {
      if(data.code==1001){
        ueMsg = JSON.parse(uedata)
        resolve({ueMsg, Message})
      }else{
        reject(new Error(data.msg))
      }
      return ueMsg
    })
  })
}

// 查询交互 从接口拿到数据 给前端 1 已重构
export async function queryInteractiveById(id: string): Promise<{}>{
  id = id.toString()
  const { data } = await selectInteractive({
    // "oper_type": "selectInteractive",
    "life_entity_id": id
  })
  let Message: []
  // emitUIInteraction({
  //   Category: "queryInteractiveById",
  //   id
  // })
  return new Promise<{}>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }
  })
}

// 批量更新交互 给ue发也给接口发 1 已重构
export async function setInteractive(DetailInteractive: Array<DetailInteractive>): Promise<{}>{
  let DetailInteractive2 = JSON.parse(JSON.stringify(DetailInteractive).replaceAll('interactive_id', 'where_interactive_id'))
  const { data } = await updateInteractive({
    // "oper_type": "batchUpdateInteractive",
    "interactives": DetailInteractive2
  })

  let Message: []
  emitUIInteraction({
    Category: "setInteractive",
    interactives: DetailInteractive
  })

  let ueMsg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("setInteractiveResponse", (uedata?: string): {} => {
      ueMsg = JSON.parse(uedata)
      if(data.code==1001){
        Message = data.value
        // console.log(Message)
        resolve({ueMsg, Message})
      }else{
        reject(new Error(data.msg))
      }
      return ueMsg
    })
  })
}

// 删除交互 给ue发也给接口发 1 已重构
export async function deleteInteractive(interactive_id: string): Promise<{}>{
  const { data } = await deleteInteractiveById({
    // "oper_type": "deleteInteractive",
    interactive_id
  })

  let Message
  emitUIInteraction({
    Category: "deleteInteractive",
    interactive_id
  })

  let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("deleteInteractiveResponse", (uedata?: string): {} => {
      ueMsg = JSON.parse(uedata)
      if(data.code==1001){
        Message = data.value
        // console.log(Message)
        resolve({ueMsg, Message})
      }else{
        reject(new Error(data.msg))
      }
      return ueMsg
    })
  })
}
