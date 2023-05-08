/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-05-04 16:53:58
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-05-08 09:48:43
 * @FilePath: \mxxx\src\api\globalEvent.js
 * @Description: 
 * 
 */
import request from '../utils/request.js'

// 新增全局类事件
export const insertGlobalEvent = (data) =>{
  return request({
    method: 'post',
    url: '/categoryEvent/insert',
    data
  })
}

// 查询全局类事件
export const getGlobalEvent = (data) =>{
  return request({
    method: 'post',
    url: '/categoryEvent/getCategoryEventList',
    data
  })
}

// 更新全局类事件
export const updateGlobalEvent = (data) =>{
  return request({
    method: 'post',
    url: '/categoryEvent/update',
    data
  })
}

// 删除全局类事件
export const deleteGlobalEventById = (data) =>{
  return request({
    method: 'post',
    url: '/categoryEvent/delete',
    data
  })
}

// 事件记录
export const addEventRecord = (data) =>{
  return request({
    method: 'post',
    url: '/categoryEventRecord/insert',
    data
  })
}

// 根据条件批量查询字典数据 eventType
export const queryDict = (data) =>{
  return request({
    method: 'post',
    url: '/dict/data/list',
    data
  })
}