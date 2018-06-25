const app = getApp()
var count=null;
Page({
  data: {
    item1: ["京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",
      "豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
      "津", "贵", "云", "桂", "琼", "青", "新", "藏",
      "蒙", "宁", "甘", "陕", "闽", "赣", "湘"],
    item2: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
      "A", "S", "D", "F", "G", "H", "J", "K", "L",
      "Z", "X", "C", "V", "B", "N", "M", "挂","学","警","港","澳"],
    hidden1: true,
    hidden2: true,
    carNo: '',  
  },
  //车牌输入获取焦点  
  d1: function () {
    var that = this;
    if (that.data.carNo == '') {
      that.setData({
        hidden1: false,
        hidden2: true
      })
    } else {
      that.setData({
        hidden1: true,
        hidden2: false
      })
    }

  },
  //车牌输入失去焦点  
  d2: function () {
    var that = this;
    that.setData({
      hidden1: true,
      hidden2: true
    })
  },
  //获取车牌省份  
  sheng: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.sh);
    that.setData({
      carNo: e.currentTarget.dataset.sh
    })
    if (that.data.carNo != '') {
      that.setData({
        hidden1: true,
        hidden2: false
      })
    }
  },
  //获取车牌号码  
  other1: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.ot);
    var carNo = that.data.carNo + e.currentTarget.dataset.ot;
    var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}$/;
    if(carNo.length<=7){
      console.log("carNo.length == ", carNo.length)
      if (carNo.length == 2) {
        console.log("express.test("+carNo+")====", express.test(carNo))
        if (express.test(carNo)) {
          that.setData({
            carNo: carNo
          })
        }
      }else{
        that.setData({
          carNo: carNo
        })
      }
    }
  },
  other: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.ot);
    var carNo = that.data.carNo + e.currentTarget.dataset.ot;
    if (carNo.length <= 7) {
      that.setData({
        carNo: carNo
      })
    } else {
      my.showToast({
        content: '车牌号已超过规定位数',
        type: 'none',
        duration: 2000
      })
    }
  },
  //回删车牌  
  del: function () {
    var that = this;
    var ss = that.data.carNo;
    console.log(ss);
    var s = ss.split('');
    console.log(s);
    console.log(s.slice(0, -1));
    if (s.slice(0, -1).length == 0) {
      that.setData({
        hidden1: false,
        hidden2: true
      })
    }
    console.log(s.join('').slice(0, -1));
    var s = s.join('').slice(0, -1);
    that.setData({
      carNo: s
    })
    console.log(that.data.carNo.length);

  },
  //确认输入  
  ok: function () {
    var that = this;
    var ss = that.data.carNo;
    that.setData({
      hidden1: true,
      hidden2: true
    })
    that.formSubmit(ss);
  },
  formSubmit:function(e){
    console.log('form发生了submit事件，携带数据为：', e);
    //var data = e.detail.value;
    var userid = app.globalData.userid;
    //var plate = this.data.array[e.detail.value.plateNo];
    var carno = e;
    console.log('carno=', carno);
    var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    console.log('express===>', express.test(carno))
    if (carno.length == 7 && express.test(carno)){
      my.httpRequest({
        url: app.globalData.url+'/zfb/addCarNo/userid/'+userid+'/carno/'+encodeURI(carno),
        data: {},
        method: 'GET',
        dataType: 'text',
        headers: { "content-type": 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log("调用绑定车牌号接口成功")
          console.log("res.data====>",res)
          my.navigateTo({
            url: '/pages/index/index',
            success: function (res) {
              my.showToast({
                content: '绑定车牌号成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        },
        fail: function (res) {
          console.log("调用绑定车牌号接口失败")
          console.log(res.data)
          my.showToast({
            content: '绑定车牌号失败',
            type: 'fail',
            duration: 2000
          })
        }
      })
    }else{  
      my.navigateTo({
        url: '/pages/addCarNo/addCarNo',
        success: function (res) {
          my.showToast({
            content: '车牌号填写有误，请按规则重新填写',
            type: 'none',
            duration: 2000
          })
        }
      }) 
    }
  },
  focus:function(e){
    console.log("收起键盘。。。")
    my.hideKeyboard();
  },
  onLoad: function() {
    my.setNavigationBar({
     title:'车牌号绑定'
    });
  }
})