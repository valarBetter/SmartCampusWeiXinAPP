// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.http = (url, method, data, callback) => {
      wx.request({
        url: 'https://example.com' + url, //请求的接口地址
        method: method,
        data: data || {},
        header: {
          "Authorization": ('Bearer ' + wx.getStorageSync('token')) || ''
        },
        success: (result) => {
          callback(result.data)
        },
        fail: (error) => {
          console.log(error)
        }
      });
    }

  },
  globalData: {
    userInfo: null
  }
})
