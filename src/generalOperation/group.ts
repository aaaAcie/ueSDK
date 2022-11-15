import { Model,DeleteParams,ModelParams } from '../initModel/initModel'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { 
  operLifeEntityGroup,
  operLifeEntityGroupIndex,
  queryPrivateGroup,
  operLifeEntityCommonGroup,
  operLifeEntityCommonGroupIndex,
  queryCommonGroup
} from '../api/api.js'
interface GroupIndexParams{
  group_id: string; // 新组的名字
  life_entity_id: Array<string>; // 新组的父级的group_id（嵌套的新组需要传）
}
interface GroupParam  {
  group_name: string; // 新组的名字
  parent_id: string; // 新组的父级的group_id（嵌套的新组需要传）
  ancestors: string; // 新组的父级的ancestors（嵌套的新组需要传）
  isCommon: string; // '0'为私有组，'1'为公共组
  page_id: string; // (创建私有组必传) 新组的所属页面id
  pass_id: string; // (创建公共组必传) 新组的所属关卡id
}
interface moveSingle{
  where_life_entity_id: string; // 要移动的生命体id
  group_id: string; // 目标组id
  isCommon: string // '0'为私有组，'1'为公共组
}
interface queryGroupParams{
  pass_id: string; // 关卡的id
  page_id?: string; // 页面的id
}
interface deleteGroupCntParams {
  group_id: string; // 组id
  isCommon: string // '0'为私有组，'1'为公共组
}
interface deleteGroupParam{
  group_id: string; // 要操作的组id
  isCommon: string // 要操作的组类型 '0'为私有组，'1'为公共组
}
interface moveGroupParam{
  group_id: string; // 要操作的组id
  isCommon: string; // 要操作的组类型 '0'为私有组，'1'为公共组
  parent_group_id: string; // 目标组的id
  parent_ancestors: string // 目标组的ancestors
}
// 给【私有】【公有】组添加成员  给数据库 返回当前的groupId 1
export async function addGroupIndex (idGroup: Array<GroupIndexParams>, isCommon: string = "1"): Promise<{}> {
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }
  isCommon = isCommon.toString()
  if (isCommon =='1') {
    // 共有组
    const { data } = await operLifeEntityCommonGroupIndex({
      "oper_type": "batchInsertLifeEntityCommonGroupIndex",
      "life_entity_common_group_index_list": idGroup
    })
    finalData = data
  } else {
    // 私有组
    const { data } = await operLifeEntityGroupIndex({
      "oper_type": "batchInsertLifeEntityGroupIndex",
      "life_entity_group_index_list": idGroup
    })
    finalData = data
  }

  let ueMsg: {}
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==200){
      Message = finalData.data
      resolve({Message, ueMsg})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 新建【私有】【公有】组  给数据库 1
export async  function addGroup(GroupParam: GroupParam): Promise<{}> {
  let isCo: string
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }
  // 默认为公有组
  isCo =  GroupParam['isCommon'] ? GroupParam['isCommon'].toString() : '1'
  if (isCo =='1') {
    // 共有组
    let {isCommon,page_id,...finalParam} = GroupParam
    // console.log('公有insertLifeEntityCommonGroup')
    const { data } = await operLifeEntityCommonGroup({
      "oper_type": "insertLifeEntityCommonGroup",
      ...finalParam
    })
    finalData = data
  } else {
    // 私有组
    let {isCommon,pass_id,...finalParam} = GroupParam
    // console.log('私有insertLifeEntityGroup')
    const { data } = await operLifeEntityGroup({
      "oper_type": "insertLifeEntityGroup",
      ...finalParam
    })
    finalData = data
  }

  let Message: {}
  let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==200){
      Message = finalData.data
      resolve({Message, ueMsg})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 查询 【私有】【公有】组信息 给数据库 1
export async function queryGroup(queryGroupParams: queryGroupParams): Promise<{}> {
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }
  if (queryGroupParams['page_id']) {
    // 查页面的私有组
    const { data } = await queryPrivateGroup({
      ...queryGroupParams
    })
    finalData = data
  } else {
    // 查关卡的公有组
    const { data } = await queryCommonGroup({
      ...queryGroupParams
    })
    finalData = data
  }

  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==200){
      Message = finalData.data
      resolve(Message)
    }else{
      reject(new Error(finalData.msg))
    }
  })
}

// 移出【私有】【公有】组下的所有关联关系 到其父组 1
export async function deleteGroupConnection(deleteGroupCntParams: deleteGroupCntParams): Promise<{}> {
  const group_id = deleteGroupCntParams['group_id']
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }
  if (deleteGroupCntParams['isCommon'].toString() =='0') {
    // 查页面的私有组
    const { data } = await operLifeEntityGroupIndex({
      "oper_type": "moveParentLifeEntityGroupIndex",
      group_id
    })
    finalData = data
  } else {
    // 查关卡的公有组
    const { data } = await operLifeEntityCommonGroupIndex({
      "oper_type": "moveParentLifeEntityCommonGroupIndex",
      group_id
    })
    finalData = data
  }
  
  let Message: {}
  let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==200){
      Message = finalData.data
      resolve({Message, ueMsg})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 移出单个生命体到别的【私有】【公有】组 1
export async function moveSingle2Group(moveSingle: moveSingle): Promise<{}> {
  let allParams = JSON.parse(JSON.stringify(moveSingle).replace(/life_entity_id/g, 'where_life_entity_id'))
  const { isCommon, ...alldata } = allParams
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }
  if (isCommon.toString() =='0') {
    // 查页面的私有组
    const { data } = await operLifeEntityGroupIndex({
      "oper_type": "updateLifeEntityGroupIndex",
      ...alldata
    })
    finalData = data
  } else {
    // 查关卡的公有组
    const { data } = await operLifeEntityCommonGroupIndex({
      "oper_type": "updateLifeEntityCommonGroupIndex",
      ...alldata
    })
    finalData = data
  }
  
  let Message: {}
  let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==200){
      Message = finalData.data
      resolve({Message, ueMsg})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 删除【私有】【公有】组 1
export async function deleteGroup (deleteGroupParam: deleteGroupParam): Promise<{}> {
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }
  const isCommon = deleteGroupParam.isCommon.toString()
  if (isCommon =='1') {
    // 共有组
    const { data } = await operLifeEntityCommonGroup({
      "oper_type": "deleteLifeEntityCommonGroup",
      "group_id": deleteGroupParam.group_id
    })
    finalData = data
  } else {
    // 私有组
    const { data } = await operLifeEntityGroup({
      "oper_type": "deleteLifeEntityGroup",
      "group_id": deleteGroupParam.group_id
    })
    finalData = data
  }

  let ueMsg: {}
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==200){
      Message = finalData.data
      resolve({Message, ueMsg})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 修改【私有】【公有】组的嵌套关系 1
export async function moveGroup2Group (moveGroupParam: moveGroupParam): Promise<{}> {
  let { isCommon, ...alldata } = moveGroupParam
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }
  isCommon = isCommon.toString()
  if (isCommon =='1') {
    // 共有组
    const { data } = await operLifeEntityCommonGroup({
      "oper_type": "moveLifeEntityCommonGroup",
      ...alldata
    })
    finalData = data
  } else {
    // 私有组
    const { data } = await operLifeEntityGroup({
      "oper_type": "moveLifeEntityGroup",
      ...alldata
    })
    finalData = data
  }

  let ueMsg: {}
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==200){
      Message = finalData.data
      resolve({Message, ueMsg})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}