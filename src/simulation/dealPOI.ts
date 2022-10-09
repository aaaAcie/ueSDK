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

// 增加POI 跟ue通信并走接口提交保存
// POItype: 标题式 图标式 文本弹窗 视频弹窗式
export function addPOIModel (POItype: String): Promise<POIModel> {
  // 增加POI 返回当前POI 属性
  emitUIInteraction({
    // Category: "addPOIModel",
    Category: "addModel",
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


// 修改POI属性
// export function setModelPropsById(modelProps: Model): Promise<{}> {
// }


// 获取单个POI (在生命体中实现)
// function getModelById(id: string): Promise<Model>{
//   // 暂无实时数据，需要自己主动获取
//   return { id: "xxx", name: "生命体1", type: "POI",position: {} };
// }