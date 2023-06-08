import request from '../utils/request.js'

// 上传缩略图
export const getStreamingDataNode = (data) =>{
  return request({
    method: 'get',
    url: '/node',
  })
}
export const getAvailableStreamingNode = (data) =>{
  return request({
    method: 'get',
    url: '/node/video',
  })
}
export const getAvailableStreamingUrlNode = (data) =>{
  return request({
    method: 'get',
    url: '/node/getAvailableUrl',
  })
}