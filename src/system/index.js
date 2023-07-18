/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-05-30 11:39:06
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-06-09 17:38:13
 * @FilePath: \WebServers424\mxxx\src\system\index.js
 * @Description: 
 * 
 */
import { dealReturn } from '../utils/fns'
import {
  queryPushStreamServerList,
  getAvailableStreamingNode,
  queryBlankPushStreamServer
} from "../api/matchmaker.js";

// 获取所有的推流地址及对应的连接人数
export async function getStreamingData(){
  // const {data} = await axios.get("http://115.238.181.246:12001/node")
  const {data} = await queryPushStreamServerList()
  return dealReturn(data)
}

// 直达推流地址
// export async function getAvailableStreaming(){
//   const {data} = await getAvailableStreamingNode()
//   return data
// }

// 获取当前可用的推流地址
export async function getAvailableStreamingUrl(){
  const {data} = await queryBlankPushStreamServer()
  return dealReturn(data)
}