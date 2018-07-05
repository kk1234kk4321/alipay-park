// pages/rentParkingplace/rentParkingplace.js
const app = getApp()

Page({

  //页面的初始数据
  data: {
    plateNums: {},
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log("app.globalData.userid===>",app.globalData.userid)
    var that = this;
    if(app.globalData.userid){
      that.getCarNoList(app.globalData.userid)
    }else{
      my.getAuthCode({
        scopes: ['auth_base'],
        success: res => {
          console.info("authcode===>",res);
          var that = this;
          if(res.authCode){
            my.httpRequest({  
              url: app.globalData.url+'/zfb/getUserid/authcode/'+res.authCode,
              data: {},
              method: 'GET',
              dataType: 'text',
              headers: { "content-type": 'application/x-www-form-urlencoded' },
              success: function(res) {  
                console.log("获取支付宝ID成功====>",res);
                app.globalData.userid = res.data;
                that.getCarNoList(res.data);
              },
              fail: function(res) {
                console.log("获取支付宝ID失败", res);                
              },
            }); 
          }else{
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },

  //获取车牌
  getCarNoList(userid){
    console.log("调用获取车牌号列表接口:", userid);    
    var that = this;
    my.httpRequest({
      url: app.globalData.url+'/zfb/carNoList/userid/'+userid,
      data: {},
      method: 'GET',
      dataType: 'text',
      headers: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log("调用获取车牌号列表接口成功：",JSON.parse(res.data))
        var res = JSON.parse(res.data)

        that.setData({
          plateNums: res.data.list
        })
      }
    })
  },

  //生命周期函数--监听页面显示
  onShow: function () {
    my.setNavigationBar({
      title: '选择车牌',
    })
  },

  //选择park
  selectPark: function(e) {
    var plateNum = e.currentTarget.dataset.plateNum;
    console.log("当前车牌号为", plateNum);
    my.navigateTo({
      url: '/pages/searchPark/searchPark?plateNum=' + plateNum
    })
  },

  //返回
  reback(e){
    my.reLaunch({url: '/pages/index/index'})
  }
})