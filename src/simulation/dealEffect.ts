import { Model, addModelFunction } from './../initModel/initModel'
import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
// import { operLifeEntity } from '../api/api.js'
import { insertLifeEntity,updateLifeEntity } from '../api/lifeEntity.js'

interface TextStyle {
  fontSize: number;
  fontFamily: string;
  fontColor: string;
}
class effectModel extends Model {
  color: string; // 文字效果

}

// 增加特效 跟ue通信并走接口提交保存 已重构
// effectType: 标题式 图标式 文本弹窗 视频弹窗式 
export function addEffect (effectType: String): Promise<{}> {
  // 增加POI 返回当前POI 属性
  emitUIInteraction({
    // Category: "addPOIModel",
    Category: "addModel",
    ...effectType
  })
    
  let ueMsg: Model
  let msg2: Model
  let successCallback = []
  // let belong: Array<{page_id: string, showStatus: string}>
  successCallback.push((msg2) => {
    return addModelFunction(msg2)
  })
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("addModelResponse", (uedata?: string): {} => {
      try {
        uedata = JSON.parse(uedata)
        ueMsg = uedata['Message']
        msg2 = JSON.parse(JSON.stringify(ueMsg))
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

// 已重构
export function addSpecialEffect (life_entity_id: String): Promise<{}> {
  emitUIInteraction({
    // Category: "addPOIModel",
    Category: "addSpecialEffect",
    life_entity_id
  })
  console.log({
    Category: "addSpecialEffect",
    life_entity_id
  })
  let ueMsg: effectModel
  let msg2: String
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("addSpecialEffectResponse", (uedata?: string): effectModel => {
      try {
        uedata = JSON.parse(uedata)
        ueMsg = uedata['Message']
        // ueMsg.showstatus = ueMsg.showstatus.toString()
        // msg2 = JSON.parse(JSON.stringify(ueMsg).replace('id', 'life_entity_id').replace('showstatus','showStatus'))
        // msg2 = JSON.parse(JSON.stringify(ueMsg))
        msg2 = JSON.parse(JSON.stringify(ueMsg).replace(/life_entity_id/g, 'where_life_entity_id'))

        console.log(msg2);
        // 调用修改生命体属性的接口
        updateLifeEntity({
          // "oper_type": "updateLifeEntity",
          ...msg2
        }).then(bigdata => {
          let data = bigdata.data
          if(data.code==1001){
            let Message = data.value
            // console.log(Message)
            resolve({uedata, Message})
          }else{
            reject(new Error(data.msg))
          }
        })
        // let Message: Array<Model> = []

        // msg = data
        
      } catch (error) {
        reject(new Error(error))
      }
      return ueMsg
    })
  })
}
// 隐藏所有的线节点
export function hideSpecialEffectPoint (): Promise<{}> {
  emitUIInteraction({
    Category: "hideSpecialEffectPoint"
  })

  let ueMsg: effectModel
  let msg2: String
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("hideSpecialEffectPointResponse", (uedata?: string): effectModel => {
      try {
        uedata = JSON.parse(uedata)
        ueMsg = uedata['Message']
        resolve({ueMsg})
        
      } catch (error) {
        reject(new Error(error))
      }
      return ueMsg
    })
  })
}
// 展示所有的线节点
export function showSpecialEffectPoint (): Promise<{}> {
  emitUIInteraction({
    Category: "showSpecialEffectPoint"
  })

  let ueMsg: effectModel
  let msg2: String
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener("showSpecialEffectPointResponse", (uedata?: string): effectModel => {
      try {
        uedata = JSON.parse(uedata)
        ueMsg = uedata['Message']
        resolve({ueMsg})
        
      } catch (error) {
        reject(new Error(error))
      }
      return ueMsg
    })
  })
}
// 获取单个POI (在生命体中实现)
// function getModelById(id: string): Promise<Model>{
//   // 暂无实时数据，需要自己主动获取
//   return { id: "xxx", name: "生命体1", type: "POI",position: {} };
// }