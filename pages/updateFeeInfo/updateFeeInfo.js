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
});
