// pages/PersonalCenter/personalMessage/index.js
Page({
  data: {
    studentno: '', // 学号
    personalname: '', // 姓名
    profession: '', // 专业
    calss: '', // 年级
    gender: '', // 性别
    phone: '', // 联系方式
    popupView: false,
    originalPassword: '', // 存储原密码
    newPhone: '' // 存储新联系方式
  },

  onLoad(options) {
    const userId = '你的用户ID'; // 替换为实际用户ID

    // 使用封装的 http 方法来替代 wx.request
    wx.http('/students/personalInfo', 'GET', { Id: userId }, (data) => {
      console.log('接口返回数据:', data);
      this.setData({
        studentno: data.stuId,
        personalname: data.Name,
        calss: data.grade,
        profession: data.major,
        gender: data.gender,
        phone: data.chatinfo
      });
    });
  },

  changePopupView() {
    this.setData({ popupView: !this.data.popupView });
  },

  onInputAccount(e) {
    // 根据输入框的类型设置对应的数据
    const { placeholder } = e.currentTarget.dataset; // 获取输入框的占位符
    if (placeholder === '请输入原密码') {
      this.setData({ originalPassword: e.detail.value });
    } else if (placeholder === '请输入新联系方式') {
      this.setData({ newPhone: e.detail.value });
    }
  },

  updatePhone() {
    const userId = '111'; // 替换为实际用户ID
    const { originalPassword, newPhone } = this.data;

    // 使用封装的 http 方法来替代 wx.request
    wx.http('/students/updatePhone', 'POST', {
      Id: userId,
      chatinfo: newPhone,
      opassword: originalPassword
    }, (res) => {
      if (res.status === 'success') {
        wx.showToast({
          title: '联系方式修改成功',
          icon: 'success'
        });
        this.setData({ phone: newPhone }); // 更新显示的电话
        this.changePopupView(); // 关闭弹出层
      } else {
        wx.showToast({
          title: res.data.message || '修改失败',
          icon: 'none'
        });
      }
    });
  }
});
