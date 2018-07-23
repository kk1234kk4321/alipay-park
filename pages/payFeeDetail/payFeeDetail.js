const app = getApp();
Page({
  data: {
    array: {},
    parkNo: '',
    outTime:''
  },
  onLoad(res) {
    this.setData({
      parkNo: res.parkNo,
      outTime: res.outTime
    }),
      my.setNavigationBar({
        title: '在线收费明细'
      })
  },
  onShow(){
    var that = this
    var parkNo = that.data.parkNo
    var outTime = that.data.outTime
    my.httpRequest({
      url: app.globalData.url + '/park/payFeeDetail/outTime/' + outTime+'/parkNo/' + parkNo,
      data: {},
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log("调用在线缴费明细接口成功",res)
        that.setData({
          array: res.data.data,
        })
      }
    })
  },
});
