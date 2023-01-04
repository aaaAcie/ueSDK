import request from '../utils/request.js'

// 上传缩略图
export const uploadMaterialImages = (data) =>{
  return request({
    method: 'post',
    url: '/materialManagement/uploadFile',
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
// 上传素材
export const uploadMaterialFile = (data) =>{
  return request({
    method: 'post',
    url: '/materialManagement/uploadImages',
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}