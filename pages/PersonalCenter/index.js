// pages/PersonalCenter/index.js
Page({
  data: {
    studentno: '',          // 学号
    personalname: '',       // 姓名
    profession: '',         // 专业
  },

  onLoad: function () {
    // 从本地缓存中获取用户ID
    const studentId = wx.getStorageSync('studentId');
    if (!studentId) {
      wx.showToast({
        title: '用户未登录，请先登录',
        icon: 'none',
        duration: 2000,
      });
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/login/login', // 跳转到登录页面
        });
      }, 2000);
      return;
    }

    // 请求个人信息接口
    wx.request({
      url: 'http://8.138.81.10:8080/students/personalInfo', // 替换为实际接口地址
      method: 'GET',
      data: { studentId },
      success: (res) => {
        if (res.data.code === 200 && res.data.data) {
          const { studentId, name, grade, major, gender, contactInfo } = res.data.data;
          this.setData({
            studentno: studentId || '未填写',
            personalname: name || '未填写',
            profession: major || '未填写',
          });
        } else {
          wx.showToast({
            title: res.data.message || '获取信息失败',
            icon: 'none',
          });
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '网络请求失败，请检查连接',
          icon: 'none',
        });
      },
    });
  },

  backEvent: function () {
    console.log('点击了退出');
    wx.reLaunch({
      url: '/pages/login/login/login',
      fail: function (err) {
        console.error('跳转失败:', err); // 输出跳转失败的错误信息
      },
    });
  },

  gotoPersonalMessage: function () {
    console.log('点击了个人信息');
    wx.navigateTo({
      url: '/pages/PersonalCenter/personalMessage/index',
      fail: function (err) {
        console.error('跳转失败:', err); // 输出跳转失败的错误信息
      },
    });
  },

  gotoCourseList: function () {
    console.log('点击了课程表');
    wx.navigateTo({
      url: '/pages/PersonalCenter/courseList/index',
      fail: function (err) {
        console.error('跳转失败:', err); // 输出跳转失败的错误信息
      },
    });
  },

  gotoGradeSearch: function () {
    console.log('点击了成绩查询');
    wx.navigateTo({
      url: '/pages/PersonalCenter/gradeSearch/index',
      fail: function (err) {
        console.error('跳转失败:', err); // 输出跳转失败的错误信息
      },
    });
  },
});
