Page({
  data: {
    // 页面的数据定义
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
    console.log('点击了忘记密码');
    wx.switchTab({
      url: '/pages/PersonalCenter/index',
      fail: function(err) {
        console.error('跳转失败:', err);  // 输出跳转失败的错误信息
      }
    });
  },

})
