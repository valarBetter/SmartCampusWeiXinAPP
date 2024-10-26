// pages/CampusServices/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentno: '2100301327',
    personalname: '张三', 
    schoolname: '桂林电子科技大学',
    countno: '59.2'
  },
  gotoSchoolCard: function() {
    console.log('点击了校园卡');
    wx.navigateTo({
      url: '/pages/CampusServices/schoolcard/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },
  gotoSelectCourse: function() {
    console.log('点击了选择课程');
    wx.navigateTo({
      url: '/pages/CampusServices/selectCourse/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },
  gotoBookSearch: function() {
    console.log('点击了图书查询');
    wx.navigateTo({
      url: '/pages/CampusServices/booksearch/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },
  gotoPhoneSearch: function() {
    console.log('点击了电话查询');
    wx.navigateTo({
      url: '/pages/CampusServices/phonesearch/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },
  gotoSchoolIntroduce: function() {
    console.log('点击了学校相关介绍');
    wx.navigateTo({
      url: '/pages/CampusServices/schoolintroduce/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },
  gotoSchoolMap: function() {
    console.log('点击了学校地图查询');
    wx.navigateTo({
      url: '/pages/CampusServices/schoolmap/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },
  gotoWebsiteIndex: function() {
    console.log('点击了网络导航');
    wx.navigateTo({
      url: '/pages/CampusServices/websiteindex/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },

})