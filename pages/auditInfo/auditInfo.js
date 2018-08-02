const app = getApp()
Page({
  data: {
    array: {},
    parkNo: '',
    parkId:''
  },
  onLoad(res) {
    console.log("进入白名单审核页面===",res);
    this.setData({
      parkNo:res.parkNo,
      parkId:res.parkId
    })
    my.setNavigationBar({
      title: '白名单审核'
    })
  },
  onShow() {
    var that = this
    var parkId = that.data.parkId

    my.httpRequest({
      url: app.globalData.url + '/zfb/applyCarList/parkId/' + parkId,
      method: 'GET',
      dataType: 'text',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log("调用审核白名单列表接口成功")
        var res = JSON.parse(res.data)
        console.log(res)
        if (res.data != '') {
          that.setData({
            array: res.data
          })
        } else {
          that.setData({
            array: ''
          })
        }
      },
      fail: function(res) {
        console.log("调用审核白名单列表接口失败", res);                
      },
    })
  },
  goAudit(e){
    var that = this;
    console.log("准备调用白名单审核接口===", e.currentTarget.dataset);
    var data = e.currentTarget.dataset;
    var carNo = data.carNo;
    var id = data.id;
    var parkId = data.parkId;
    var status = data.status;
    my.httpRequest({
      url: app.globalData.url + '/park/audit/parkId/' + parkId + '/applyCarId/' + id + '/status/' + status + '/carNo/' + encodeURI(carNo),
      method: 'GET',
      data: {},
      dataType: 'text',
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用白名单审核接口成功")
        console.log(res)
        my.reLaunch({
          url: '/pages/auditInfo/auditInfo?parkNo=' + that.data.parkNo,
          success: function (res) {
            my.showToast({
              content: '审核成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        console.log("调用白名单审核接口失败")
        console.log(res)
        my.showToast({
          content: '审核失败',
          type: 'fail',
          duration: 2000
        })
      }
    })
  }
});
