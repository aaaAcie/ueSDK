// import { addResponseEventListener, emitUIInteraction} from '../basic2/myApp.js'
import { myChannel } from "../utils/basic.js";
const { addResponseEventListener, emitUIInteraction } = myChannel;
import { dealReturn } from "../utils/fns";
import // operCamera,
// operCameraBelong
"../api/api.js";
import {
  insertCamera,
  selectCamera,
  updateCamera,
  deleteCameraById,
  insertOrUpdateCameraBelong,
  cameraDataQueryByPageId,
} from "../api/shot.js";

interface Shot {
  shot_id: string; // 镜头id
  pass_id?: string;
  type: "镜头"; // 分类(很重要，否则ue无法解析）
  name?: string; // 镜头名称
  position?: {}; // 镜头参数等
  rotation?: {};
  properties?: {
    length: number; // 臂长 范围 [500, 100000]
    allowRotation: number; // 是否允许旋转 1-允许 0-不允许
    allowTranslation: number; // 是否允许平移 1-允许 0-不允许
    sensitivity: string; // 灵敏度  平移[1, 300]
    zoom: number; // 缩放 允许小数
  };
}
interface modifyParam {
  shot_id: string;
  name: string;
  position: {};
}
interface cameraBelong {
  shot_id: string; // 镜头id
  page_id: string; // 绑定的页面id
  switchType: "black" | "move"; // 切镜头的方式
}
// 添加镜头 跟ue通信并向接口提交 1 已重构
export function addShot(name: string): Promise<Object> {
  emitUIInteraction({
    Category: "addShot",
    name,
  });
  let msg = {};
  let uedata: {};
  let successCallback = [];
  successCallback.push(() => {
    return insertCamera({
      // "oper_type": "insertCamera",
      ...msg,
    }).then((bigdata) => {
      let data = bigdata.data;
      if (data.code == 1001) {
        let Message = data.value;
        return Message;
        // console.log(Message)
        // resolve({uedata, Message})
      } else {
        throw new Error(data.msg);
      }
    });
  });
  return new Promise<Object>((resolve, reject) => {
    addResponseEventListener("addShotResponse", (uedata0?: string): Object => {
      try {
        uedata = JSON.parse(uedata0);
        msg = uedata["Message"];
        if (successCallback.length) {
          successCallback
            .shift()()
            .then((Message) => resolve({ uedata, Message }))
            .catch((err) => reject(new Error(err)));
        }
      } catch (error) {
        reject(new Error(error));
      }
      return msg;
    });
  });
}

// 删除镜头 根据镜头id删除镜头 1未测试 已重构
export async function deleteShotById(shot_id: string): Promise<Object> {
  const { data } = await deleteCameraById({
    // "oper_type": "deleteCamera",
    shot_id,
  });
  emitUIInteraction({
    Category: "deleteShotById",
    shot_id,
  });
  let Message: number;
  let ueMsg = {};
  return new Promise<Object>((resolve, reject) => {
    addResponseEventListener(
      "deleteShotByIdResponse",
      (uedata?: string): Object => {
        if (data.code == 1001) {
          Message = data.value;
          // console.log(Message)
          ueMsg = JSON.parse(JSON.stringify(uedata));
          resolve({ ueMsg, Message });
        } else {
          reject(new Error(data.msg));
        }
        return ueMsg;
      }
    );
  });
}

// 保存镜头 已重构
export async function saveShotById(modifyParam: modifyParam): Promise<Object> {
  let modifyParam2 = JSON.parse(
    JSON.stringify(modifyParam).replace("shot_id", "where_shot_id")
  );
  const { data } = await updateCamera({
    ...modifyParam2,
  });
  return dealReturn(data)
}

// 查询镜头列表 向接口请求数据返回给前端 1 已重构
export async function queryShotList(pass_id: string): Promise<Array<Shot>> {
  const { data } = await selectCamera({
    // "oper_type": "selectCamera",
    pass_id,
  });
  let Message: Array<Shot>;
  return new Promise<Array<Shot>>((resolve, reject) => {
    if (data.code == 1001) {
      Message = data.value;
      resolve(Message);
    } else {
      reject(new Error(data.msg));
    }
  });
}

// 获取单个镜头 向接口请求数据返回给前端 1 已重构
export async function getShotById(shot_id: string): Promise<Shot> {
  const { data } = await selectCamera({
    // "oper_type": "selectCamera",
    shot_id,
  });
  let Message: Shot;
  return new Promise<Shot>((resolve, reject) => {
    if (data.code == 1001) {
      Message = data.value;
      resolve(Message);
    } else {
      reject(new Error(data.msg));
    }
  });
}

// 修改镜头名称 1未测试 已重构
export async function modifyShotName(modifyParam: modifyParam): Promise<{}> {
  let modifyParam2 = JSON.parse(
    JSON.stringify(modifyParam).replace("shot_id", "where_shot_id")
  );
  const { data } = await updateCamera({
    // "oper_type": "updateCamera",
    ...modifyParam2,
  });
  let Message: Shot;
  emitUIInteraction({
    Category: "modifyShotName",
    ...modifyParam,
  });
  let ueMsg;
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener(
      "modifyShotNameResponse",
      (uedata?: string): {} => {
        if (data.code == 1001) {
          Message = data.value;
          // console.log(Message)
          ueMsg = JSON.parse(JSON.stringify(uedata));
          resolve({ ueMsg, Message });
        } else {
          reject(new Error(data.msg));
        }
        return ueMsg;
      }
    );
  });
}

// 切换镜头 只跟ue通信 1
export function switchShot(shot_id: string): Promise<Shot> {
  emitUIInteraction({
    Category: "switchShot",
    shot_id,
  });
  let msg: Shot;
  return new Promise<Shot>((resolve, reject) => {
    addResponseEventListener("switchShotResponse", (data?: string): Shot => {
      try {
        msg = JSON.parse(JSON.stringify(data));
        // msg = data
        resolve(msg);
      } catch (error) {
        reject(new Error(error));
      }
      return msg;
    });
  });
}

// 修改镜头属性 只跟ue通信
export async function modifyShotProperty(
  modifyParam: modifyParam
): Promise<{}> {
  // let modifyParam2 = JSON.parse(JSON.stringify(modifyParam).replace('shot_id', 'where_shot_id'))
  // const { data } = await operCamera({
  //   "oper_type": "updateCamera",
  //   ...modifyParam2
  // })
  // let Message
  emitUIInteraction({
    Category: "modifyShotProperty",
    ...modifyParam,
  });
  let ueMsg;
  return new Promise<{}>((resolve, reject) => {
    addResponseEventListener(
      "modifyShotPropertyResponse",
      (uedata?: string): {} => {
        ueMsg = JSON.parse(JSON.stringify(uedata));
        if (ueMsg) {
          resolve(ueMsg);
        } else {
          reject(new Error("ue接收失败"));
        }
        return ueMsg;
      }
    );
  });
}

// 建立镜头与页面的关联关系  向接口请求数据返回给前端 1 已重构
export async function addCameraBelong(
  camera_belongs: Array<cameraBelong>
): Promise<{}> {
  const { data } = await insertOrUpdateCameraBelong({
    // "oper_type": "insertOrUpdateCameraBelong",
    camera_belongs,
  });

  let ueMsg;
  let Message: Shot;
  return new Promise<{}>((resolve, reject) => {
    if (data.code == 1001) {
      Message = data.value;
      emitUIInteraction({
        Category: "addCameraBelong",
        Message,
      });

      addResponseEventListener(
        "addCameraBelongResponse",
        (uedata?: string): void => {
          uedata = JSON.parse(JSON.stringify(uedata));
          ueMsg = uedata;
          resolve({ Message, ueMsg });
        }
      );
    } else {
      reject(new Error(data.msg));
    }
  });
}

// 通过页面ID查询镜头信息
export async function queryShotByPageId(pageId: string): Promise<{}> {
  const { data } = await cameraDataQueryByPageId({
    pageId,
  });
  return dealReturn(data);
}
