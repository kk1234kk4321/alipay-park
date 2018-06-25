const app = getApp();

Page({
  data: {
    array: {},
  },
  onLoad() {
    my.setNavigationBar({
     title:'停车场管理'
    });
  },
  onShow(){
    var that = this;
    var userid = app.globalData.userid;
    my.httpRequest({
      url: app.globalData.url+'/zfb/parkOwnerList/userid/'+userid,
      data: {},
      method: 'GET',
      dataType: 'text',
      headers: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log("调用获取业务所属停车场列表接口成功：",JSON.parse(res.data))
        var res = JSON.parse(res.data)

        that.setData({
          array: res.data,
        })
      }
    })
  },
  parkManage(e){
    console.log("准备进入停车场功能管理页面====",e.target.dataset);
    var parkNo = e.target.dataset.parkNo;
    my.navigateTo({
      url: '/pages/parkOwnerManage/parkOwnerManage?parkNo='+e.target.dataset.parkNo
    })
  }
});
