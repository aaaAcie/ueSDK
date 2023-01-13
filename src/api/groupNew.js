import request from '../utils/request.js'

// 新建组
export const addTree = (data) =>{
  return request({
    method: 'post',
    url: '/systree/v1/add',
    data
  })
}

// 查询组信息(获取目录树）
export const getNewbieTree = (data) =>{
  return request({
    method: 'post',
    url: '/systree/v1/newbieTree',
    data
  })
}
// 修改组名称
export const updateTree = (data) =>{
  return request({
    method: 'post',
    url: '/systree/v1/update',
    data
  })
}

// 删除组

// 移动组
export const moveDirNode = (data) =>{
  return request({
    method: 'post',
    url: '/systree/v1/moveDirNode',
    data
  })
}
// 下钻组
export const drillTree = (data) =>{
  return request({
    method: 'post',
    url: '/systree/v1/drill',
    data
  })
}

// 私有组引入生命体
export const insertTreeWorkIndex = (data) =>{
  return request({
    method: 'post',
    url: '/sysTreeWorkIndex/batchInsertSysTreeWorkIndex',
    data
  })
}
// 私有组删除生命体的关联关系
export const deleteTreeWorkIndex = (data) =>{
  return request({
    method: 'post',
    url: '/sysTreeWorkIndex/batchDeleteSysTreeWorkIndex',
    data
  })
}
// 私有组取消引入
export const deleteByRootNode = (data) =>{
  return request({
    method: 'post',
    url: '/sysTreeWorkIndex/batchDeleteByRootNode',
    data
  })
}