// 每次调用$.get() $.pose() $.ajax()前都会先调用这个函数
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    // 在发起真正的Ajax请求之前，同一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
        // console.log(options.url);

    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载 complete回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空 token
            localStorage.removeItem('token')
                // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})