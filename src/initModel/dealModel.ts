import { Model,DeleteParams,ModelParams } from './initModel'
// import { addResponseEventListener, emitUIInteraction} from '../basic2/app.js'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'


// let descriptor = {
//   Category: a,
//   Item: b
// }

// 读取底座⽣命体 返回一个promise，用then和catch调用
export function initModels(): Promise<ModelParams> { 
  emitUIInteraction({
    Category: "initModels"
  })
  let msg: ModelParams
  return new Promise<ModelParams>((resolve, reject) => {
    // 这里的response名字跟ue对上
    addResponseEventListener("initModelsResponse", (data: string): ModelParams => {
      msg = JSON.parse(data)
      // 二次校验，等ue做状态码后修改
      if(msg.Category == "initModelsResponse"){
        resolve(msg)
      }else{
        reject(new Error('接收ue返回失败'))
      }
      return msg
    })
  })
}

// 读取预置素材
export function initMaterial(meshasset: Array<string>): Promise<{}> { 
  emitUIInteraction({
    Category: "initMaterial",
    meshasset: meshasset
  })
  let msg = ''
  
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("initMaterialResponse", (data: string): string => {

      // msg = data
      msg = JSON.parse(data)

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


// 添加⽣命体  跟ue通信并向接口提交
export function addModel(meshasset: {}): Promise<{}> {
  emitUIInteraction({
    Category: "addModel",
    ...meshasset
  })
  let msg = ''
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("addModelResponse", (data?: string): {} => {
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


// 删除⽣命体  跟ue通信并向接口提交
export function deleteModelById(id: number): Promise<{}> { 
  emitUIInteraction({
    Category: "deleteModelById",
    id: id
  })
  let msg = ''
  return new Promise<string>((resolve, reject) => {
    addResponseEventListener("deleteModelByIdResponse", (data?: string): string => {
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
// 设置⽣命体属性 走接口提交保存
export function setModelPropsByIdSave(modelProps: Model): Promise<{}> {
  let msg = ''
  return new Promise<string>((resolve, reject) => {
    // 走接口 把接口回答返回给前端
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

// 选中⽣命体  只跟ue通信
export function selectModelById(id: number): Promise<{}> { 
  emitUIInteraction({
    Category: "selectModelById",
    id: id
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

// 获取单个生命体 从接口拿到数据
export function getModelById (id: string): Promise<Model> {
  emitUIInteraction({
    Category: "getModelById",
    id
  })
  let msg: Model
  return new Promise<Model>((resolve, reject) => {
    addResponseEventListener("getModelByIdResponse", (data?: string): Model => {
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

interface showParams{
  id: string; // 生命体id
  showStatus: number; // 1可见 0隐藏
}
// 显示、隐藏生命体  跟ue通信并向接口提交
export function showModelByIds (allParams: Array<showParams>): Promise<Model> {
  emitUIInteraction({
    Category: "showModelByIds",
    allParams
  })
  let msg: Model
  return new Promise<Model>((resolve, reject) => {
    addResponseEventListener("showModelByIdsResponse", (data?: string): Model => {
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