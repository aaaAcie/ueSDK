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
// 查询Material 给ue发送
export const selectSourceMaterial = (data) =>{
  return request({
    method: 'post',
    url: '/material/selectSourceMaterial',
    data
  })
}

// 新增素材
export const insertMaterial = (data) =>{
  return request({
    method: 'post',
    url: '/material/insertMaterial',
    data
  })
}
// 更新素材
export const updateMaterialById = (data) =>{
  return request({
    method: 'post',
    url: '/material/updateMaterial',
    data
  })
}// 删除素材
export const deleteMaterialById = (data) =>{
  return request({
    method: 'post',
    url: '/material/deleteMaterial',
    data
  })
}// 查询素材
export const selectMaterial = (data) =>{
  return request({
    method: 'post',
    url: '/material/selectMaterial',
    data
  })
}