import request from '../utils/request.js'

// 下载ue
export const queryFileList = (data) =>{
  return request({
    method: 'post',
    url: '/baseFileManagement/queryFileList',
    data
  })
}

// 下载ue
export const downloadBaseFile = (params) =>{
  return request({
    method: 'get',
    url: '/baseFileManagement/downloadBaseFile',
    params,
    responseType: "blob"
  })
}