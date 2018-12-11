$(function () {

    $.ajax({
        type:'get',
        url: '/product/queryProduct',
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlStr = template('productTpl', info);
            $('.product').html(htmlStr);
        }
    })


})