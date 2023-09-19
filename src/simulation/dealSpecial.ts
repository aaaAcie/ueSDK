/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-05-18 14:29:15
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-08-11 11:28:42
 * @FilePath: \WebServers424\mxxx\src\simulation\dealSpecial.ts
 * @Description: 
 * 
 */
import { Model } from './../initModel/initModel'
// import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { myChannel } from '../utils/basic.js'
const { addResponseEventListener, emitUIInteraction } = myChannel

interface sliceParams {
  life_entity_id: string;
  floor: string;
  topsee?: '0' | '1'; // '0'代表非俯视，'1'代表非俯视（topsee不传默认为0）
}
// 获取指定模型的可拆楼层信息
export async function getSliceDataById (life_entity_id: String): Promise<{}> {
  emitUIInteraction({
    Category: "getSliceDataById",
    life_entity_id
  })
  
  let ueMsg: string
  let msg2: String

  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("getSliceDataByIdResponse", (uedata?: string): string => {
      try{
        ueMsg = JSON.parse(JSON.stringify(uedata))
        // console.log(ueMsg)
        resolve({ ueMsg })
      }catch(e){
        reject(new Error(e))
      }
      return ueMsg
    })
  })
}

// 拆指定模型的指定楼层
export async function sliceByFloor (sliceParams: sliceParams): Promise<{}> {
  emitUIInteraction({
    Category: "sliceByFloor",
    ...sliceParams
  })
  
  let ueMsg: string
  let msg2: String

  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("sliceByFloorResponse", (uedata?: string): string => {
      try{
        ueMsg = JSON.parse(JSON.stringify(uedata))
        // console.log(ueMsg)
        resolve({ ueMsg })
      }catch(e){
        reject(new Error(e))
      }
      return ueMsg
    })
  })
}