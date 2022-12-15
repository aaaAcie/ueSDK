import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { 
  operLifeEntityExecutor,
  resetLabel,
  batchInsertLabel,
  selectTreeLifeEntityExecutorList,
  selectLifeEntityTriggerExecList
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
interface executorLifeEntityIndexParam{
  exec_id_list: Array<string>, // 类id的数组
  life_entity_id_list: Array<string>, // 生命体id 
  page_id: string, // 关卡id
}
interface setLifeEntityExecutorParams{
  exec_id: string, // 类id
  exec_name: string, // 类的名字
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
  const { data } = await selectTreeLifeEntityExecutorList({
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

// 给生命体设置类
export async function resetExecutorLifeEntityIndex(executorLifeEntityIndexParam: executorLifeEntityIndexParam): Promise<{}> {
  const { data } = await resetLabel({
    ...executorLifeEntityIndexParam
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

// 给生命体追加类
export async function appendExecutorLifeEntityIndex(executorLifeEntityIndexParam: executorLifeEntityIndexParam): Promise<{}> {
  const { data } = await batchInsertLabel({
    ...executorLifeEntityIndexParam
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

// 查询生命体对应的执行者链路
export async function queryLifeEntityTriggerExecList(life_entity_id_list: Array<string>): Promise<{}> {
  const { data } = await selectLifeEntityTriggerExecList({
    life_entity_id_list
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

// 修改类名字
export async function setLifeEntityExecutor(setLifeEntityExecutorParams: setLifeEntityExecutorParams): Promise<{}> {
  let setLifeEntityExecutorParams2 = JSON.parse(JSON.stringify(setLifeEntityExecutorParams).replace('exec_id',"where_exec_id"))
  const { data } = await operLifeEntityExecutor({
    "oper_type": "updateLifeEntityExecutor",
    ...setLifeEntityExecutorParams2
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

// 删除类
export async function deleteLifeEntityExecutor(exec_id: string): Promise<{}> {
  const { data } = await operLifeEntityExecutor({
    "oper_type": "updateLifeEntityExecutor",
    exec_id
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