const app = getApp()
Page({
  data: {
    array: {},
  },
  onLoad() {
    my.setNavigationBar({
      title: '商家管理'
    })
  },
  onShow() {
    var that = this
    var userid = app.globalData.userid
    my.httpRequest({
      url: app.globalData.url + '/zfb/seller/parkList/userid/' + userid,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用商家停车场管理接口成功")
        console.log("parkList====>", res)
        if (res.data != '') {
          that.setData({
            array: res.data.data
          })
        } else {
          that.setData({
            array: ''
          })
        }
      }
    })
  },
  sellerDiscount(e) {
    var plateNum = 'carNo';
    console.log("准备进入商家管理页面===", e.target.dataset);
    my.navigateTo({
      url: '/pages/sellerDiscount/sellerDiscount?parkNo=' + e.target.dataset.parkNo + '&carNo=0&currCount=0&plateNum=' + plateNum
    })
  }
})