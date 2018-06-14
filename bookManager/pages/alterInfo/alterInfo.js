var app = getApp();
Page({
  data: {
    userInfoAvatar: '',
    flag: 0,
    Info:[],
  },
  onLoad: function () {
    var that = this;
    this.setData({
      flag: 0,
      Info:app.globalData.userinfo
    })
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfoAvatar: res.userInfo.avatarUrl,
        })
      },
    //   fail: function () {
    //     console.log("获取失败！")
    //   },
    //   complete: function () {
    //     console.log("获取用户信息完成！")
    //   }
    })
    console.log(this.data.flag)
  },
  alter_password: function () {
    this.setData({
      flag: 1
    })
    wx.switchTab({
      url: '../alterInfo/alterInfo',
    })
  },
  alter_pe: function (e) {
    this.setData({
      flag: 2
    })
    wx.switchTab({
      url: '../alterInfo/alterInfo',
    })
    wx.showModal({
      title: 'Tips',
      content: '不输入项默认不修改',
    })
  },
  save_info: function (e) {
    var that = this
    var all_data = {}
    if (this.data.flag == 1) {
      all_data = { "flag": this.data.flag, "id": app.globalData.userinfo[0], "password_p": e.detail.value.password_p, "password_n": e.detail.value.password_n, "password_r": e.detail.value.password_r }
    }
    else {
      all_data = { "flag": this.data.flag, "id": app.globalData.userinfo[0], "phone": e.detail.value.phone, "email": e.detail.value.email }
    }
    wx.request({
      url: 'http://localhost:8080/wx_alter_servlet',
      data: all_data,
      success: function (res) {
        if(res.data=="修改成功！"&&that.data.flag==1)
        {
          wx.switchTab({
              url: '../mine/mine',
            })
          wx.showToast({
            title: '修改成功',
          })
        }
        // else{
        //     that.setData({
        //     })
        // }
      }
    })
  }
})
