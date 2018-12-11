# 使用步骤

github地址：https://github.com/blueimp/jQuery-File-Upload

中文文档：http://www.jq22.com/jquery-info230

## 引包

```html
<!-- jquery-fileupload依赖与jquery -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<!-- jquery ui小部件，上传插件依赖了jquery ui的小部件 -->
<script src="js/vendor/jquery.ui.widget.js"></script>
<!-- 如果上传图片需要跨域，那么需要引入这个js文件，如果不跨域，则不需要引入 -->
<script src="js/jquery.iframe-transport.js"></script>
<!-- jquery上传插件 -->
<script src="js/jquery.fileupload.js"></script>
```



## html结构

```html
<!-- name指定图片上传时的name属性 -->
<!-- data-url指定图片上传时的接口地址 -->
<!-- multiple指定多文件上传 -->
<input id="fileupload" type="file" name="files" data-url="server/php/" multiple>
```



## js代码

```javascript
$("#fileupload").fileupload({
      dataType:"json",
      //e：事件对象
      //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
      done:function (e, data) {
        console.log(data);
      }
});
```

