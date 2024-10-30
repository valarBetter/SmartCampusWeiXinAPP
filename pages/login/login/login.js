Page({
  data: {
    // 页面的数据定义
    account: '',
    password: ''
  },
  onInputAccount(e) {
    this.setData({ account: e.detail.value });
  },

  onInputPassword(e) {
    this.setData({ password: e.detail.value });
  },

  // 跳转到注册页面的函数
  goToRegister: function() {
    console.log('点击了立即注册');
    wx.navigateTo({
      url: '/pages/login/register/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },
  
  goToResetPassword: function() {
    console.log('点击了忘记密码');
    wx.navigateTo({
      url: '/pages/login/ResetPassword/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },

  goToPersonalCenter: function() {
    console.log('点击了立即登录');
    wx.switchTab({
      url: '/pages/PersonalCenter/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },
  onLogin() {
    const { account, password } = this.data;
    wx.request({
      url: 'http://localhost:8080/login',
      method: 'POST',
      data: {
        account,
        password
      },
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.statusCode === 200) {
          // 登录成功处理
          console.log('登录成功', res.data);
        } else {
          // 登录失败处理
          console.error('登录失败', res.data);
        }
      },
      fail(err) {
        console.error('请求失败', err);
      }
    });
  }
})
