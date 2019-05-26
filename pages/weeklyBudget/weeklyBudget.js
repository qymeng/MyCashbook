// pages/weeklyBudget/weeklyBudget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    budget: 0,
    used: 0,
    remaining: 0,
    budgetFixed: "",
    usedFixed: "",
    remainingFixed: "",
    type: "周",
    themeColor: "1db0b8"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('--- Page "weeklyBudget" onLoad ---');
    //加载homepage的数据
    var pages = getCurrentPages();
    var homePage = pages[0];
    var b = homePage.data.weeklyBudget;
    var u = homePage.data.weeklyUsed;
    var r = b - u;
    this.setData({
      budget: b,
      used: u,
      remaining: r,
      budgetFixed: b.toFixed(2),
      usedFixed: u.toFixed(2),
      remainingFixed: r.toFixed(2)
    });
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

  }
})