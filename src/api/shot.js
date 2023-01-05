import request from '../utils/request.js'

// 添加镜头
export const insertCamera = (data) =>{
  return request({
    method: 'post',
    url: '/camera/insertCamera',
    data
  })
}

// 查询镜头
export const selectCamera = (data) =>{
  return request({
    method: 'post',
    url: '/camera/selectCamera',
    data
  })
}

// 更新镜头
export const updateCamera = (data) =>{
  return request({
    method: 'post',
    url: '/camera/updateCamera',
    data
  })
}

// 删除镜头
export const deleteCameraById = (data) =>{
  return request({
    method: 'post',
    url: '/camera/deleteCamera',
    data
  })
}

// 操作镜头belong
export const insertOrUpdateCameraBelong = (data) =>{
  return request({
    method: 'post',
    url: '/cameraBelong/insertOrUpdateCameraBelong',
    data
  })
}