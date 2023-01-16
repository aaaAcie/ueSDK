// import { operPage, batchUpdateLifeEntityBelongShowStatus } from '../api/api.js'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import {
  selectPage,
  batchReplacePage,
  batchDeletePage,
  batchUpdateLifeEntityBelongShowStatus
} from '../api/page.js'
interface pageParams {
  pass_id: string;
  page_id: string;
}
interface belongShowStatus {
  life_entity_ids: Array<string>;
  page_id: string;
}
//  根据关卡id查询所有页面信息 from数据库 已重构
export async function queryPage(pass_id: string): Promise<{}> {
  const { data } = await selectPage({
    // "oper_type": "selectPage",
    pass_id
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}

// 新增页面 from数睿 给数据库 已重构
export async function addPage(page_list: Array<pageParams>): Promise<{}> {
  const { data } = await batchReplacePage({
    // "oper_type": "batchReplacePage",
    pageReqList: page_list
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
      resolve({Message})
    }else{
      reject(new Error(data.msg))
    }

  })
}
// 删除页面 from数睿 给数据库 已重构
export async function deletePage(page_list: Array<pageParams>): Promise<{}> {
  const { data } = await batchDeletePage({
    // "oper_type": "batchDeletePage",
    pageReqList: page_list
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
      resolve({Message})
    }else{
      reject(new Error(data.msg))
    }

  })
}

// 切换页面 给ue 
export async function changePage(page_id: string): Promise<{}> {
  emitUIInteraction({
    Category: "changePage",
    page_id
  })
  let ueMsg: {}
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("changePageResponse", (uedata?: string): {} => {
      try {
        uedata = JSON.parse(uedata)
        ueMsg = uedata['Message']
        resolve(ueMsg)
        
      } catch (error) {
        reject(new Error(error))
      }
      return ueMsg
    })
  })
}

// 设置生命体在页面的显隐状态 数据库 给ue 已重构
export async function setBelongShowStatus(belongShowStatus: belongShowStatus): Promise<{}> {
  const { data } = await batchUpdateLifeEntityBelongShowStatus({
    ...belongShowStatus
  })

  let Message: {}
  let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    try {
      console.log(data)
      Message = data

      if(data.code==1001){
        Message = data.value
        emitUIInteraction({
          Category: "addBelong",
          Message
        })
        addResponseEventListener("addBelongResponse", (uedata?: string): void => {
          uedata = JSON.parse(uedata)
          ueMsg = uedata
          resolve({Message, ueMsg})
        })
      }else{
        reject(new Error(data.msg))
      }
    } catch (error) {
      reject(new Error(error))
    }
    

  })
}