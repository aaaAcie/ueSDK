import request from '../utils/request.js'

// 新增私有组
export const insertLifeEntityGroup = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/insertLifeEntityGroup',
    data
  })
}

// 删除私有组
export const deleteLifeEntityGroup = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/deleteLifeEntityGroup',
    data
  })
}

// 查询私有组
export const selectLifeEntityGroup = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/selectLifeEntityGroup',
    data
  })
}

// 更新私有组
export const updateLifeEntityGroup = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/updateLifeEntityGroup',
    data
  })
}
// 按照页面查私有组
export const queryPrivateGroup = (data) =>{
  return request({
    method: 'post',
    url: '/mix/selectMixedPageGroupLifeEntity',
    data
  })
}

// ------- 公有组 --------

// 新增公有组
export const insertLifeEntityCommonGroup = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/insertLifeEntityCommonGroup',
    data
  })
}

// 删除公有组
export const deleteLifeEntityCommonGroup = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/deleteLifeEntityCommonGroup',
    data
  })
}

// 查询公有组
export const selectLifeEntityCommonGroup = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/selectLifeEntityCommonGroup',
    data
  })
}

// 更新公有组
export const updateLifeEntityCommonGroup = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/updateLifeEntityCommonGroup',
    data
  })
}

// 按照关卡查公有组
export const queryCommonGroup = (data) =>{
  return request({
    method: 'post',
    url: '/mix/selectMixedCommonGroupLifeEntityByPoint',
    data
  })
}