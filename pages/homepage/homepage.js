// pages/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileName : "0.txt",
    myPath: "",
    dailyBudget: 100,
    weeklyBudget: 500,
    monthlyBudget: 2000,
    dayUsed: 0,
    weekUsed: 0,
    monthUsed: 0,
    _test: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({ myPath: `${wx.env.USER_DATA_PATH}/${that.data.fileName}` });
    this.readData();
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

  writeData:function(){
    var fsm = wx.getFileSystemManager();
    var data = this.data;
    var savString=data.dayUsed+" "+data.weekUsed+" "+data.monthUsed+" "+data.dailyBudget+" "+data.weeklyBudget+" "+data.monthlyBudget;
    fsm.writeFile({ filePath: this.data.myPath, data: savString, encoding: "utf8" });
  },
  readData: function () {
    var fsm = wx.getFileSystemManager();
    var that=this;
    fsm.access({
      path: this.data.myPath, success: function () {
        fsm.readFile({
          filePath: that.data.myPath, success: function (obj) {
            console.log(obj.data);
            var tempStr = String.fromCharCode.apply(null, new Uint8Array(obj.data)).split(" ", 6);
            that.setData({
              _test: +tempStr[0], dayUsed: +tempStr[0], weekUsed: +tempStr[1], monthUsed: +tempStr[2],
              dailyBudget: +tempStr[3], weeklyBudget: +tempStr[4], monthlyBudget: +tempStr[5]
            });
          }
        });
      },
      fail: function () {
        console.log("failure");
        that.writeData();
      }
    });
    

  },


  onClickButton: function(){
    var fsm= wx.getFileSystemManager();
    var newDayUsed=this.data.dayUsed;
    
    var that=this;

    fsm.access({path: this.data.myPath,success:function(){
      console.log("success");
      that.setData({ dayUsed: newDayUsed+1 });
    },
    fail:function(){
      console.log("failure");
      that.setData({ dayUsed: newDayUsed + 2 });
    },
    complete:this.writeData
    });
    
    
  },

  onClickButton2: function () {
    this.readData();
  },
  
  navtoAnalysis: function () {
    wx.navigateTo({
      url: '/pages/analysis/analysis',
    })
  },
  navtoDay: function () {
    wx.navigateTo({
      url: '/pages/dailyBudget/dailyBudget',
    })
  },
  navtoWeek: function () {
    wx.navigateTo({
      url: '/pages/weeklyBudget/weeklyBudget',
    })
  },
  navtoMonth: function () {
    wx.navigateTo({
      url: '/pages/monthlyBudget/monthlyBudget',
    })
  },
  navtoSettings: function () {
    wx.navigateTo({
      url: '/pages/settings/settings',
    })
  }
})