if (typeof jQuery === 'undefined') {
    throw new Error('jQuery is not loaded');
}

var  url=location.href;
    $.ajax({
        type : "get",
        url : "https://www.facto.com.cn/assets/jssdk.php?url="+url,
        dataType : "jsonp",
        jsonp: "callback",
        jsonpCallback:"success_jsonpCallback",
        success : function(data){
            console.log(data)
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'updateAppMessageShareData', //分享到朋友圈
                    'updateTimelineShareData',//分享给朋友
                ]
            });
        },
        error:function(data){
            alert("连接失败！");
        }
    });
  
    wx.ready(function () {
         
         //分享到朋友圈
     wx.updateTimelineShareData({
       title: 'Facto - 官方网站 | 通过数字解决方案，我们助力企业实现潜力价值增长。',
       link: url,
       imgUrl: 'https://www.facto.com.cn/static/wx-share.png',
       success: function (res) {
          
       }
     })
 		//分享给朋友
     wx.updateAppMessageShareData({
       title: 'Facto - 官方网站',
       desc: '通过数字解决方案，我们助力企业实现潜力价值增长。',
       link: url,
       imgUrl:  'https://www.facto.com.cn/static/wx-share.png',
       success: function (res) {
         
       }
     })
  
  
    });
    wx.error(function (res) {
        alert(res);
  
    });