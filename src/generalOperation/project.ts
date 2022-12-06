import { operProject } from '../api/api.js'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'

//  查询项目
export async function queryProject(): Promise<{}> {
  const { data } = await operProject({
    "oper_type": "selectProject"
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve({Message})
    }else{
      reject(new Error(data.msg))
    }

  })
}

//  新增项目 数睿传来项目id，返回两个关卡id
export async function addProject(project_id: string): Promise<{}> {
  const { data } = await operProject({
    "oper_type": "insertProject",
    project_id
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve({Message})
    }else{
      reject(new Error(data.msg))
    }

  })
}

//  删除项目
export async function deleteProject(project_id: string): Promise<{}> {
  const { data } = await operProject({
    "oper_type": "deleteProject",
    project_id
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve({Message})
    }else{
      reject(new Error(data.msg))
    }

  })
}
