$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify() 函数自定义效验规则
    form.verify({
        // 自定义pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            // 父级名字[子属性对应名字].val拿到密码框的内容
            var pwd = $('.reg-box [name=password]').val()
                // console.log('pwd');
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message)
            }
            // console.log('注册成功');
            layer.msg('注册成功,请登录!')
                // 注册成功后，模拟人点击行为跳转到登录界面
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    // console.log(res.token);
                    // 将登录成功得到的token字符串,保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 登录成功跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})