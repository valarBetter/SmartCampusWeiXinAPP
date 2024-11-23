Page({
  data: {
    userId: '12345', // 用户ID
    active: 0, // 当前激活的tab索引
    selectedCourses: [], // 已选课程列表
    availableCourses: [] // 可选课程列表
  },

  onLoad() {
    this.fetchCourses();
  },

  // 切换tab
  onChangeTab(event) {
    this.setData({ active: event.detail.index });
  },

  // 获取课程列表
  fetchCourses() {
    wx.http('/students/coursesLista', 'GET', { userId: this.data.userId }, (res) => {

        this.setData({
          selectedCourses: res.selectedCourses,
          availableCourses: res.availableCourses
        });

    });
  },

  // 选课
  selectCourse(event) {
    const courseId = event.currentTarget.dataset.id;
    wx.http('/students/courses/getcourser', 'POST', { Id: this.data.userId, courseId }, (res) => {
      if (res) {
        wx.showToast({ title: "选课成功" });
        this.fetchCourses(); // 更新课程列表
      } else {
        wx.showToast({
          title: "选课失败，请重试",
          icon: "none"
        });
      }
    });
  },

  // 退课
  withdrawCourse(event) {
    const courseId = event.currentTarget.dataset.id;
    wx.http('/students/courses/withdraw', 'POST', { Id: this.data.userId, courseId }, (res) => {
      if (res) {
        wx.showToast({ title: "退课成功" });
        this.fetchCourses(); // 更新课程列表
      } else {
        wx.showToast({
          title: "退课失败，请重试",
          icon: "none"
        });
      }
    });
  }
});
