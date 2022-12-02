import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { 
  operLifeEntityExecutor
} from '../api/api.js'

interface lifeEntityExecutor{
  pass_id: string, // 关卡id
  parent_id: "", // 类的父级的exec_id
  ancestors: "", // 类的父级的ancestors
  exec_name: string, // 类的名字
  exec_type: string // 类的定义分类
}
interface pageExecutorIndex{
  exec_id: string, // 类id
  page_id: string // 页面id
}
interface executorLifeEntityIndex{
  exec_id: string, // 类id
  page_id: string // 页面id
  life_entity_id: string // 生命体id
}
interface treeLifeEntityExecutorList{
  pass_id: string, // 关卡id
  exec_type: string, // 类的exec_type
}

// 新增类
export async function addLifeEntityExecutor(lifeEntityExecutor: lifeEntityExecutor): Promise<{}> {
  const { data } = await operLifeEntityExecutor({
    "oper_type": "insertLifeEntityExecutor",
    ...lifeEntityExecutor
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

// 给页面绑定类
export async function addPageExecutorIndex(pageExecutorIndex: pageExecutorIndex): Promise<{}> {
  const { data } = await operLifeEntityExecutor({
    "oper_type": "insertPageExecutorIndex",
    ...pageExecutorIndex
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

// 给类添加生命体
export async function addExecutorLifeEntityIndex(executorLifeEntityIndex: executorLifeEntityIndex): Promise<{}> {
  const { data } = await operLifeEntityExecutor({
    "oper_type": "insertExecutorLifeEntityIndex",
    ...executorLifeEntityIndex
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

// 查询类的树形结构
export async function queryTreeLifeEntityExecutorList(treeLifeEntityExecutorList: treeLifeEntityExecutorList): Promise<{}> {
  const { data } = await operLifeEntityExecutor({
    ...treeLifeEntityExecutorList
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