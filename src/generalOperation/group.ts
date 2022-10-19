import { Model,DeleteParams,ModelParams } from '../initModel/initModel'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { operLifeEntityGroup, operLifeEntityGroupIndex } from '../api/api.js'
interface GroupIndexParams{
  group_id: string; // 新组的名字
  life_entity_id: Array<string>; // 新组的父级的group_id（嵌套的新组需要传）
}
interface GroupParam  {
  group_name: string; // 新组的名字
  parent_id: string; // 新组的父级的group_id
  ancestors: string; // 新组的父级的ancestors
}
interface moveSingle{
  where_life_entity_id: string, // 要移动的生命体id
  group_id: string // 目标组id
}
// 给组添加成员  给数据库 返回当前的groupId 1
export async function addGroupIndex (idGroup: Array<GroupIndexParams>): Promise<{}> {
  const { data } = await operLifeEntityGroupIndex({
    "oper_type": "batchInsertLifeEntityGroupIndex",
    "life_entity_group_index_list": idGroup
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}

// 新建组  给数据库 
export async function addGroup(GroupParam: GroupParam ): Promise<{}> {
  const { data } = await operLifeEntityGroup({
    "oper_type": "insertLifeEntityGroup",
    ...GroupParam
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}

// 查询组信息  给数据库 
export async function queryGroup(GroupParam: GroupParam ): Promise<{}> {
  const { data } = await operLifeEntityGroupIndex({
    "oper_type": "selectLifeEntityGroupIndex",
    ...GroupParam
  })
  
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}

// 删除组下的所有关联关系 到其父组
export async function deleteGroupConnection(group_id: string ): Promise<{}> {
  const { data } = await operLifeEntityGroupIndex({
    "oper_type": "moveParentLifeEntityGroupIndex",
    group_id
  })
  
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}

// 移出单个生命体到别的组
export async function moveSingle2Group(moveSingle: moveSingle ): Promise<{}> {
  const { data } = await operLifeEntityGroupIndex({
    "oper_type": "updateLifeEntityGroupIndex",
    ...moveSingle
  })
  
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}