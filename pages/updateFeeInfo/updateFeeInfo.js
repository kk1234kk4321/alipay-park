const app = getApp();
Page({
  data: {
    array: {},
    parkNo: ''
  },
  onLoad(res) {
    console.log("进入计费规则修改页面===",res);
    this.setData({
      parkNo:res.parkNo
    })
    my.setNavigationBar({
      title: '修改计费规则'
    })
  },
  onShow(){
    var that = this
    var parkNo = that.data.parkNo
    my.httpRequest({  
      url: app.globalData.url+'/park/parkOwnerInfo/parkNo/' + parkNo,
      data: {},
      method: 'GET',
      dataType: 'text',
      headers: { "content-type": 'application/x-www-form-urlencoded' },
      success: function(res) {  
        console.log("调用车场计费信息接口成功")
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
        console.log("调用车场计费信息接口失败", res);                
      },
    }); 
  },
  
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    var data = e.detail.value;
    var id = data.parkId;
    var feeHour = data.feeHour;
    if(feeHour==''){
      feeHour = 0;
    }
    var feeTop = data.feeTop;
    if(feeTop==''){
      feeTop = 0;
    }
    var freeHour = data.freeHour;
    if(freeHour==''){
      freeHour = 0;
    }
    var feeMonth = data.feeMonth;
    if(feeMonth==''){
      feeMonth = 0;
    }
    my.httpRequest({
      url: app.globalData.url + '/park/updatePark/id/' + id + '/feeHour/' + feeHour + '/feeTop/' + feeTop + '/freeHour/' + freeHour + '/feeMonth/' + feeMonth,
      method: 'GET',
      data: {},
      dataType: 'text',
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用修改计费规则接口成功")
        console.log("array====>", res)
        my.navigateTo({
          url: '/pages/index/index',
          success: function (res) {
            my.showToast({
              content: '修改计费规则成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        console.log("调用修改计费规则接口失败")
        console.log("失败原因====>", res)
        my.showToast({
          content: '修改计费规则失败',
          type: 'fail',
          duration: 2000
        })
      }
    })

  },
});
