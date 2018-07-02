const app = getApp();

Page({
  data: {
    array: {},
    authorty:app.globalData.authorty
  },
  onLoad() {
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

        if(typeof(res.data.authorities)!=undefined){
          that.getAuthorty(res.data.authorities);
        }

        that.setData({
          array: res.data.list,
          authorty: app.globalData.authorty
        })
      }
    })
  },
  getAuthorty(array) {
    if(array!=null&&array.length>0){
      for (var i = 0; i < array.length; i++) {
        console.log("array[i].authorty==", array[i].authorty);
        if (array[i].authorty == "ROLE_PARK_ADMIN") {
          app.globalData.authorty = 1;
          break;
        } else if (array[i].authorty == "ROLE_PARK_STAFF"){
          app.globalData.authorty = 2;
        }else{
          app.globalData.authorty = 0;
        }
      }
    }
  },
  //车牌号绑定
  addCarNo(e){
    my.navigateTo({
      url: '/pages/addCarNo/addCarNo'
    })
  },
  //车位预约
  searchPark(e){
    var plateNum = "carNo";
    console.log("欢迎来到停车场搜索页面");
    my.navigateTo({
      url: '/pages/searchPark/searchPark?plateNum=' + plateNum
    })
  },
  //长期租位
  rentParkingplace(e){
    console.log("欢迎进入长期租位页面");
    my.navigateTo({
      url: '/pages/rentParkingplace/rentParkingplace'
    })
  },
  //我的主页
  myinfo(e){
    my.navigateTo({
      url: '/pages/myInfo/myInfo'
    })
  },
  //停车管理
  parkManage(e){
    my.navigateTo({
      url: '/pages/parkManage/parkManage'
    })
  },
  //当前停车收费管理
  payFeets(e){
    var carNo = e.currentTarget.dataset.carNo;
    console.log('当前车牌号为', carNo);
    my.navigateTo({
      url: '/pages/payFeets/payFeets?carNo=' + carNo
    })
  }

});
