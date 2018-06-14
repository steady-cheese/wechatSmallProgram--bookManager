// pages/myBorrowInfo/myBorrowInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrBorrowBooks: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.myBorrow)
    this.setData({
      arrBorrowBooks: JSON.parse(options.myBorrow)
    })
  },
})