// pages/CampusServices/websiteindex/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    linkList: [],  // 存储接口返回的链接列表
    linkTitle: '', // 存储弹窗标题（网站名称）
    linkUrl: '',   // 存储弹窗内容（网址）
    showDialog: false, // 控制弹窗显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const studentId = wx.getStorageSync('studentId'); // 获取存储的学生ID
    this.setData({ studentId });
    this.fetchLinks(); // 请求常用链接
  },

  /**
   * 获取常用链接
   */
  fetchLinks() {
    const { studentId } = this.data;

    wx.request({
      url: 'http://8.138.81.10:8080/students/commonLinks', // 接口地址
      method: 'GET',
      data: {
        studentId,  // 使用存储的学生ID
      },
      success: (res) => {
        if (res.data.code === 200 && res.data.data) {
          this.setData({
            linkList: res.data.data, // 更新链接列表
          });
        } else {
          wx.showToast({
            title: '无数据或查询失败',
            icon: 'none',
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '请求失败',
          icon: 'none',
        });
      }
    });
  },

  /**
   * 点击链接项显示详情
   */
  showLinkDetails(event) {
    const { name, url } = event.currentTarget.dataset; // 获取链接名称和网址
    this.setData({
      linkTitle: name,
      linkUrl: url,
      showDialog: true, // 显示弹窗
    });
  },

  /**
   * 关闭弹窗
   */
  onClose() {
    this.setData({
      showDialog: false, // 关闭弹窗
    });
  },
});
