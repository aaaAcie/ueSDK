// import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { 
  addTree,
  getNewbieTree,
  updateTree,
  moveDirNode,
  drillTree,
  insertTreeWorkIndex,
  deleteTreeWorkIndex,
  deleteByRootNode,
  removeSysTree,
  dismissSysTreeWorkIndex,
  copySysTree,
  copySysTreeWorkIndex
} from '../api/groupNew.js'

interface GroupParam {
  name: string; // 新组的名字
  directParentId?: string; // 新组的父级的group_id（嵌套的新组需要传，否则可以为空或不传） 
  model: string | number; // '1'为公共组,'2'为私有组
  businessId: string; // 私有组传页面id，公共组传关卡id
  projectId: string; // 项目id
}
interface queryGroupParams{
  model: string | number; // '1'为公共组,'2'为私有组
  businessId: string; // 私有组传页面id，公共组传关卡id
  projectId: string; // 项目id
}
interface groupName{
  id: string; // 组id
  name: string; // 组名称
}
interface moveGroupParam{
  projectId: string, //  项目id
  businessId: string, // 私有组传页面id，公共组传关卡id
  id: string, // 要操作的组id
  moveType: number, // 移动类型 0:向上移动 1:向下移动 2:跨级移动
  moveStep?: number, // 移动步数
  dirTargetId?: string, // 移动目标的父节点id 可以不传或者为空
  targetDirSeq?: number // 移动目标的父节点下的位次seq, 在目标组的位置。不传默认为是顺序最后的节点。
}
interface drillGroupParam{
  projectId: string, //  项目id
  model: number, // 所属模块： 1-共有组 2-私有组
  businessId: string, // 私有组传页面id，公共组传关卡id
  directParentId: string, // 要操作的组id
}
interface idGroup{
  dirId: string, //  根组id（name为‘-’的组）
  workId: number // 生命体id
}
interface cancelAddParams{
  projectId: string, //  项目id
  model: 2, // 所属模块： 1-共有组 2-私有组
  businessId: string, // 私有组传页面id
  dirId: string, //  根组id（name为‘-’的组）
  workId: number // 生命体id
}
interface deleteGroupParam{
  projectId: string, //  项目id
  businessId: string, // 私有组传页面id，公共组传关卡id
  id: string, // 要操作的组id
  model: number // 所属模块： 1-共有组 2-私有组
}
interface disbandGroupParams {
  projectId: string, //  项目id
  model: number, // 所属模块： 1-共有组 2-私有组
  businessId: string, // 私有组传页面id
  id: string // 组id
}
interface copyGroupParam{
  projectId: string, //  项目id
  model: number, // 所属模块： 1-共有组 2-私有组
  businessId: string, // 私有组传页面id，公共组传关卡id
  treeNodeIds: Array<string> // 树节点以及对应的所有子节点ID
}
interface copyLifeEntityParam{
  model: number, // 所属模块： 1-共有组 2-私有组
  businessId: string, // 私有组传页面id，公共组传关卡id
  copySysTreeWorkIndexReqList: [{
    dirId: string, // 树节点ID/组ID
    workId: string // 生命体ID
  }]
}
// 新建组  给数据库
export async  function addGroup(GroupParam: GroupParam): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await addTree({
    ...GroupParam
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 查询组信息(获取目录树）
export async  function queryGroup(queryGroupParams: queryGroupParams): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await getNewbieTree({
    ...queryGroupParams
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 修改组名称
export async  function setGroupName(groupName: groupName): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await updateTree({
    ...groupName
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 删除组
export async  function deleteGroup(deleteGroupParam: deleteGroupParam): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await removeSysTree({
    ...deleteGroupParam
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}
// 移动组
export async  function moveGroup(moveGroupParam: moveGroupParam): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await moveDirNode({
    ...moveGroupParam
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 下钻组
export async  function drillGroup(drillGroupParam: drillGroupParam): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await drillTree({
    ...drillGroupParam
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 私有组引入生命体
export async  function addGroupIndex(sysTreeWorkIndexReqList: Array<idGroup>): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await insertTreeWorkIndex({
    sysTreeWorkIndexReqList
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 私有组删除生命体的关联关系
export async  function deleteGroupIndex(sysTreeWorkIndexReqList: Array<idGroup>): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await deleteTreeWorkIndex({
    sysTreeWorkIndexReqList
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 私有组取消引入
export async  function cancelAddGroupIndex(cancelAddParams: cancelAddParams): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await deleteByRootNode({
    ...cancelAddParams
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 解散组
export async  function disbandGroup(disbandGroupParams: disbandGroupParams): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await dismissSysTreeWorkIndex({
    ...disbandGroupParams
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 复制组
export async  function copyGroup(copyGroupParam: copyGroupParam): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await copySysTree({
    ...copyGroupParam
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}

// 复制组内生命体
export async  function copyLifeEntityInBulk(copyLifeEntityParam: copyLifeEntityParam): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await copySysTreeWorkIndex({
    ...copyLifeEntityParam
  })
  finalData = data

  let Message: {}
  // let ueMsg: {}

  return new Promise<{}>((resolve, reject) => {
    if(finalData.code==1001){
      Message = finalData.value
      let code = finalData.code
      resolve({Message, code})
    }else{
      reject(new Error(finalData.msg))
    }

  })
}