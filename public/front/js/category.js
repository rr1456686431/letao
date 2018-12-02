$(function () {
    
    // 1.滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 2.渲染左侧
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        dataType:'json',
        success:function(info){
            console.log(info)
            var htmlStr = template('leftTpl',info)
            $('.category_left ul').html(htmlStr)
            renderById( info.rows[0].id );
        },

        
    });

    // 给左侧所有的a注册点击事件（事件委托）
    $('.category_left ul').on('click','a',function(){
        $('.category_left ul a ').removeClass('active')
        $(this).addClass('active')

        var id = $(this).data('id')
        console.log(id)
        renderById(id)
    });
    
    // 3.渲染右侧
    function renderById(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            dataType:'json',
            data:{
                id:id
            },
            success:function(info){
                console.log(info)
                var htmlStr = template('rightTpl',info)
                $('.category_right ul').html(htmlStr)
            }
        })
    };
});
