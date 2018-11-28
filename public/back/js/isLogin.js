// 发送请求，查询用户是否登录，如果没有登录，返回登录页
$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function (info) {
        console.log(info);
        if (info.error === 400) {
            // 拦截到登录页
            location.href = 'login.html'
        }
        if (info.success) {
            console.log('当前用户已登录');
        }
    }
})
