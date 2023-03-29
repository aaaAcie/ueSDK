/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-01-16 09:44:34
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-02-27 11:15:47
 * @FilePath: \WebServers424\mxxx\src\api\project.js
 * @Description: 
 * 
 */
import request from '../utils/request.js'

// 查询项目
export const selectProject = (data) =>{
  return request({
    method: 'post',
    url: '/project/selectProject',
    data
  })
}

// 新增项目
export const insertProject = (data) =>{
  return request({
    method: 'post',
    url: '/project/insertProject',
    data
  })
}

// 删除项目
export const deleteProjectById = (data) =>{
  return request({
    method: 'post',
    url: '/project/deleteProject',
    data
  })
}

// 更新项目
export const updateProjectById = (data) =>{
  return request({
    method: 'post',
    url: '/project/updateProject',
    data
  })
}

// 复制项目案例
export const copyProjectCase = (data) =>{
  return request({
    method: 'post',
    url: '/project/copyProjectCase',
    data
  })
}