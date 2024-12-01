// pages/PersonalCenter/courseList/index.js
Page({
  data: {
    // 学期选择器数据
    curfId1: 1,
    curBrandName1: "选择学期",
    brandList1: [
      { name: "2023-2024上", id: 1 },
      { name: "2023-2024下", id: 2 },
      { name: "2024-2025上", id: 3 },
    ],
    // 周数选择器数据
    curfId2: 1,
    curBrandName2: "选择周数",
    brandList2: [
      { name: "第1周", id: 1 },
      { name: "第2周", id: 2 },
      { name: "第3周", id: 3 },
    ],
    // 课程表数据
    courseList: [],
  },

  onLoad() {
    this.fetchCourseList(); // 初始加载课程表
  },

  // 获取课程表
  fetchCourseList() {
    const studentId = wx.getStorageSync('studentId'); // 获取用户ID
    if (!studentId) {
      wx.showToast({
        title: '用户未登录，请先登录',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    const semester = this.data.curfId1; // 当前选中的学期
    const week = this.data.curfId2;    // 当前选中的周数

    wx.request({
      url: 'http://8.138.81.10:8080/students/courseSchedule',
      method: 'GET',
      data: {
        id: studentId,//studentId
        semester, // 假设接口支持此参数
        week,     // 假设接口支持此参数
      },
      success: (res) => {
        if (res.data.code === 200 && Array.isArray(res.data.data)) {
          this.setData({
            courseList: res.data.data,
          });
        } else {
          wx.showToast({
            title: res.data.message || '获取课程表失败',
            icon: 'none',
          });
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
        });
      },
    });
  },

  // 学期选择器回调
  changeBrand1(e) {
    const selectedId = e.detail.nowId;
    const selectedName = this.data.brandList1.find((item) => item.id === selectedId)?.name || "选择学期";
    this.setData(
      {
        curfId1: selectedId,
        curBrandName1: selectedName,
      },
      () => {
        this.fetchCourseList(); // 重新加载课程表
      }
    );
  },

  // 周数选择器回调
  changeBrand2(e) {
    const selectedId = e.detail.nowId;
    const selectedName = this.data.brandList2.find((item) => item.id === selectedId)?.name || "选择周数";
    this.setData(
      {
        curfId2: selectedId,
        curBrandName2: selectedName,
      },
      () => {
        this.fetchCourseList(); // 重新加载课程表
      }
    );
  },
});
