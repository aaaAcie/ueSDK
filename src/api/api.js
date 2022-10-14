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

// 操作交互
export const operPoint = (data) =>{
  return request({
    method: 'post',
    url: '/operPoint',
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

// module.exports = {
//   getResource
// }