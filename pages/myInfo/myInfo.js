// pages/myInfo/myInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: app.globalData.userid,
    nickname: '',
    mes: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userid: app.globalData.userid
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // my.setNavigationBarTitle({
    //   title: '个人主页',
    // })

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
          nickname: res.data.nickname
        })
      }
    })
  },

  /**
   * 设置昵称
   */
  setNickname: function(e) {
    console.log("进入设置昵称页面！");
    my.navigateTo({
      url: '/pages/setNickname/setNickname'
    })
  }
})