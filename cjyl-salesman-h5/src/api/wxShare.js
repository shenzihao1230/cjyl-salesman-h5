import {wxJS} from '@/api/api'

const wxShare = {
    wxRegister(axiosUrl,title, desc, link, imgUrl) {
      //axiosUrl：后端提供的链接，用来获取JS-SDK权限验证的签名等信息  这里就是http://*******/KktWxjs.php文件 （必须与当前页面同源）
      //title:自定义名称
      //des:自定义描述
      //link：分享的链接（必须是js安全域名）
      //imgUrl:图片链接
      wxJS().then((res) => {
          let data = res; // PS: 这里根据你接口的返回值来使用{noncestr："R7AG3**************YCVLPH2W8UI"，signature："765f0618f********82f7e2621d2e59c"，timestamp：160***302}
          wx.config({
            debug: false, // 开启调试模式
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: [
              "updateAppMessageShareData",
              "updateTimelineShareData",
              "onMenuShareAppMessage",
              "onMenuShareTimeline",
              "hideMenuItems"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.checkJsApi({
            jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
              console.log(res);
              // 分享给好友
              wx.onMenuShareAppMessage({
                title: '测试分享', // 分享标题
                desc: '测试分享', // 分享描述
                link: 'https://app.changenhealth.cn/login', // 分享连接
                imgUrl: '', // 分享图标
                trigger: function () {
                  // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                  // alert("用户点击发送给朋友");
                },
                success: function () {
                  alert("分享成功");
                  that.hideMask = "none";
                  that.clientCount = 0;
                  that.requestClientCount(0);
                },
                cancel: function () {
                  alert("分享失败");
                },
                fail: function () {
                  alert("分享失败");
                }
              });
              // 分享给朋友圈
              wx.onMenuShareTimeline({
                title: title,
                link: link,
                imgUrl: imgUrl,
                trigger: function () {
                  // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                  // alert("用户点击发送给朋友");
                },
                success: function () {
                  alert("分享成功");
                  setTimeout(function () {
                    //回调要执行的代码
                    that.hideMask = "none";
                    that.clientCount = 0;
                    that.requestClientCount(0);
                  }, 500);
                },
                cancel: function () {
                  alert("分享失败");
                },
                fail: function () {
                  alert("分享失败");
                }
              });
            }
          });
          //签名成功后调用的方法
          wx.ready(function () {
            //需在用户可能点击分享按钮前就先调用
            // alert("签名成功");
  
          });
          // 签名失败调用的接口
          wx.error(function () {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            alert("签名失败");
          });
        })
        .catch(error => {
          console.log("配置出错", error);
        });
    }
  };
  
  