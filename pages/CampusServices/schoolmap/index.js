// pages/CampusServices/schoolmap/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mapList: [], // 存储地图数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const studentId = wx.getStorageSync('studentId'); // 获取存储的学生ID
    this.fetchSchoolMap(studentId); // 获取学校地图数据
  },

  /**
   * 获取学校地图数据
   */
  fetchSchoolMap(studentId) {
    wx.request({
      url: 'http://8.138.81.10:8080/students/schoolMap', // 接口地址
      method: 'GET',
      data: { studentId },
      success: (res) => {
        if (res.data.code === 200 && res.data.data) {
          this.setData({
            mapList: res.data.data, // 更新地图数据
          });
        } else {
          wx.showToast({
            title: '加载失败',
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
   * 保存图片到本地
   */
  saveImage(event) {
    const { url } = event.currentTarget.dataset; // 获取图片URL
    wx.downloadFile({
      url, // 下载图片
      success: (res) => {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath, // 保存到相册
            success: () => {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
              });
            },
            fail: (err) => {
              if (err.errMsg.includes('auth')) {
                wx.showModal({
                  title: '授权提示',
                  content: '请授权保存图片权限',
                  success: (modalRes) => {
                    if (modalRes.confirm) {
                      wx.openSetting(); // 打开设置
                    }
                  },
                });
              } else {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none',
                });
              }
            },
          });
        } else {
          wx.showToast({
            title: '下载失败',
            icon: 'none',
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '下载失败',
          icon: 'none',
        });
      },
    });
  },
});
