import request from '../utils/request.js'

// 模糊查询当前页面下对应的生命体
export const selectPageLifeEntityListByName = (data) =>{
  return request({
    method: 'post',
    url: '/executorLifeEntity/selectPageLifeEntityListByName',
    data
  })
}