import { Model } from './../initModel/initModel'
// import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { myChannel } from '../utils/basic.js'
const { addResponseEventListener, emitUIInteraction } = myChannel

interface sliceParams {
  life_entity_id: string;
  floor: string;
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
        ueMsg = JSON.parse(uedata)
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
        ueMsg = JSON.parse(uedata)
        // console.log(ueMsg)
        resolve({ ueMsg })
      }catch(e){
        reject(new Error(e))
      }
      return ueMsg
    })
  })
}