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
      dataType: 'text',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function(res) {  
        console.log("调用在线缴费信息接口成功")
        var res = JSON.parse(res.data)
        console.log(res.data)
        if (typeof(res.data)!='undefined') {
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
        my.navigateTo({
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
  }
});
