// pages/addRecords/addRecords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectName0: ['食物', '饮品', '交通', '购物', '娱乐'],
    selectName1: ['居家', '数码', '医药', '其他', '收入'],
    selectIcon0: ['fa-cutlery', 'fa-coffee', 'fa-bus', 'fa-credit-card', 'fa-gamepad'],
    selectIcon1: ['fa-home', 'fa-tablet', 'fa-plus-square', 'fa-tags', 'fa-smile-o'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      check: false
    });
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