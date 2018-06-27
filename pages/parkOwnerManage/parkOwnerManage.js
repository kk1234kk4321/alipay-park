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
    my.navigateTo({
      url: '/pages/updateFeeInfo/updateFeeInfo?parkNo=' + this.data.parkNo
    })
  },
  doAudit(e){
    console.log("准备进入白名单审核页面===", this.data);
    my.navigateTo({
      url: '/pages/auditInfo/auditInfo?parkNo=' + this.data.parkNo
    })
  },
  parking(e){
    console.log("准备进入在停车辆管理页面===", this.data);
    my.navigateTo({
      url: '/pages/parkingManage/parkingManage?parkNo=' + this.data.parkNo
    })
  }
});