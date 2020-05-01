// pages/student_Attendance_Record/student_Attendance_Record.js
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

    signRecord: []
    // // 课程名称
    // courseName: '',
    // // 签到时间
    // startSign: '',
    // // 签离时间
    // endSign: ''

  },


  /**
   * 获取签到记录
   * @param {*} e 
   */
  loadSignHistory: function (e) {
    var that = this
    Request.get("/signIn/getSignCords")
    .then(res=>{
        // 解析数据
        var data = res.data.data
        console.log(data)
        var tmp = []
        for (var i = 0; i < data.length; i++) {
          var tmp_data = {
            courseName: data[i].courseName == null ? "暂无数据" : data[i].courseName,
            startSign: data[i].startSignIn == null ? "暂无数据" : time.formatTime(new Date(data[i].startSignIn)),
            endSign: data[i].endSignIn == null ? "尚未签离" : time.formatTime(new Date(data[i].endSignIn))
          }
          tmp.push(tmp_data)
        }
        that.setData({
          signRecord: tmp
        })
    })
    .catch(err=>{})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadSignHistory()
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