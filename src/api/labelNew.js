import request from '../utils/request.js'

// 生命体设置类
export const setTreeNodeByLifeEntity = (data) =>{
  return request({
    method: 'post',
    url: '/sysTreeWorkIndex/setTreeNodeByLifeEntity',
    data
  })
}

// 查询生命体对应的类
export const findLifeEntityTreeNodeList = (data) =>{
  return request({
    method: 'post',
    url: '/sysTreeWorkIndex/findLifeEntityTreeNodeList',
    data
  })
}
