// pages/reader/reader.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: [],
    op:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userinfo: JSON.parse(options.info),
      op: JSON.parse(options.op)
    })
    // console.log(this.data.op)
  },
  seeBorrow:function()
  {
    wx.request({
      url: 'http://localhost:8080/wx_myborrow_servlet',
      data:{"id":this.data.userinfo[0]},
      success:function(res){
        if (res.data =="没有在借图书"){
          wx.showModal({
            title: '查阅结果',
            content: '您当前无在借书籍',
          })
        }
        else{          
          // console.log(res.data)
          wx.navigateTo({
            url: '../myBorrowInfo/myBorrowInfo?myBorrow=' + JSON.stringify(res.data),
          })
        }
      }
    })
  },
  add:function(){
    wx.navigateTo({
      url: '../add/add?op='+JSON.stringify(this.data.op),
    })
  },
  existLogin: function () {
    var that = this;  //因为this的指向发生变化，所以要在前面声明一个this
    // 1.清缓存 2.userinfo重置为null 3.更改登录状态
    wx.removeStorage({
      key: 'userinfo',
      success: function (res) {
        // 清楚缓存成功才修改其他信息
        that.setData({
          userinfo: null,
          isLogin: false,
        })
        wx.switchTab({
          url: '../mine/mine',
        })
      },
    })
  },
})