/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-02-13 08:50:00
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-06-26 11:28:00
 * @FilePath: \WebServers424\mxxx\src\initModel\initModel.ts
 * @Description: 
 * 
 */
// 生命体相关

export interface EventParams { 
  eventHandler?: (res: object) => {}; // 绑定事件处理⽅法 
  successCallback?: () => {}; // 注册事件成功回调⽅法 
}
export class Model {
  life_entity_id: string; // ⽣命体id
  type: string; // ⽣命体分类
  subtype: string; // 生命体子分类
  data_properties?: {}; // 生命体的数据属性
  name?: string; // ⽣命体名称 
  position?: object; // ⽣命体位置x,y,z 
  rotation?: object; // ⽣命体旋转x,y,z 
  scale?: object; // ⽣命体缩放 
  properties?: object; // ⽣命体属性 
  showstatus?: string;
  lockStatus?: string;
  belong?: Array<{page_id: string, showStatus: string}>;
}

export interface ModelParams{ 
  Category: string,
  Models: Array<Model>
}

export interface DeleteParams { 
  life_entity_id: string; 
  successCallback?: () => {}; // 删除⽣命体成功回调⽅法 
  errorCallback?: () => {}; // 删除⽣命体失败回调⽅法 
}
import {
  insertLifeEntity,
  addSpecialBelong
} from '../api/lifeEntity.js'
import { myChannel } from '../utils/basic.js'
import { objToArr } from '../utils/fns'
const { addResponseEventListener, emitUIInteraction } = myChannel

export async function addModelFunction(msg2: Model) {
  const { data } = await insertLifeEntity({
    ...msg2
  })
  // belong = msg2.belong
  if(data.code==1001){
    let Message = data.value // [{xxx:xxx, belong:[{page_id:xxx, showStatus:xxx}]}]
    // 如果收到belong的消息 即若绑定poi的归属信息同步添加成功
    if (Message[0]?.belong) {
      // 因为后端没有做主动加入AlwaysShow的操作，为了防止ue主动添加的AlwaysShow被覆盖，需要手动加入
      Message[0].belong.push({page_id:'AlwaysShow', showStatus: "1"})
      emitUIInteraction({
        Category: "addBelong",
        Message: objToArr(Message)
      })
      addResponseEventListener("addBelongResponse", (uedata?: string): void => {
        uedata = JSON.parse(uedata)
        // resolve({Message, ueMsg:uedata, code})
      })
    }
    // AlwaysShow乔治自己去添加了
    const { data: d } = await addSpecialBelong({
      lifeEntityId: msg2.life_entity_id,
      // pageId: "AlwaysShow",
      // showStatus: "1",
      pageId: "AlwaysShow",
      showStatus: "3" // 2隐藏 3显示
    })
    if(d.code==1001){
      return Message
    }else{
      throw (new Error(d.msg))
    }
  }else{
    throw (new Error(data.msg))
  }
}

export function changeNameFunction(oldObj: {}) {
  let oldString: string = JSON.stringify(oldObj)
  let newString: string = oldString
                            .replace(/lifeEntityId/g,'life_entity_id')
                            .replace(/pageId/g,'page_id')
  let newObj = JSON.parse(newString)
  console.log(newObj)
  return newObj
}