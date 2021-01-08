$(function () {  
    // 去注册
    $('.go_msg_a').click(function () {
        $('.at_login').hide()
        $('.at_msg').show()
      })
    //   去登录
      $('.go_login_a').click(function () { 
        $('.at_login').show()
        $('.at_msg').hide()
       })
    //    为表单做表单验证
    // 3位以上的英文/数字/
    var form= layui.form
    var layer = layui.layer
    form.verify({
        // 密码
        pwd :[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function (value) { 
            // 将获取到的确认密码与第一个密码框中的密码进行比较,若相同则通过
            var one_pwd =$('.one_pwd ').val()
            if(value!==one_pwd){
                return('两次面不一致')
            }
         }
    })
    // 为注册表单绑定提交事件,并阻止提交按钮的默认行为
    $('.at_msg').submit(function (e) {
        e.preventDefault()
        var data =$(this).serialize()
        //发送ajax请求
        $.ajax({
            method: 'POST',
            url:'/api/reguser',
            data,
            success:function (res) {
                console.log(res);
                if(res.status!==0) {
                    return layer.msg(res.message)
                }else {
                   layer.msg(res.message)
                //   当注册成功后,跳转到登录表单  因此手动触发go_msg_a点击事件
                $('.go_login_a').click()
                }
              }
        })
      })
    //   为登录表单绑定提交事件,并阻止提交按钮的默认行为
      $('.at_login').submit(function (e) {
        e.preventDefault()
        var data =$(this).serialize()
        //发送ajax请求
        $.ajax({
            method: 'post',
            url:'/api/login',
            data,
            success:function (res) {
                console.log(res);
                if(res.status!==0) {
                    return layer.msg(res.message)
                }else {
                   layer.msg(res.message)
                //  登录成功时会有一个token 将token存储到本地存储中,之后跳转到对应的index中
                localStorage.setItem('token',res.token)
                    location.href ="/index.html"
                }
              }
        })
      })
})