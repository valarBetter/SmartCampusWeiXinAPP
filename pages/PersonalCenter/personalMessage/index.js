// pages/PersonalCenter/personalMessage/index.js
Page({
  data: {
    studentno: '',         // 学号
    personalname: '',      // 姓名
    profession: '',        // 专业
    calss: '',             // 年级
    gender: '',            // 性别
    phone: '',             // 联系方式
    popupView: false,      // 弹出层显示状态
    originalPassword: '',  // 原密码
    newPhone: ''           // 新联系方式
  },

  onLoad() {
    // 从本地缓存中获取用户 ID
    const studentId = wx.getStorageSync('studentId');
    if (!studentId) {
      wx.showToast({
        title: '用户未登录，请先登录',
        icon: 'none',
        duration: 2000
      });
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/index', // 跳转到登录页面
        });
      }, 2000);
      return;
    }

    // 获取个人信息
    wx.request({
      url: `http://8.138.81.10:8080/students/personalInfo`, // 替换为实际接口地址
      method: 'GET',
      data: { studentId },
      success: (res) => {
        if (res.data.code === 200) {
          const { studentId, name, grade, major, gender, contactInfo } = res.data.data;
          this.setData({
            studentno: studentId,
            personalname: name,
            calss: grade,
            profession: major,
            gender: gender || '未填写',
            phone: contactInfo || '未填写'
          });
        } else {
          wx.showToast({
            title: res.data.message || '获取信息失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '网络请求失败，请检查连接',
          icon: 'none'
        });
      }
    });
  },

  changePopupView() {
    this.setData({ popupView: !this.data.popupView });
  },


  onOriginalPasswordInput(e) {
    this.setData({
      originalPassword: e.detail.value
    });
  },
  onNewPhoneInput(e) {
    this.setData({
      newPhone: e.detail.value
    });
  },
  
  updatePhone() {
    const studentId = wx.getStorageSync('studentId'); // 从缓存获取用户 ID
    const { originalPassword, newPhone } = this.data;

    if (!originalPassword || !newPhone) {
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none'
      });
      return;
    }

    // 调用更新联系方式的接口
    wx.request({
      url: `http://8.138.81.10:8080/students/updatePhone`, // 替换为实际接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 确保请求头格式为 form-data
      },
      data: {
        studentId,
        password: originalPassword,       // 新联系方式
        contactInfo:  newPhone// 原密码
      },
      success: (res) => {
        if (res.data.code === 0 && res.data.status === 'success') {
          wx.showToast({
            title: res.data.message || '联系方式修改成功',
            icon: 'success'
          });
          this.setData({ phone: newPhone }); // 更新显示的联系方式
          this.changePopupView(); // 关闭弹出层
        } else {
          wx.showToast({
            title: res.data.message || '修改失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '网络请求失败，请检查连接',
          icon: 'none'
        });
      }
    });
  }
});
