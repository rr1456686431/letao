$(function () {

    var currentPage = 1
    var pageSize = 2
    var picArr = [];
    render();
    // 1.渲染封装
    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                // 模板渲染
                var htmlStr = template('productTpl', info)
                $('.lt_main tbody').html(htmlStr)
                // 分页插件

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
    };

    //2. 弹出模态框
    $('#addBtn').click(function () {
        // 显示模态框
        $('#addModal').modal('show')
        // 查询2级分类，请求ajax
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 20
            },
            success: function (info) {
                console.log(info)
                var htmlStr = template('dropdownTpl', info)
                $('.dropdown-menu').html(htmlStr)

            }

        })
    });

    // 3.给a注册点击事件，通过id获取二级分类名称，赋值给隐藏域
    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text()
        var id = $(this).data('id')
        $('#dropdownText').text(txt)
        $('[name =" categoryId"]').val(id)
        // 重置隐藏
        $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
    });

    // 4.上传图片，
    $('#fileupload').fileupload({
        dataType: 'json',
        // e:事件对象
        // data：图片上上传后的对象，通过data，result，picAddr可以获取图片上传后的地址
        done: function (e, data) {
            console.log(data.result)
            var picObj = data.result
            var picAddr = picObj.picAddr
            // 
            picArr.unshift(picObj)
            // A.prepend(B); // 把 B 添加到 A中， 作为 A的 第一个子元素
            $('#imgBox').prepend('<img src="' + picAddr + '" style = "width:100px;">')
            if (picArr.length > 3) {
                picArr.pop()
                // 移除最后一张
                // 通过 last-of-type 找到imgBox盒子中最后一个 img 类型的标签, 让他自杀
                $('#imgBox img:last-of-type').remove()
            }
            // 如果处理后，图片数组的长度为3，说明已经选择了三张图片，可以进行提交，需要将表单picStatus的校验状态，设置成VALID
            if (picArr.length === 3) {
                $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID')
            }
        }
    });


    // 5. 配置表单校验
    $('#form').bootstrapValidator({
        // 将默认的排除项重置掉（默认会对 ：hidden disable 等进行排序）
        excluded: [],
        //   1.制定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 3.指定校验字段
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d$/,
                        message: '请输入非0开头的数字'
                    }

                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        messgae: '尺码格式，必须是xx-xx格式,列如 36-44'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品现价'
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请上传3张图片'
                    }
                }
            },
        }
    });

    //6.注册校验成功事件
    $('#form').on('success.form.bv', function (e) {
        // 组织默跳转
        e.preventDefault()
        // 表单提交得到的参数字串
        var params = $('#form').serialize()

        console.log(picArr)

        // 需要在参数的基础上拼接这些参数
        // brandId=
        // &proName=AJ
        // &proDesc=%E4%B8%91
        // &num=33
        // &size=33-44
        // &oldPrice=999
        // &price=99
        // &picStatus=
        params += '&picName1 = ' + picArr[0].picName + '&picAddr1=' + picArr[0].picAddr
        params += '&picName2 = ' + picArr[1].picName + '&picAddr2=' + picArr[1].picAddr
        params += '&picName3 = ' + picArr[2].picName + '&picAddr3=' + picArr[2].picAddr

        console.log(params)
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            dataType: 'json',
            data: params,
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $('#addModal').modal('hide')
                    // 重置模态框
                    $('#form').data('bootstrapValidator').resetForm(true)
                    $('#dropdownText').text('请选择二级分类')
                    $('#imgBox img').remove()
                    picArr = []
                    currentPage = 1
                    render()
                }

            }
        })

    })













})