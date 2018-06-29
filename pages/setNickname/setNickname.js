// pages/setNickname/setNickname.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mes: '',
    nn: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    my.setNavigationBar({
      title: '设置昵称',
    });
  },

  /**
   * 监听文本框输入
   */
  nicknameInput: function (e) {
    var nickname = e.detail.value;
    this.setData({
      nickname: nickname
    })
  },

  /**
   * 修改用户昵称
   */
  updateNickname: function (e) {
    console.log("修改用户昵称啦...");
    var that = this;
    var userid = app.globalData.userid;
    var nickname = that.data.nickname;
    console.log("昵称：", nickname);

    if (nickname != "" && nickname != null) {
      my.httpRequest({
        url: app.globalData.url + '/zfb/userid/' + encodeURI(userid) + '/nickname/' + encodeURI(nickname),
        method: 'GET',
        data: {},
        header: {
          "content-type": 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("啦啦啦!!!");
          console.log("mes：", res.data.data);
          that.setData({
            mes: res.data.data.mes
          });
          var mess = res.data.data.mes;
          if (mess == '' || mess == null) {
            my.navigateTo({
              url: '/pages/myInfo/myInfo'
            });
            that.setData({
              nn: nickname
            })
          }
        }
      })
    } else {
      console.log("请设置您的昵称！");
      that.setData({
        mes: '请设置您的昵称！'
      })
    }
  }
})