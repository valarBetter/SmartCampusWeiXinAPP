// pages/CampusServices/schoolintroduce/index.js
Page({
  data: {
    introduceList: [] // 用于存储学校简介数据
  },

  onLoad() {
    this.fetchSchoolIntroduce();
  },

  // 获取学校简介数据
  fetchSchoolIntroduce() {
    const studentId = wx.getStorageSync('studentId'); // 获取用户ID
    wx.request({
      url: 'http://8.138.81.10:8080/students/schoolIntroduce',
      method: 'GET',
      data: { studentId },
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            introduceList: res.data.data
          });
        } else {
          wx.showToast({
            title: '获取学校简介失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误，请稍后再试',
          icon: 'none'
        });
      }
    });
  }
});
