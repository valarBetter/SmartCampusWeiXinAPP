// pages/PersonalCenter/index.js
Page({
  backEvent: function() {
    console.log('点击了退出');
    wx.reLaunch({
      url: '/pages/login/login/login',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },

  gotoPersonalMessage: function() {
    console.log('点击了个人信息');
    wx.navigateTo({
      url: '/pages/PersonalCenter/personalMessage/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },
  gotoCourseList: function() {
    console.log('点击了课程表');
    wx.navigateTo({
      url: '/pages/PersonalCenter/courseList/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },
  gotoGradeSearch: function() {
    console.log('点击了成绩查询');
    wx.navigateTo({
      url: '/pages/PersonalCenter/gradeSearch/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },

})