// 生命体相关

export interface EventParams { 
  eventHandler?: (res: object) => {}; // 绑定事件处理⽅法 
  successCallback?: () => {}; // 注册事件成功回调⽅法 
}
export class Model {
  id: string; // ⽣命体id 
  name: string; // ⽣命体名称 
  position: object; // ⽣命体位置x,y,z 
  rotation: object; // ⽣命体旋转x,y,z 
  scale: object; // ⽣命体缩放 
  properties: object; // ⽣命体属性 
  type: string; // ⽣命体分类
}

export interface ModelParams{ 
  Category: string,
  Models: Array<Model>
}

export interface DeleteParams { 
  id: string; 
  successCallback?: () => {}; // 删除⽣命体成功回调⽅法 
  errorCallback?: () => {}; // 删除⽣命体失败回调⽅法 
}