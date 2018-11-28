$(function () {
    var page = 1
    var pageSize = 5
    render()

    function render() {

        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            // dataType: 'json',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var htmlStr = template('tmp', info)
                $('.lt_main tbody').html(htmlStr)


                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page
                        render()
                    }
                })
            }
        })
    }
})