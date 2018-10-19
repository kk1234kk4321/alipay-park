const app = getApp();
Page({
  data: {
    feetsData:{},
    userid:''
  },
  onLoad(res) {
    console.log('停车信息为：', res.userid)
    this.setData({
      userid:res.userid
    })
    my.setNavigationBar({
      title: '待缴费'
    })
  },
  onShow(){
    var that = this
    var userid = that.data.userid
    my.httpRequest({  
      url: app.globalData.url+'/zfb/unpaiedeno/userid/' + encodeURI(userid),
      data: {},
      method: 'GET',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function(res) {  
        console.log("调用待缴费信息接口成功")
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
        console.log("调用待缴费信息接口失败", res);                
      },
    }); 
  },
 
  
  //支付
  goPay(e){
    var that = this;
    var fee = e.currentTarget.dataset.fee;
    var recordId = e.currentTarget.dataset.recordId;
    var originFee = e.currentTarget.dataset.originFee;
    var parkNo = e.currentTarget.dataset.parkNo;
    my.httpRequest({  
      url: app.globalData.url+'/alipay/pay/fee/'+fee,
      data: {},
      method: 'GET',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log("调用支付接口成功", res.data.data)
        var tradeNo = res.data.data.tradeno
        var carNo = that.data.carNo
        //that.updateStatus(tradeNo, fee, recordId, originFee);
        my.tradePay({
          orderStr: res.data.data.orderStr,  // 即上述服务端已经加签的orderSr参数
          success: (res) => {
            if(res.resultCode == 9000) {
              that.updateStatus(tradeNo, fee, recordId, originFee,parkNo,carNo);

              my.showToast({
                content: '支付成功',
                type: 'success',
                duration: 2000
              })
            }else if(res.resultCode == 4000) {
              my.showToast({
                content: '支付失败',
                type: 'fail',
                duration: 2000
              })
            }
          },
          complete: function(res) { 
            my.reLaunch({
              url: '/pages/index/index',
            })
          }
        });
      },
      fail: function (res) {
        console.log("调用支付接口失败", res)
        
      }
    }); 
  },
 
  //更新支付状态
  updateStatus: function (tradeNo, fee, recordId, originFee,parkNo,carNo){
    my.httpRequest({  
      url: app.globalData.url+'/alipay/parkPay/userid/'+app.globalData.userid+
        '/tradeNo/'+tradeNo+'/fee/'+fee+'/recordId/'+recordId+'/originFee/'+originFee+
        '/parkNo/'+parkNo+'/carNo/'+ encodeURI(carNo),
      data: {},
      method: 'GET',
      dataType: 'text',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log("调用更新支付状态接口成功", res)
       },
      fail: function (res) {
        console.log("调用更新支付状态接口失败", res)   
      },
      
    }); 
  },
});
