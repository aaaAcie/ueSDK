/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-01-16 09:44:34
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-03-09 15:04:55
 * @FilePath: \WebServers424\mxxx\src\generalOperation\project.ts
 * @Description: 
 * 
 */
// import { operProject } from '../api/api.js'
// import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { myChannel } from '../utils/basic.js'
const { addResponseEventListener, emitUIInteraction } = myChannel

import { 
  selectProject,
  insertProject,
  deleteProjectById,
  updateProjectById,
  copyProjectCase
} from '../api/project.js'

//  查询项目
export async function queryProject(): Promise<{}> {
  const { data } = await selectProject({
    // "oper_type": "selectProject"
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

//  新增项目 数睿传来项目id，返回两个关卡id
export async function addProject(project_id: string): Promise<{}> {
  const { data } = await insertProject({
    // "oper_type": "insertProject",
    project_id
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

//  删除项目
export async function deleteProject(project_id: string): Promise<{}> {
  const { data } = await deleteProjectById({
    // "oper_type": "deleteProject",
    project_id
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
interface copyProjectParams{
  pagePointMapList: Array<{
    pageId: string, // 新页面id
    passId: string // 该页面对应的关卡号 --> '1'或'2'
  }>,
  oldProjectId: string // 旧项目id,
  newProjectId: string // 新项目id
}
//  复制项目案例
export async function copyProject(copyProjectParams: copyProjectParams): Promise<{}> {
  const { data } = await copyProjectCase({
    ...copyProjectParams
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    resolve(data)
  })
}