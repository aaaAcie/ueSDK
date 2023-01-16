// import { Model,DeleteParams,ModelParams } from '../initModel/initModel'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { 
  operLifeEntityGroup,
  operLifeEntityGroupIndex,
  queryPrivateGroup,
  operLifeEntityCommonGroup,
  operLifeEntityCommonGroupIndex,
  queryCommonGroup,
  sortPrivateGroup,
  sortCommonGroup,
  sortPrivateGroupLifeEntity,
  sortCommonGroupLifeEntity,
  batchCopyPrivateLifeEntity,
  copyLifeEntityPrivateGroup
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
  life_entity_id: string, // 要移动的生命体id
  param_group_id: string, // 原组的id
  isCommon: string, // 目标组的类型 '0'为私有组，'1'为公共组
  target_group_id: string, // 目标组的id
  target_sort_index: number, // 在目标组的顺序
}
interface deleteSingle{
  life_entity_id: string; // 要移动的生命体id
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
  pass_id?: string, // 组所在的关卡（公有组必传）
  page_id?: string, // 组所在的页面（私有组必传）
  group_id: string; // 要操作的组id
  isCommon: string; // 要操作的组类型 '0'为私有组，'1'为公共组
  parent_group_id: string; // 目标组的id
  parent_ancestors: string; // 目标组的ancestors
  target_sort_index: number // 在目标组的位置
}
interface sortGroupParam{
  group_id: string, // 要操作的组id
  isCommon: string, // 要操作的组类型 '0'为私有组，'1'为公共组
  pass_id?: string, // 组所在的关卡（公有组必传）
  page_id?: string, // 组所在的页面（私有组必传）
  where_sort_index: number, // 原来的顺序
  sort_index: number // 期望的顺序
}
interface sortLifeEntityInGroupParam{
  group_id: string, // 组id
  isCommon: string, // 组类型 '0'为私有组，'1'为公共组
  life_entity_id?: string, // 生命体id
  where_sort_index: number | string, // 原来的顺序
  sort_index: number | string // 期望的顺序
}
interface copyLifeEntityParam{
  life_entity_id: string, // 要删除关联关系的生命体id
  group_id: string, // 组id
  sort_index: number, // 期望的顺序   
}
interface copyGroupParam{
  page_id?: string, // 私有组所在的页面id （复制私有组必传）
  pass_id?: string, // 公有组所在的关卡id（复制公有组必传）
  group_id: string, // 组id
  sort_index: number, // 期望的顺序
}
interface querySingleGroupParam{
  group_id: string, // 组id
  isCommon: string // 组的类型 '0'为私有组，'1'为公共组
}
interface deleteGroupLifeEntityInBulkParams{
  group_id: string, // 组id
  life_entity_id_list: Array<string> // 要删除关联关系的生命体id
}
// 给【私有】【公有】组添加成员  给数据库 返回当前的groupId 1 
// 接收数据库消息，是否改变了该成员的页面归属信息
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
    try {
      if(finalData.code==200){
        Message = finalData.data
        if (isCommon =='0') {
          // 私有组
          emitUIInteraction({
            Category: "addBelong",
            Message
          })
          addResponseEventListener("addBelongResponse", (uedata?: string): void => {
            uedata = JSON.parse(uedata)
            ueMsg = uedata
            resolve({Message, ueMsg})
          })
        } else {
          // 公有组
          resolve({Message, ueMsg})
        }
      }else{
        reject(new Error(finalData.msg))
      }
    } catch (error) {
      reject(new Error(error))
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
  // let allParams = JSON.parse(JSON.stringify(moveSingle).replace(/life_entity_id/g, 'where_life_entity_id'))
  const { isCommon, ...alldata } = moveSingle
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }
  if (isCommon.toString() =='0') {
    // 私有组
    const { data } = await operLifeEntityGroupIndex({
      "oper_type": "moveOtherLifeEntityGroupIndex",
      ...alldata
    })
    finalData = data
  } else {
    // 公有组
    const { data } = await operLifeEntityCommonGroupIndex({
      "oper_type": "moveOtherLifeEntityCommonGroupIndex",
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
      reject(new Error(finalData.msg+': '+finalData.data))
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

// 删除【私有】【公有】组的里的单个生命体 0
export async function deleteGroupIndex(deleteSingle: deleteSingle): Promise<{}> {
  // let allParams = JSON.parse(JSON.stringify(moveSingle).replace(/life_entity_id/g, 'where_life_entity_id'))
  const { isCommon, ...alldata } = deleteSingle
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }
  if (isCommon.toString() =='0') {
    // 查页面的私有组
    const { data } = await operLifeEntityGroupIndex({
      "oper_type": "deleteLifeEntityGroupIndex",
      ...alldata
    })
    finalData = data
  } else {
    // 查关卡的公有组
    const { data } = await operLifeEntityCommonGroupIndex({
      "oper_type": "deleteLifeEntityCommonGroupIndex",
      ...alldata
    })
    finalData = data
  }
  
  let Message: {}
  let ueMsg: {}

  // return new Promise<{}>((resolve, reject) => {
  //   if(finalData.code==200){
  //     Message = finalData.data
  //     resolve({Message, ueMsg})
  //   }else{
  //     reject(new Error(finalData.msg))
  //   }
  // })
  return new Promise<{}>((resolve, reject) => {
    try {
      if(finalData.code==200){
        Message = finalData.data
        // 私有组 给ue发送更新belong的信息
        if (isCommon.toString() =='0') {
          emitUIInteraction({
            Category: "addBelong",
            Message
          })
          addResponseEventListener("addBelongResponse", (uedata?: string): void => {
            uedata = JSON.parse(uedata)
            ueMsg = uedata
            resolve({Message, ueMsg})
          })
        } else {
          // 公有组
          resolve({Message, ueMsg})
        }

      }else{
        reject(new Error(finalData.msg))
      }
    } catch (error) {
      reject(new Error(error))
    }
  })
}

// 修改【私有】【公有】组顺序 0
export async function sortGroup(sortGroupParam: sortGroupParam): Promise<{}> {
  let { isCommon, ...alldata } = sortGroupParam
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }

  let alldata2 = JSON.parse(JSON.stringify(alldata).replace(/page_id/g, 'where_page_id').replace(/group_id/g, 'where_group_id'))
  isCommon = isCommon.toString()

  if (isCommon =='1') {
    // 共有组
    const { data } = await sortCommonGroup({
      "oper_type": "updatePointGroupIndex",
      ...alldata2
    })
    finalData = data
  } else {
    // 私有组
    const { data } = await sortPrivateGroup({
      "oper_type": "updatePageGroupIndex",
      ...alldata2
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

// 修改【私有】【公有】组内的生命体顺序 0
export async function sortLifeEntityInGroup(sortLifeEntityInGroupParam: sortLifeEntityInGroupParam): Promise<{}> {
  let { isCommon, ...alldata } = sortLifeEntityInGroupParam
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }

  let alldata2 = JSON.parse(JSON.stringify(alldata).replace(/life_entity_id/g, 'where_life_entity_id').replace(/group_id/g, 'where_group_id'))
  isCommon = isCommon.toString()

  if (isCommon =='1') {
    // 共有组
    const { data } = await sortCommonGroupLifeEntity({
      "oper_type": "updateLifeEntityCommonGroupIndex",
      ...alldata2
    })
    finalData = data
  } else {
    // 私有组
    const { data } = await sortPrivateGroupLifeEntity({
      "oper_type": "updateLifeEntityGroupIndex",
      ...alldata2
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

// 批量复制【私有】组内的生命体
export async function copyLifeEntityInBulk(copyLifeEntityInBulkParam: copyLifeEntityParam): Promise<{}> {
  let isCommon = '0'
  let alldata = copyLifeEntityInBulkParam
  // let { isCommon, ...alldata } = copyLifeEntityInBulkParam
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }

  // let alldata2 = JSON.parse(JSON.stringify(alldata).replace(/life_entity_id/g, 'where_life_entity_id').replace(/group_id/g, 'where_group_id'))
  isCommon = isCommon.toString()

  if (isCommon =='1') {
    // 共有组
    const { data } = await sortCommonGroupLifeEntity({
      data: alldata
    })
    finalData = data
  } else {
    // 私有组
    const { data } = await batchCopyPrivateLifeEntity({
      data: alldata
    })
    finalData = data
  }

  let ueMsg: {}
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==200){
      Message = finalData.data
      // 发送给ue复制出来的生命体
      emitUIInteraction({
        Category: "addModelInBulk",
        allParams: {"lifeEntityList": Message}
      })
      addResponseEventListener("addModelInBulkResponse", (uedata?: string): void => {
        uedata = JSON.parse(uedata)
        ueMsg = uedata
        resolve({Message, ueMsg})
      })
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 复制【私有】组
export async function copyLifeEntityGroup(copyGroupParam: copyGroupParam): Promise<{}> {
  let isCommon = '0'
  let alldata = copyGroupParam

  // let alldata = copyGroupParam
  // let { isCommon, ...alldata } = copyGroupParam
  let finalData: {
    code: number,
    data: [],
    msg: ''
  }

  // let alldata2 = JSON.parse(JSON.stringify(alldata).replace(/life_entity_id/g, 'where_life_entity_id').replace(/group_id/g, 'where_group_id'))
  isCommon = isCommon.toString()

  if (isCommon =='1') {
    // 共有组
    const { data } = await sortCommonGroupLifeEntity({
      ...alldata
    })
    finalData = data
  } else {
    // 私有组
    const { data } = await copyLifeEntityPrivateGroup({
      ...alldata
    })
    finalData = data
  }

  let ueMsg: {}
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==200){
      Message = finalData.data
      // 发送给ue复制出来的生命体
      emitUIInteraction({
        Category: "addModelInBulk",
        allParams: {"lifeEntityList": Message}
      })
      addResponseEventListener("addModelInBulkResponse", (uedata?: string): void => {
        uedata = JSON.parse(uedata)
        ueMsg = uedata
        resolve({Message, ueMsg})
      })
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 查询单个【私有】【公有】组信息 111
export async function querySingleGroup(queryGroupParam: querySingleGroupParam): Promise<{}> {
  let { isCommon, group_id } = queryGroupParam

  let finalData: {
    code: number,
    data: [],
    msg: ''
  }
  if (isCommon.toString() == '0') {
    // 查页面的私有组
    const { data } = await operLifeEntityGroup({
      "oper_type": "selectLifeEntityGroup",
      group_id
    })
    finalData = data
  } else {
    // 查关卡的公有组
    const { data } = await operLifeEntityCommonGroup({
      "oper_type": "selectLifeEntityCommonGroup",
      group_id
    })
    finalData = data
  }

  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==200){
      Message = finalData.data
      resolve({Message})
    }else{
      reject(new Error(finalData.msg))
    }
  })
}

// 私有组内批量删除生命体关联关系
export async function deleteGroupLifeEntityInBulk(param_list: Array<deleteGroupLifeEntityInBulkParams>): Promise<{}> {
  const { data } = await operLifeEntityGroup({
    "oper_type": "batchDeleteLifeEntityGroupIndex",
    param_list
  })
  let Message: {}
  let ueMsg: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
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

  })
}