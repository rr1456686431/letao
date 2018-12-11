# 基于bootstrap的前端校验插件 

参考文档

+ http://blog.csdn.net/nazhidao/article/details/51542508
+ http://blog.csdn.net/u013938465/article/details/53507109
+ <http://www.cnblogs.com/v-weiwang/p/4834672.html?ptvd>
+ <http://bootstrapvalidator.votintsev.ru/api/>   官网: 英文版

## 引包

引入bootstrap-validator的css文件注意bootstrap-validator是bootstrap插件，因此依赖与bootstrap。

```css
  <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="lib/bootstrap-validator/css/bootstrapValidator.css">
```

引入js文件

```javascript
<script src="lib/jquery/jquery.js"></script>
<script src="lib/bootstrap/js/bootstrap.js"></script>
<script src="lib/bootstrap-validator/js/bootstrapValidator.js"></script>
```

## 初始化表单校验插件

> bootstrap-validator插件会在表单提交的时候进行校验，如果校验成功了，表单会继续提交，但是如果校验失败了，就会阻止表单的提交。

```javascript
//使用表单校验插件
$(formSelector).bootstrapValidator({
  //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  excluded: [':disabled', ':hidden', ':not(:visible)'],

  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    username: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        //长度校验
        stringLength: {
          min: 6,
          max: 30,
          message: '用户名长度必须在6到30之间'
        },
        //正则校验
        regexp: {
          regexp: /^[a-zA-Z0-9_\.]+$/,
          message: '用户名由数字字母下划线和.组成'
        }
      }
    },
  }

});
```

## 注册表单验证成功事件

当表单校验成功时，会触发`success.form.bv`事件，此时会提交表单，这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。

```javascript
$("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
});
```



## 常用方法

### 获取validator实例(对象)

当我们初始化好表单校验插件时，我们可以通过以下方法来获取表单校验的validator实例，通过validator实例调用一些方法来完成某些功能。

```javascript
var validator = $("#form").data('bootstrapValidator');  //获取表单校验实例

//使用表单校验实例可以调用一些常用的方法。
validator.methodName(params);
```



### 重置表单

重置表单中设置过校验的内容，将隐藏所有错误提示和图标。

```javascript
validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
```

### 更新字段的状态

BootstrapValidator在用户输入内容的时候，会做校验，当调用bootstrap的插件的方法可以手动会改变字段值的状态。可以使用`updateStatus(field, status, validatorName)`方法更新字段的状态

status的值有：

+ NOT_VALIDATED：未校验的
+ VALIDATING：校验中的
+ INVALID ：校验失败的
+ VALID：校验成功的。

