// 每次调用$.get() $.pose() $.ajax()前都会先调用这个函数
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    // 在发起真正的Ajax请求之前，同一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
        // console.log(options.url);
})