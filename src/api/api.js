// const { request } = require('../utils/request.js')
import request from '../utils/request.js'

// 操作生命体
export const operLifeEntity = (data) =>{
  return request({
    method: 'post',
    url: '/operLifeEntity',
    data
  })
}

// 操作交互
export const operInteractive = (data) =>{
  return request({
    method: 'post',
    url: '/operInteractive',
    data
  })
}

// 操作关卡
export const operPoint = (data) =>{
  return request({
    method: 'post',
    url: '/operPoint',
    data
  })
}

// 操作私有组
export const operLifeEntityGroup = (data) =>{
  return request({
    method: 'post',
    url: '/operLifeEntityGroup',
    data
  })
}

// 操作公共组
export const operLifeEntityCommonGroup = (data) =>{
  return request({
    method: 'post',
    url: '/operLifeEntityCommonGroup',
    data
  })
}

// 操作私有组index
export const operLifeEntityGroupIndex = (data) =>{
  return request({
    method: 'post',
    url: '/operLifeEntityGroupIndex',
    data
  })
}

// 操作公有组index
export const operLifeEntityCommonGroupIndex = (data) =>{
  return request({
    method: 'post',
    url: '/operLifeEntityCommonGroupIndex',
    data
  })
}

// 操作镜头
export const operCamera = (data) =>{
  return request({
    method: 'post',
    url: '/operCamera',
    data
  })
}

// 操作镜头belong
export const operCameraBelong = (data) =>{
  return request({
    method: 'post',
    url: '/operCameraBelong',
    data
  })
}

// 查询所有 给ue发送
export const selectAllView = (pass_id) =>{
  return request({
    method: 'post',
    url: '/mix/selectAllView',
    data: {
      pass_id
    }
  })
}

// 操作page
export const operPage = (data) =>{
  return request({
    method: 'post',
    url: '/operPage',
    data
  })
}

// 按照页面查私有组
export const queryPrivateGroup = (data) =>{
  return request({
    method: 'post',
    url: '/selectMixedPageGroupLifeEntity',
    data
  })
}

// 按照关卡查公有组
export const queryCommonGroup = (data) =>{
  return request({
    method: 'post',
    url: '/selectMixedCommonGroupLifeEntityByPoint',
    data
  })
}

// 修改私有组顺序
export const sortPrivateGroup = (data) =>{
  return request({
    method: 'post',
    url: '/operPageGroupIndex',
    data
  })
}
// 修改公有组顺序
export const sortCommonGroup = (data) =>{
  return request({
    method: 'post',
    url: '/operPointGroupIndex',
    data
  })
}
// 修改私有组内生命体顺序
export const sortPrivateGroupLifeEntity = (data) =>{
  return request({
    method: 'post',
    url: '/operLifeEntityGroupIndex',
    data
  })
}
// 修改公有组内生命体顺序
export const sortCommonGroupLifeEntity = (data) =>{
  return request({
    method: 'post',
    url: '/operLifeEntityCommonGroupIndex',
    data
  })
}
// 批量复制私有组内的生命体
export const batchCopyPrivateLifeEntity = (data) =>{
  return request({
    method: 'post',
    url: '/batchCopyLifeEntity',
    data
  })
}
// 复制私有组
export const copyLifeEntityPrivateGroup = (data) =>{
  return request({
    method: 'post',
    url: '/copyLifeEntityGroup',
    data
  })
}

// 查询所有 给ue发送
export const selectSourceMaterial = (data) =>{
  return request({
    method: 'post',
    url: '/selectSourceMaterial',
    data
  })
}

// 批量设置生命体在页面上的显隐状态
export const batchUpdateLifeEntityBelongShowStatus = (data) =>{
  return request({
    method: 'post',
    url: '/batchUpdateLifeEntityBelongShowStatus',
    data
  })
}

// 操作类 执行者组
export const operLifeEntityExecutor = (data) =>{
  return request({
    method: 'post',
    url: '/operLifeEntityExecutor',
    data
  })
}
// 单个生命体设置类
export const resetLabel = (data) =>{
  return request({
    method: 'post',
    url: '/resetExecutorLifeEntityIndex',
    data
  })
}
// 单个生命体新增类
export const batchInsertLabel = (data) =>{
  return request({
    method: 'post',
    url: '/batchInsertExecutorLifeEntityIndex',
    data
  })
}
// 查询执行者组树形结构
export const selectTreeLifeEntityExecutorList = (data) =>{
  return request({
    method: 'post',
    url: '/selectTreeLifeEntityExecutorList',
    data
  })
}
// 查询生命体对应的执行者链路
export const selectLifeEntityTriggerExecList = (data) =>{
  return request({
    method: 'post',
    url: '/selectLifeEntityTriggerExecList',
    data
  })
}
// 操作项目
export const operProject = (data) =>{
  return request({
    method: 'post',
    url: '/operProject',
    data
  })
}
// module.exports = {
//   getResource
// }