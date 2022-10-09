import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
interface Shot {
  id: string // 镜头id
  name: string // 镜头名称
  position: {} // 镜头参数等
}
interface getParam {
  id: string // 镜头id
  callback?: () => {} // 参数处理
}
interface modifyParam {
  id: string
  name: string
  position: {}
}

// 添加镜头
export function addShot(name: string): Promise<Object> {
  emitUIInteraction({
    Category: "addShot",
    name
  })
  let msg = {}
  return new Promise<Object>((resolve, reject) => {
    addResponseEventListener("addShotResponse", (data?: string): Object => {
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

// 删除镜头 根据镜头id删除镜头
export function deleteShotById(id: string): Promise<Object> {
  emitUIInteraction({
    Category: "deleteShotById",
    id
  })
  let msg = {}
  return new Promise<Object>((resolve, reject) => {
    addResponseEventListener("deleteShotByIdResponse", (data?: string): Object => {
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

// 保存镜头 根据镜头id保存镜头
export function saveShotById(id: string): Promise<Object> {
  emitUIInteraction({
    Category: "saveShotById",
    id
  })
  let msg = {}
  return new Promise<Object>((resolve, reject) => {
    addResponseEventListener("saveShotByIdResponse", (data?: string): Object => {
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

// 查询镜头列表
export function queryShotList(): Promise<Array<Shot>> {
  emitUIInteraction({
    Category: "queryShotList"
  })
  let msg: Array<Shot> = []
  return new Promise<Array<Shot>>((resolve, reject) => {
    addResponseEventListener("queryShotListResponse", (data?: string): Array<Shot> => {
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

// 获取单个镜头
export function getShotById(id: string): Promise<Shot> {
  emitUIInteraction({
    Category: "getShotById",
    id
  })
  let msg: Shot
  return new Promise<Shot>((resolve, reject) => {
    addResponseEventListener("getShotByIdResponse", (data?: string): Shot => {
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

// 设置初始镜头
export function setInitShot(id: string): Promise<Shot> {
  emitUIInteraction({
    Category: "setInitShot",
    id
  })
  let msg: Shot
  return new Promise<Shot>((resolve, reject) => {
    addResponseEventListener("setInitShotResponse", (data?: string): Shot => {
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

// 修改镜头名称
export function modifyShotName(modifyParam: modifyParam): Promise<Shot> {
  emitUIInteraction({
    Category: "modifyShotName",
    ...modifyParam
  })
  let msg: Shot
  return new Promise<Shot>((resolve, reject) => {
    addResponseEventListener("modifyShotNameResponse", (data?: string): Shot => {
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

// 切换镜头
export function switchShot(id: string): Promise<Shot> {
  emitUIInteraction({
    Category: "switchShot",
    id
  })
  let msg: Shot
  return new Promise<Shot>((resolve, reject) => {
    addResponseEventListener("switchShotResponse", (data?: string): Shot => {
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

// 修改镜头属性
export function modifyShotProperty(modifyParam: modifyParam): Promise<Shot> {
  emitUIInteraction({
    Category: "modifyShotProperty",
    ...modifyParam
  })
  let msg: Shot
  return new Promise<Shot>((resolve, reject) => {
    addResponseEventListener("setModelPropsByIdResponse", (data?: string): Shot => {
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