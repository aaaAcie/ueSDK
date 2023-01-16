import request from '../utils/request.js'

// 查询关卡
export const selectPoint = (data) =>{
  return request({
    method: 'post',
    url: '/point/selectPoint',
    data
  })
}

// 新增关卡
export const insertPoint = (data) =>{
  return request({
    method: 'post',
    url: '/point/insertPoint',
    data
  })
}

// 删除关卡
export const deletePointById = (data) =>{
  return request({
    method: 'post',
    url: '/point/deletePoint',
    data
  })
}

// 更新关卡
export const updatePoint = (data) =>{
  return request({
    method: 'post',
    url: '/point/updatePoint',
    data
  })
}