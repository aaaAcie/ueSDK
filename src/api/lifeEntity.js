import request from '../utils/request.js'

// 模糊查询当前页面下对应的生命体
export const selectPageLifeEntityListByName = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntity/selectPageLifeEntityListByName',
    data
  })
}
// 批量新增生命体
export const importBatchManagementList = (data) =>{
  return request({
    method: 'post',
    url: '/materialManagement/importBatchManagementList',
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}


// 下载模板
export const downloadExcel = (params) =>{
  return request({
    method: 'get',
    url: '/materialManagement/downloadBatchManagementTemplateExcel',
    params,
    responseType: "blob"
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

// 增加特殊的belong记录 用于记录生命体在关卡的状态
export const addSpecialBelong = (data) =>{
  return request({
    method: 'post',
    url: '/lifeEntityBelong/insert',
    data
  })
}
