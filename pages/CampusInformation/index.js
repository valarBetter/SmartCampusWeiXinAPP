// pages/CampusInformation/index.js
Page({
  data: {
    curfId: 1,
    brandList: [{name: "1月" ,id: 1},
      {name: "2月" ,id: 2},
      {name: "3月" ,id: 3}],
      curBrandName:"全部" ,
    },
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