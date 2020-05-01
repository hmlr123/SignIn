// pages/edit/edit.js
// 获取全局实例
const app = getApp()
// 引入模块
const Request = require("../../utils/request")


Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    username: '',
    number: '',
    tel: '',
    email: ''
  },

  userSubmit: function (data) {
    var arg = {
      userName: data.detail.value.username,
      number: data.detail.value.number,
      tel: data.detail.value.tel,
      email: data.detail.value.email,
    }
    Request.post("/user/editUserInfo",arg)
    .then(res=>{
      wx.showModal({
        title: res.data.msg,
      })
    })
    .catch(err=>{})
  },

  /**
   * 加载用户信息
   * @param {*} e 
   */
  loadUserInfo: function () {
    var that = this
    Request.get("/user/getUserInfo")
    .then(res=>{
      that.setData({
        id: res.data.data.id,
        username: res.data.data.userName,
        number: res.data.data.number,
        tel: res.data.data.tel,
        email: res.data.data.email
      })
    })
    .catch(err=>{})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadUserInfo()
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