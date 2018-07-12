const app = getApp()
Page({
  data: {
    array1: {},
    array2: {},
    parkNo: ''
  },
  onLoad(res) {
    this.setData({
      parkNo: res.parkNo
    }),
    my.setNavigationBar({
     title:'收益统计'
    });
  },
  onShow(){
    var that = this;
    var parkNo = that.data.parkNo;
    my.httpRequest({
      url: app.globalData.url + '/park/payFeeSum/parkNo/' + parkNo,
      data: {},
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log("调用收益统计接口成功：",res.data.data)
        var data = res.data.data
        if (data.parkPay) {
          that.setData({
            array1: res.data.data.parkPay
          })
        }
        if (data.membersPay){
          that.setData({
            array2: res.data.data.membersPay
          })
        }
      }
    })
  },
})