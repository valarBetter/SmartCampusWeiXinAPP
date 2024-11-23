// pages/login/ResetPassword/index.js
Page({
  data: {
    Id:"",
    stuId: '',             // 学号
    newPassword: '',       // 新密码
    confirmPassword: '',   // 确认密码
    code: '',              // 验证码（如果需要）
  },

  // 处理学号输入
  onInputStuId(e) {
    this.setData({ stuId: e.detail.value });
  },
  onInputId(e) {
    this.setData({ Id: e.detail.value });
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
    // 这里可以根据需求，填写发送验证码的逻辑
    console.log('验证码发送');
  },

  // 重置密码操作
  onResetPassword() {
    const { Id,stuId, newPassword, confirmPassword } = this.data;

    // 检查学号、新密码和确认密码是否为空
    if (!stuId || !newPassword || !confirmPassword) {
      wx.showToast({
        title: '学号或密码不能为空',
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

    // 调用封装的 http 方法进行请求
    wx.http('/students/resetPassword', 'POST', {
      Id: Id,           // 学号
      stuId: stuId,        // 学号
      newPassword,         // 新密码
      confirmPassword      // 确认密码
    }, (res) => {
      if (res.code === 0 && res.status === 'success') {
        // 密码重置成功
        wx.showToast({
          title: '密码修改成功',
          icon: 'success'
        });
        // 重置成功后跳转到登录页面或其他操作
        wx.navigateBack(); // 或者 wx.switchTab({ url: '/pages/login/index' });
      } else {
        // 密码重置失败
        wx.showToast({
          title: res.message || '密码重置失败',
          icon: 'none'
        });
        console.error('重置失败', res);
      }
    });
  }
});
