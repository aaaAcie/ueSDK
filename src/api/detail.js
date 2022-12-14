// const { request } = require('../utils/request.js')
import request from '../utils/request.js'

// 批量新增生命体
export const importBatchManagementList = (data) =>{
  return request({
    method: 'post',
    url: '/importBatchManagementList',
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

// 下载模板
export const downloadExcel = (data) =>{
  return request({
    method: 'post',
    url: '/downloadBatchManagementTemplateExcel',
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

// 操作组
export const operLifeEntityGroup = (data) =>{
  return request({
    method: 'post',
    url: '/operLifeEntityGroup',
    data
  })
}

// 操作组index
export const operLifeEntityGroupIndex = (data) =>{
  return request({
    method: 'post',
    url: '/operLifeEntityGroupIndex',
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

// 查询所有 给ue发送
export const selectAllView = (pass_id) =>{
  return request({
    method: 'post',
    url: '/selectAllView',
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

// 操作镜头
export const queryMixedPageGroup = (data) =>{
  return request({
    method: 'post',
    url: '/selectMixedPageGroupLifeEntity',
    data
  })
}

// 查询Material 给ue发送
export const selectSourceMaterial = (data) =>{
  return request({
    method: 'post',
    url: '/selectSourceMaterial',
    data
  })
}

// 上传缩略图
export const uploadMaterialImages = (data) =>{
  return request({
    method: 'post',
    url: '/materialManagementUploadImages',
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

// 上传素材
export const uploadMaterialFile = (data) =>{
  return request({
    method: 'post',
    url: '/materialManagementUploadFile',
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

// 操作素材
export const operMaterial = (data) =>{
  return request({
    method: 'post',
    url: '/operMaterial',
    data
  })
}

// 模糊查询当前页面下对应的生命体
export const selectPageLifeEntityListByName = (data) =>{
  return request({
    method: 'post',
    url: '/selectPageLifeEntityListByName',
    data
  })
}

// module.exports = {
//   getResource
// }