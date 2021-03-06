

$(function () {


/*
   1. 校验规则：
        1. 用户名不能为空
        2. 用户密码不能为空
        3. 用户密码长度为6-12位

*/
    $('#form').bootstrapValidator({
        // 设置小图标

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
    
    
        // 设置校验规则
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名为2-6位"
                    },
                    callback: {
                        message:"用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码为6-12位'
                    },
                    callback: {
                        message:"密码不正确"
                    }
                }
            }
        }
    });

    // 2.表单校验成功,注册表单校验成功的事件，阻止默认提 交，使用ajax提交
    $('#form').on('success.form.bv', function (e) {
        // 阻止表单默认提交
        e.preventDefault()
        // console.log( "默认的表单提交被阻止了, 通过ajax来提交" )
        // 使用ajax进行提交
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info)  
                if (info.error === 1000) {
                    // alert('用户名不正确')
                    // 更新当前input的校验状态，更新成失败
                    // updateStatus
                    // 参数1：filed 字段名称
                    // 参数2：status状态 NOT_VALIDATED (未校验),VALIDATING（校验中）, INVALID（校验失败） or VALID（检验成功）
                    // 参数3：validator 配置校验规则，用来配置输出的提示信息
                    $("#form").data('bootstrapValidator').updateStatus("username","INVALID","callback")
                    return
                }
                if (info.error === 1001) {
                    // alert('密码不正确')
                    $('#form').data('bootstrapValidator').updateStatus("password","INVALID","callback")
                    return
                }
                if (info.success) {
                    // 登录成功
                    location.href  = "index.html"
                }
            }
        })
    })

    // 3. 重置功能, 本身重置按钮, 就可以重置内容, 需要额外的重置状态
    $("[type = 'reset']").on('click', function () {
        // 重置表单样式
        $('#form').data('bootstrapValidator').resetForm()
    })



})