// components/Header1/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "标题"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: 0,
    isShowBack: false,    // 是否显示返回按钮
  },
  ready(){
    this.initialStatusHeight();
    this.initialBackStatus();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化状态栏高度
    initialStatusHeight(){
      const sysInfo = wx.getSystemInfoSync();
      this.setData({
        navBarHeight: sysInfo.statusBarHeight
      });
    },
    // 初始化返回按钮状态
    initialBackStatus(){
      const pages = getCurrentPages();
      this.setData({
        isShowBack: pages.length>=2
      })
    },
    // 返回事件
    backEvent(){
      wx.navigateBack();
    }
  },
})