import { Model,DeleteParams,ModelParams } from './initModel'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { operLifeEntity,selectSourceMaterial } from '../api/api.js'


// 读取底座⽣命体 向接口查询 返回给前端 1
export async function initModels(pass_id: string): Promise<Array<Model>> {
  const { data } = await operLifeEntity({
    "oper_type": "selectLifeEntity",
    pass_id
  })
  let Message: Array<Model> = []

  return new Promise<Array<Model>>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      // emitUIInteraction({
      //   Category: "initModels",
      //   Message 
      // })
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }
    // 这里的response名字跟ue对上
    // addResponseEventListener("initModelsResponse", (data: string): ModelParams => {
    //   msg = JSON.parse(data)
    //   // 二次校验，等ue做状态码后修改
    //   if(msg.Category == "initModelsResponse"){
    //     resolve(msg)
    //   }else{
    //     reject(new Error('接收ue返回失败'))
    //   }
    //   return msg
    // })
  })
}

// 读取预置素材  从接口拿到数据 给前端 1
export async function initMaterial(project_id:string): Promise<{}> { 
  project_id = project_id.toString()
  const { data } = await selectSourceMaterial({
    project_id
  })
  let Message: Model
  return new Promise<Model>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}


// 添加⽣命体  跟ue通信并向接口提交
export function addModel(meshasset: {}): Promise<{}> {
  emitUIInteraction({
    Category: "addModel",
    ...meshasset
  })
    
  let ueMsg: Model
  let msg2: String
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("addModelResponse", (uedata?: string): {} => {
      try {
        uedata = JSON.parse(uedata)
        ueMsg = uedata['Message']
        msg2 = JSON.parse(JSON.stringify(ueMsg))

        console.log(msg2);
        
        operLifeEntity({
          "oper_type": "insertLifeEntity",
          ...msg2
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
        // let Message: Array<Model> = []

        // msg = data
        
      } catch (error) {
        reject(new Error(error))
      }
      return ueMsg
    })
  })
}


// 删除⽣命体  跟ue通信并向接口提交 1
export async function deleteModelById(id: string): Promise<{}> {
  const { data } = await operLifeEntity({
    "oper_type": "deleteLifeEntity",
    "life_entity_id": id
  })
  let Message: number


  emitUIInteraction({
    Category: "deleteModelById",
    life_entity_id: id
  })
  let ueMsg
  return new Promise<object>((resolve, reject) => {
    addResponseEventListener("deleteModelByIdResponse", (uedata?: string): string => {
      if(data.code==200){
        Message = data.data
        // console.log(Message)
        ueMsg = JSON.parse(uedata)
        resolve({ ueMsg, Message })
      }else{
        reject(new Error(data.msg))
        
      }

      // 二次校验，等ue做状态码后修改
      // if(msg){
      //   resolve(msg)
      // }else{
      //   reject(new Error('接收ue返回失败'))
      // }
      return ueMsg
    })
  })
}

// 设置⽣命体属性  只跟ue通信
export function setModelPropsById(modelProps: Model): Promise<{}> {
  emitUIInteraction({
    Category: "setModelPropsById",
    ...modelProps
  })
  let msg = ''
  return new Promise<string>((resolve, reject) => {
    addResponseEventListener("setModelPropsByIdResponse", (data: string): string => {
      msg = JSON.parse(data)
      // console.log(msg)
      
      // 二次校验，等ue做状态码后修改
      if(msg){
        resolve(msg)
      }else{
        reject(new Error('接收ue返回失败'))
      }
      return msg
    })
  })
}
// 设置⽣命体属性 走接口提交保存 1未测试
export async function setModelPropsByIdSave(modelProps: Model): Promise<{}> {
  const { data } = await operLifeEntity({
    "oper_type": "updateLifeEntity",
    ...modelProps
  })
  let Message: string = ''

  let msg = ''
  return new Promise<string>((resolve, reject) => {
    // 走接口 把接口回答返回给前端
    if(data.code==200){
      Message = data.data
      // console.log(Message)
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }
  })
}

// 选中⽣命体  只跟ue通信
export function selectModelById(life_entity_id: string): Promise<{}> { 
  emitUIInteraction({
    Category: "selectModelById",
    life_entity_id
  })
  let msg = ''

  return new Promise<string>((resolve, reject) => {
    // SendSelectModelDataResponse
    addResponseEventListener("selectModelById", (data?: string): string => {
      msg = JSON.parse(data)
      // console.log(msg)
      resolve(msg)
      // 二次校验，等ue做状态码后修改
      // if(msg){
      //   resolve(msg)
      // }else{
      //   reject(new Error('接收ue返回失败'))
      // }
      return msg
    })
  })
}

// 选中⽣命体后，改变选择模式  只跟ue通信
export function selectModeChange(mode: string): Promise<{}> { 
  emitUIInteraction({
    Category: "SelectModeChange",
    SelectMode: mode
  })
  let msg = ''

  return new Promise<string>((resolve, reject) => {
    // SendSelectModelDataResponse
    addResponseEventListener("selectModeChangeResponse", (data?: string): string => {
      msg = JSON.parse(data)
      // console.log(msg)
      resolve(msg)
      // 二次校验，等ue做状态码后修改
      // if(msg){
      //   resolve(msg)
      // }else{
      //   reject(new Error('接收ue返回失败'))
      // }
      return msg
    })
  })
}

// 取消选中 只跟ue通信
export function selectCancel(): Promise<{}> { 
  emitUIInteraction({
    Category: "SelectCancel",
  })
  let msg = ''

  return new Promise<string>((resolve, reject) => {
    addResponseEventListener("selectCancelResponse", (data?: string): string => {
      msg = JSON.parse(data)

      resolve(msg)
      // 二次校验，等ue做状态码后修改
      // if(msg){
      //   resolve(msg)
      // }else{
      //   reject(new Error('接收ue返回失败'))
      // }
      return msg
    })
  })
}

// 获取单个生命体 从接口拿到数据 给前端 1
export async function getModelById (id: string): Promise<Model> {
  id = id.toString()
  const { data } = await operLifeEntity({
    "oper_type": "selectLifeEntity",
    "life_entity_id": id
  })
  let Message: Model
  return new Promise<Model>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}

interface showParams{
  id: string; // 生命体id
  showStatus: string; // 1可见 0隐藏
}
// 显示、隐藏生命体  跟ue通信并向接口提交 1
export async function showModelByIds (allParams: Array<showParams>): Promise<{}> {
  let allParams2 = JSON.parse(JSON.stringify(allParams).replaceAll('life_entity_id', 'where_life_entity_id'))
  console.log(allParams2)

  const { data } = await operLifeEntity({
    "oper_type": "batchUpdateLifeEntity",
    allParams: allParams2
  })
  let Message: number

  emitUIInteraction({
    Category: "showModelByIds",
    allParams
  })
  let ueMsg
  return new Promise<object>((resolve, reject) => {
    addResponseEventListener("showModelByIdsResponse", (uedata?: string): Model => {
      if(data.code==200){
        Message = data.data
        ueMsg = JSON.parse(uedata)
        resolve({ueMsg, Message})
      }else{
        reject(new Error(data.msg))
      }
      return ueMsg
    })
  })
}

// 镜头拉近生命体  只跟ue通信
export function focusModelById(life_entity_id: string): Promise<{}> { 
  emitUIInteraction({
    Category: "focusModelById",
    life_entity_id
  })
  let msg = ''

  return new Promise<string>((resolve, reject) => {
    // SendSelectModelDataResponse
    addResponseEventListener("focusModelByIdResponse", (data?: string): string => {
      msg = JSON.parse(data)
      // console.log(msg)
      resolve(msg)
      // 二次校验，等ue做状态码后修改
      // if(msg){
      //   resolve(msg)
      // }else{
      //   reject(new Error('接收ue返回失败'))
      // }
      return msg
    })
  })
}