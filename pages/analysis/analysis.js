// pages/analysis/analysis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expItemName: ["食  物", "饮  品", "交  通", "购  物", "娱  乐", "居  家", "数  码", "医  药", "其  他"], //9个支出选项
    expVal: [627.60, 83.00, 6.00, 129.00, 97.20, 12.30, 29.90, 0.00, 28.00], //9个支出的值
    expDigit: [627.6, 83.0, 6, 129, 97.2, 12.3, 29.9, 0, 28], //用于存放对应支出值的字符串
    income: 1995, //收入单列
    incomeDigit: 1995,
    selectYear: "2019", //picker选择的年月
    selectMonth: "05",
    _test: "0.0000",
    flagChart: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //number转字符串，用于显示
    var arr = [];
    var idgt = this.data.income.toFixed(2);
    for (var i = 0; i < this.data.expVal.length; i++) {
      arr[i] = this.data.expVal[i].toFixed(2);
    }
    this.setData({
      expDigit: arr,
      incomeDigit: idgt
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (this.data.flagChart) {
      drawPieChart();
    } else {
      drawBarChart();
    }
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

  return: function() {
    wx.navigateBack({
      delta: 1
    });
  },

  switch: function() {
    this.setData({
      flagChart: !this.data.flagChart
    });
  },

  drawBarChart: function() {
    console.log('我在画柱状图');
  },


  drawPieChart: function() {
    console.log('我在画饼状图');
    //主要工作画饼图
    var context = wx.createCanvasContext('pieChart')
    // 画饼图 colors的前9个值表示9项支出的颜色
    var colors = ["#ff0000", "#ffff00", "#0000ff", "#00ff00", "#ff0000", "#ffff00", "#0000ff", "#00ff00", "#ff0000", "#ffff00", "#0000ff", "#00ff00"];
    var total = 0; //    计算总量，考虑加入data
    for (var index = 0; index < this.data.expItemName.length; index++) {
      total += this.data.expVal[index];
    }
    //圆心坐标
    var point = {
      x: 150,
      y: 150
    };
    //半径大小，分别为内圈、外圈、文字所在位置
    var radius1 = 80;
    var radius2 = 120;
    var radius3 = 135;

    for (var i = 0; i < this.data.expItemName.length; i++) {
      //对于每一项：
      context.beginPath();
      //起点弧度
      var start = 0;
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          start += this.data.expVal[j] / total * 2 * Math.PI;
        }
      }
      console.log("i:" + i);
      console.log("start:" + start);
      console.log("rad:" + this.data.expVal[i] / total * 2 * Math.PI);
      //终点弧度
      var end = start + this.data.expVal[i] / total * 2 * Math.PI;
      //顺时针画外圆
      context.arc(point.x, point.y, radius2, start, end, false);
      //连线到内圆
      context.lineTo(point.x + Math.cos(end) * radius1, point.y + Math.sin(end) * radius1);
      //逆时针画内圆
      context.arc(point.x, point.y, radius1, end, start, true);
      //填色
      context.setFillStyle(colors[i]);
      context.fill();
      context.closePath();

      //输出文字，
      var perc = (end - start) / Math.PI / 2;
      if (perc > 0.02) { //设置百分比阈值
        var textPos = (end + start) / 2;
        context.setFontSize(8);
        context.setFillStyle("#000");
        context.fillText(this.data.expItemName[i], point.x + Math.cos(textPos) * radius3 - 10, point.y + Math.sin(textPos) * radius3 - 5);
        context.fillText((perc * 100).toFixed(2) + "%", point.x + Math.cos(textPos) * radius3 - 10, point.y + Math.sin(textPos) * radius3 + 5);
      }
    }
    //输出圈内统计数据
    context.setFontSize(22);
    context.setFillStyle("#000");
    context.fillText("总支出", point.x - 35, point.y - 10);
    context.fillText("￥" + (total).toFixed(2), point.x - ("￥" + (total).toFixed(2)).length * 7, point.y + 20);

    //实际作画
    wx.drawCanvas({
      canvasId: 'pieChart',
      actions: context.getActions()
    });
  },

  _testbutton: function() {},
  bindPickerChange: function(e) { //picker改变之后的操作
    var p = e.detail.value;
    console.log(p);
    this.setData({
      selectYear: p.substr(0, 4),
      selectMonth: p.substr(5, 2)
    });
  }
})