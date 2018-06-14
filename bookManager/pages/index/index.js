// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 模拟数据，应该从后台获取
    arrSwiper: [
      {
        url: '/pages/detail/detail',
        src: '/images/1.jpg'
      },
      {
        url: '/pages/detail/detail',
        src: '/images/2.jpg'
      },
      {
        url: '/pages/detail/detail',
        src: '/images/3.jpg'
      },
      {
        url: '/pages/detail/detail',
        src: '/images/4.jpg'
      },
    ],
    arrPicker: ["书名", "作者", "出版社"],
    index: 0,
    newBooks: [
      {
        id: 1,
        name: "操作系统",
        class: "专业类"
      },
      {
        id: 2,
        name: "算法分析",
        class: "专业类"
      },
      {
        id: 3,
        name: "美工",
        class: "专业类"
      },
      {
        id: 4,
        name: "管理学",
        class: "专业类"
      }
    ],
    arrSearchBooks: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载页面初始化需要的信息
  },

  pickerChange: function (e) {
    this.setData({
      index: e.detail.value,
    });
  },

  search: function (e) {
    var that = this;
    var key = e.detail.value.key;
    var value = e.detail.value.value;
    //向服务器发送请求
    wx.request({
      url: 'http://localhost:8080/wx_search_servlet',//对应servlet的请求url
      data: { "key": key, "search_info": value },
      success: function (res) {
        if (res.data.length > 1) {
          that.setData({
            arrSearchBooks: res.data
          })
        }
        else {
          wx.showModal({
            title: '查询结果',
            content: '查询失败，没有相关书籍',
          })
        }
      }
    })
  },
  tips: function (e) {
    console.log(e.currentTarget.dataset.num)
    if (e.currentTarget.dataset.num == 0) {
      wx.showModal({
        // title: '',
        content: '该书已借光！',
      })
    }
    else {
      wx.showModal({
        // title: '',
        content: '请到管理员处借阅',
      })
    }
  }
})