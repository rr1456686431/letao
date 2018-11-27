$(function () {
    // 基于准备好的dom，初始化echarts实例
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        
        series: [{
            name: '人数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        },{
            name: '人数',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
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
            subtext: '2018年11月27日',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['阿迪','耐克','回力','特步','AJ']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'阿迪'},
                    {value:310, name:'耐克'},
                    {value:234, name:'回力'},
                    {value:135, name:'特步'},
                    {value:1548, name:'AJ'}
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