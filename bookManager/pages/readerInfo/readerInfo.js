// pages/readerInfo/readerInfo.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = app.globalData.userinfo
    var tt = { "name": t[1], "id": t[0], "department":t[3],"major": t[4],"phone":t[5],"email":t[6],"max":t[7],"time":t[8],"lendednum":t[9]}
    this.setData({
      temp:tt,
    })
    // console.log(this.data.temp)
  }
})