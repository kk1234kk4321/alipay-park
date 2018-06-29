const app = getApp()
// pages/memberDeals/memberDeals.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currCount: 0,
    count: 0,
    addColor: '#00A6D6',
    minusColor: '#00A6D6',
    price: 0,
    currPrice: 0,
    totalPrice: 0,
    carNo: '',
    parkNo: '',
    applyCar: '',
    carMember: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    console.log("res====>", res);
    // my.setNavigationBarTitle({
    //   title: '长期租位'
    // })
    var addColor = '#00A6D6';
    var minusColor = '#00A6D6';
    var startTime = new Date();
    console.log("起始时间：", startTime);
    if (res.currCount < res.count) {
      addColor = '#00A6D6';
    }
    if (res.currCount > 0) {
      minusColor = '#00A6D6'
    }
    this.setData({
      currCount: res.currCount,
      minusColor: minusColor,
      addColor: addColor,
      price: res.price,
      currPrice: res.currPrice,
      parkNo: res.parkNo,
      carNo: res.carNo
    });
  },
  //生命周期函数 -- 监听页面显示
  onShow() {
    var that = this;
    var userid = app.globalData.userid;
    var carNo = that.data.carNo;
    var parkNo = that.data.parkNo;

    my.httpRequest({
      url: app.globalData.url + '/zfb/status/userid/' + encodeURI(userid) + '/carNo/' + encodeURI(carNo) + '/parkNo/' + encodeURI(parkNo),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("申请状态===>", res.data.data);
        that.setData({
          applyCar: res.data.data,
        })
      }
    })
  },
  add(event) {
    var data = event.target.dataset;
    console.log("add触发事件：", data);
    var unitPrice = data.price;
    var currCount = data.currCount;
    var currPrice = data.currPrice;

    currCount = parseInt(currCount + 1);
    currPrice = parseFloat(currPrice) + parseFloat(unitPrice);
    data.currCount = currCount;
    data.currPrice = currPrice;
    this.onLoad(data);
    console.log("add触发事件结束：", data);

    var that = this;
    var carNo = that.data.carNo;
    var parkNo = that.data.parkNo;
    console.log("车牌号：", carNo);
    console.log("停车场编号：", parkNo);
    console.log("月份：", currCount);
    my.httpRequest({ //获取起始和截止时间
      url: app.globalData.url + '/car/weixin/carNo/' + encodeURI(carNo) + '/parkNo/' + encodeURI(parkNo) + '/count/' +  currCount,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function(e) {
        console.log("获取起始和截止时间：", e.data.data);
        that.setData({
          carMember: e.data.data,
        })
      }
    })
  },
  minus(event) {
    var data = event.target.dataset;
    console.log("minus触发事件：", data);
    var unitPrice = data.price;
    var currCount = data.currCount;
    var currPrice = data.currPrice;

    if (currCount > 0) {
      currCount = parseInt(currCount - 1);
      currPrice = parseFloat(currPrice) - parseFloat(unitPrice);
      data.currCount = currCount;
      data.currPrice = currPrice;
      this.onLoad(data);
      console.log("minus触发事件结束：", data);

      var that = this;
      var carNo = that.data.carNo;
      var parkNo = that.data.parkNo;
      console.log("车牌号：", carNo);
      console.log("停车场编号：", parkNo);
      console.log("月份：", currCount);
      my.httpRequest({
        url: app.globalData.url + '/car/weixin/carNo/' + encodeURI(carNo) + '/parkNo/' + encodeURI(parkNo) + '/count/' + currCount,
        method: 'GET',
        data: {},
        header: {
          "content-type": 'application/x-www-form-urlencoded'
        },
        success: function (e) {
          console.log("获取起始和截止时间：", e.data.data);
          that.setData({
            carMember: e.data.data,
          })
        }
      })
    } 
  },//支付
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e);
    var fee = e.detail.value.dealsFee;
    var count = e.detail.value.count;
    var price = this.data.price;
    var carNo = this.data.carNo;
    var parkNo = this.data.parkNo;
    
    my.httpRequest({  
      url: app.globalData.url+'/alipay/pay/fee/'+fee,
      data: {},
      method: 'GET',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log("调用支付接口成功", res.data)
        var res = res.data
        my.tradePay({
          orderStr: res.orderStr,  // 即上述服务端已经加签的orderSr参数
          success: (res) => {
            my.alert(res.resultCode);
            //that.updateStatus(tradeNo, fee, recordId, originFee);
          },
        });
        
      },
      fail: function (res) {
        console.log("调用支付接口失败", res)
        
      }
    }); 
  },
  //修改支付状态
  updateStatus(tradeNo,fee,carNo,parkNo,count,price){
    my.httpRequest({  
      url: app.globalData.url+'/alipay/membersPay/userid/'+app.globalData.userid+
        '/tradeNo/'+tradeNo+'/fee/'+fee+'/carNo/'+carNo+'/parkNo/'+parkNo+'/count/'+count+'/price/'+price,
      data: {},
      method: 'GET',
      dataType: 'text',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log("调用更新支付状态接口成功", res)
        my.navigateTo({
          url: '/pages/index/index',
          success: function (res) {
            my.showToast({
              content: '支付成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        console.log("调用更新支付状态接口失败", res)
        my.showToast({
          content: '支付失败',
          type: 'fail',
          duration: 2000
        })
      }
    }); 
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //申请通行证
  applyCar: function(e) {
    console.log("您正在申请通行证，需要审核？请耐心等候...")
    var userid = app.globalData.userid; 
    var carNo = e.currentTarget.dataset.carNo;
    var parkNo = e.currentTarget.dataset.parkNo;
    console.log("userid", userid);
    console.log("车牌：", carNo);
    console.log("停车场编号：", parkNo);
    var that = this;

    my.httpRequest({
      url: app.globalData.url + '/zfb/userid/' + encodeURI(userid) + '/carNo/' + encodeURI(carNo) + '/parkNo/' + encodeURI(parkNo),
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("调用接口成功")
        console.log("applyCar====>", res.data.data);

        my.navigateTo({
          url: '/pages/applyCar/applyCar'
        })
      }
    })
  }
})