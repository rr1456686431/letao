// 数据实例化
$(function () {
    // 基于准备好的dom，初始化echarts实例
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    option1 = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name:'人数',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);


        // 基于准备好的dom，初始化echarts实例
        var echarts_right = echarts.init(document.querySelector('.echarts_right'));

        // 指定图表的配置项和数据
        option2 = {
            title : {
                text: '热门品牌销售',
                subtext: '2018年11月28日',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['阿迪','AJ','耐克','乔丹','回力']
            },
            series : [
                {
                    name: '销量',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'阿迪'},
                        {value:310, name:'AJ'},
                        {value:234, name:'耐克'},
                        {value:135, name:'乔丹'},
                        {value:1548, name:'回力'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        echarts_right.setOption(option2);



})