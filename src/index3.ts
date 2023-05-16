/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-03-08 14:12:00
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-03-08 15:50:08
 * @FilePath: \WebServers424\mxxx\src\index3.ts
 * @Description: 
 * 
 */

// 通过*号直接继承某一个模块的接口

export * from './pxy/pxy'

// 底座连接
export * from './initModel/initPXY'

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
export * from './generalOperation/label'

// 操作项目
export * from './generalOperation/project'