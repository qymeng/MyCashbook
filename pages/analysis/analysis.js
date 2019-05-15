// pages/analysis/analysis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expItemName:["食  物","饮  品","交  通","购  物","娱  乐","居  家","数  码","医  药","其  他"],
    expVal:[627.60,83.00,6.00,129.00,97.20,12.30,29.90,0.00,28.00],
    expDigit: [627.6, 83.0, 6, 129, 97.2, 12.3, 29.9, 0, 28],
    income:1995,
    incomeDigit:1995,
    selectYear:"2019",
    selectMonth:"05",
    _test:"0.0000"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = [];
    var idgt = this.data.income.toFixed(2);
    for(var i=0;i<this.data.expVal.length;i++){
      arr[i] = this.data.expVal[i].toFixed(2);
    }
    this.setData({ expDigit: arr, incomeDigit: idgt});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var context = wx.createCanvasContext('pieChart')
    // 画饼图        //    数据源        
    var array = [20, 30, 40, 50];
    var colors = ["#ff0000", "#ffff00", "#0000ff", "#00ff00", "#ff0000", "#ffff00", "#0000ff", "#00ff00", "#ff0000", "#ffff00", "#0000ff", "#00ff00"];
    var total = 0;        //    计算总量        
    for (var index = 0; index < this.data.expItemName.length; index++) {
      total += this.data.expVal[index];
    }
    //    定义圆心坐标        
    var point = { x: 150, y: 150 };
    //    定义半径大小  
    var radius1 = 80;  
    var radius2 = 120;
    var radius3 = 135; 
    //循环遍历所有的pie
    for (var i = 0; i < this.data.expItemName.length; i++) {
    //for (var i = 1; i < 2; i++) {
      context.beginPath();
      //    	起点弧度            
      var start = 0;
      if (i > 0) {                // 计算开始弧度是前几项的总和，即从之前的基础的上继续作画                
        for (var j = 0; j < i; j++) {
          start += this.data.expVal[j] / total * 2 * Math.PI;
        }
      }
      console.log("i:" + i);
      console.log("start:" + start);
      console.log("rad:" + this.data.expVal[i] / total * 2 * Math.PI);
      var end = start + this.data.expVal[i] / total * 2 * Math.PI;
      //      1.先做第一个pie            
      //   	2.画一条弧，并填充成三角饼pie，前2个参数确定圆心，第3参数为半径，第4参数起始旋转弧度数，第5参数本次扫过的弧度数，第6个参数为时针方向-false为顺时针            
      context.arc(point.x, point.y, radius2, start, end, false);      
      context.lineTo(point.x + Math.cos(end) * radius1, point.y + Math.sin(end) * radius1);
      context.arc(point.x, point.y, radius1, end, start, true);
      context.setFillStyle(colors[i]);
      //      5.填充动作            
      context.fill();
      context.closePath();
      var perc = (end - start) / Math.PI / 2;
      if (perc>0.02){
        var textPos=(end+start)/2;
        context.setFontSize(8);
        context.setFillStyle("#000");
        context.fillText(this.data.expItemName[i], point.x + Math.cos(textPos) * radius3-10, point.y + Math.sin(textPos) * radius3-5);
        context.fillText((perc*100).toFixed(2)+"%", point.x + Math.cos(textPos) * radius3 - 10, point.y + Math.sin(textPos) * radius3 + 5);
      }
    }
    context.setFontSize(22);
    context.setFillStyle("#000");
    context.fillText("总支出", point.x - 35, point.y-10);
    context.fillText("￥" + (total).toFixed(2), point.x - ("￥" + (total).toFixed(2)).length*7, point.y + 20);
    //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为    
    wx.drawCanvas({
      //指定canvasId,canvas 组件的唯一标识符            
      canvasId: 'pieChart',
      actions: context.getActions()
    });
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
  _testbutton: function () {
  },
  bindPickerChange: function (e) {
    var p = e.detail.value;
    console.log(p);
    this.setData({
      selectYear: p.substr(0,4),
      selectMonth: p.substr(5, 2)
    });
  }
})