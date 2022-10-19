import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { operCamera } from '../api/api.js'

interface Shot {
  shot_id: string // 镜头id
  name: string // 镜头名称
  position: {} // 镜头参数等
}
interface getParam {
  shot_id: string // 镜头id
  callback?: () => {} // 参数处理
}
interface modifyParam {
  shot_id: string
  name: string
  position: {}
}

// 添加镜头 跟ue通信并向接口提交 1
export function addShot(name: string): Promise<Object> {
  emitUIInteraction({
    Category: "addShot",
    name
  })
  let msg = {}
  return new Promise<Object>((resolve, reject) => {
    addResponseEventListener("addShotResponse", (uedata?: string): Object => {
      try {
        uedata = JSON.parse(uedata)
        msg = uedata['Message']
        operCamera({
          "oper_type": "insertCamera",
          ...msg
        }).then(bigdata => {
          let data = bigdata.data
          if(data.code==200){
            let Message = data.data
            console.log(Message)
            resolve({uedata, Message})
          }else{
            reject(new Error(data.msg))
          }
        })
      } catch (error) {
        reject(new Error(error))
      }
      return msg
    })
  })
}

// 删除镜头 根据镜头id删除镜头 1未测试
export async function deleteShotById(shot_id: string): Promise<Object> {
  const { data } = await operCamera({
    "oper_type": "deleteCamera",
    shot_id
  })
  emitUIInteraction({
    Category: "deleteShotById",
    shot_id
  })
  let Message: number
  let ueMsg = {}
  return new Promise<Object>((resolve, reject) => {
    addResponseEventListener("deleteShotByIdResponse", (uedata?: string): Object => {
      if(data.code==200){
        Message = data.data
        // console.log(Message)
        ueMsg = JSON.parse(uedata)
        resolve({ ueMsg, Message })
      }else{
        reject(new Error(data.msg))
        
      }
      return ueMsg
    })
  })
}

// 保存镜头  
export async function saveShotById(modifyParam: modifyParam): Promise<Object> {
  let modifyParam2 = JSON.parse(JSON.stringify(modifyParam).replace('shot_id', 'where_shot_id'))
  const { data } = await operCamera({
    "oper_type": "updateCamera",
    ...modifyParam2
  })
  let Message

  emitUIInteraction({
    Category: "saveShotById",
    // shot_id: modifyParam["shot_id"]
    ...modifyParam
  })
  let ueMsg = {}
  return new Promise<Object>((resolve, reject) => {
    addResponseEventListener("saveShotByIdResponse", (uedata?: string): Object => {
      if(data.code==200){
        Message = data.data
        // console.log(Message)
        ueMsg = JSON.parse(uedata)
        // resolve({ ueMsg, Message })
        resolve({ ueMsg, Message })

      }else{
        reject(new Error(data.msg))
        
      }
      return ueMsg
    })
  })
}

// 查询镜头列表 向接口请求数据返回给前端 1
export async function queryShotList(pass_id: string): Promise<Array<Shot>> {
  const { data } = await operCamera({
    "oper_type": "selectCamera",
    pass_id
  })
  let Message: Array<Shot>
  return new Promise<Array<Shot>>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}

// 获取单个镜头 向接口请求数据返回给前端 1
export async function getShotById(shot_id: string): Promise<Shot> {
  const { data } = await operCamera({
    "oper_type": "selectCamera",
    shot_id
  })
  let Message: Shot
  return new Promise<Shot>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}

// 修改镜头名称 1未测试
export async function modifyShotName(modifyParam: modifyParam): Promise<{}> {
  let modifyParam2 = JSON.parse(JSON.stringify(modifyParam).replace('shot_id', 'where_shot_id'))
  const { data } = await operCamera({
    "oper_type": "updateCamera",
    ...modifyParam2
  })
  let Message: Shot
  emitUIInteraction({
    Category: "modifyShotName",
    ...modifyParam
  })
  let ueMsg
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("modifyShotNameResponse", (uedata?: string): {} => {
      if(data.code==200){
        Message = data.data
        // console.log(Message)
        ueMsg = JSON.parse(uedata)
        resolve({ ueMsg, Message })
      }else{
        reject(new Error(data.msg))
        
      }
      return ueMsg
    })
  })
}

// 切换镜头 只跟ue通信 1
export function switchShot(shot_id: string): Promise<Shot> {
  emitUIInteraction({
    Category: "switchShot",
    shot_id
  })
  let msg: Shot
  return new Promise<Shot>((resolve, reject) => {
    addResponseEventListener("switchShotResponse", (data?: string): Shot => {
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

// 修改镜头属性 只跟ue通信
export async function modifyShotProperty(modifyParam: modifyParam): Promise<{}> {
  // let modifyParam2 = JSON.parse(JSON.stringify(modifyParam).replace('shot_id', 'where_shot_id'))
  // const { data } = await operCamera({
  //   "oper_type": "updateCamera",
  //   ...modifyParam2
  // })
  // let Message
  emitUIInteraction({
    Category: "modifyShotProperty",
    ...modifyParam
  })
  let ueMsg
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("setModelPropsByIdResponse", (uedata?: string): {} => {
      ueMsg = JSON.parse(uedata)
      if(ueMsg){
        resolve(ueMsg)
      }else{
        reject(new Error('接收ue返回失败'))
      }
      return ueMsg
    })
  })
}