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

// 查询所有 给ue发送
export const selectSourceMaterial = (data) =>{
  return request({
    method: 'post',
    url: '/selectSourceMaterial',
    data
  })
}

// module.exports = {
//   getResource
// }