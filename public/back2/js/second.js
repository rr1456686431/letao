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
    };

    // 2.点击添加分类按钮，显示添加模态框

    $('#categoryBtn').click(function () {
        $('#addModal').modal('show')
        // 发送请求时，获取一级分类的全部数据
        // 通过写死page 和pageSize 模拟获取全部一级分类的接口
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info)
                var htmlStr = template('dropdownTpl', info)
                $('.dropdown-menu').html(htmlStr)
            }
        })

    });

    // 3.给下来列表的a添加点击事件，通过事件委托
    $('.dropdown-menu').on('click', 'a', function () {
        // 获取文本值
        var txt = $(this).text()
        // 设置给按钮   
        $('#dropdownText').text(txt)
        // 获取id
        var id = $(this).data('id')
        // 设置给隐藏域
        $('[name= "categoryId"]').val(id)
        // 调用updateStatus更新，隐藏域，校验状态成VALID
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
    });

    // 4.图片上传插件
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            // console.log(data.result);
            // 获取图片地址，赋值给url
            var picObj = data.result
            var picUrl = picObj.picAddr
            $('#imgBox img').attr('src', picUrl)

            // 5.给隐藏域设置图片地址
            $('[name = "brandLogo"]').val(picUrl)

            // 调用updateStatus更新，隐藏域，校验状态成VALID
            $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
        }
    });

    // 5.添加表单校验功能
    $('#form').bootstrapValidator({
        // 重置排除项，都校验，不排除
        excluded: [],
        //   指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 指定校验字段
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            }
        }
    });

    // 6.点击添加，关闭模态框，渲染页面
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: $('#form').serialize(),
            success: function (info) {
                console.log(info)
                $('#addModal').modal('hide')
                $('#form').data('bootstrapValidator').resetForm(true)
                currentPage = 1
                render()
                // 找到下拉菜单文本重置
                $('#dropdownText').text("请选择一级分类")

                // 找到图片重置
                $('#imgBox img').attr("src", "images/none.png")
            }
        })
    })

















})