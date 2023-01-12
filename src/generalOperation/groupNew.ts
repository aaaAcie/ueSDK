import { Model,DeleteParams,ModelParams } from '../initModel/initModel'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { 
  addTree,
  getNewbieTree,
  updateTree,
  moveDirNode
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
