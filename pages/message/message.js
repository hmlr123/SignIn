// pages/message/message.js
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
    myMessage: []
  },

  openSocket() {
    //打开时的动作
    wx.onSocketOpen(() => {
      console.log('WebSocket 已连接')
      app.globalData.socketStatus = 'connected';
      this.sendMessage();
    })
    //断开时的动作
    wx.onSocketClose(() => {
      console.log('WebSocket 已断开')
      app.globalData.socketStatus = 'closed'
    })
    //报错时的动作
    wx.onSocketError(error => {
      console.error('socket error:', error)
    })
    // 监听服务器推送的消息
    wx.onSocketMessage(message => {
      //把JSONStr转为JSON
      // message = message.data.replace(" ", "");
      // if (typeof message != 'object') {
      //   message = message.replace(/\ufeff/g, ""); //重点
      //   var jj = JSON.parse(message);
      //   message = jj;
      // }
      console.log("【websocket监听到消息】内容如下：");
      console.log(message);
    })
    // 打开信道
    wx.connectSocket({
      url: "ws://" + "localhost" + ":8888/wx/asset/" + app.globalData.token,
    })
  },

  //关闭信道
  closeSocket() {
    if (this.globalData.socketStatus === 'connected') {
      wx.closeSocket({
        success: () => {
          this.globalData.socketStatus = 'closed'
        }
      })
    }
  },

  //发送消息函数
  sendMessage() {
    if (app.globalData.socketStatus === 'connected') {
      //自定义的发给后台识别的参数 ，我这里发送的是name
      wx.sendSocketMessage({
        data: app.globalData.token
      })
    }
  },

  loadMessage: function () {
    var that = this
    // 加载本地数据
    var localMessage = wx.getStorage({
      key: 'my_message',
    })
    Request.get("/notice/getNotices")
      .then(res => {
        console.log(res.data.data)
        var message = []
        if (null != res.data.data && "" != res.data.data) {
          message.push(res.data.data)
          // 时间数据转换
          for(var i = 0; i< message[0].length;i++) {
            message[0][i].publishTime = time.formatTime(new Date(message[0][i].publishTime))
          }
        }
        if (null != localMessage && "" != localMessage) {
          message.push(localMessage)
        }
        console.log(message)
        that.setData({
          myMessage: message[0]
        })
      })
      .catch(err => {})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 暂不使用WebSocket实现
    // this.openSocket()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loadMessage()
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