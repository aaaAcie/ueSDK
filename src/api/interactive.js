import request from '../utils/request.js'

// 查询交互
export const selectInteractive = (data) =>{
  return request({
    method: 'post',
    url: '/interactive/selectInteractive',
    data
  })
}

// 删除交互
export const deleteInteractiveById = (data) =>{
  return request({
    method: 'post',
    url: '/interactive/deleteInteractive',
    data
  })
}

// 批量添加交互
export const insertInteractive = (data) =>{
  return request({
    method: 'post',
    url: '/interactive/insertInteractive',
    data
  })
}

// 批量更新交互
export const updateInteractive = (data) =>{
  return request({
    method: 'post',
    url: '/interactive/updateInteractive',
    data
  })
}

