const app = getApp()
Page({
  data: {
    feetsData: {},
    carNo: ''
  },
  onLoad(res) {
    this.setData({
      carNo: res.carNo
    }),
       my.setNavigationBar({
        title: '现金收讫'
      })
  },
  onShow() {
    var that = this
    var carno = that.data.carNo
    my.httpRequest({  
      url: app.globalData.url + '/car/weixin/record/carno/' + encodeURI(carno),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用应收金额接口成功")
        console.log("feetsData====>", res)
        if (res.data.data) {
          that.setData({
            feetsData: res.data.data
          })
        } else {
          that.setData({
            feetsData: ''
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var status = e.detail.value.status;
    var userid = app.globalData.userid;
    var fee = this.data.feetsData.finalFee;
    var originFee = this.data.feetsData.originFee;
    var parkNo = this.data.feetsData.parkNo;
    var carNo = this.data.feetsData.carNo;
    var recordId = this.data.feetsData.recordId;

    my.httpRequest({  
      url: app.globalData.url + '/alipay/cashPay/userid/' + userid + '/status/' + status + '/fee/' + fee + '/recordId/' + recordId + '/originFee/' + originFee + '/carNo/' + encodeURI(carNo) + '/parkNo/' + parkNo,
      method: 'GET',
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('调用现金支付接口成功！')
        my.reLaunch({
          url: '/pages/cashPayment/cashPayment?parkNo=' + parkNo,
          success: function (res) {
            my.showToast({
              content: '支付成功',
              type: 'success',
              duration: 2000
            })
          },
          fail: function () {
            my.showToast({
              content: '支付失败',
              type: 'fail',
              duration: 2000
            })
          },
          complete: function () {
            // complete   
          }
        })
      }
    })
  },
})
