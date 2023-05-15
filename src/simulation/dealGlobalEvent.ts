/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-04-27 17:52:28
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-05-09 09:28:22
 * @FilePath: \mxxx\src\simulation\dealGlobalEvent.ts
 * @Description: 
 * 
 */
import { dealGlobalEventsReturn, dealReturn } from '../utils/fns'
import { myChannel } from '../utils/basic.js'
const { addResponseEventListener, emitUIInteraction } = myChannel
import { 
  insertGlobalEvent,
  getGlobalEvent,
  updateGlobalEvent,
  deleteGlobalEventById,
  addEventRecord,
  queryDict
} from '../api/globalEvent.js'
interface eventDetailParams{
  eventType: string, // 全局类事件类型
  eventDescription: string, // 事件参数
  targetLabelId: string // 目标类的id
}
interface eventParams{
  projectId: string, // 项目id
  eventName: string, // 事件名字
  eventDetail: Array<eventDetailParams> // 生命体id
}

interface listenToExecutorParams{
  projectId: string, // 项目id
  eventId: number, // 事件id
  eventDetail: Array<eventDetailParams> // 需要底座去执行的事件
}

// 新增全局类事件 0
export async function addGlobalEvent(eventParams: eventParams): Promise<{}>{
  const { data } = await insertGlobalEvent({
    ...eventParams
  })
  return dealReturn(data)
}

// 删除全局类事件
interface deleteEventParams{
  projectId: string, // 项目id
  eventId: string // 事件id
}
export async function deleteGlobalEvent(deleteEventParams: deleteEventParams): Promise<{}>{
  const { data } = await deleteGlobalEventById({
    ...deleteEventParams
  })
  return dealReturn(data)
}

// 修改全局类事件
interface setEventParams{
  projectId: string, // 项目id
  eventId: string, // 事件id
  eventName: string, // 事件名字
  eventDetails: Array<eventDetailParams> // 生命体id
}
export async function setGlobalEvent(setEventParams: setEventParams): Promise<{}>{
  const { data } = await updateGlobalEvent({
    ...setEventParams
  })
  return dealReturn(data)
}

// 查询全局类事件
interface queryEventParams{
  projectId: string, // 项目id
  eventId?: string // 事件id
}
export async function queryGlobalEvent(queryEventParams: queryEventParams): Promise<{}>{
  const { data } = await getGlobalEvent({
    ...queryEventParams
  })
  return dealReturn(data)
}

// ue底座响应类的命令
export async function listenToExecutor(listenToExecutorParams:listenToExecutorParams): Promise<{}> { 
  emitUIInteraction({
    Category: "listenToExecutor",
    ...listenToExecutorParams
  })
  let msg = {}
  return new Promise<string>((resolve, reject) => {
    addResponseEventListener("listenToExecutorResponse", async (uedata?: string): Promise<{}> => {
      msg = JSON.parse(uedata)
      // 向后端推送该事件记录
      const { data } = await addEventRecord({
        ...listenToExecutorParams
      })
      resolve({ueMsg: msg, ...data})
      return msg
    })
  })
}

// 查询事件类型的定义
interface eventTypeParams{
  eventType?: string, // 全局类事件类型
}
export async function queryEventType(eventTypeParams: eventTypeParams): Promise<{}>{
  const { data } = await queryDict({
    type: "GLOBAL_EVENT_TYPE",
    ...eventTypeParams
  })
  return dealReturn(data)
}