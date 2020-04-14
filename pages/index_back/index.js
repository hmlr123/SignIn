
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput1: true,
    hiddenmodalput2: true,
    user :{
      id:"",
      userName: "",
      number:"",
      role:"",
      tel:"",
      email:"",
      password:""
    },
    sname: "",
    snum: "",
    tname: "",
    tnum: "",
  },
  //点击按钮弹出指定的hiddenmodalput弹出框
  modalinput1: function (e) {
    if (e.detail.userInfo) {
      this.setData({
        hiddenmodalput1: !this.data.hiddenmodalput1,
      });
    } else {
      wx.showToast({
        title: '需要授权哦！',
        icon: 'none'
      });
    }
  },
  modalinput2: function (e) {
  if(e.detail.userInfo){
    this.setData({
      hiddenmodalput2: !this.data.hiddenmodalput2,
    })
  } else {
    wx.showToast({
      title: '需要授权哦！',
      icon: 'none'
    });
  }
    
  },
  goLesson: function () {
    wx.navigateTo({ url: '../lesson/lesson' })
  },
  //取消按钮
  cancel1: function () {
    this.setData({
      hiddenmodalput1: true,
    });
  },
  cancel2: function () {
    this.setData({
      hiddenmodalput2: true,
    });
  },
  //确认
  confirm1: function (e) {
    var that = this;
    this.setData({
      hiddenmodalput1: true,
    })
    if ((that.data.sname && that.data.snum)!='') {
      var userid = wx.getStorageSync('openid');
      console.log("userid1:"+userid);
      wx.request({
        url: 'https://newCourse.hmlr123.com/user/register',
        data: {
          id: userid,
          userName: that.data.sname,
          number: that.data.snum,
          role: 0
        },
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function (res) {
            wx.showToast({
              title: '注册成功！',
              icon: 'success'
            })
          wx.setStorageSync("identify", "student");
          wx.switchTab({
            url: '/pages/student_index/student_index'
          });
            
        },
        fail: function (res) {
          console.log("学生注册失败");
        },
        complete: function (res) { 
          wx.switchTab({
            url: '/pages/student_index/student_index'
          });
        },
      })
    } else {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    }
    wx.switchTab({
      url: '/pages/student_index/student_index'
    });
  },
  confirm2: function (e) {
    var that = this;
    this.setData({
      hiddenmodalput2: true,
    })
    // ！
    if ((that.data.tname && that.data.tnum) == '') {
      var userid = wx.getStorageSync('openid');
      wx.request({
        url: 'https://newCourse.hmlr123.com',
        data: {
          id: userid,
          userName: that.data.sname,
          number: that.data.snum,
          role: 0
        },
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function (res) {
            wx.showToast({
              title: '注册成功！',
              icon: 'success'
            })
          wx.setStorageSync("identify", "teacher");
          wx.switchTab({
            url: '/pages/student_index/student_index'
          });
        },
        fail: function (res) {
          console.log("老师注册失败");
        },
        complete: function (res) { },
      })
      this.setData({
        tname: "",
        tnum: "",
      })
    } else {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    }
  },

  //获取input的信息
  setname: function (e) {
    this.setData({ sname: e.detail.value })
  },
  setnum: function (e) {
    this.setData({ snum: e.detail.value })
  },
  setlesson: function (e) {
    this.setData({ tname: e.detail.value })
  },
  setclass: function (e) {
    this.setData({ tnum: e.detail.value })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var identify = wx.getStorageSync("identify");
    if(identify=='student'||identify=='teacher'){
      console.log("identify:" + identify);
      console.log("已注册用户停留在注册页面，跳转失败"); 
    }
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
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
    this.setData({
      hiddenmodalput: true
    })

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