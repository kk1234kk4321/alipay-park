const app = getApp();
Page({
  data: {
    parkNo:'',
    parkId:'',
    array: {},
  },
  onLoad(res) {
    console.log("进入停车场功能管理页面===",res);
    this.setData({
      parkNo:res.parkNo,
      parkId:res.parkId,
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
      url: '/pages/auditInfo/auditInfo?parkNo=' + this.data.parkNo+'&parkId='+this.data.parkId
    })
  },
  parking(e){
    console.log("准备进入在停车辆管理页面===", this.data);
    my.navigateTo({
      url: '/pages/parkingManage/parkingManage?parkNo=' + this.data.parkNo
    })
  },
  payFeeSum(e){
    console.log("准备进入收益统计页面===", this.data);
    my.navigateTo({
      url: '/pages/payFeeSum/payFeeSum?parkNo=' + this.data.parkNo
    })
  },
  cashPay:function(){
    console.log("准备进入现金收费页面===", this.data);
    my.navigateTo({
      url: '/pages/cashPayment/cashPayment?parkNo=' + this.data.parkNo
    })
  },
  staffManage:function(){
    console.log("准备进入员工管理页面===", this.data);
    my.navigateTo({
      url: '/pages/staffManage/staffManage?parkNo=' + this.data.parkNo
    })
  },
  sellerManage:function(){
    console.log("准备进入商家管理页面===", this.data);
    my.navigateTo({
      url: '/pages/sellerSetManage/sellerSetManage?parkNo=' + this.data.parkNo
    })
  }
});
