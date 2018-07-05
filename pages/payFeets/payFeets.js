const app = getApp();
Page({
  data: {
    feetsData:{},
    carNo:''
  },
  onLoad(res) {
    console.log('停车信息为：', res.carNo)
    this.setData({
      carNo:res.carNo
    })
    my.setNavigationBar({
      title: '在线缴费'
    })
  },
  onShow(){
    var that = this
    var carno = that.data.carNo
    my.httpRequest({  
      url: app.globalData.url+'/car/weixin/record/carno/' + encodeURI(carno),
      data: {},
      method: 'GET',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function(res) {  
        console.log("调用在线缴费信息接口成功")
        var res = res.data//JSON.parse(res.data)
        console.log(res.data)
        if (res.data) {
          that.setData({
            feetsData: res.data
          })
        } else {
          that.setData({
            feetsData: ''
          })
        }
      },
      fail: function(res) {
        console.log("调用在线缴费信息接口失败", res);                
      },
    }); 
  },
  //解除绑定
  deleteCar(e){
    var that = this
    var carno = that.data.carNo
     my.httpRequest({  
      url: app.globalData.url+'/zfb/deleteCar/userid/'+app.globalData.userid+'/carno/' + encodeURI(carno),
      data: {},
      method: 'GET',
      dataType: 'text',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log("调用解除绑定车牌号接口成功", res)
        my.reLaunch({
          url: '/pages/index/index',
          success: function (res) {
            my.showToast({
              content: '解绑绑定成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        console.log("调用解除绑定车牌号接口失败", res)
        my.showToast({
          content: '解绑绑定失败',
          type: 'fail',
          duration: 2000
        })
      }
    }); 
  },
  //查看历史缴费记录
  paymentInfo:function(e){
    var carNo = e.currentTarget.dataset.carNo;
    console.log('查看缴费记录，车牌号为', e.currentTarget.dataset);
    my.navigateTo({
      url: '/pages/paymentInfo/paymentInfo?carNo=' + carNo
    })
  },
  //支付
  goPay(e){
    var that = this;
    var fee = e.currentTarget.dataset.fee;
    var recordId = e.currentTarget.dataset.recordId;
    var originFee = e.currentTarget.dataset.originFee;
    my.httpRequest({  
      url: app.globalData.url+'/alipay/pay/fee/'+fee,
      data: {},
      method: 'GET',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log("调用支付接口成功", res.data.data)
        var tradeNo = res.data.data.tradeno
        //that.updateStatus(tradeNo, fee, recordId, originFee);
        my.tradePay({
          orderStr: res.data.data.orderStr,  // 即上述服务端已经加签的orderSr参数
          success: (res) => {
            that.updateStatus(tradeNo, fee, recordId, originFee);
          },
        });
        
      },
      fail: function (res) {
        console.log("调用支付接口失败", res)
        
      }
    }); 
  },
  //会员缴费
  goDeal(e){
    console.log('缴费按钮触发事件：', e)
    var price = e.currentTarget.dataset.price;
    var carNo = e.currentTarget.dataset.carNo;
    var parkNo = e.currentTarget.dataset.parkNo;
    my.navigateTo({
      url: '/pages/memberDeals/memberDeals?price=' + price+'&carNo='+carNo+'&parkNo='+parkNo+'&currCount=0&currPrice=0' ,
    })
  },
  //内部业主，不扣钱只修改RECORD信息
  goUpdate(e){
    var recordId = e.currentTarget.dataset.recordId; 
    var originFee = e.currentTarget.dataset.originFee;
    this.updateStatus(0,0,recordId,originFee)
  },
  //更新支付状态
  updateStatus: function (tradeNo, fee, recordId, originFee){
    my.httpRequest({  
      url: app.globalData.url+'/alipay/parkPay/userid/'+app.globalData.userid+
        '/tradeNo/'+tradeNo+'/fee/'+fee+'/recordId/'+recordId+'/originFee/'+originFee,
      data: {},
      method: 'GET',
      dataType: 'text',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log("调用更新支付状态接口成功", res)
        my.reLaunch({
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
});
