$(function () {
    // 1加载到主页后，先判断是否有昵称，进行图标切换
    // 1.1先对.vip进行修饰，vip的文本内容为用户名的首个字符
    var layer = layui.layer
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status == 0) {
                let str = res.data.username
                let newStr = str.substr(0, 1)
                $('.vip').html(newStr)
                $('#VIP').html(str)
                if (res.data.nickname == "") {
                    $('.vip').show()
                    $('.layui-nav-img').hide()
                } else {
                    $('.vip').hide()
                    $('.layui-nav-img').show()
                }
            }
        }
    })
    // 当点击退出按钮时，清除本地存储的token ,并将网页返回到login.html[界面，
    // $('#btnLogout').on('click',function(){
    //     console.log(456);
    //     localStorage.removeItem('token')
    //     location.href="/login.html"
    // })
    // 为退出后台添加询问框
    $('#btnLogout').on('click', function () {
        layer.confirm('确定要退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = "/login.html"
            layer.close(index);
        });
    })

})