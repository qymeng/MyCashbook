// pages/settings/settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:0.00,
    week:0.00,
    month:0.00
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //读首页数据
    var pages = getCurrentPages();
    var homePage = pages[0];
    var that = this;
    this.setData({
      day:homePage.data.dailyBudget,
      week: homePage.data.weeklyBudget,
      month:homePage.data.monthlyBudget
    });
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

  },
  accept:function(){
    //写回首页
    var pages = getCurrentPages();
    var homePage = pages[0];
    var that=this;
    homePage.setData({ dailyBudget:that.data.day,
      weeklyBudget:that.data.week,
      monthlyBudget:that.data.month});
    wx.navigateBack({
      delta: 1
    });
  },
  cancel:function(){
    wx.navigateBack({
      delta:1
    });
  },
  setDay:function(e){
    this.setData({
      day: +e.detail.value+0.00
    })
  },
  setWeek:function(e){
    this.setData({
      week: +e.detail.value + 0.00
    })
  },
  setMonth:function(e){
    this.setData({
      month: +e.detail.value + 0.00
    })
  }
})