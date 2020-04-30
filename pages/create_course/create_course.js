// pages/create_Course/create_Course.js
// 获取全局实例
const app = getApp()
const base_url = app.globalData.base_url
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  createCourse:function(data) {
    var userId = app.globalData.userInfo.id;
    wx.request({
      url: base_url + "course/addCourse",
      method:'POST',
      data: {
        teacherId:userId,
        className:data.detail.value.className,
        courseName: data.detail.value.courseName,
        teacherName: data.detail.value.teacherName,
        courseDescription:data.detail.value.courseDesc
      },
      complete:function(res) {
        wx.showModal({
          title:res.data.msg
        })
      }
    })
    data.detail.value.courseName
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