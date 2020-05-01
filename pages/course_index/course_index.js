// pages/course_index/course_index.js
// 获取全局实例
const app = getApp()
// 引入模块
const Request = require("../../utils/request")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 0,
    list: ['我听的课', '我教的课'],
    // 我的课程
    my_course: [],
    // 我听的课
    lis_course: [],
    // 是否显示输入弹出框 输入班级码
    hiddenmodalput: true,
    // 当前选择的学生课程ID
    curStuCourseId: -1,
    // 当前选择的教师课程ID
    curTeachCourseId: -1,
    model_title: '标题',
    // 输入框类型 用于区分操作 0 加入课程 1 签到码 2签离码
    input_type: 0
  },

  /****************************************页面逻辑操作*****************************************/

  /**
   * tab标签选择
   * tab框
   */
  selected: function (e) {
    let that = this
    console.log(e)
    let index = e.currentTarget.dataset.index
    console.log("index", index)
    if (index == 0) {
      that.setData({
        selected: 0
      })
    } else if (index == 1) {
      that.setData({
        selected: 1
      })
    } else {
      that.setData({
        selected: 2
      })
    }
  },

  /**
   *  课程管理 弹出菜单    我听得课程
   */
  classManage: function (e) {
    // 获取选择的课程ID
    this.data.curStuCourseId = e.currentTarget.dataset.courseid
    //  var  signCode= this.data.input_value
    var that = this
    wx.showActionSheet({
      itemList: ['签到', '签离', '请假', '退出班级'],
      itemColor: '#ef9ba8',
      success(res) {
        if (res.tapIndex === 0) {
          console.log('点击了签到')
          // 弹出输入签到码
          that.setData({
            // 弹出输入框
            hiddenmodalput: false,
            // 设置标题
            model_title: '请输入签到码',
            // 操作类型
            input_type: 1
          })
        }
        // 签离
        if (res.tapIndex === 1) {
          // 跳转请假页面
          console.log('点击了签离开')
          // 弹出输入签到码
          that.setData({
            // 弹出输入框
            hiddenmodalput: false,
            // 设置标题
            model_title: '请输入签离码',
            // 操作类型
            input_type: 2
          })
        }
        // 请假
        if (res.tapIndex === 2) {
          // 跳转请假页面
          console.log('点击了请假')
        }
        // 退出班级
        if (res.tapIndex === 3) {
          console.log('点击了退出班级');
          // 弹出框
          wx.showModal({
            title: '提示',
            content: '是否退出班级',
            success: function (res) {
              if (res.confirm) {
                console.log('退出班级')
                // 执行网络请求 将学生和课程解除绑定
                that.quitCourse(that.data.curStuCourseId)
              } else if (res.cancel) {
                console.log('取消退出班级')
              }
            }
          })
        }
      }
    })
  },


  /**
   * 我教得课程管理
   * @param {*} e 
   */
  myclassManage: function (e) {
    var that = this
    var arg = {
      // 课程ID
      courseId: e.currentTarget.dataset.courseid,
      // 签到码
      signCode: this.data.input_value
    }
    wx.showActionSheet({
      itemList: ['发起签到', '结束签到', '解散班级'],
      itemColor: '#ef9ba8',
      success(res) {
        if (res.tapIndex === 0) {
          // 发起签到   两种方式：1. 跳转签到界面 2. 直接发起签到 用户接收签到通知
          that.teachSign(arg)
        }
        // 结束签到
        if (res.tapIndex === 1) {
          that.teachEndSign(arg)
        }
        // 解散班级
        if (res.tapIndex === 2) {
          // 解散班级
          wx.showModal({
            title: '提示',
            content: '是否解散班级',
            success: function (res) {
              if (res.confirm) {
                that.dismissCourse(arg)
              } else if (res.cancel) {
                console.log('取消解散班级')
              }
            }
          })
        }
      }
    })
  },

  /**
   * 加号按钮
   * @param {*} e 
   */
  openActionsheet: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ['加入课程', '创建课程'],
      itemColor: '#ef9ba8',
      success(res) {
        console.log(res.tapIndex);
        if (res.tapIndex === 0) {
          // 输入课程码 网络请求绑定课程
          console.log('点击了加入课程');
          // 弹出课程码输入框
          that.setData({
            // 弹出输入框
            hiddenmodalput: false,
            // 设置标题
            model_title: '请输入课程码',
            // 设置操作类型 用于区分网络请求
            input_type: 0
          })
        }
        if (res.tapIndex === 1) {
          // 跳转到创建课程界面
          console.log('点击了创建课程');
          wx.navigateTo({
            url: '/pages/create_course/create_course',
          })
        }
        if (res.tapIndex === 2) {
          console.log('点击了取消');
        }
      }
    })
  },


  /******************************************modal相关操作*************************************/

  // 获取输入框 课程码 modal
  getInputCurseCode: function (e) {
    // 获取输入值
    this.data.input_value = e.detail.value
  },

  // 班级码取消按钮 modal
  addCourseConfirmCancel: function (e) {
    this.setData({
      hiddenmodalput: true
    })
  },

  // 确定添加课程按钮 modal
  addCourseConfirm: function (e) {
    // 使用Input_type区分操作类型
    var input_type = this.data.input_type
    // 获取当前所操作课程的ID
    var curCourseId = this.data.curStuCourseId
    if (input_type === 0) {
      // 加入课程方法
      this.joinCourse(e)
    }
    if (input_type === 1) {
      // 输入签到码 
      var arg = {
        courseId: curCourseId,
        // 获取当前输入值
        signCode: this.data.input_value
      }
      this.stuSign(arg)
    }
    if (input_type === 2) {
      // 签离
      var arg = {
        courseId: curCourseId,
        signCode: this.data.input_value
      }
      this.stuEndSign(arg)
    }
    // 取消数据输入框
    this.addCourseConfirmCancel(e)
  },

  /********************************网络相关************************************/

  /**
   * 教师发起签到
   * @param {*} e 
   */
  teachSign: function (arg) {
    Request.get("/courseSignIn/startSignIn/" + arg.courseId)
      .then(res => {
        wx.showModal({
          title: '签到码',
          content: res.data.msg
        })
      })
      .catch(err => {
        wx.showModal({
          title: '错误！',
          content: res.data.msg
        })
      })
  },

  /**
   * 教师发起结束签到
   * @param {}} e 
   */
  teachEndSign: function (arg) {
    Request.get("/courseSignIn/endSignIn/" + arg.courseId)
      .then(res => {
        wx.showModal({
          title: '签离码',
          content: res.data.msg
        })
      })
      .catch(err => {
        wx.showModal({
          title: '错误！',
          content: res.data.msg
        })
      })
  },

  /**
   * 学生签到 网络请求
   * @param {*} e 
   */
  stuSign: function (arg) {
    console.log(arg)
    Request.get("/signIn/signIn/" + arg.courseId + "/" + arg.signCode)
      .then(res => {
        wx.showModal({
          title: res.data.msg
        })
      })
      .catch(err => {})
  },

  /**
   * 学生签离
   * @param {*} e 
   */
  stuEndSign: function (arg) {
    Request.get("/signIn/endSign/" + arg.courseId + "/" + arg.signCode)
      .then(res => {
        // 弹出框
        wx.showModal({
          title: res.data.msg
        })
      })
      .catch(err => {})
  },

  /**
   * 加入课程方法 网络请求
   * @param {*} e 
   */
  joinCourse: function (e) {
    var that = this
    Request.get("/courseStudent/addCourse/" +  that.data.input_value)
      .then(res => {
        // 刷新主页数据
        that.loadCourse()
        wx.showToast({
          title: res.data.msg
        })
      })
      .catch(err => {})
  },

  /**
   * 学生退出课程
   * @param {*} e 
   */
  quitCourse: function (courseId) {
    var that = this
    Request.get("/courseStudent/quitClass/" + courseId)
      .then(res => {
        // 重新加载数据
        that.loadCourse();
        var msg = (res.data.data === 0) ? '退出班级失败' : '退出班级成功'
        var icon = (res.data.data === 0) ? 'none' : 'success'
        wx.showToast({
          title: msg,
          icon: icon
        })
      })
      .catch(err => {})
  },

  /**
   * 教师解散课程
   * @param {*} e 
   */
  dismissCourse: function (arg) {
    var that = this
    Request.get("/courseStudent/dismissCourse/" + arg.courseId)
      .then(res => {
        // 重新加载数据
        that.loadCourse()
        // 弹出提示框
        wx.showToast({
          title: res.data.msg
        })
      })
      .catch(err => {})
  },




  /**
   * 获取课程（我的课程/我听得课程）
   */
  loadCourse: function () {
    var that = this
    // 加载课程信息
    Request.get("/course/getCourse/" + 0)
      .then(res => {
        var myCourse = app.resReslove(res)
        // 解析数据
        that.setData({
          my_course: myCourse.stuCourse,
          lis_course: myCourse.teachCourse
        })
      })
      .catch(err => {})
  },





















  /****************************声明周期方法***********************/



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadCourse()
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