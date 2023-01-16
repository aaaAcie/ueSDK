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