
// 公共的功能
// 进度条基本使用


// 开启进度条
// NProgress.start();
// 关闭进度条
// NProgress.done();
$(document).ajaxStart(function () {
    NProgress.start()
});
$(document).ajaxStop(function () {
    NProgress.done()
});

$(function () {
    // 公共的js部分
    // 1.左侧二级菜单切换
    $('.category').click(function () {
        $(this).next().stop().slideToggle()
    })
    // 2.左侧侧边栏切换
    $('.icon-left').click(function () {
        $('.lt_aside').toggleClass("hidemenu")
        $('.lt_header').toggleClass("hidemenu")
        $('.lt_main').toggleClass("hidemenu")
    })

    // 3.退出功能
    // 点击右侧按钮，显示模态框
    $('.icon-right').click(function () {
        $('#logoutModal').modal("show")
    })
    // 点击退出模态框的退出按钮，完成退出功能
    $('#logoutBtn').click(function () {
        // 发送ajax请求，让后台销魂当前用户的登录状态
        $.ajax({
            data: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    //退出成功，跳转登录页
                    location.href = 'login.html'
                }
            }
        })



    })












})