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
  searchCarNo(e) {
    var parkNo = e.target.dataset.parkNo
    var parkName = e.target.dataset.parkName
    my.navigateTo({
      url: '/pages/searchCarNo/searchCarNo?parkNo=' + parkNo + '&parkName=' + parkName
    })
  }
})