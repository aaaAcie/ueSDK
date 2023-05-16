<!--
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-05-15 17:09:25
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-05-15 17:21:36
 * @FilePath: \mxxx\README.md
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
