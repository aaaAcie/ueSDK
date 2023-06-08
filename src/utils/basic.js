/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2022-12-19 09:54:59
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-06-06 09:25:58
 * @FilePath: \WebServers424\mxxx\src\utils\basic.js
 * @Description:
 *
 */
// import { emitUIInteraction, addResponseEventListener } from '../pxy/pxy'
import {
  addResponseEventListener,
  emitUIInteraction,
} from "../basic2/myApp.js";

export const myChannel = {
  addResponseEventListener,
  emitUIInteraction,
};


export const BASE_URL =
  window.configuration?.MX_DATA_API?.current_value ||
  window.configuration?.MX_DATA_API ||
  JSON.parse(localStorage.updateSession)?.MX_DATA_API ||
  "http://115.238.181.246:10010";
