// pages/notice_detail/notice_detail.js
// 获取全局实例
const app = getApp()
// 引入模块
const Request = require("../../utils/request")
// 时间工具类
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: ''
  },

  getNoticeAndUpdateFlag: function (uuid) {
    var that = this
    Request.get("/notice/userRead/" + uuid)
      .then(res => {
        console.log(res)
        res.data.data.publishTime = time.formatTime(new Date((res.data.data.publishTime)))
        that.setData({
          notice: res.data.data
        })
        // 将消息存储在本地
        wx.setStorage({
          data: res.data.data,
          key: 'my_message',
        })
      })
      .catch(err => {})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoticeAndUpdateFlag(options.uuid)
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