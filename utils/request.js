const app = getApp()
const apiHttp = app.globalData.base_url
const socketHttp = "wss://*****.com/wss"

function fun(url, method, data, header) {
  data = data || {};
  header = header || {};
  header["token"] = app.globalData.token
  wx.showNavigationBarLoading();
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: apiHttp + url,
      header: header,
      data: data,
      method: method,
      success: function (res) {
        resolve(res);
      },
      fail: reject,
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  });
  return promise;
}

function upload(url, name, filePath) {
  let header = {};
  //   let sessionId = wx.getStorageSync("UserSessionId"); //从缓存中拿该信息
  //   if (sessionId) {
  //     if (!header || !header["SESSIONID"]) {
  //       header["SESSIONID"] = sessionId; //添加到请求头中
  //     }
  //   }
  wx.showNavigationBarLoading();
  let promise = new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: apiHttp + url,
      filePath: filePath,
      name: name,
      header: header,
      success: function (res) {
        resolve(res);
      },
      fail: reject,
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  });
  return promise;
}
module.exports = {
  apiHttp: apiHttp,
  socketHttp: socketHttp,
  "get": function (url, data, header) {
    return fun(url, "GET", data, header);
  },
  "post": function (url, data, header) {
    return fun(url, "POST", data, header);
  },
  upload: function (url, name, filePath) {
    return upload(url, name, filePath);
  }
};

//         if (typeof res.data === "object") {
//           if (res.data.status) {
//             if (res.data.status === -200) {
//               wx.showToast({
//                 title: "为确保能向您提供最准确的服务，请退出应用重新授权",
//                 icon: "none"
//               });
//               reject("请重新登录");
//             } else if (res.data.status === -201) {
//               wx.showToast({
//                 title: res.data.msg,
//                 icon: "none"
//               });
//               setTimeout(function() {
//                 wx.navigateTo({
//                   url: "/pages/user/supplement/supplement"
//                 });
//               }, 1000);
//               reject(res.data.msg);
//             }
//           }
//         }













//   let sessionId = wx.getStorageSync("UserSessionId");
//   if (sessionId) {
//     if (!header || !header["SESSIONID"]) {
//       header["SESSIONID"] = sessionId;
//     }
//   }