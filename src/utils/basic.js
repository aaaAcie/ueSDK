/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2022-12-19 09:54:59
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-09-19 17:04:18
 * @FilePath: \WebServers424\mxxx\src\utils\basic.js
 * @Description:
 *
 */
// import { emitUIInteraction, addResponseEventListener } from '../pxy/pxy'
import {
  addResponseEventListener as stream_addResponseEventListener,
  emitUIInteraction as stream_emitUIInteraction,
} from "../basic2/myApp.js";
import {
  addResponseEventListener as ue_addResponseEventListener,
  emitUIInteraction as ue_emitUIInteraction,
} from "../ue/indexNew.ts";

export const myChannel = {
  addResponseEventListener: ue_addResponseEventListener,
  emitUIInteraction: ue_emitUIInteraction,
};

export const myChannel2 = {
  addResponseEventListener: (...args) => {
    Promise.race([stream_addResponseEventListener(...args), ue_addResponseEventListener(...args)]).then(
      (data) => {
        return data
      },
    )
    // stream_addResponseEventListener(...args)
    // return ue_addResponseEventListener(...args)
  },
  emitUIInteraction: (...args) => {
    // return ue_emitUIInteraction(...args)
    Promise.race([stream_emitUIInteraction(...args), ue_emitUIInteraction(...args)]).then(
      (data) => {
        return data
      },
    )
  },
};


export const BASE_URL =
  window.configuration?.MX_DATA_API?.current_value ||
  window.configuration?.MX_DATA_API ||
  (localStorage.updateSession && JSON.parse(localStorage.updateSession)?.MX_DATA_API) ||
  "http://115.238.181.246:10010";
