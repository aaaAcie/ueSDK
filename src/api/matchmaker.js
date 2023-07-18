/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-05-30 12:04:47
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-06-09 17:38:02
 * @FilePath: \WebServers424\mxxx\src\api\matchmaker.js
 * @Description: 
 * 
 */
import request from '../utils/request.js'

// 查询客户端
export const queryPushStreamServerList = (data) =>{
  return request({
    method: 'get',
    url: '/server/queryPushStreamServerList',
  })
}
// 重定向跟客户端连接数为0的推流服务端
export const redirectBlankPushStreamServerURL = (data) =>{
  return request({
    method: 'get',
    url: '/server/redirectBlankPushStreamServerURL',
  })
}
// 查询跟客户端连接数为0的推流服务端
export const queryBlankPushStreamServer = (data) =>{
  return request({
    method: 'get',
    url: '/server/queryBlankPushStreamServer',
  })
}