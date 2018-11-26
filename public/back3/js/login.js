$(function () {
    // 1.初始化表单校验插件
    $('#form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须为2-6'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须为6-12'
                    }
                }
            }
        }


    });

    // 2.当表单校验成功时，会触发success.form.bv事件
    // 通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info)
                if (info.error === 1000) {
                    alert('用户名不正确')
                }
                if (info.error === 1001) {
                    alert('密码错误')
                }
                if (info.success) {
                    location.href = 'index.html'
                }
            }
        })
    });


    // 3.重置表单
    // 重置表单中设置过校验的内容，将隐藏所有错误提示和图标。
    $("[type = 'reset']").on('click', function () {
        $('#form').data('bootstrapValidator').resetForm();
    })




















})