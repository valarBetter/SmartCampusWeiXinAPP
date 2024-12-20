Page({
  data: {
    selectcontent: [],
    changable: false, // 箭头切换
    select: undefined, // 选中的值
    selectId: undefined, // 选中的id
    placeholder: "请选择", // 默认占位符
    nameList: [
      { id: 1, name: "选项1" },
      { id: 2, name: "选项2" },
      { id: 3, name: "选项3" }
    ], // 示例数据源
  },
  rights: [
    {
      src: 'https://static.sprucesmart.com/hunanapp/turn/spring/5-oil-icon.png',
      name: "昆仑润滑油 天润KR8全...",
      id: 1,
      num: 122,
      price: 188
    },
    {
      src: 'https://static.sprucesmart.com/hunanapp/turn/spring/5-oil-icon.png',
      name: "商品二",
      id: 2,
      num: 123,
      price: 18
    },
    {
      src: 'https://static.sprucesmart.com/hunanapp/turn/spring/5-oil-icon.png',
      name: "商品三",
      id: 3,
      num: 124,
      price: 99
    },
    {
      src: 'https://static.sprucesmart.com/hunanapp/turn/spring/5-oil-icon.png',
      name: "商品一",
      id: 1,
      num: 122,
      price: 188
    },
    {
      src: 'https://static.sprucesmart.com/hunanapp/turn/spring/5-oil-icon.png',
      name: "商品二",
      id: 2,
      num: 123,
      price: 18
    },
    {
      src: 'https://static.sprucesmart.com/hunanapp/turn/spring/5-oil-icon.png',
      name: "商品三",
      id: 3,
      num: 124,
      price: 99
    },
    {
      src: 'https://static.sprucesmart.com/hunanapp/turn/spring/5-oil-icon.png',
      name: "商品一",
      id: 1,
      num: 122,
      price: 188
    },
    {
      src: 'https://static.sprucesmart.com/hunanapp/turn/spring/5-oil-icon.png',
      name: "商品二",
      id: 2,
      num: 123,
      price: 18
    },
    {
      src: 'https://static.sprucesmart.com/hunanapp/turn/spring/5-oil-icon.png',
      name: "商品三",
      id: 3,
      num: 124,
      price: 99
    }
  ],

  onLoad: function () {
    this.processData();
  },

  // 下拉框收起和展开
  startChange(e) {
    this.setData({
      changable: !this.data.changable
    });
  },

  // 选择数据后回显
  changecontent(e) {
    this.setData({
      select: e.currentTarget.dataset.datavalue.name,
      selectId: e.currentTarget.dataset.datavalue.id,
      changable: false
    });
    this.triggerEvent("handleChange", { selectId: this.data.selectId, select: this.data.select }); // 向父组件传参
  },

  // 处理数据
  processData() {
    let options = [];
    this.data.nameList.forEach((item) => {
      options.push({
        id: item.id,
        name: item.name,
      });
    });
    this.setData({
      selectcontent: options,
    });
  }
});
