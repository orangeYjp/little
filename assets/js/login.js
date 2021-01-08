$(function () {
        $('#link_reg').on('click',function () {
                $(this).parents('#mid_login').hide().siblings('#mid_reg').show()
              })
        $('#link_login').on('click',function () {
                $(this).parents('#mid_reg').hide().siblings('#mid_login').show()
        })
        // 若想给表单添加正则表达式需要先从layui获取form和verify
        var form = layui.form
        // layer 是layui的一个提示框,若想要使用需要先获取
        var layer =layui.layer
        form.verify({
                // input表单验证    lay-verify="required"为layui添加的必选验证
                    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
                    pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
                //     检测两次密码输入是否一致的规则
                    repwd:function (value) {  //此处value为形参,接收确认密码框中输入的值
                        //value的值为确认密码框中输入的值
                        // 通过形参拿到的是确认密码框种的内容
                        // 还需要拿到密码框种的内容,两次进行对比,,如果不同则返回一个错误提示
                        var pwd = $("#mid_reg [name=password]").val() //第一次输入密码框中的值
                        if(pwd!==value){
                                return '两次密码不一致'
                        }
                    }
                }) 
        // 接下来为注册表单注册事件,当注册成功后提示注册成功,并切换到登陆表单
        // 给注册框添加提交事件
        $('#mid_reg_fm').on('submit',function(e){
                // 阻止提交按钮的默认行为
                e.preventDefault()
                var data = $(this).serialize()
                console.log(data);
                $.post('/api/reguser',data,function(res){
                        console.log(res);
                        if(res.status!==0) {
                                return layer.msg(res.message)
                        }else {
                                layer.msg(res.message)
                        //手动触发去登录的点击事件
                         $('#link_login').click()
                        }
                })
        })
        
        // 监听登陆表单的提交事件
        $('#mid_login_fm').on('submit',function (e) {
                e.preventDefault()
                $.ajax({
                        method:'POST',
                        url:'/api/login',
                        data:$(this).serialize(),
                        success:function (res) {
                                console.log(res);
                                if(res.status!==0){ 
                                        return layer.msg('登陆失败')
                                }
                                layer.msg('登录成功!')
                                //将成功登录得到的token字符串保存到localStorage中
                                localStorage.setItem('token',res.token)
                                // 跳转到后台页面
                                location.href='/index.html'
                          }
                })
                })
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
          
  })