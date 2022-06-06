$(function() {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清空本地存储的 token
            localStorage.removeItem('token')
                // 2.重新跳转到登录页面
            location.href = '/login.html'
                // 固定的和7行一起的固定格式
            layer.close(index);
        })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }

                // 调用 renderAvatar 渲染用户头像
                // 注意括号里的数据要传过来
                renderAvatar(res.data)
            }
            // 无论成功还是失败 都会调用complete函数
            // complete: function(res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 强制清空 token
            //         localStorage.removeItem('token')
            //             // 强制跳转到登录页面
            //         location.href = '/login.html'
            //     }
            // }
    })
}


// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户头像
    var name = user.nickname || user.username
        // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3.按需求渲染用户的头像(图片或文本头像)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
            // 获取名字的第一个字母并大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}