$(function () {
    var currentPage = 1
    var pageSize = 5

    // 1.页面渲染
    render()

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
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

    // 2.控制模态框

    $('#categoryBtn').click(function () {
        $('#addModal').modal('show')
    })
    // 表单校验插件，会在表单提交时，进行校验
    // 如果通过校验，默认会进行提交，需要组织，通过ajax进行提交

    $("#form").bootstrapValidator({

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            categoryName: {
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    });

    // 使用了form= "form" 通过了校验，也不会提交了，可以省去e.prevebtDafault()
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/category/addTopCategory',
            datatype: 'json',
            data: $('#form').serialize(),
            success: function (info) {
                console.log(info)
                if (info.success) {
                    $('#addModal').modal('hide')
                    currentPage = 1
                    render()
                    // 重置表单
                    $('#form').data('bootstrapValitor').resetForm(true)
                }
            }
        })
    })

})