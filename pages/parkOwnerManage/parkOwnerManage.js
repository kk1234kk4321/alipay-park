const app = getApp();
Page({
  data: {
    parkNo:'',
    array: {},
  },
  onLoad(res) {
    console.log("进入停车场功能管理页面===",res);
    this.setData({
      parkNo:res.parkNo,
      authorty: app.globalData.authorty
    })
    my.setNavigationBar({
      title: '停车场管理'
    })
  },
  updateFee(e){
    console.log("准备进入修改计费规则页面===", this.data);
    wx.navigateTo({
      url: '/pages/updateFeeInfo/updateFeeInfo?parkNo=' + this.data.parkNo
    })
  },
  audit(e){

  },
  parking(e){

  }
});
