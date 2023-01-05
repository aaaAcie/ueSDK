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

// 操作生命体
export const operLifeEntity = (data) =>{
  return request({
    method: 'post',
    url: '/operLifeEntity',
    data
  })
}