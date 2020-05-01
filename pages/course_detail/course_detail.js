// pages/course_detail/course_detail.js
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
    teacherId: '',
    teacherName: '',
    courseName: '',
    courseDetails: '',
    courseDescription: ''
  },



  /************************************网络***************************************/
  loadCourseInfo: function (courseId) {
    var that = this
    Request.get("/course/getCourseByCourseId/" + courseId)
    .then(res=>{
      var data = res.data.data
      that.setData({
        id: data.id,
        teacherId: data.teacherId,
        teacherName: data.teacherName,
        courseName: data.courseName,
        courseDetails: data.courseDetails,
        courseDescription: data.courseDescription
      })
    })
    .catch(err=>{})
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载课程信息
    console.log(options.courseId)
    this.loadCourseInfo(options.courseId)
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