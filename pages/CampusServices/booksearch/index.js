// pages/CampusServices/booksearch/index.js
Page({
  data: {
    query: '', // 查询的关键词
    page: 1,   // 当前页码
    pageSize: 3, // 每页显示记录数
    totalPages: 1, // 总页数
    books: [] // 图书列表
  },

  // 输入框内容变化时更新查询关键词
  onInputAccount(e) {
    this.setData({
      query: e.detail.value
    });
  },

  // 页面加载时调用查询
  onLoad(options) {
    // 页面加载时，调用 fetchBooks 方法
    this.fetchBooks();
  },

  // 查询图书信息
  fetchBooks() {
    const { query, page, pageSize } = this.data;
  
    // 请求参数
    const params = {
      query,
      page,
      pageSize
    };
  
    // 使用封装的 http 方法获取数据
    wx.http('/students/booksearch', 'GET', params, (res) => {
      if (res && res.code === 200) {
        const books = res.data.books.map(book => {
          // 格式化 publishTime，只保留年月日
          const publishTime = new Date(book.publishTime);
          const formattedTime = `${publishTime.getFullYear()}-${(publishTime.getMonth() + 1).toString().padStart(2, '0')}-${publishTime.getDate().toString().padStart(2, '0')}`;
  
          return {
            bname: book.name, // 替换为新的字段
            author: book.author,
            number: book.number,
            pubname: book.publisher, // 替换为新的字段
            pubtime: formattedTime, // 格式化后的时间
            location: book.location
          };
        });
  
        this.setData({
          books: books,
          totalPages: res.data.totalPages,
          page: res.data.currentPage
        });
      } else {
        wx.showToast({
          title: "查询失败，请重试",
          icon: "none"
        });
      }
    });
  },
  

  // 点击“查询”按钮触发查询
  goToPersonalCenter() {
    this.setData({ page: 1 }, () => {
      this.fetchBooks();
    });
  },

  // 上一页
  goToPreviousPage() {
    if (this.data.page > 1) {
      this.setData({
        page: this.data.page - 1
      }, () => {
        this.fetchBooks();
      });
    } else {
      wx.showToast({
        title: "已经是第一页",
        icon: "none"
      });
    }
  },

  // 下一页
  goToNextPage() {
    if (this.data.page < this.data.totalPages) {
      this.setData({
        page: this.data.page + 1
      }, () => {
        this.fetchBooks();
      });
    } else {
      wx.showToast({
        title: "已经是最后一页",
        icon: "none"
      });
    }
  }
});
