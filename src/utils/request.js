
// const axios = require('axios').default

import axios from 'axios'

const request = axios.create({
  // timeout: 5000
  baseURL: 'http://192.168.2.128:10010'
  // baseURL: 'http://115.238.181.246:10010'
})

function getBaseURL (url) {
  // console.log(url.startsWith('getMarketReportPriceList'))
  if (url.startsWith('/data')) {
    // return "http://192.168.2.183:999/"
    return "http://localhost:999/"
  }else{
    return 'https://mip-prod.myfuwu.com.cn'
  }
}
request.interceptors.request.use(config => {
  // config.baseURL = getBaseURL(config.url)
  config.headers["Access-Control-Allow-Origin"]=config.url
  // const { user } = store.state
  // if (user && user!='null') {
  //   config.headers.jwt = user
  // }
  return config
})


let isRefreshing = false
let rqs = []
// 设置响应拦截器
// request.interceptors.response.use(function (response) {
//   // 状态码为 2xx 都会进⼊这⾥
//   // console.log('请求响应成功了：', response)
//   return response
// }, function (error) {
//   // 超出 2xx 都会进⼊这⾥
//   if (error.response) {
//     // 1. 保存状态码
//     const { status } = error.response
//     // 2. 判断
//     let errorMessage = ''
//     errorMessage = '请求参数错误'
//     if (status === 400) {
//       errorMessage = '请求参数错误400'
//     } else if (status === 500) {
//       console.log(error.config.url)

//       // 若已经在请求token了
//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           rqs.push(() => {
//             resolve(request(error.config))
//           })
//         })
//       }
//       isRefreshing = true
//       return request({
//         method: 'POST',
//         url: '/indicator_data/token_api',
//         data: {
//           "app_key":"4625757208408851",
//           "app_secret":"PjvgPrEBphAgKNoWcolQfRcXitusXSyA"
//         }
//       }).then(res => {
//         // console.log(res)
//         if (res.status !== 200) {
//           console.log('失败',res.status)
//           // store.commit('setUser', null)
//           // redirectLogin()
//         } else {
//           // store.commit('setUser', res.data.data.token)
//           // console.log(res.data.data.token)
//           rqs.forEach(callback => {
//             // console.log(callback)
//             callback()
//           }) // Token 刷新成功后，将 requests 中的请求重新发送
//           rqs = []
//           // 这时再对之前报 401 的接⼝重新请求，同时 return
//           // - error.config 是之前失败的请求的配置信息
//           // - request() 内部已经将原请求的所有功能包含了，⽆需接收结果返回。
//           return request(error.config)
//         }
//       }).finally(() => {
//         // 3 请求完毕，⽆论成功失败，设置 isRefreshing 为 false
//         isRefreshing = false
//       })

//     } else if (status === 403) {
//       errorMessage = '没有权限，请联系管理员'
//     } else if (status === 404) {
//       errorMessage = '请求资源不存在'
//     } else if (status > 500) {
//       errorMessage = '服务端错误，请联系管理员'
//     }
//     console.log(errorMessage)
//   } else if (error.request) {
//     // 请求发送成功，但没有收到响应
//     console.log('请求超时，请重试')
//   } else {
//     // 在设置请求时发⽣了⼀些失去，触发了错误（未知型错误）
//     console.log(`请求失败${error.message}`)
//   }
//   // console.dir(error)
//   return Promise.reject(error)
// })

export default request
// module.exports = {
//   request
// }