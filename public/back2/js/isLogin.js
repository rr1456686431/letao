
// 判断是否登录，需要则引入
$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function (info) {
        console.log(info);
        if (info.error === 400) {
            location.href = 'login.html'
        }
        if (info.success) {
            console.log('用户已登录');
        }
    }
})