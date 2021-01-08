// 因为每次ajax/post/get方法都需要提供很长的域名,因此封装此方法
$.ajaxPrefilter(function(options){
    options.url ='http://api-breakingnews-web.itheima.net'+options.url

    // 有一部分的接口需要有权限才能够发送请求,这类接口以/my/开头,在数据请求时需要有一个headers的属性
    if(options.url.indexOf('/my/')!==-1){ //不等于-1 说明url中包含/my/
        options.headers={
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete=function(res){
        // console.log(res);
        // complete函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if(res.responseJSON.status===1&&res.responseJSON.message=="身份认证失败！"){
            // 如果认证失败，强制删除缓存的token数据
            localStorage.removeItem('token')
            console.log(456);
        }
    }
// jquery  的ajax的回调函数一共有三种， 分别是success（成功时调用）/error（失败时调用）/complete（只要请求就会调用）
}) 

