/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-03-08 11:32:13
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-03-09 12:34:46
 * @FilePath: \WebServers424\mxxx\src\pxy\pxy.ts
 * @Description:
 *
 */
import * as $ from "jquery";
import lark from "./lark-iframe-poster.js";

interface config {
  userLocalIP: true;
  server: string;
  webclient: string;
  serverAddr: string; // server地址
  testAppId: string; // 平行云上的AppId
}
var responseEventListeners = new Map();
var myDomId = "";
var poster;
export function enterApp(config: config, domId: string): Promise<{}> {
  myDomId = domId;
  let appliId = config.testAppId;
  console.log(
    "enter appli:",
    config.server + "getEnterAppliInfo?appliId=" + appliId
  );
  return new Promise((resolve, reject) => {
    $.get(
      config.server + "getEnterAppliInfo?appliId=" + appliId,
      function (res) {
        console.log("enter appli res:", res, joinParam(res.result));
        if (res && res.code == 1000) {
          // $(domId).attr(
          //   "src",
          //   config.webclient + "?" + joinParam(res.result)
          // );
          (<HTMLIFrameElement>document.getElementById(domId)).src =
            config.webclient + "?" + joinParam(res.result);
          initMessage(resolve);
          // resolve({success: true})
        }
      }
    );
  });
}
function joinParam(params) {
  var res = "";
  for (const i in params) {
    if (i) {
      res += i + "=" + params[i] + "&";
    }
  }
  return res;
}
export function closeApp(domId: string) {
  (<HTMLIFrameElement>document.getElementById(domId)).src = "";
}

export function emitUIInteraction(jsonStr) {
  // emitDescriptor(50, descriptor);
  let jsonStr2 = JSON.stringify(jsonStr);
  console.log(jsonStr2);
  poster.sendTextToRenderSererAppDataChannel(jsonStr2);
}

export function addResponseEventListener(name: string, listener: Function) {
  responseEventListeners.set(name, listener);
}

// iframe websocket test
function initMessage(resolve: Function) {
  poster = new lark.iframePoster(document.getElementById(myDomId), {
    onMessage: onMessage,
    listenKeyboard: true,
  });
  console.log("@@@@", poster);

  // 监听消息
  function onMessage(e) {
    switch (e.data.type) {
      // open
      case 20200:
        console.log("通道开启", e.data.data);
        console.log(20200, "通道开启");
        resolve({ poster, initMouseEvent });
        break;
      case 20201:
        console.log("通道关闭", e.data.data);
        console.log(20201, "通道关闭");
        break;
      // 接收到字节消息
      case 20202:
        console.log("接收到字节消息", e.data.data);
        console.log(20202, e.data.data);
        break;
      // 接收到文本消息
      case 20203:
        console.log("接收到文本消息", e.data.data);
        // console.log(20203, e.data.data);
        handleRes(e.data.data);
        break;
      default:
        // console.log("收到的其他消息" + e.data.prex, e.data.type, e.data.message, e.data.data);
        break;
    }
  }
  return poster;

  // test json cmdtype
  var JsonCmdType = {
    CMD_CAMERA_LOADED: 1000,
    CMD_SWITCH_CAMERA: 1001,

    CMD_OBJECT_LOADED: 2001,
    CMD_OBJECT_PICKED: 2002,
    CMD_TOGGLE_OBJECT: 2003,
  };
}

function handleRes(response) {
  let k_response = JSON.parse(response).Category;
  let answer = null;
  // 爆改here
  // 让responseEventListeners对应的key去调用value
  // console.log('response的Category类型:', k_response)
  // console.log('================ ',response, k_response);

  if (k_response) {
    try {
      answer = responseEventListeners.get(k_response)(response);

      // console.log('response经过回调处理后的返回值:', k_response,answer)
    } catch (error) {
      console.log(`ue发送了${k_response}事件，请注册对应的回调`);
    } finally {
      // 最后统一都用logAll方法接收
      if (responseEventListeners.get("logAll")) {
        responseEventListeners.get("logAll")(response);
      }
      // responseEventListeners.get('logAll')(response)
    }
    return;
  }
}
// 返回responseEventListeners
export function getFnMap() {
  console.log(responseEventListeners);
  return responseEventListeners;
}

// 返回responseEventListeners
// export function getPosition(fn?: Function) {
//   var mouseX = 0;
//   var mouseY = 0;
//   var offX = 0;
//   var offY = 0;

//   document.onmousemove = (e) => {
//     mouseX = e.pageX;
//     mouseY = e.pageY;
//     offX = e.screenX - e.pageX;
//     offY = e.screenY - e.pageY;
//     console.log(e, mouseX, mouseY, offX, offY);
//   };
//   poster.sendMouseUp("left", mouseX, mouseY);
// }


function initMouseEvent(leftFn: Function, rightFn: Function, dblFn: Function){
  addResponseEventListener("leftClickResponse", (uedata) => {
    leftFn()
  })
  addResponseEventListener("rightClickResponse", (uedata) => {
    rightFn()
  })
  addResponseEventListener("dblClickResponse", (uedata) => {
    dblFn()
  })
}
