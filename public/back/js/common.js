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
    NProGress.done()
});

// 