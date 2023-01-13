import { Model,DeleteParams,ModelParams } from './initModel'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { operLifeEntity,selectSourceMaterial } from '../api/api.js'
// import { importBatchManagementList,downloadExcel,selectPageLifeEntityListByName } from '../api/detail.js'
import { 
  // importBatchManagementList,
  // downloadExcel 
} from '../api/detail.js'

import {
  selectPageLifeEntityListByName,
  importBatchManagementList,
  downloadExcel,
  selectLifeEntity,
  insertLifeEntity,
  deleteLifeEntity,
  batchUpdateLifeEntity,
  updateLifeEntity
} from '../api/lifeEntity.js'

interface pageLifeEntity{
  name: string;
  page_id: string;
}
// 读取底座⽣命体 向接口查询 返回给前端 1 已重构
export async function initModels(pass_id: string): Promise<Array<Model>> {
  const { data } = await selectLifeEntity({
    // "oper_type": "selectLifeEntity",
    pass_id
  })
  let Message: Array<Model> = []

  return new Promise<Array<Model>>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
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


// 添加⽣命体  跟ue通信并向接口提交 已重构
export function addModel(meshasset: {}): Promise<{}> {
  emitUIInteraction({
    Category: "addModel",
    ...meshasset
  })
    
  let ueMsg: Model
  let msg2: String
  let successCallback = []
  successCallback.push((msg2) => {
    return insertLifeEntity({
      // "oper_type": "insertLifeEntity",
      ...msg2
    }).then(bigdata => {
      let data = bigdata.data
      if(data.code==1001){
        let Message = data.value
        return Message
        // console.log(Message)
        // resolve({uedata, Message})
      }else{
        // reject(new Error(data.msg))
        throw (new Error(data.msg))
      }
    })
  })
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("addModelResponse", (uedata?: string): {} => {
      try {
        uedata = JSON.parse(uedata)
        ueMsg = uedata['Message']
        msg2 = JSON.parse(JSON.stringify(ueMsg))
        if(successCallback.length){
          successCallback.shift()(msg2)
          .then(Message => resolve({uedata, Message}))
          .catch(err => reject(new Error(err)))
        }
        
      } catch (error) {
        reject(new Error(error))
      }
      return ueMsg
    })
  })
}


// 删除⽣命体  跟ue通信并向接口提交 1 已重构
export async function deleteModelById(id: string): Promise<{}> {
  const { data } = await deleteLifeEntity({
    // "oper_type": "deleteLifeEntity",
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
      if(data.code==1001){
        Message = data.value
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
  if (!modelProps.hasOwnProperty('type')) {
    let array = modelProps['life_entity_id'].split('_')
    let tag = array[array.length-1]
    // console.log(tag);
    if(tag.startsWith("1")){
      modelProps["type"] = "模型"
    }else if(tag.startsWith("2")){
      modelProps["type"] = "标签"
    }else if(tag.startsWith("4")){
      modelProps["type"] = "特效"
    }
  }
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
  // modelProps = JSON.parse(JSON.stringify(modelProps).replace('life_entity_id', 'where_life_entity_id'))
  let allParams2 = JSON.parse(JSON.stringify(modelProps).replace(/life_entity_id/g, 'where_life_entity_id'))
  
  const { data } = await updateLifeEntity({
    // "oper_type": "updateLifeEntity",
    ...allParams2
  })
  let Message: string = ''

  let msg = ''
  return new Promise<string>((resolve, reject) => {
    // 走接口 把接口回答返回给前端
    if(data.code==1001){
      Message = data.value
      // console.log(Message)
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }
  })
}

// 选中⽣命体  只跟ue通信
export function selectModelById(life_entity_id: string | Array<string>, cb:Function): Promise<{}> { 
  let myarray: Array<string> = []
  if (typeof life_entity_id == 'string') {
    myarray.push(life_entity_id)
  }else{
    myarray = life_entity_id
  }
  console.log(myarray)
  addResponseEventListener("selectModelDataResponse", (data?: string): string => {
    msg = JSON.parse(data)['Message']
    console.log(msg)
    // 如果是linechild 不再给回调传值
    if(msg[0]['subtype']!='linechild' && msg[0]['subtype']!='line'){
      cb(msg)
    }
    return msg
  })
  addResponseEventListener("moveSpecialEffectResponse", (data?: string): string => {
    msg = JSON.parse(data)['Message']
    // 回调 让前端更新数字
    cb(msg)
    return msg
  })
  emitUIInteraction({
    Category: "selectModelById",
    life_entity_id: myarray
  })
  let msg = ''

  
  return new Promise<string>((resolve, reject) => {
    // SendSelectModelDataResponse
    addResponseEventListener("selectModelByIdResponse", (data?: string): string => {
      msg = JSON.parse(data)
      console.log(msg)
      if (msg['Message']) {
        cb(msg['Message'])
      }
      resolve(msg)

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

// 获取单个生命体 从接口拿到数据 给前端 1 已重构
export async function getModelById (id: string): Promise<Model> {
  id = id.toString()
  const { data } = await selectLifeEntity({
    // "oper_type": "selectLifeEntity",
    "life_entity_id": id
  })
  let Message: Model
  return new Promise<Model>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}

interface showParams{
  life_entity_id: string; // 生命体id
  showStatus: string; // 1可见 0隐藏
}
// 显示、隐藏生命体  跟ue通信并向接口提交 1 已重构
export async function showModelByIds (allParams: Array<showParams>): Promise<{}> {
  // let allParams2 = JSON.parse(JSON.stringify(allParams).replaceAll('life_entity_id', 'where_life_entity_id'))
  let allParams2 = JSON.parse(JSON.stringify(allParams).replace(/life_entity_id/g, 'where_life_entity_id'))

  console.log(allParams2)

  const { data } = await batchUpdateLifeEntity({
    // "oper_type": "batchUpdateLifeEntity",
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
      if(data.code==1001){
        Message = data.value
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

// 获取当前点击的生命体信息 只跟ue通信
export function getModelClick(): Promise<{}> { 
  emitUIInteraction({
    Category: "getModelClick"
  })
  let msg = ''

  return new Promise<string>((resolve, reject) => {
    // SendSelectModelDataResponse
    addResponseEventListener("getModelClickResponse", (data?: string): string => {
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

// 实时获取指定生命体的信息 from ue
export async function getModelByIdFromUE (life_entity_id: string, cb: Function): Promise<Model> {
  emitUIInteraction({
    Category: "getModelById",
    life_entity_id
  })
  let msg:Model

  return new Promise<Model>((resolve, reject) => {
    // SendSelectModelDataResponse
    addResponseEventListener("getModelByIdResponse", (data?: string): Model => {
      msg = JSON.parse(data)
      // console.log(msg)
      cb(msg)
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

// 批量更新生命体数据 提交到数据库 已重构
export async function setModelPropsByIdsSave(allParams0: Array<Model>): Promise<{}> {
  // let allParams2 = JSON.parse(JSON.stringify(allParams).replaceAll('life_entity_id', 'where_life_entity_id'))
  // 检查是不是数组
  let allParams = []
  if(!Array.isArray(allParams0)){
    allParams.push(allParams0)
  }else{
    allParams = allParams0
  }
  let allParams2 = JSON.parse(JSON.stringify(allParams).replace(/life_entity_id/g, 'where_life_entity_id'))
  console.log(allParams2)

  const { data } = await batchUpdateLifeEntity({
    // "oper_type": "batchUpdateLifeEntity",
    allParams: allParams2
  })
  let Message: Array<Number>

  return new Promise<object>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }
  })
}

// 批量添加⽣命体  跟ue通信并向接口提交 已重构
export async function addModelInBulk(file: File, pass_id: string): Promise<{}> {
  const { data } = await importBatchManagementList({
    file,
    pass_id
  })
  const allParams = data.value
  emitUIInteraction({
    Category: "addModelInBulk",
    allParams
  })
    
  let ueMsg: Model
  let Message: {}

  return new Promise<object>((resolve, reject) => {
    if(data.code==1001){
      addResponseEventListener("addModelInBulkResponse", (uedata?: string): void => {
        uedata = JSON.parse(uedata)
        ueMsg = uedata['Message']

      })
      Message = allParams
      resolve({Message, ueMsg})
    }else{
      reject(new Error(data.msg))
    }
  })

}


// 批量添加生命体的excel模板下载 fileType: '通用式' | '视频弹窗式' 已重构
export async function downloadTemplateExcel(fileType: string): Promise<{}> {
  const { data } = await downloadExcel({
    fileType
  })
  let Message: Array<Number>

  return new Promise<object>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }
  })
}


// 模糊查询指定页面下对应的生命体 已重构
export async function queryPageLifeEntityByName(pageLifeEntity: pageLifeEntity): Promise<{}> {
  const { data } = await selectPageLifeEntityListByName({
    ...pageLifeEntity
  })
  let Message: Array<Number>

  return new Promise<object>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
      resolve({Message})
    }else{
      reject(new Error(data.msg))
    }
  })
}