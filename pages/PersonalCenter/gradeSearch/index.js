// pages/PersonalCenter/gradeSearch/index.js
Page({

  data: {
    curfId: 1,
    brandList: [{name: "2024-2023上学期" ,id: 1},
      {name: "2025-2023下学期" ,id: 2},
      {name: "2026-2023上学期" ,id: 3}],
      curBrandName:"全部" ,
      semesters: [] // 新增属性
    },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userId = wx.getStorageSync('studentId'); // 使用存储的用户ID
    const semester = this.data.curBrandName !== '全部' ? this.data.curBrandName : ''; // 只有在不选择“全部”时传递
  
    wx.request({
      url: 'http://8.138.81.10:8080/students/gradesearch',
      method: 'GET',
      data: {
        id: 111 //userId
      },
      success: (res) => {
        console.log(res.data); // 打印返回的 data 对象
        if (res.data.code === 200 && res.data.data) {
          // 将课程信息按学期分类（此处可以根据需要自行分配学期）
          const semesters = [{
            semester: '2024-2025下半学期', // 示例学期
            courses: res.data.data
          }];
          this.setData({
            semesters: semesters // 设置成绩数据
          });
        } else {
          wx.showToast({
            title: '数据加载失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
      }
    });
  },
  
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  changeBrand(e) {
    this.setData({
      curBrandName: e.detail.select // 更新当前学期
    });
    this.onLoad(); // 重新加载数据
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})