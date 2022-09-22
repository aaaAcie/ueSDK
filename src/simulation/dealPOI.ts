import { Model } from './../initModel/initModel'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
interface TextStyle {
  fontSize: number;
  fontFamily: string;
  fontColor: string;
}
class POIModel extends Model {
  textStyle: TextStyle; // 文字效果
  // offset: { x: number; y: number }; // 位移
  // effect: {}; // 特效，预留
}

// 增加POI
// POItype: 标题式 图标式 文本弹窗 视频弹窗式
export function addPOIModel (POItype: String): Promise<POIModel> {
  // 增加POI 返回当前POI 属性
  emitUIInteraction({
    // Category: "addPOIModel",
    Category: "addPoi",
    ...POItype
  })
  let msg: POIModel
  return new Promise<POIModel>((resolve, reject) => {
    addResponseEventListener("addPoiResponse", (data?: string): POIModel => {
      try {
        msg = JSON.parse(data)
        // msg = data
        resolve(msg)
      } catch (error) {
        reject(new Error(error))
      }
      return msg
    })
  })
}

// 设置POI文字
export function setPOIText (textStyle: TextStyle): Promise<POIModel> {
  // 增加POI 返回当前POI 属性
  emitUIInteraction({
    Category: "setPOIText",
    ...textStyle
  })
  let msg: POIModel
  return new Promise<POIModel>((resolve, reject) => {
    addResponseEventListener("setPOITextResponse", (data?: string): POIModel => {
      try {
        msg = JSON.parse(data)
        // msg = data
        resolve(msg)
      } catch (error) {
        reject(new Error(error))
      }
      return msg
    })
  })
}

// 获取单个POI (在生命体中实现)
// function getModelById(id: string): Promise<Model>{
//   // 暂无实时数据，需要自己主动获取
//   return { id: "xxx", name: "生命体1", type: "POI",position: {} };
// }