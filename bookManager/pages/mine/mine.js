// pages/mine/mine.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rolePicker: ["读者", "图书管理员", "系统管理员"],
    index: 0,
    isLogin: false,
    userinfo: null,/*双向绑定的数据需要写在data中 */
    // return_info: [],
    wrong: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;  //术语：留着this
    //获取缓存的userinfo，若获取到，则说明非第一次登录
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        // console.log(res.data);//验证res的信息,用res.data获取数据key的信息
        //this，关键字，哪个调用当前function,this即指它,这里添加一个_this
        _this.setData({
          userinfo: res.data,
          isLogin: true
        })
      },
    })
  },

  pickerChange: function (e) {
    this.setData({
      index: e.detail.value
    });
  },

  userLogin: function (e) {
    console.log(e)
    // 判断op是多少，判断相应类型的登录
    var that = this;
    var op = e.detail.value.op;
    var usr_id = e.detail.value.user;
    var pswd = e.detail.value.pwd;
    //发送请求
    wx.request({
      url: 'http://localhost:8080/wx_login_servlet',
      data: { "op": op, "usr_id": usr_id, "password": pswd },
      success: function (res) {
        var return_info = res.data
        if (res.data.length > 1) {
          that.setData({// 设置用户信息数据以及用户登录状态
            userinfo: res.data,
            isLogin: true,
          })
          wx.showToast({
            title: "登录成功",
          })
          wx.navigateTo({
            url: '../reader/reader?info=' + JSON.stringify(return_info)+'&op='+op,
          })
        }
        else {
          that.setData({
            wrong: res.data
          })
          wx.showModal({
            title: '登录失败',
            content: '用户名/密码 空/错',
          })
        }
        app.globalData.userinfo = res.data
      },
    })
    //使用缓存技术存储用户信息
    wx.setStorage({
      key: 'userinfo',
      data: e.detail.value,
      //异步接口，这里看不到是否缓存成功，加一个函数
      success: function () {
        // wx.showToast({
        //   title: "登录成功",
        // })
      }
    })
  },
  // existLogin: function () {
  //   var that = this;
  //   // 1.清缓存
  //   // 2.userinfo重置为null
  //   // 3.更改登录状态
  //   wx.removeStorage({
  //     key: 'userinfo',
  //     success: function (res) {
  //       // 清楚缓存成功才修改其他两步信息
  //       //因为this的指向发生变化，所以要在前面声明一个this
  //       that.setData({
  //         userinfo: null,
  //         isLogin: false
  //       })
  //     },
  //   })
  // }
})