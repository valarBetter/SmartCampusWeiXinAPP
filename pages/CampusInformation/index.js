// pages/CampusInformation/index.js
Page({
  data: {
    curfId1: 1,
    debounceTimer: null ,// 定时器变量
    curBrandName1: "选择日期",
    brandList1: [
      { name: "2023", id: 1 },
      { name: "2024", id: 2 },
      { name: "2021", id: 3 }
    ],
    curfId2: 1,
    curBrandName2: "选择类别",
    brandList2: [
      { name: "体育赛事", id: 1 },
      { name: "学术通知", id: 2 },
      { name: "校园快讯", id: 3 }
    ],
    notificationList: [], // 存储从接口获取的通知列表
    searchKeyword: '' // 存储搜索关键词
  },

  onLoad() {
    const userId = wx.getStorageSync('studentId'); // 从本地存储获取用户ID
    this.fetchNotifications(userId);  // 获取通知数据
  },

  fetchNotifications(userId) {
    const params = {
      studentId: userId,
      year: this.data.curBrandName1 === "选择日期" ? '' : this.data.curBrandName1,
      category: this.data.curBrandName2 === "选择类别" ? '' : this.data.curBrandName2,
      keyword: this.data.searchKeyword || ''
    };
  
    console.log('当前请求参数:', params);
    wx.http('/students/campusNotifications', 'GET', params, (res) => {
      console.log('接口返回数据:', res);
      if (res.code === 200 && res.data) {
        wx.setStorageSync('notifications', res.data);
        this.setData({
          notificationList: res.data
        });
      } else {
        wx.showToast({
          title: "数据加载失败",
          icon: "none"
        });
      }
    });
  },
  

  changeBrand1(e) {
    const selectedYear = this.data.brandList1.find(item => item.id == e.detail.selectId)?.name || "选择日期";
    this.setData({
      curfId1: e.detail.selectId,
      curBrandName1: selectedYear
    }, () => {
      this.fetchNotifications(wx.getStorageSync('studentId'));
    });
  },
  
  changeBrand2(e) {
    const selectedCategory = this.data.brandList2.find(item => item.id == e.detail.selectId)?.name || "选择类别";
    this.setData({
      curfId2: e.detail.selectId,
      curBrandName2: selectedCategory
    }, () => {
      this.fetchNotifications(wx.getStorageSync('studentId'));
    });
  },
  

  onInputSearch(e) {
    // 清除上一次的定时器
    if (this.data.debounceTimer) {
      clearTimeout(this.data.debounceTimer);
    }
  
    // 设置新的定时器
    const keyword = e.detail.value;
    this.setData({
      debounceTimer: setTimeout(() => {
        this.setData({
          searchKeyword: keyword
        }, () => {
          this.fetchNotifications(wx.getStorageSync('studentId')); // 延迟执行请求
        });
      }, 300) // 300ms 的防抖时间，可根据需求调整
    });
  },
  

  gotoDetails(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/CampusInformation/details/index?id=${id}`,
      fail: function(err) {
        console.error('跳转失败:', err);
      }
    });
  }
});
