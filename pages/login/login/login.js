Page({
  data: {
    account: '',  // 用户账号
    password: ''  // 用户密码
  },

  // 处理输入框账号
  onInputAccount(e) {
    this.setData({ account: e.detail.value });
  },

  // 处理输入框密码
  onInputPassword(e) {
    this.setData({ password: e.detail.value });
  },

  // 跳转到注册页面
  goToRegister() {
    console.log('点击了立即注册');
    wx.navigateTo({
      url: '/pages/login/register/index',
      fail: function (err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },

  // 跳转到重置密码页面
  goToResetPassword() {
    console.log('点击了忘记密码');
    wx.navigateTo({
      url: '/pages/login/ResetPassword/index',
      fail: function (err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },

  // 登录操作
  onLogin() {
    const { account, password } = this.data;

    // 判断账号和密码不能为空
    if (!account || !password) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none'
      });
      return;
    }

    // 使用封装的 http 方法来替代 wx.request
    wx.http('/students/login', 'POST', {
      studentId: account,  // 使用账号作为学号（stuId）
      studentPassword: password  // 使用密码（opassword）
    }, (res) => {
      if (res.code === 0 && res.status === 'success') {
        // 登录成功，跳转到个人信息页面
        console.log('登录成功', res.data);
        wx.setStorageSync('token', res.token || ''); // 保存 token （如果需要）
        wx.setStorageSync('userInfo', { stuId: account }); // 存储用户信息（可以根据实际返回的数据做调整）

        // 跳转到个人信息页面
        wx.switchTab({
          url: '/pages/PersonalCenter/index',
          fail: function (err) {
            console.error('跳转失败:', err);  // 输出跳转失败的错误信息
          }
        });
      } else {
        // 登录失败，提示错误信息
        wx.showToast({
          title: res.message || '登录失败',
          icon: 'none'
        });
        console.error('登录失败', res);
      }
    });
  }
});
