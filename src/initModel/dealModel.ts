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


// 添加⽣命体 ue暂无返回值 里面的回调暂无法被调用
export function addModel(meshasset: string): Promise<{}> {
  emitUIInteraction({
    Category: "addModel",
    meshasset: meshasset
  })
  let msg = ''
  return new Promise<string>((resolve, reject) => {
    addResponseEventListener("addModelResponse", (data?: string): string => {
      msg = data
      console.log('00000000')
      console.log(msg)
      resolve('success')
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

// 删除⽣命体 ue暂无返回值
export function deleteModelById(id: number): Promise<{}> { 
  emitUIInteraction({
    Category: "deleteModelById",
    id: id
  })
  let msg = ''

  return new Promise<string>((resolve, reject) => {
    addResponseEventListener("deleteModelByIdResponse", (data?: string): string => {
      msg = data
      console.log(msg)
      if(!data){
        resolve('success')

      }
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

// 设置⽣命体属性
// export function setModelPropsById(modelProps: Model): Array<Model>[] {
export function setModelPropsById(modelProps: Model): Promise<{}> {
  emitUIInteraction({
    Category: "setModelPropsById",
    ...modelProps
  })
  let msg = ''
  return new Promise<string>((resolve, reject) => {
    addResponseEventListener("setModelPropsByIdResponse", (data: string): string => {
      msg = data
      console.log(msg)
      
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

// 选中⽣命体 ue暂无返回值
export function selectModelById(id: number): Promise<{}> { 
  emitUIInteraction({
    Category: "selectModelById",
    id: id
  })
  let msg = ''

  return new Promise<string>((resolve, reject) => {
    addResponseEventListener("selectModelByIdResponse", (data?: string): string => {
      msg = data
      console.log('2222222')
      console.log(msg)
      if(!data){
        resolve('success')

      }
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

// 取消选中 ue暂无返回值
export function selectCancel(): Promise<{}> { 
  emitUIInteraction({
    Category: "SelectCancel",
  })
  let msg = ''

  return new Promise<string>((resolve, reject) => {
    addResponseEventListener("selectCancelResponse", (data?: string): string => {
      msg = data
      console.log('2222222')
      console.log(msg)
      if(!data){
        resolve('success')

      }
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