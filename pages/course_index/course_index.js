// pages/course_index/course_index.js
// 获取全局实例
const app = getApp()
const base_url = app.globalData.base_url
// 学生输入得课程码
var conrseCode = ""

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
    cur_course_id:-1,
    model_title:'标题',
    // 输入框类型 用于区分操作 0 加入课程 1 签到码
    input_type:0
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
    var that = this
    // 获取课程ID
    var courseId =  e.currentTarget.dataset.courseid
    console.log(courseId)
    wx.showActionSheet({
      itemList: ['签到','请假', '退出班级'],
      itemColor: '#ef9ba8',
      success(res) {
        if (res.tapIndex === 0) {
          console.log('点击了签到')
          // 弹出输入签到码
          that.setData({
            // 弹出输入框
            hiddenmodalputSign: false,
            // 设置标题
            model_title:'请输入签到码',
            // 操作类型
            input_type:1
          })
        }
        // 请假
        if (res.tapIndex === 1) {
            // 跳转请假页面
        }
        // 退出班级
        if(res.tapIndex === 2) {
          console.log('点击了退出班级');
          // 弹出框
          wx.showModal({
            title: '提示',
            content: '是否退出班级',
            success: function (res) {
              if (res.confirm) {
                console.log('退出班级')
                // 执行网络请求 将学生和课程解除绑定
                that.quitCourse(courseId)
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
  myclassManage: function(e) {
    var that = this
    // 获取课程ID
    var courseId =  e.currentTarget.dataset.courseid
    wx.showActionSheet({
      itemList: ['发起签到', '解散班级'],
      itemColor: '#ef9ba8',
      success(res) {
        if (res.tapIndex === 0) {
          // 发起签到   两种方式：1. 跳转签到界面 2. 直接发起签到 用户接收签到通知
        }
        if(res.tapIndex === 1) {
          // 解散班级
          wx.showModal({
            title: '提示',
            content: '是否解散班级',
            success: function (res) {
              if(res.confirm) {
                that.dismissCourse(courseId)
                console.log(courseId)
              }else if (res.cancel) {
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
            model_title:'请输入课程码',
            // 设置操作类型 用于区分网络请求
            input_type:0
          })
        }
        if (res.tapIndex === 1) {
          // 跳转到创建课程界面
          console.log('点击了创建课程');
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
    if(input_type === 0) {
        // 加入课程方法
        this.joinCourse(e)
    }
    if (input_type === 1) {
      // 输入签到码 
      this.inputSign(e)
    }
    // 取消数据输入框
    this.addCourseConfirmCancel(e)
  },

/********************************网络相关************************************/

/**
 * 学生退出课程
 * @param {*} e 
 */
quitCourse:function(courseId) {
  var that = this
  var stuId = 10
  wx.request({
    url: base_url + "courseStudent/quitClass/" + stuId + "/" + courseId,
    success: function (res) {
      // 重新加载数据
      that.loadCourse();
    },
    fail:function(e) {
      wx.showToast({
        title: '网络故障',
        icon: 'none'
      })
    },
    complete: function(e) {
      var msg = (e.data.data === 0) ? '退出班级失败' : '退出班级成功'
      var icon = (e.data.data === 0) ? 'none' : 'success'
      wx.showToast({
        title: msg,
        icon: icon
      })
    }
  })
},

/**
 * 教师解散课程
 * @param {*} e 
 */
dismissCourse:function(courseId) {
  var that = this
  var icon = 'none'
  wx.request({
    url: base_url + "courseStudent/dismissCourse/" + courseId,
    success:function(e) {
      icon = 'success'
      // 重新加载数据
      that.loadCourse()
    },
    fail : function(e) {
      console.log(e)
    },
    complete: function(e) {
      // 弹出提示框
      wx.showToast({
        title: e.data.msg,
        icon: icon
      })
    }
  })
},

/**
 * 加入课程方法 网络请求
 * @param {*} e 
 */
joinCourse: function(e) {
  var that = this
  var userId  = 10
    wx.request({
      url: base_url + "courseStudent/addCourse/" + userId + "/" + that.data.input_value,
      success: function (res) {
        // 刷新主页数据
        that.loadCourse()
      },
      fail: function (e) {
        wx.showToast({
          title: '网络故障',
          icon: 'none'
        })
      },
      complete: function (e) {
        // 控制样式
        var icon = (e.data.data === false) ? 'none' : 'success'
        wx.showToast({
          title: e.data.msg,
          icon: icon
        })
      }
    })
  },

/**
 * 签到 网络请求
 * @param {*} e 
 */
inputSign:function(e) {
  // 此处应该是全局用户ID 暂未实现 固定死
  var userId = 10
  var that = this
  wx.request({
    url: base_url + "courseStudent/addCourse/" + userId + "/" + that.that.input_value,
    success: function (res) {
      if (res.data.data === false) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'success'
        })
        // 刷新主页数据
      }
      console.log(res)
    },
    fail: function (e) {
      console.log(e)
    },
    complete: function (e) {}
  })
},

/**
 * 获取课程（我的课程/我听得课程）
 */
  loadCourse: function () {
    var that = this
    // 加载课程信息
    var userId = 10
    wx.request({
      url: base_url + "course/getCourse/" + 0 + "/" + userId,
      method: 'GET',
      // 成功执行
      success: function (res) {
        var myCourse = app.resReslove(res)
        // 解析数据
        that.setData({
          my_course: myCourse.stuCourse,
          lis_course: myCourse.teachCourse
        })
        console.log(myCourse)
      },
      // 失败执行
      fail: function (err) {
        console.log(err)
      },
      // 成功失败都会执行
      complete: function (res) {

      }
    })
  },





















  /****************************声明周期方法***********************/



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCourse()
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