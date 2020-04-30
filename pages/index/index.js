// pages/index/index.js
// 获取全局实例
const app = getApp()
const base_url = app.globalData.base_url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },

  login: function (data) {
    console.log(data.detail.value)
    var that = this;
    var username = data.detail.value.username
    var password = data.detail.value.password
    if ("" === username || "" === password) {
      wx.showModal({
        title: '用户名或密码不能为空'
      })
      return
    }
    wx.request({
      url: base_url + "user/login",
      method: 'POST',
      data: {
        userName: username,
        password: password
      },
      success: function (e) {
        // 登录失败显示登录错误信息
        if (e.data.code == -1) {
          wx.showModal({
            title: e.data.msg,
          })
        } else {
          // 登录成功 跳转主页面 
          wx.switchTab({
            url: '/pages/course_index/course_index'
          });
          // 本地存储用户信息
          wx.setStorage({
            data: e.data.data,
            key: 'user_info',
            success: function () {
              console.log('写入用户信息成功')
            },
            fail: function (e) {
              console.log("存储用户信息失败")
            }
          })
          // 全局用户信息 
          app.globalData.userInfo = e.data.data
        }
      },
      complete: function (e) {}
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