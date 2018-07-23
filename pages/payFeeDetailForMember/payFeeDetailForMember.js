const app = getApp();
Page({
  data: {
    array: {},
    parkNo: '',
    payTime: ''
  },
  onLoad(res) {
    this.setData({
      parkNo: res.parkNo,
      payTime: res.payTime
    }),
     my.setNavigationBar({
        title: '长期租位收费明细'
      })
  },
  onShow(){
    var that = this
    var parkNo = that.data.parkNo
    var payTime = that.data.payTime
    my.httpRequest({
      url: app.globalData.url + '/park/payFeeDetailForMember/payTime/' + payTime + '/parkNo/' + parkNo,
      data: {},
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log("调用长期租位缴费明细接口成功",res)
        that.setData({
          array: res.data.data,
        })
      }
    })
  },
});
