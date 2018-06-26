const app = getApp();
Page({
  data: {
    array: {},
    parkNo: '',
    carNo:''
  },
  onLoad(res) {
    this.setData({
      parkNo: res.parkNo,
      carNo:''
    }),
     my.setNavigationBar({
      title: '在停车辆管理'
    })
  },
  onShow(){
    var that = this
    var parkNo = that.data.parkNo
    var carNo = that.data.carNo
    if(carNo==''){
      carNo = null;
    }
    my.httpRequest({  
      url: app.globalData.url+'/park/parking/parkNo/' + parkNo+'/carNo/'+carNo,
      data: {},
      method: 'GET',
      dataType: 'text',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function(res) {  
        console.log("调用在停车辆管理列表接口成功")
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
        console.log("调用在停车辆管理列表接口失败", res);                
      },
    }); 
  },
  carNoInput: function (e) {
    var carNo = e.detail.value;
    console.log('监听输入框文本，carNo=',carNo);
    this.setData({
      carNo: carNo
    })
  },
  searchCar:function(e){
    console.log('监听搜索框文本，carNo=', this.data.carNo);
    this.onShow();
  }
});
