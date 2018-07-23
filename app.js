App({
 
  onLaunch(options) {
    
    my.getAuthCode({
      scopes: ['auth_base'],
      success: res => {
        console.info("authcode===>",res);
        var that = this;
        if(res.authCode){
          my.httpRequest({  
            url: this.globalData.url+'/zfb/getUserid/authcode/'+res.authCode,
            data: {},
            method: 'GET',
            dataType: 'text',
            headers: { "content-type": 'application/x-www-form-urlencoded' },
            success: function(res) {  
              console.log("获取支付宝ID成功====>",res.data);
              that.globalData.userid = res.data;
              console.log("that.globalData.userid===>",that.globalData.userid);
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
  },
  globalData: {
    authorty: 0,
    userid:"",
      url:'https://park.zhangyuanzhineng.com'
      // url:'http://192.168.1.113:8080'
      //url:'http://192.168.1.126:80'
  }
});
