$(function () {
    console.log(111);
    // 页面加载时获取用户信息，填充到内容中
    // $.ajax({
    //     method:'GET',
    //     url:'/my/userinfo',
    //     function (res) {
    //         console.log(2222);
    //         console.log(res.data);
    //       }
        
    // })
    
    // 给表单注册提交事件，并阻止提交按钮的默认行为
//     $("#user_t").submit(function (e) {
//         e.preventDefault()
//         console.log(123);
//       })
  })
  getUserInfo()
  console.log(333);
  function getUserInfo (){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function (res) { 
          console.log(res);

            if(res.status!==0) return layui.layer.msg('获取用户信息失败')
            // layer.res.msg()  layui 的弹出框
            // 调用头像渲染方法
            // renderAvatar(res.data)
         }

    })
}