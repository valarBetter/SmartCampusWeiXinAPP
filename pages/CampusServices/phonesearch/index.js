// pages/CampusServices/phonesearch/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneList: [],  // 存储接口返回的电话列表
    linkTitle: '',  // 存储弹窗标题（网站名称）
    phoneNumber: '', // 存储弹窗内容（网址）
    showDialog: false, // 控制弹窗显示
    keyword: '', // 输入的关键字
  },

  /**
   * 页面的初始化
   */
  onLoad(options) {
    const studentId = wx.getStorageSync('studentId'); // 获取存储的学生ID
    this.setData({ studentId });
    this.searchPhone();
  },

  /**
   * 监听输入框变化
   */
  onInputAccount(event) {
    this.setData({
      keyword: event.detail.value,  // 保存输入的关键字
    });
  },

  /**
   * 查询按钮点击事件
   */
  searchPhone() {
    const { studentId, keyword } = this.data;

    // 构建请求参数
    let requestData = {
      studentId, // 始终包含 studentId
    };

    if (keyword.trim() !== '') {
      requestData.keyword = keyword; // 如果输入不为空，才添加 keyword 字段
    }

    wx.request({
      url: 'http://8.138.81.10:8080/students/campusPhones',
      method: 'GET',
      data: requestData, // 动态参数
      success: (res) => {
        console.log(res.data);
        if (res.data.code === 200 && res.data.data) {
          this.setData({
            phoneList: res.data.data, // 更新电话列表
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
      },
    });
  },

  /**
   * 点击列表项显示电话号码
   */
  showPhoneNumber(event) {
    const { name, phone } = event.currentTarget.dataset; // 获取链接名称和电话号码
    this.setData({
      linkTitle: name,
      phoneNumber: phone,
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
