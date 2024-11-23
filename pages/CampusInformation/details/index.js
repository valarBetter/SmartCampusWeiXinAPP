// pages/CampusInformation/details/index.js
Page({
  data: {
    detail: {}, // 存储当前通知详情
  },

  onLoad(options) {
    const { id } = options; // 获取通知的 ID
    const notifications = wx.getStorageSync('notifications') || []; // 从本地存储读取通知列表
    const detail = notifications.find(item => item.id === parseInt(id)); // 根据 ID 查找通知详情

    if (detail) {
      this.setData({
        detail // 更新通知详情
      });
    } else {
      wx.showToast({
        title: "未找到通知详情",
        icon: "none"
      });
    }
  }
});
