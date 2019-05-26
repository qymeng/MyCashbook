// pages/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //本地用户文件名
    fileName: "data.txt",
    //本地用户文件路径
    myPath: "",
    //6个具体参数
    dailyUsed: 70,
    weeklyUsed: 300,
    monthlyUsed: 800,
    dailyBudget: 100,
    weeklyBudget: 500,
    monthlyBudget: 2000,
    //*测试量
    _test: 0,
    //三个柱状图高度
    dayHeight: 0,
    weekHeight: 0,
    monthHeight: 0,
    //页面参数
    windowHeight: 0,
    histogramHeight: 450,
    menuHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('--- Page "homepage" onLoad ---')
    var that = this;
    this.setData({
      myPath: `${wx.env.USER_DATA_PATH}/${that.data.fileName}`
    });
    console.log('本地用户文件路径', this.data.myPath);
    this.readData();
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      },
    });
    this.setData({
      menuHeight: this.data.windowHeight - this.data.histogramHeight
    });
    console.log('页面总高度:', this.data.windowHeight, 'px');
    console.log('菜单高度:', this.data.menuHeight, 'px');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('--- Page "homepage" onShow ---')
    this.setData({
      dayHeight: 100 - this.data.dailyUsed * 100 / this.data.dailyBudget,
      weekHeight: 100 - this.data.weeklyUsed * 100 / this.data.weeklyBudget,
      monthHeight: 100 - this.data.monthlyUsed * 100 / this.data.monthlyBudget
    });
    console.log('dayHeight:', this.data.dayHeight);
    console.log('weekHeight:', this.data.weekHeight);
    console.log('monthHeight:', this.data.monthHeight);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //6个数据的读写
  writeData: function() {
    var fsm = wx.getFileSystemManager();
    var data = this.data;
    var saveString = data.dailyUsed + " " + data.weeklyUsed + " " + data.monthlyUsed + " " + data.dailyBudget + " " + data.weeklyBudget + " " + data.monthlyBudget;

    fsm.writeFile({
      filePath: data.myPath,
      data: saveString,
      encoding: "utf8",
      success: function() {
        console.log('writeData(): "写入数据成功"');
      },
      fail: function() {
        console.log('writeData(): "写入数据失败"')
      }
    });
  },

  readData: function() {
    var fsm = wx.getFileSystemManager();
    var that = this;
    var data = this.data;

    fsm.access({
      path: this.data.myPath,
      success: function() {
        console.log('readData(): "success，本地用户文件存在"');
        fsm.readFile({
          filePath: data.myPath,
          success: function(obj) {
            var buffer = String.fromCharCode.apply(null, new Uint8Array(obj.data)).split(" ", 6);
            that.setData({
              _test: +buffer[0],
              dailyUsed: +buffer[0],
              weeklyUsed: +buffer[1],
              monthlyUsed: +buffer[2],
              dailyBudget: +buffer[3],
              weeklyBudget: +buffer[4],
              monthlyBudget: +buffer[5]
            });
          }
        });
      },
      fail: function() {
        console.log('readData(): "failure，将新建本地用户文件"');
        that.writeData();
      }
    });
  },


  //两个测试函数
  onClickButton: function() {
    var fsm = wx.getFileSystemManager();
    var newDayUsed = this.data.dayUsed;

    var that = this;

    fsm.access({
      path: this.data.myPath,
      success: function() {
        console.log("success");
        that.setData({
          dayUsed: newDayUsed + 1
        });
      },
      fail: function() {
        console.log("failure");
        that.setData({
          dayUsed: newDayUsed + 2
        });
      },
      complete: this.writeData
    });


  },

  onClickButton2: function() {
    this.readData();
  },

  //一系列跳转操作
  navtoDay: function() {
    wx.navigateTo({
      url: '/pages/dailyBudget/dailyBudget',
    });
  },

  navtoWeek: function() {
    wx.navigateTo({
      url: '/pages/weeklyBudget/weeklyBudget',
    });
  },

  navtoMonth: function() {
    wx.navigateTo({
      url: '/pages/monthlyBudget/monthlyBudget',
    });
  },

  navtoAnalysis: function() {
    wx.navigateTo({
      url: '/pages/analysis/analysis',
    });
  },

  navtoAddRecords: function() {
    wx.navigateTo({
      url: '/pages/addRecords/addRecords',
    });
  },

  navtoSettings: function() {
    wx.navigateTo({
      url: '/pages/settings/settings',
    });
  }
})