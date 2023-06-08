import { dealReturn } from '../utils/fns'
import {
  getStreamingDataNode,
  getAvailableStreamingNode,
  getAvailableStreamingUrlNode
} from "../api/matchmaker.js";

// 获取所有的推流地址及对应的连接人数
export async function getStreamingData(){
  // const {data} = await axios.get("http://115.238.181.246:12001/node")
  const {data} = await getStreamingDataNode()
  return dealReturn(data)
}

// 直达推流地址
// export async function getAvailableStreaming(){
//   const {data} = await getAvailableStreamingNode()
//   return data
// }

// 获取当前可用的推流地址
export async function getAvailableStreamingUrl(){
  const {data} = await getAvailableStreamingUrlNode()
  return dealReturn(data)
}