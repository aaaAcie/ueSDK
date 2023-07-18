/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-05-31 12:29:17
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-06-08 09:05:57
 * @FilePath: \WebServers424\mxxx\src\UEFile\manageUE.ts
 * @Description: 
 * 
 */
import { dealReturn } from '../utils/fns'
import {
  queryFileList,
  downloadBaseFile
} from "../api/ueFile.js";
import { BASE_URL } from '../utils/basic.js'

interface UEFileList{ 
  pages?: string, // 第几页 
  size?: string, // 每一页返回的数据量
  objectName?: string // 文件名称的模糊查询
}

// 查询底座文件列表
export async function getUEFileList(UEFileList: UEFileList){
  const {data} = await queryFileList({...UEFileList})
  return dealReturn(data)
}

// 下载底座文件列表
export async function downloadUEFile(fileName: string){
  const {data} = await downloadBaseFile({
    fileName
  })
  // return dealReturn(data)
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}
// 返回下载底座文件的链接
export async function downloadUEFileURL(fileName: string){
  let url = BASE_URL + '/baseFileManagement/downloadBaseFile?fileName=' + fileName
  // console.log(url)
  return new Promise((resolve, reject) => {
    resolve(url)
  })
}