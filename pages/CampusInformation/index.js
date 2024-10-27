// pages/CampusInformation/index.js
Page({
  gotoDetails: function() {
    console.log('点击了通知详情');
    wx.navigateTo({
      url: '/pages/CampusInformation/details/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },
})