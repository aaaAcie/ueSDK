<!--
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-05-18 14:29:15
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-05-26 17:31:37
 * @FilePath: \WebServers424\mxxx\README.md
 * @Description: 
 * 
-->
<!--
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-05-15 17:09:25
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-05-25 09:53:25
 * @FilePath: \WebServers424\mxxx\README.md
 * @Description: 
 * 
-->
# MXXX说明文档

## 入口说明
1. index.ts
是 paas 平台的推流入口

2. index2.ts
是普通项目的推流入口

3. index3.ts
是 paas 平台的平行云入口

想要切换入口的时候，在`webpack.config.js`的`entry`中找到对应的入口。以及在`utils/basic.js`引入对应的`import`。

## 使用说明
把bundle挂在html上，就可以拿到`mxxx`的所有功能。
### 连接方式
```javascript
  myModel.value = new mxxx.initUE({
    url: 'localhost:90'
    domId: 'ppp', // 底座dom，⼤屏有固定的底座位置
    options: {} // 可选剩余参数
    successCallback: (ws: WebSocket) => console.log(ws),  // 连接成功回调⽅法 可以在这里接收当前的websocket连接实例
    errorCallback: (reason) => console.log(reason),  // 连接失败回调⽅法 <-- ue初始化失败(读取关卡数据失败)会进入这里
  })
  // 连接
  myModel.value.connect().then(streamingVideo => {
    console.log(streamingVideo);
  })
```
### 普通通信方式：
```javascript
  // 发消息
  mxxx.emitUIInteraction({
    Category: "消息类型xxx",
    Message: "具体数据"
  });

  // 收消息 
  mxxx.addResponseEventListener("xxx接收的对方的Category的名字写在这里", (data)=> {
    // ue发来的消息会完整地传进来
    console.log(data)
  });
```
