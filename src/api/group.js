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
// 私有组 移动组内单个生命体到其他组
export const moveOtherLifeEntityGroupIndex = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/moveOtherLifeEntityGroupIndex',
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
// 共有组 移动组内单个生命体到其他组
export const moveOtherLifeEntityCommonGroupIndex = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/moveOtherLifeEntityCommonGroupIndex',
    data
  })
}


// 给私有组添加成员
export const batchInsertLifeEntityGroupIndex = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/batchInsertLifeEntityGroupIndex',
    data
  })
}
// 给共有组添加成员
export const batchInsertLifeEntityCommonGroupIndex = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/batchInsertLifeEntityCommonGroupIndex',
    data
  })
}

// 移出【私有】【公有】组下的所有关联关系 到其父组 
// 解散组 私有
export const moveParentLifeEntityGroupIndex = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/moveParentLifeEntityGroupIndex',
    data
  })
}
// 移出【私有】【公有】组下的所有关联关系 到其父组 
// 解散组 公有
export const moveParentLifeEntityCommonGroupIndex = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/moveParentLifeEntityCommonGroupIndex',
    data
  })
}

// 修改【私有】【公有】组的嵌套关系
// 私有
export const moveLifeEntityGroup = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/moveLifeEntityGroup',
    data
  })
}
// 修改【私有】【公有】组的嵌套关系
// 公有
export const moveLifeEntityCommonGroup = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/moveLifeEntityCommonGroup',
    data
  })
}

// 删除【私有】【公有】组的里的单个生命体
// 私有
export const deleteLifeEntityGroupIndex = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/deleteLifeEntityGroupIndex',
    data
  })
}
// 删除【私有】【公有】组的里的单个生命体
// 公有
export const deleteLifeEntityCommonGroupIndex = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntityGroup/deleteLifeEntityCommonGroupIndex',
    data
  })
}
