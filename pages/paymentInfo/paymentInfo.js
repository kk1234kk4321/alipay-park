const app = getApp()
Page({
  data: {
    paymentInfo: [],
    carNo:''
  },
  onLoad(res) {
    console.log('车牌号为：', res.carNo)
    this.setData({
      carNo: res.carNo
    })
    my.setNavigationBar({
      title: '历史缴费记录'
    })
  },
  onShow(){
    var that = this
    var carNo = that.data.carNo
    my.httpRequest({  
      url: app.globalData.url+'/car/weixin/recordHis/carno/' + encodeURI(carNo),
      data: {},
      method: 'GET',
      dataType: 'text',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function(res) {  
        console.log("调用历史缴费信息接口成功")
        var res = JSON.parse(res.data)
        console.log(res)
        var a = 0;
        if (res.data) {
          var ss = [];
          var len = res.data.length;
          console.log("总记录条数：", len);
          if(len<=500) {//有多少条数据，显示多少条
            for(a=0;a<len;a++) {
              ss.push(res.data[a]);
            }
          } else {//只显示前500条数据
            for(a=0;a<500;a++) {
              ss.push(res.data[a]);
            }
          }
          that.setData({
            paymentInfo: ss
          })
        } else {
          that.setData({
            paymentInfo: ''
          })
        }
      },
      fail: function(res) {
        console.log("调用历史缴费信息接口失败", res);                
      },
    }); 
  },
});
