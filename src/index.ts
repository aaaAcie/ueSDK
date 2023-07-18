/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-05-18 14:29:15
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-05-31 12:33:10
 * @FilePath: \WebServers424\mxxx\src\index.ts
 * @Description: 
 * 
 */

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

// 特殊生命体
export * from './simulation/dealSpecial'

// 交互
export * from './simulation/dealInteractive'

// 组
// export * from './generalOperation/group'
// 原版组
// export * from './generalOperation/group0'
// 重构组
export * from './generalOperation/groupNew'

// 页面
export * from './generalOperation/page'

// 素材
export * from './generalOperation/material'

// 操作类 执行者组
// export * from './generalOperation/label'
export * from './generalOperation/labelNew'


// 操作项目
export * from './generalOperation/project'

// 操作全局类事件
export * from './simulation/dealGlobalEvent'

// 管理UE文件
export * from './ueFile/manageUE'

// 管理流
export * from './system/index.js'

// 连接启动器
export * from './webServer/index'