/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2022-12-19 09:54:59
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-03-16 14:05:28
 * @FilePath: \WebServers424\mxxx\src\utils\basic.js
 * @Description: 
 * 
 */
// import { emitUIInteraction, addResponseEventListener } from '../pxy/pxy'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'

export const myChannel = {
  addResponseEventListener,
  emitUIInteraction
}
// export const BASE_URL = 'http://192.168.2.128:10010' // ph环境
// export const BASE_URL = 'http://192.168.2.218:10010' // bb环境

// export const BASE_URL = 'http://115.238.181.246:10010' // 测试环境
// export const BASE_URL = 'http://115.238.181.246:18889'  // 预生产环境
// export const BASE_URL = 'http://192.168.6.225:10010' // 正式环境

// export const BASE_URL = window.configuration?.MX_DATA_API?.BASE_URL || 'http://115.238.181.246:10010'
// export const BASE_URL = window.configuration?.MX_DATA_API?.current_value || 'http://115.238.181.246:10010'
export const BASE_URL = window.configuration?.MX_DATA_API?.current_value || window.configuration?.MX_DATA_API || 'http://115.238.181.246:10010'




