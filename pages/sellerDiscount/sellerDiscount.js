// pages/sellerDiscount/sellerDiscount.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkNo: '',
    parkName: '',
    carNo: '',
    sellerDiscount: {},
    currCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.setData({
      parkNo: res.parkNo,
      parkName: res.parkName,
      carNo: res.carNo,
      currCount: res.currCount
    });

    my.setNavigationBar({
      title: '商家优惠',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var userid = app.globalData.userid
    var parkNo = that.data.parkNo
    var carNo = that.data.carNo
    that.setData({
      currCount: 0
    })
    console.log("parkNo：", parkNo)
    console.log("carNo：", carNo)
    my.httpRequest({
      url: app.globalData.url + '/zfb/sellerDiscount/userid/' + userid + '/parkNo/' + encodeURI(parkNo) + '/carNo/' + encodeURI(carNo),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/w-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data.data)
        if(res.data != '') {
          that.setData({
            sellerDiscount: res.data.data
          })
        } else {
          that.setData({
            sellerDiscount: ''
          })
        }
      }
    })
  },

  /**
   * 监听文本框输入
   */
  carNoInput: function(e) {
    var carNo = e.detail.value;
    this.setData({
      carNo: carNo
    })
  },

  /**
   * 加号（+）
   */
  add(event) {
    var remainDiscount = this.data.sellerDiscount.remainDiscount;//剩余优惠券
    var data = event.target.dataset;
    console.log("add触发事件：", data);
    var currCount = data.currCount;
    if(currCount < remainDiscount) {
      currCount = parseInt(currCount + 1);
      data.currCount = currCount;
      this.onLoad(data);
      console.log("add触发事件结束：", data);

      var that = this;
      var carNo = that.data.carNo;
      var parkNo = that.data.parkNo;
      var parkName = that.data.parkName;
      console.log("车牌号：", carNo);
      console.log("停车场编号：", parkNo);
      console.log("优惠券：", currCount);
    }
  },

  /**
   * 减号（-）
   */
  minus(event) {
    var data = event.target.dataset;
    console.log("minus触发事件：", data);
    var currCount = data.currCount;
    if (currCount > 0) {
      currCount = parseInt(currCount - 1);
      data.currCount = currCount;
      this.onLoad(data);
      console.log("minus触发事件结束：", data);

      var that = this;
      var carNo = that.data.carNo;
      var parkNo = that.data.parkNo;
      var parkName = that.data.parkName;
      console.log("车牌号：", carNo);
      console.log("停车场编号：", parkNo);
      console.log("优惠券：", currCount); 
    }
  },

  /**
   * 确定
   */
  makesure: function(e) {
    var that = this
    var userid = app.globalData.userid
    var parkNo = that.data.parkNo
    var parkName = that.data.parkName
    var carNo = that.data.carNo
    var currCount = that.data.currCount
    var remainDiscount = that.data.sellerDiscount.remainDiscount
    var minutes = that.data.sellerDiscount.minutes

    console.log("userid：", userid)
    console.log("当前车牌：", carNo)
    console.log("parkNo：", parkNo)
    console.log("parkName：", parkName)
    console.log("currCount：", currCount)
    console.log("剩余优惠券：", remainDiscount)
    console.log("抵扣时间：", minutes)

    if(currCount > 0) {
      my.httpRequest({
        url: app.globalData.url + '/zfb/sellerDiscount/userid/' + userid + '/parkNo/' + encodeURI(parkNo) + '/carNo/' + encodeURI(carNo) + '/currCount/' + currCount + '/minutes/' + minutes,
        method: 'GET',
        data: {},
        header: {
          "content-type": 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("调用查询record表中该车牌接口")
          remainDiscount = remainDiscount - currCount
          console.log("刷新页面，此时剩余优惠券：", remainDiscount)
          that.setData({
            remainDiscount: remainDiscount
          })
          console.log("进入优惠成功页面")
          my.navigateTo({
            url: '/pages/discountSuccess/discountSuccess?parkNo=' + parkNo + '&parkName=' + parkName + '&carNo=' + carNo,
          })
        }
      })
    }
  }
})