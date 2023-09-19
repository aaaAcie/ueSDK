/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-05-26 17:52:22
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-07-21 11:28:23
 * @FilePath: \WebServers424\mxxx\src\ue\ue4.js
 * @Description: 
 * 
 */
// let ue = {}
// let ue4 = {}
let uuidv4
// "object" != typeof ue && (ue = {})
export const ue = {
  interface: {}
}

// console.log('执行了ue2: ',ue)

uuidv4 = function() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g,
      function(t) {
          console.log('执行了ue2: ',ue)
          return (t ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> t / 4).toString(16)
      })
}

export const ue4 = function(r) {
  return "object" != typeof ue.interface || "function" != typeof ue.interface.broadcast ? 
    (console.log('执行了ue2: ',ue),function(t, e, n, o) {
      var u, i;
      console.log('执行了ue2: ',ue)
      // 取消history的堆栈
      // "string" == typeof t && ("function" == typeof e && (o = n, n = e, e = null), u = [t, "", r(n, o)], void 0 !== e && (u[1] = e), i = encodeURIComponent(JSON.stringify(u)), "object" == typeof history && "function" == typeof history.pushState ? (history.pushState({}, "", "#" + i), history.pushState({}, "", "#" + encodeURIComponent("[]"))) : (document.location.hash = i, document.location.hash = encodeURIComponent("[]")))
      "string" == typeof t && ("function" == typeof e && (o = n, n = e, e = null), u = [t, "", r(n, o)], void 0 !== e && (u[1] = e))
    }) : 
    (i = ue.interface, console.log('执行了ue2: ',ue), function(t, e, n, o) {
      var u;
      "string" == typeof t && ("function" == typeof e && (o = n, n = e, e = null), u = r(n, o), void 0 !== e ? i.broadcast(t, JSON.stringify(e), u) : i.broadcast(t, "", u))
      console.log('执行了ue2: ',ue)
  })
  var i
}(function(t, e) {
  if ("function" != typeof t) return "";
  var n = uuidv4();
  console.log('执行了ue2: ',ue)
  console.log('执行了t: ',t)

  return ue.interface[n] = t, 
    setTimeout(function() {
      console.log('执行了ue2: ',ue)
      delete ue.interface[n]
    }, 1e3 * Math.max(1, parseInt(e) || 0)), 
    n
})

// export {ue, ue4}
