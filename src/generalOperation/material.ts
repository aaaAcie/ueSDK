import { Model } from '../initModel/initModel'
import { 
  // selectSourceMaterial, 
  // uploadMaterialImages, 
  // uploadMaterialFile, 
  // operMaterial 
} from '../api/detail.js'

import { 
  selectSourceMaterial, 
  uploadMaterialImages, 
  uploadMaterialFile,
  insertMaterial,
  updateMaterialById,
  deleteMaterialById,
  selectMaterial
} from '../api/material.js'

interface uploadMaterialParams {
  files: File; // 文件（素材或缩略图）
  isThumbnail: string; // "1"代表是缩略图 "0"代表是素材
}
interface addMaterialParams {
  material_id: string; 
  name: string;
  type: string;
  img: string;
  userName: string; // 创建者
  material_url: Array<string>; 
  project_id: Array<string>; // ['0']代表权限为全部
}
interface updateMaterialParams {
  material_id: string; 
  name?: string;
  img?: string;
  material_url?: Array<string>; 
  project_id?: Array<string>;
}
interface getMaterialParams {
  query?: string; // name的模糊搜索
  project_id?: string; // 项目id
  sortByModifyTime?: boolean; // false为降序 true为升序
  sortByName?: boolean; // false为降序 true为升序
}
// 读取预置素材  从接口拿到数据 给前端 1 已重构
export async function initMaterial(projectId:string): Promise<{}> { 
  projectId = projectId.toString()
  const { data } = await selectSourceMaterial({
    projectId
  })
  let Message: Model
  return new Promise<Model>((resolve, reject) => {
    if(data.code==1001){
      Message = data.value
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}


// 上传自定义素材与缩略图 已重构
export async function uploadMaterial(uploadMaterialParams: uploadMaterialParams): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  let { files, isThumbnail } = uploadMaterialParams
  isThumbnail = isThumbnail.toString()
  if (isThumbnail=='1') {
    // 缩略图
    const { data } = await uploadMaterialImages({
      files
    })
    finalData = data
  }else{
    // 素材
    const { data } = await uploadMaterialFile({
      files
    })
    finalData = data
  }
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if (finalData.code==1001) {
      Message = finalData.value
      resolve({Message})
    } else {
      reject(new Error(finalData.msg))
    }
  })
}

// 新增素材 已重构
export async function addMaterial(addMaterialParams: addMaterialParams): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await insertMaterial({
    // "oper_type": "insertMaterial",
    ...addMaterialParams
  })
  finalData = data

  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if (finalData.code==1001) {
      Message = finalData.value
      resolve({Message})
    } else {
      reject(new Error(finalData.msg))
    }
  })
}

// 修改素材 已重构
export async function updateMaterial(updateMaterialParams: updateMaterialParams): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await updateMaterialById({
    // "oper_type": "updateMaterial",
    ...updateMaterialParams
  })
  finalData = data

  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if (finalData.code==1001) {
      Message = finalData.value
      resolve({Message})
    } else {
      reject(new Error(finalData.msg))
    }
  })
}

// 删除素材 已重构
export async function deleteMaterial(material_id: string): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await deleteMaterialById({
    // "oper_type": "deleteMaterial",
    material_id
  })
  finalData = data

  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if (finalData.code==1001) {
      Message = finalData.value
      resolve({Message})
    } else {
      reject(new Error(finalData.msg))
    }
  })
}

// 查询素材 已重构
export async function getMaterial(getMaterialParams: getMaterialParams): Promise<{}> {
  let finalData: {
    code: number,
    value: [],
    msg: ''
  }
  const { data } = await selectMaterial({
    // "oper_type": "selectMaterial",
    ...getMaterialParams
  })
  finalData = data

  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if (finalData.code==1001) {
      Message = finalData.value
      resolve({Message})
    } else {
      reject(new Error(finalData.msg))
    }
  })
}