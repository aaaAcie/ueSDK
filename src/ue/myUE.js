// 定义消息广播函数
function broadcastMessage(name, data) {
  if (typeof name === "string") {
    // 构造消息
    var message = [name, ""];
    if (data !== undefined) {
      message[1] = data;
    }

    // 编码消息为URL的hash部分
    var encodedMessage = encodeURIComponent(JSON.stringify(message));

    // 使用pushState方法改变URL并触发事件
    if (typeof history === "object" && typeof history.pushState === "function") {
      history.pushState({}, "", "#" + encodedMessage);
      history.pushState({}, "", "#" + encodeURIComponent("[]"));
    } else {
      // 使用location.hash改变URL并触发事件（如果pushState方法不可用）
      document.location.hash = encodedMessage;
      document.location.hash = encodeURIComponent("[]");
    }
  }
}

export const getMyUE = () => {
  // 确保ue是一个全局对象
  // if (typeof ue !== "object") {
  //   ue = {};
  // }

  const ue = {};
  // 确保ue.interface是一个对象
  if (typeof ue.interface !== "object") {
    ue.interface = {};
  }
  // 将消息广播函数赋值给ue.interface.broadcast和ue4
  ue.interface.broadcast = broadcastMessage;
  return ue
}

