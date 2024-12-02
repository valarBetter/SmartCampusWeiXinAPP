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

    // 将数据拼接为 form-data 格式
    const formData = `studentId=${account}&studentPassword=${password}`;

    wx.request({
      url: 'http://8.138.81.10:8080/students/login',
      method: 'POST',
      data: formData, // 使用拼接的 form-data 字符串
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', // 设置为 form-data
      },
      success: (res) => {
        if (res.data.code === 0 && res.data.status === 'success') {
          // 登录成功，跳转到个人信息页面
          console.log('登录成功', res.data);
          wx.setStorageSync('token', res.data.token || ''); // 保存 token （如果需要）
          wx.setStorageSync('studentId',  account); // 保存 token （如果需要）
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
            title: res.data.message || '登录失败',
            icon: 'none'
          });
          console.error('登录失败', res.data);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '请求失败，请检查网络连接',
          icon: 'none'
        });
      }
    });
  }
});
