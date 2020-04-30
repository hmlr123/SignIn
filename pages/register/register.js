// pages/register/register.js
// 获取全局实例
const app = getApp()
const base_url = app.globalData.base_url
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 注册
  register: function (data) {
    var that = this;
    var username = data.detail.value.username
    var password = data.detail.value.password
    if("" === username || "" === password) {
      wx.showModal({
        title: '用户名或密码不能为空'
      })
      return
    }
    wx.request({
      url: base_url + "user/register",
      method:'POST',
      data:{
        userName:username,
        password:password
      },
      success:function(e){},
      complete:function(e){
        wx.showModal({
          title: e.data.msg,
        })
        if(e.data.data) {
          // 跳转到登录界面 回退
          wx.navigateBack({ changed: true });
        } else {
          // 清空数据
          that.data.username = "",
          that.data.password = ""
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})