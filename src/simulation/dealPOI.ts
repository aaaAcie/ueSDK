import { Model,addModelFunction } from './../initModel/initModel'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
// import { operLifeEntity } from '../api/api.js'
import { insertLifeEntity,updateLifeEntity } from '../api/lifeEntity.js'

interface TextStyle {
  fontSize: number;
  fontFamily: string;
  fontColor: string;
}
class POIModel extends Model {
  // belong: string;
  group: string;
  textStyle: TextStyle; // 文字效果
  // offset: { x: number; y: number }; // 位移
  // effect: {}; // 特效，预留
}

// 增加POI 跟ue通信并走接口提交保存 已重构
// POItype: 标题式 图标式 文本弹窗 视频弹窗式
export async function addPOIModel (POItype: String): Promise<{}> {
  // 增加POI 返回当前POI 属性
  emitUIInteraction({
    // Category: "addPOIModel",
    Category: "addModel",
    ...POItype
  })
  // operLifeEntity().then(data => console.log('0000000 ',data.data))
  
  let ueMsg: POIModel
  let msg2: {}
  let successCallback = []
  successCallback.push((msg2) => {
    return addModelFunction(msg2)
  })
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("addModelResponse", (uedata?: string): {} => {
      try {
        uedata = JSON.parse(uedata)
        ueMsg = uedata['Message']
        msg2 = ueMsg
        // let { belong, group, ...msg2} = ueMsg
        // msg2 = JSON.parse(JSON.stringify(ueMsg))
        if(successCallback.length){
          successCallback.shift()(msg2)
          .then(Message => resolve({uedata, Message}))
          .catch(err => reject(new Error(err)))
        }
        
      } catch (error) {
        reject(new Error(error))
      }
      return ueMsg
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