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
  detailForPark(e){
    console.log("准备进入在线收费明细页面",e)
    var outTime = e.currentTarget.dataset.outTime
    var parkNo = this.data.parkNo
    my.navigateTo({
      url: '/pages/payFeeDetail/payFeeDetail?parkNo=' + parkNo + '&outTime=' + outTime
    })

  },
  detailForMember(e){
    console.log("准备进入长期租位收费明细页面",e)
    var payTime = e.currentTarget.dataset.payTime
    var parkNo = this.data.parkNo
    my.navigateTo({
      url: '/pages/payFeeDetailForMember/payFeeDetailForMember?parkNo=' + parkNo + '&payTime=' + payTime
    })
  }
})