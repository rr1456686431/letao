$(function () {
    var currentPage = 1
    var pageSize = 5
    // 获取用户id
    var currentId
    // 修改的状态
    var isDelete

    render()

    function render() {
        // 发送ajax请求
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            // dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var htmlStr = template('tmp', info)
                $('.lt_main tbody').html(htmlStr)

                // 使用分页插件
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        console.log(page);
                        currentPage = page
                        render()
                    }
                })
            }
        })
    };

    // 2.给所有的annual，添加点击事件（通过事件委托）
    $('tbody').on('click', '.btn', function () {
        // console.log('1111')
        // 显示模态框
        $('#userModal').modal('show')
        // 获取用户id
         currentId = $(this).parent().data('id')
        // 根据按钮类名，决定修改用户成什么状态
        // 禁用按钮？0:1；
         isDelete = $(this).hasClass('btn-danger') ? 0 : 1

    });
    // 模态框确认按钮被点击，发送ajax请求，进行修改用户状态
    $('#userBtn').click(function () {
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            dataType: 'json',
            data: {
                id:currentId ,
                isDelete: isDelete, 
            },
            success: function (info) {
                console.log(info)
                if (info.success) {
                    $('#userModal').modal('hide')
                    render()
                }
            }
        })
    })












})