/*
 * @Author: 徐亦快 913587892@qq.com
 * @Date: 2023-05-26 17:32:10
 * @LastEditors: 徐亦快 913587892@qq.com
 * @LastEditTime: 2023-05-26 17:33:12
 * @FilePath: \WebServers424\mxxx\public\ue.js
 * @Description: 
 * 
 */
var ue4,ue
"object" != typeof ue && (ue = {}), uuidv4 = function () {
    return "10000000-1000-4000-8000-100000000000".replace (/[018]/g,
        function (t) {
            return (t ^ crypto.getRandomValues (new Uint8Array (1))[0] & 15 >> t / 4).toString (16)
        })
},

ue4 = function (r) {
    return "object" != typeof ue.interface || "function" != typeof ue.interface.broadcast ? (ue.interface = {},
        function (t, e, n, o) {
            var u, i;
             "string" == typeof t && ("function" == typeof e && (o = n, n = e, e = null), u = [t, "", r (n, o)], void 0 !== e && (u[1] = e), i = encodeURIComponent (JSON.stringify (u)), "object" == typeof history && "function" == typeof history.pushState ? (history.pushState ({}, "", "#" + i), history.pushState ({}, "", "#" + encodeURIComponent ("[]"))) : (document.location.hash = i, document.location.hash = encodeURIComponent ("[]")))
            //"string" == typeof t && ("function" == typeof e && (o = n, n = e, e = null), u = [t, "", r (n, o)], void 0 !== e && (u[1] = e), i = encodeURIComponent (JSON.stringify (u)))
        }) : (i = ue.interface, ue.interface = {}, function (t, e, n, o) {
        var u;
        "string" == typeof t && ("function" == typeof e && (o = n, n = e, e = null), u = r (n, o), void 0 !== e ? i.broadcast (t, JSON.stringify (e), u) : i.broadcast (t, "", u))
    });
    var i
} (function (t, e) {
    if ("function" != typeof t) return "";
    var n = uuidv4 ();
    return ue.interface[n] = t, setTimeout (function () {
        delete ue.interface[n]
    }, 1e3 * Math.max (1, parseInt (e) || 0)), n
});

export default {ue4, ue}
// 收ue
// ue.interface.（与ue发的消息名） = 前端函数名
// 实例：ue.interface.closeXCMY = this.closeXCMY

// 发消息给ue
// ue4('发给ue的属性名',参数])
// 实例：ue4('ZHWL_XCMY',[])