// 公共的js

/*
    进度条
    NProgress.start()
    NProgress.done()

*/
$(document).on('click', function () {
    NProgress.start()
})
$(document).on('click', function () {
    NProgress.done()
})


$(function () {
    //1. 侧边栏下拉
    $('.category').click(function () {
        $(this).next().stop().slideToggle()   
    })
    //2. 左侧侧边栏切换
    $('.icon_left').click(function () {
        $('.lt_aside').toggleClass('hidemenu')
        $('.lt_header').toggleClass('hidemenu')
        $('.lt_main').toggleClass('hidemenu')
    })

    // 3.退出功能
    // 点击右侧按钮，显示模态框
    $('.icon_right').click(function () {
        $('#logoutModal').modal('show')
    })
    $('#logoutBtn').click(function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    location.href = 'login.html'
                }
            }
        })
    })













})