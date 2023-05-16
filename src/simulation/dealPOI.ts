/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-02-01 17:20:47
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-03-28 11:29:32
 * @FilePath: \WebServers424\mxxx\src\simulation\dealPOI.ts
 * @Description: 
 * 
 */
import { Model,addModelFunction } from './../initModel/initModel'
// import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { myChannel } from '../utils/basic.js'
const { addResponseEventListener, emitUIInteraction } = myChannel

// import { operLifeEntity } from '../api/api.js'
import { insertLifeEntity,updateLifeEntity } from '../api/lifeEntity.js'

interface POItype {
  type: "标签",
  subtype: "custom",
  below_type: "title",
  properties: {
    text: string,
    fontsize: number,
    fontcolor: string, // RGBA 如 "255,255,10,0.6"
    fontpadding: string, // 左边距，上边距 如"1.0,1.0"
    bgasset: string, // 来源于素材3.1
    bgcolor: string // RGBA 如 "255,255,10,0.6"
  },
  data_properties: {
    canvas_url: string,
    canvas_action: "click" | "hover",
    canvas_size: string // 宽高之间用逗号分开 如"100,200"
  }
  relative?: {
    bindId?: string, // 被绑定的poi才需要传的属性，代表它被绑在bindId这个生命体上
    x: 0,
    y: 0,
    z: 10
  },  // 被绑定的poi才需要传的属性
}

// 增加POI 跟ue通信并走接口提交保存 已重构
// POItype: 标题式 图标式 文本弹窗 视频弹窗式
export async function addPOIModel (POItype: POItype): Promise<{}> {
  // 增加POI 返回当前POI 属性
  emitUIInteraction({
    // Category: "addPOIModel",
    Category: "addModel",
    ...POItype
  })
  // operLifeEntity().then(data => console.log('0000000 ',data.data))
  
  let ueMsg: POItype
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