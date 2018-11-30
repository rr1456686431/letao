$(function () {

    var currentPage = 1
    var pageSize = 5
    render()
    // 渲染页面
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            dataTye: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            success: function (info) {
                console.log(info)
                var htmlStr = template('addTpl', info)
                $('.lt_main tbody').html(htmlStr)

                // 3.分页插件.

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填  
                    currentPage: info.page, //当前页 
                    totalPages: Math.ceil(info.total / info.size), //总页数 
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值  
                        currentPage = page
                        render()
                    }
                });
            }
        })
    }
    // 添加模态框

    $('#categoryBtn').click(function () {
        $('#addModal').modal('show')
    })















})