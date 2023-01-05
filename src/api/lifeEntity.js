import request from '../utils/request.js'

// 模糊查询当前页面下对应的生命体
export const selectPageLifeEntityListByName = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntity/selectPageLifeEntityListByName',
    data
  })
}

// 下载模板
export const downloadExcel = (data) =>{
  return request({
    method: 'post',
    url: '/materialManagement/downloadBatchManagementTemplateExcel',
    data
  })
}

// 查询生命体
export const selectLifeEntity = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntity/selectLifeEntity',
    data
  })
}

// 新增生命体
export const insertLifeEntity = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntity/insertLifeEntity',
    data
  })
}

// 删除生命体
export const deleteLifeEntity = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntity/deleteLifeEntity',
    data
  })
}

// 批量更新生命体
export const batchUpdateLifeEntity = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntity/batchUpdateLifeEntity',
    data
  })
}

// 更新单个生命体
export const updateLifeEntity = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntity/updateLifeEntity',
    data
  })
}