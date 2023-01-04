import request from '../utils/request.js'

// 生命体新增类
export const batchInsertLabel = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntity/batchInsertExecutorLifeEntityIndex',
    data
  })
}

// 生命体设置类
export const resetLabel = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntity/resetExecutorLifeEntityIndex',
    data
  })
}

// 查询生命体对应的执行者链路
export const selectLifeEntityTriggerExecList = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntity/selectLifeEntityTriggerExecList',
    data
  })
}

// 操作类 给类添加生命体 新增生命体执行者生命体关联关系
export const insertExecutorLifeEntityIndex = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityIndex/insertExecutorLifeEntityIndex',
    data
  })
}
// 操作类 给类删除生命体 删除生命体执行者生命体关联关系
export const deleteExecutorLifeEntityIndexReq = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityIndex/deleteExecutorLifeEntityIndexReq',
    data
  })
}
// 操作类 查询生命体执行者生命体关联关系
export const selectExecutorLifeEntityIndex = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityIndex/selectExecutorLifeEntityIndex',
    data
  })
}
// 操作类 给类更新生命体 新增生命体执行者生命体关联关系
// export const insertExecutorLifeEntityIndex = (data) =>{
//   return request({
//     method: 'post',
//     url: '/executorLifeEntityIndex/insertExecutorLifeEntityIndex',
//     data
//   })
// }

// 操作类 查询执行者组树形结构
export const selectTreeLifeEntityExecutorList = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityIndex/selectTreeLifeEntityExecutorList',
    data
  })
}

// 新增类 执行者组
export const insertLifeEntityExecutor = (data) =>{
  return request({
    method: 'post',
    url: '/lifeEntityExecutor/insertLifeEntityExecutor',
    data
  })
}

// 修改类 执行者组
export const updateLifeEntityExecutor = (data) =>{
  return request({
    method: 'post',
    url: '/lifeEntityExecutor/updateLifeEntityExecutor',
    data
  })
}

// 删除类 执行者组
export const deleteLifeEntityExecutorById = (data) =>{
  return request({
    method: 'post',
    url: '/lifeEntityExecutor/deleteLifeEntityExecutor',
    data
  })
}