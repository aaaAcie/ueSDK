import request from '../utils/request.js'

// 查询page
export const selectPage = (data) =>{
  return request({
    method: 'post',
    url: '/page/selectPage',
    data
  })
}

// 批量新增page
export const batchInsertPage = (data) =>{
  return request({
    method: 'post',
    url: '/page/batchInsertPage',
    data
  })
}

// 批量删除page
export const batchDeletePage = (data) =>{
  return request({
    method: 'post',
    url: '/page/batchDeletePage',
    data
  })
}

// 批量设置生命体在页面上的显隐状态
export const batchUpdateLifeEntityBelongShowStatus = (data) =>{
  return request({
    method: 'post',
    // url: '/executorLifeEntity/batchUpdateLifeEntityBelongShowStatus',
    url: "/lifeEntityBelong/batchUpdate",
    data
  })
}