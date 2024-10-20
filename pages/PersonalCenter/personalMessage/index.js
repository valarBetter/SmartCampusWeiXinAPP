// pages/PersonalCenter/personalMessage/index.js
Page({

  data: {
    studentno: '2100301327',
    personalname: '李四', 
    profession: '软件工程',
    calss: '21003202',
    gender: '男', 
    phone: '19978924444',
    popupView:false
  },
  changePopupView(){
    this.setData({popupView:!this.data.popupView})
  }
})