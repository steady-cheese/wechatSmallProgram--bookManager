// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "imagelist":[
      {
      "Path":"/image/photo.png"
      },
      {
        "Path":"/image/slide-2.jpg"
      },
      {
        "Path": "/image/slide-3.jpg"
      },
      {
        "Path": "/image/slide-4.jpg"
      }
    ],
    "testlist": [
      {
        "text": "图书馆本周周一至周日正常开放，开馆时间：8:20"
      },
      {
        "text": ",闭馆时间：22:00"
      }
    ],
    search:"",
    infomess:""
  },
  inputclick:function(e){
    this.setData({
      search:e.detail.value
    })
  },
  searchBtnClick: function () {
    if (this.data.search.length == 0 ) {
      this.setData({
        infomess: "输入不能为空！"
      })
    } else {
      this.setData({
        infomess: "",
        search: this.data.search
      })
      wx.navigateTo({
        url: "../bookSearch/bookSearch?search=" + this.data.search
      })
    }
  }
})