// pages/login/ResetPassword/index.js
Page({
  data: {
    Id: "",               // 用户ID
    stuId: '',            // 学号
    newPassword: '',      // 新密码
    confirmPassword: '',  // 确认密码
    code: '',             // 验证码（如果需要）
  },

  // 处理用户ID输入
  onInputId(e) {
    this.setData({ Id: e.detail.value });
  },

  // 处理学号输入
  onInputStuId(e) {
    this.setData({ stuId: e.detail.value });
  },

  // 处理新密码输入
  onInputNewPassword(e) {
    this.setData({ newPassword: e.detail.value });
  },

  // 处理确认密码输入
  onInputConfirmPassword(e) {
    this.setData({ confirmPassword: e.detail.value });
  },

  // 发送验证码（如果需要）
  test() {
    console.log('验证码发送');
  },

  // 重置密码操作
  onResetPassword() {
    const { Id, stuId, newPassword, confirmPassword } = this.data;

    // 检查ID、学号、新密码和确认密码是否为空
    if (!Id || !stuId || !newPassword || !confirmPassword) {
      wx.showToast({
        title: 'ID、学号或密码不能为空',
        icon: 'none'
      });
      return;
    }

    // 检查新密码和确认密码是否一致
    if (newPassword !== confirmPassword) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      });
      return;
    }

    // 拼接 form-data 格式的请求体
    const formData = `Id=${Id}&studentId=${stuId}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`;

    // 发起请求
    wx.request({
      url: 'http://8.138.81.10:8080/students/resetPassword',
      method: 'POST',
      data: formData, // 使用拼接的 form-data 数据
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', // 设置请求头格式为 form-data
      },
      success: (res) => {
        if (res.data.code === 0 && res.data.status === 'success') {
          // 密码重置成功
          wx.showToast({
            title: '密码修改成功',
            icon: 'success'
          });
          // 跳转回登录页面或其他操作
          wx.navigateBack(); // 或 wx.switchTab({ url: '/pages/login/index' });
        } else {
          // 密码重置失败
          wx.showToast({
            title: res.data.message || '密码重置失败',
            icon: 'none'
          });
          console.error('重置失败', res.data);
        }
      },
      fail: (err) => {
        console.error('请求失败', err);
        wx.showToast({
          title: '请求失败，请检查网络连接',
          icon: 'none'
        });
      }
    });
  }
});