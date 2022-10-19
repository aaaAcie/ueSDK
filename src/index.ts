
// 通过*号直接继承某一个模块的接口

export * from './basic2/myApp.js'

// 底座连接
export * from './initModel/initUE'

// 生命体
export * from './initModel/initModel'
export * from './initModel/dealModel'

// 场景，关卡
export * from './initModel/initScene'


// 镜头
export * from './simulation/dealShot'

// POI
export * from './simulation/dealPOI'

// 特效
export * from './simulation/dealEffect'

// 模型
// export * from './simulation/dealMyModel'

// 交互
export * from './simulation/dealInteractive'

// 组
export * from './generalOperation/group'