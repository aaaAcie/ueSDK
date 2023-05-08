/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-01-16 09:44:34
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-05-06 16:40:33
 * @FilePath: \mxxx\src\api\shot.js
 * @Description: 
 * 
 */
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

// 通过页面ID查询镜头信息
export const cameraDataQueryByPageId = (data) =>{
  return request({
    method: 'post',
    url: '/cameraBelong/cameraDataQueryByPageId',
    data
  })
}