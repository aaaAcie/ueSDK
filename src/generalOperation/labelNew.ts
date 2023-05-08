/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-04-27 09:03:55
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-05-06 11:30:58
 * @FilePath: \mxxx\src\generalOperation\labelNew.ts
 * @Description: 
 * 
 */
import { dealLabelBelongsReturn, dealReturn } from '../utils/fns'
import { 
  addTree,
  getNewbieTree,
  updateTree,
  drillTree,
  insertTreeWorkIndex,
  deleteTreeWorkIndex,
  removeSysTree
} from '../api/groupNew.js'
import { 
  findLifeEntityTreeNodeList,
  setTreeNodeByLifeEntity
} from '../api/labelNew.js'

interface lifeEntityExecutor{
  name: string; // 新类的名字
  directParentId?: string; // 新类的父级的group_id（嵌套的新组需要传，否则可以为空或不传） 
  model: 3; // 3为类
  businessId: string; // 项目id
  projectId: string; // 项目id
}
interface idGroup{
  dirId: string, //  类id
  workId: number, // 生命体id
  dirPath: string // 类的 ancestorChainPathNames
}
interface executorLifeEntityIndex{
  projectId: string, // 项目id
  model: 3, 
  businessId: string, // 项目id
  sysTreeWorkIndexDTOList: Array<idGroup> 
}
interface treeLifeEntityExecutorList{
  model: 3; 
  businessId: string; // 项目id
  projectId: string; // 项目id
}
// 新增类 已重构1
export async function addLifeEntityExecutor(lifeEntityExecutor: lifeEntityExecutor): Promise<{}> {
  const { data } = await addTree({
    ...lifeEntityExecutor
  })
  return dealReturn(data)
}


// 给类添加生命体 已重构1 给ue发labelBelongs
export async function addExecutorLifeEntityIndex(executorLifeEntityIndex: executorLifeEntityIndex): Promise<{}> {
  const { data } = await insertTreeWorkIndex({
    ...executorLifeEntityIndex
  })
  return dealLabelBelongsReturn(data)
}

// 查询类的树形结构(获取目录树） 已重构1
export async function queryTreeLifeEntityExecutorList(treeLifeEntityExecutorList: treeLifeEntityExecutorList): Promise<{}> {
  const { data } = await getNewbieTree({
    ...treeLifeEntityExecutorList
  })
  return dealReturn(data)
}

interface drillLifeEntityExecutorParam{
  projectId: string, //  项目id
  model: 3, // 所属模块： 1-共有组 2-私有组
  businessId: string, // 项目id
  directParentId: string, // 要操作的类id
}
// 查询类下的直属生命体 1
export async function drillLifeEntityExecutor(drillLifeEntityExecutorParam: drillLifeEntityExecutorParam): Promise<{}>{
  const { data } = await drillTree({
    ...drillLifeEntityExecutorParam
  })
  return dealReturn(data)
}
interface executorLifeEntityIndexParam{
  dirId: string, // 类id
  lifeEntityId: string, // 生命体id 
  model: 3,
  projectId: string, // 项目id
}
// 给生命体设置类 1 给ue发labelBelongs
export async function resetExecutorLifeEntityIndex(executorLifeEntityIndexParam: executorLifeEntityIndexParam): Promise<{}> {
  const { data } = await setTreeNodeByLifeEntity({
    ...executorLifeEntityIndexParam
  })
  return dealLabelBelongsReturn(data)
}

// 查询生命体对应的执行者链路 1
// interface queryExecutorLifeEntityIndexParam{
//   lifeEntityId: string, // 生命体id 
//   model: 3,
//   projectId: string, // 项目id
// }
// export async function queryLifeEntityTriggerExecList(queryExecutorLifeEntityIndexParam: queryExecutorLifeEntityIndexParam): Promise<{}> {
//   const { data } = await findLifeEntityTreeNodeList({
//     ...queryExecutorLifeEntityIndexParam
//   })
//   return dealReturn(data)
// }
// 修改类名字 已重构1
interface setLifeEntityExecutorParams{
  id: string; // 类id
  name: string; // 类id
}
export async function setLifeEntityExecutor(setLifeEntityExecutorParams: setLifeEntityExecutorParams): Promise<{}> {
  let setLifeEntityExecutorParams2 = JSON.parse(JSON.stringify(setLifeEntityExecutorParams).replace('exec_id',"where_exec_id"))
  const { data } = await updateTree({
    // "oper_type": "updateLifeEntityExecutor",
    ...setLifeEntityExecutorParams2
  })
  return dealReturn(data)
}
// 删除类  已重构1 000000
interface deleteLifeEntityExecutorIndex{
  projectId: string, //  项目id
  businessId: string, // 项目id
  id: string, // 要操作的类id
  model: number // 3
}
export async function deleteLifeEntityExecutor(deleteLifeEntityExecutorIndex: deleteLifeEntityExecutorIndex): Promise<{}> {
  const { data } = await removeSysTree({
    deleteLifeEntityExecutorIndex
  })
  return dealReturn(data)
}
interface idGroupDelete{
  dirId: string, //  类id
  workId: number, // 生命体id
}
interface deleteExecutorLifeEntityIndexParams{
  model: 3,
  projectId: string, // 项目id
  businessId: string, // 项目id
  sysTreeWorkIndexDTOList: Array<idGroupDelete> 
}
// 删除生命体执行者生命体关联关系 已重构(new)1 给ue发labelBelongs
export async function deleteExecutorLifeEntityIndex(deleteExecutorLifeEntityIndexParams: deleteExecutorLifeEntityIndexParams): Promise<{}> {
  const { data } = await deleteTreeWorkIndex({
    ...deleteExecutorLifeEntityIndexParams
  })
  return dealLabelBelongsReturn(data)
}
interface queryExecutorLifeEntityIndexParams{
  projectId: string, // 项目id
  lifeEntityId?: string // 生命体id
  model: 3
}
// 查询生命体执行者生命体关联关系 1
// 查询生命体对应的类
export async function queryExecutorLifeEntityIndex(queryExecutorLifeEntityIndexParams: queryExecutorLifeEntityIndexParams): Promise<{}> {
  const { data } = await findLifeEntityTreeNodeList({
    ...queryExecutorLifeEntityIndexParams
  })
  return dealReturn(data)
}