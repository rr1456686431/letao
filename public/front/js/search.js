
$(function () {
    // 功能分析
    // 1. 获取所有搜索历史, 完成渲染
    // 2. 删除单个搜索历史
    // 3. 清空所有搜索历史
    // 4. 添加单个搜索历史

    /*
  * 功能1: 渲染功能
  * (1) 获取本地历史, 得到jsonStr
  * (2) 将jsonStr转成数组
  * (3) 根据模板引擎渲染  template( id, 对象 )
  * */

    render();
    //   获取本地历史的数组
    function getHistory() {
        var jsonStr = localStorage.getItem("search_list") || '[]';
        var arr = JSON.parse(jsonStr);
        return arr;
    };

    // 获取本地历史的数组，并且根据数组进行渲染
    function render() {
        var arr = getHistory()
        var htmlStr = template('historyTpl', { list: arr })
        $('.history').html(htmlStr)

    };
    /*
    * 功能2: 清空所有
    * (1) 给清空所有添加点击事件 (事件委托)
    * (2) 利用removeItem 清除 search_list
    * (3) 重新渲染
    * */

    $('.history').on('click', 'btn_empty', function () {
        // 添加确认框
        // 参数1: 确认框的内容
        // 参数2: 确认框的标题
        // 参数3: 按钮的文本数组
        // 参数4: 关闭模态框的回调函数
        mui.confirm('你确定要清空历史记录吗？', '温馨提示', ['取消', '确认'], function (e) {
            if (e.index === 1) {
                localStorage.removeItem('search_list')
                render()
            }
        })

    });

    /*
    * 功能3: 删除单个记录
    * (1) 给所有的删除按钮添加点击事件 (事件委托)
    * (2) 获取数组, 根据下标, 将数组对应项删除
    * (3) 将数组转成 jsonStr, 存储到本地
    * (4) 重新渲染
    * */
    $('.history').on('click', 'btn_delete', function () {
        var arr = getHistory()
        var index = $(this).data('index')
        arr.splice(index, 1)
        localStorage.setItem('search_list', JSON.stringifty(arr))
        render()
    })

    /*
   * 功能4: 添加单个历史记录
   * (1) 给搜索按钮, 添加点击事件
   * (2) 获取搜索关键字
   * (3) 获取数组, 往数组最前面追加  unshift
   * (4) 转成 jsonStr, 存储到本地存储中
   * (5) 重新渲染
   * */
    $('.search_btn').click(function () {
        var key = $('.search_input').val().tirm()
        if (key === '') {
            mui.totast('请输入搜索关键字')
            return
        }
        var arr = getHistory()
        var index = arr.indexOf(key)
        if (index !== -1) {
            arr.splice(inex, -1)
        }
        if (arr.length >= 10) {
            arr.pop()
        }
        arr.unshift(key)
        localStorage.setItem('search_list', JSON.stringifty(arr))
        render()
        $('.sarch_input').val('')
        location.href = 'searchList.html?key = ' + key

    })






})