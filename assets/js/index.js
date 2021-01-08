
//JavaScript代码区域
$(function(){
  var layer = layui.layer
  // layui.use('element', function(){
  //     var element = layui.element;
      
  //   });
    getUserInfo()
    //点击退出按钮，实现退出功能
    
// 因为每次有退出或直接关闭浏览器均需要执行函数，所以封装到baseAPI中
  // 监听登录表单的提交事件
    $('#btnLogout').on('click',function (e) {
        e.preventDefault()
        // 弹出layui的询问框，
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
          //do something
          //若点击确定，则需要清空本地存储的token，然后跳转页面到登陆界面
          localStorage.removeItem('token')
          // console.log(123);
          location.href="login.html"
          
          layer.close(index);
        });
      })
})
// 获取用户的个人用户信息
function getUserInfo (){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function (res) { 
          console.log(res);

            if(res.status!==0) return layui.layer.msg('获取用户信息失败')
            // layer.res.msg()  layui 的弹出框
            // 调用头像渲染方法
            renderAvatar(res.data)
         }

    })
}
// 渲染用户的头像
function renderAvatar(user) { 
    //判断用户是否设置昵称， 若没设置则默认为用户名
    var name = user.nickname||user.username
    // 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 当用户未上传头像时，使用name 的首字符文字头像，图片头像盒子隐藏，若永华上传了头像，则使用用户的头像，文字头像隐藏
    if(user.user_pic !==null){
        //$('.layui.nav.img').attr('src',user.user_pic)  为图片img 设置url属性为后台数据user.user_pic
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
}else{
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()

    }
 }