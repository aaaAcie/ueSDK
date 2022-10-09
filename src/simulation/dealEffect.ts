import { Model } from './../initModel/initModel'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
interface TextStyle {
  fontSize: number;
  fontFamily: string;
  fontColor: string;
}
class effectModel extends Model {
  color: string; // 文字效果

}

// 增加特效
// effectType: 标题式 图标式 文本弹窗 视频弹窗式
export function addEffect (effectType: String): Promise<effectModel> {
  // 增加POI 返回当前POI 属性
  emitUIInteraction({
    // Category: "addPOIModel",
    Category: "addModel",
    ...effectType
  })
  let msg: effectModel
  return new Promise<effectModel>((resolve, reject) => {
    addResponseEventListener("addModelResponse", (data?: string): effectModel => {
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