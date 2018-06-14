// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    op:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      op:JSON.parse(options.op)
    })
    // console.log(this.data.op)
  },

  add:function(e)
  {
    // console.log(e)
    // console.log(this.data.op)
    if(this.data.op==1)
    {
      console.log(e.detail.value)
    wx.request({
      url: 'http://localhost:8080/wx_addNew_servlet',
      data: { "op": this.data.op, "book_name": e.detail.value.book_name, "author": e.detail.value.author, "translator": e.detail.value.translator, "price": e.detail.value.price, "ISBNCode": e.detail.value.ISBNCode, "PublishCompany": e.detail.value.PublishCompany, "ComeUpTime": e.detail.value.ComeUpTime, "EnteringMen": e.detail.value.EnteringMen},
      success:function(res)
      {
        wx.showModal({
          title: '添加结果',
          content: res.data,
        })
      }
    })
    }
    if(this.data.op==2)
    {
      wx.request({
        url: 'http://localhost:8080/wx_addNew_servlet',
        data: { "op": this.data.op, "user_id": e.detail.value.user_id, "user_name": e.detail.value.user_name, "user_department": e.detail.value.user_department, "user_major": e.detail.value.user_major, "user_phone": e.detail.value.user_phone, "user_email": e.detail.value.user_email, "user_max": e.detail.value.user_max, "user_time": e.detail.value.user_time},
           success: function (res) {
          wx.showModal({
            title: '添加结果',
            content: res.data,
          })
        }
      })
    }
  }
})