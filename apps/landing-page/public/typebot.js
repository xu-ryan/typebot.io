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
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
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
       title: 'Typebot',
       link: url,
       imgUrl: 'https://bot.facto.com.cn/images/typebot.png',
       success: function (res) {
          
       }
     })
 		//分享给朋友
     wx.updateAppMessageShareData({
       title: 'Typebot',
       desc: 'Extremely flexible AI chatbot builder',
       link: url,
       imgUrl:  'https://bot.facto.com.cn/images/typebot.png',
       success: function (res) {
         
       }
     })
  
  
    });
    wx.error(function (res) {
        alert(res);
  
    });