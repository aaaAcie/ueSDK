/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-02-13 08:50:00
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-07-18 16:09:04
 * @FilePath: \WebServers424\mxxx\src\initModel\dealModel.ts
 * @Description: 
 * 
 */
import { Model, addModelFunction } from './initModel'
import { myChannel } from '../utils/basic.js'
const { addResponseEventListener, emitUIInteraction } = myChannel
import { dealReturn } from '../utils/fns'
import request from '../utils/request'
import {
  selectPageLifeEntityListByName,
  importBatchManagementList,
  downloadExcel,
  selectLifeEntity,
  insertLifeEntity,
  deleteLifeEntity,
  batchUpdateLifeEntity,
  updateLifeEntity,
  addSpecialBelong,
  deleteBindLifeEntity
} from '../api/lifeEntity.js'
interface ModelParams {
  project_id?: string,
  pass_id?: string
}
interface pageLifeEntity{
  name: string;
  page_id: string;
}
interface BulkParams{
  file: File, // 指定格式的excel文件
  passId: string; // 关卡id
  pageId: string; // 页面id
  projectId: string; // 项目id
}
interface RelativeModel {
  bindId: string, // 代表该生命体绑在【bindId】这个生命体上，传入的xyz代表与【bindId】的相对位置
  x: number,
  y: number,
  z: number
}
interface RelativeLayer {
  bindId: string, // 代表该生命体绑在【bindId】这个生命体上
  layer: string // 该生命体绑在生命体的指定楼层【layer】上
}
interface Properties {
  [key: string]: string;
}
interface modelType {
  type: string; // 生命体类型
  subtype: string; // ⽣命体子类型
  properties?: Properties & {
    meshasset?: string;
    sliceasset?: string;
    robotasset?: string;
    proceduralasset?: string;
    bgasset?: string;
    fxasset?: string;
  }; // 模型 标签 特效 对应有各自的素材。详见素材接口·3. 读取预置素材·
  relative?: RelativeModel | RelativeLayer  // 绑定生命体的入参 | 绑定拆楼的入参
}
// 读取底座⽣命体 向接口查询 返回给前端 1 已重构
export async function initModels(ModelParams: ModelParams): Promise<Array<Model>> {
  const { data } = await selectLifeEntity({
    ...ModelParams
  })
  let Message: Array<Model> = []

  return new Promise<Array<Model>>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }
  })
}


// 添加⽣命体  跟ue通信并向接口提交 已重构
export function addModel(modelType: modelType): Promise<{}> {
  emitUIInteraction({
    Category: "addModel",
    ...modelType
  })
    
  let ueMsg: Model
  let msg2: Model
  let successCallback = []
  let belong: Array<{page_id: string, showStatus: string}>
  successCallback.push((msg2) => {
    return addModelFunction(msg2)
  })
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("addModelResponse", (uedata?: string): {} => {
      try {
        uedata = JSON.parse(uedata)
        ueMsg = uedata['Message']
        msg2 = JSON.parse(JSON.stringify(ueMsg))
        if(successCallback.length){
          successCallback.shift()(msg2)
            .then(Message => resolve({uedata, Message, code:Message.code}))
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
        resolve({ ueMsg, Message, code:data.code })
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
    if(tag.startsWith("1")){
      modelProps["type"] = "模型"
    }else if(tag.startsWith("2")){
      modelProps["type"] = "标签"
    }else if(tag.startsWith("4")){
      modelProps["type"] = "特效"
    }
    console.log(tag, modelProps["type"],'===type属性新增为===');
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
      // Message = data.value
      Message = data // 全返回

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
  life_entity_id?: string; // 生命体id
  LifeEntityExecutor?: Array<string>; // 类的祖链 组成的数组
  showStatus: string; // 1可见 0隐藏
}
// 显示、隐藏生命体  跟ue通信并向接口提交 1 已重构
export async function showModelByIds (allParams: Array<showParams>): Promise<{}> {
  // let allParams2 = JSON.parse(JSON.stringify(allParams).replaceAll('life_entity_id', 'where_life_entity_id'))
  // let allParams2 = JSON.parse(JSON.stringify(allParams).replace(/life_entity_id/g, 'where_life_entity_id'))

  // const { data } = await batchUpdateLifeEntity({
  //   allParams: allParams2
  // })
  // let Message: number

  emitUIInteraction({
    Category: "showModelByIds",
    allParams
  })
  let ueMsg
  return new Promise<object>((resolve, reject) => {
    addResponseEventListener("showModelByIdsResponse", (uedata?: string): Model => {
      ueMsg = JSON.parse(uedata)
      // if(data.code==1001){
      //   Message = data.value
      //   ueMsg = JSON.parse(uedata)
      //   resolve({ueMsg, Message})
      // }else{
      //   reject(new Error(data.msg))
      // }
      resolve({ueMsg, Message: null})
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
      resolve(msg)
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
export async function addModelInBulk(BulkParams: BulkParams): Promise<{}> {
  const { data } = await importBatchManagementList({
    ...BulkParams
  })
  const allParams = data.value
  emitUIInteraction({
    Category: "addModelInBulk",
    allParams
  })
    
  let ueMsg: Model
  let uedataBelong: {}
  let Message: {}

  return new Promise<object>((resolve, reject) => {
    if(data.code==1001){
      let BelongMessage = data.value.lifeEntityBelongList
      addResponseEventListener("addModelInBulkResponse", (uedata?: string): void => {
        let uedataAddModel = JSON.parse(uedata)
        ueMsg = uedataAddModel['Message']
      })
      
      // 新增归属
      emitUIInteraction({
        Category: "addBelong",
        Message: BelongMessage
      })
      addResponseEventListener("addBelongResponse", (uedata?: string): void => {
        uedataBelong = JSON.parse(uedata)
      })
      Message = allParams
      resolve({Message, ueMsg, uedataBelong})
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
    // if(data.code==1001){
    //   Message = data.value
    //   resolve(Message)
    // }else{
    //   reject(new Error(data.msg))
    // }
    resolve(data)
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


interface lockParams{
  life_entity_id: string; // 生命体id
  lockStatus: string; // 1锁定 0解锁
}
//  锁定、解锁生命体  跟ue通信并向接口提交 1 已重构
export async function lockModelByIds (allParams: Array<lockParams>): Promise<{}> {
  // let allParams2 = JSON.parse(JSON.stringify(allParams).replaceAll('life_entity_id', 'where_life_entity_id'))
  let allParams2 = JSON.parse(JSON.stringify(allParams).replace(/life_entity_id/g, 'where_life_entity_id'))

  console.log(allParams2)

  const { data } = await batchUpdateLifeEntity({
    // "oper_type": "batchUpdateLifeEntity",
    allParams: allParams2
  })
  let Message: number

  emitUIInteraction({
    Category: "lockModelByIds",
    allParams
  })
  let ueMsg
  return new Promise<object>((resolve, reject) => {
    addResponseEventListener("lockModelByIdsResponse", (uedata?: string): Model => {
      if(data.code==1001){
        Message = data.value
        ueMsg = JSON.parse(uedata)
        resolve({ueMsg, Message, code:data.code})
      }else{
        reject(new Error(data.msg))
      }
      return ueMsg
    })
  })
}

// 底座执行特殊事件
interface eventParams{
  LevelEventName: string
}
export async function callLevelEvent (eventParams: eventParams): Promise<{}> {
  emitUIInteraction({
    Category: "callLevelEvent",
    ...eventParams
  })
  let msg

  return new Promise<Model>((resolve, reject) => {
    // SendSelectModelDataResponse
    addResponseEventListener("CallLevelEventResponse", (data?: string): {} => {
      msg = JSON.parse(data)
      // console.log(msg)
      resolve(msg)
      return msg
    })
  })
}

// 删除绑定的⽣命体  跟ue通信并向接口提交 1 已重构
interface bindLifeEntityParams{
  projectId: string;
  life_entity_id: string; // 需要被删除的 绑定的生命体id
  // father_life_entity_id: string  // 被绑定的父生命体id
}
export async function deleteBindLifeEntityById(bindLifeEntityParams: bindLifeEntityParams): Promise<{}> {
  const { data } = await deleteBindLifeEntity({...bindLifeEntityParams})

  emitUIInteraction({
    Category: "deleteModelById",
    life_entity_id: bindLifeEntityParams.life_entity_id,
    // father_life_entity_id: bindLifeEntityParams.father_life_entity_id
  })
  return new Promise<object>((resolve, reject) => {
    resolve({data})
  })
  // return dealReturn(data)
}

export async function testDataUrl(data_url: string): Promise<{}> {
  return new Promise<object>((resolve, reject) => {
      request({
        method: 'get',
        url: data_url.trim()
      }).then(data => {
        let value = data.data
        console.log('测试该接口结果返回：',value)
        if(value?.data?.x){
          resolve({code: 1001, value: true})
        } else {
          resolve({code: 2001, value: false, msg: `数据格式错误，要求格式举例：{data: {x: 20,y: 10}}`})
        }
      }).catch(error => {
        // 处理失败状态
        resolve({code: 2001, value: false, msg: `该接口测试失败, ${error}`})
      });
  })
  // return dealReturn(data)
}