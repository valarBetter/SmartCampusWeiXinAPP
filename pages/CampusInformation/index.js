// pages/CampusInformation/index.js
Page({
  data: {
    curfId1: 1,
    curBrandName1: "选择日期",
    brandList1: [
      { name: "2023年", id: 1 },
      { name: "2024年", id: 2 },
      { name: "2021年", id: 3 }
    ],
    curfId2: 1,
    curBrandName2: "选择类别",
    brandList2: [
      { name: "体育赛事", id: 1 },
      { name: "学术通知", id: 2 },
      { name: "校园快讯", id: 3 }
    ],
    notificationList: [] // 存储从接口获取的通知列表
  },

  onLoad() {
    const userId = "你的用户ID"; // 替换为实际用户ID
    this.fetchNotifications(userId);
  },

  fetchNotifications(userId) {
    // 请求参数
    const params = {
      Id: userId,
      year: this.data.curBrandName1 === "选择日期" ? '' : this.data.curBrandName1,
      category: this.data.curBrandName2 === "选择类别" ? '' : this.data.curBrandName2
    };

    // 使用封装的 http 方法获取数据
    wx.http('/students/campusNotifications', 'GET', params, (res) => {
      console.log('接口返回数据:', res);
      if (res.notifications) {
        this.setData({
          notificationList: res.notifications
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
    const selectedYear = this.data.brandList1.find(item => item.id === e.detail.value).name;
    this.setData({
      curfId1: e.detail.value,
      curBrandName1: selectedYear
    }, () => {
      this.fetchNotifications("你的用户ID"); // 更新数据
    });
  },

  changeBrand2(e) {
    const selectedCategory = this.data.brandList2.find(item => item.id === e.detail.value).name;
    this.setData({
      curfId2: e.detail.value,
      curBrandName2: selectedCategory
    }, () => {
      this.fetchNotifications("你的用户ID"); // 更新数据
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
