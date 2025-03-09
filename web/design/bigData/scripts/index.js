var symptomName = last_month_day();

$(function(){


  init();
  init2();
    $("#el-dialog").addClass("hide");
  $(".close").click(function(event) {
    $("#el-dialog").addClass("hide");
  });

  var date = new Date();
     var numble = date.getDate();
     var today = getFormatMonth(new Date());
     $("#date1").html(today);
     $("#date2").html(today);
     $("#date3").html(today);
     $("#date4").html(today);


  lay('.demo-input').each(function(){
     laydate.render({
        type: 'month',
         elem: this,
         trigger: 'click',
         theme: '#95d7fb',
         calendar: true,
         showBottom: true,
         done: function () {
            console.log( $("#startDate").val())

         }
     })
 });

})
function init(){
  //地图
  var mapChart = echarts.init(document.getElementById('mapChart'));
  mapChart.setOption({
      bmap: {
          center: [118.096435,24.485408],
          zoom: 12,
          roam: true,

      },
      tooltip : {
          trigger: 'item',
          formatter:function(params, ticket, callback){
              return params.value[2]
          }
      },
      series: [{
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: [
            [118.096435, 24.485408, '厦门市'] ,
            [118.094564, 24.457358, '厦门第一医院'] ,
            [118.104103, 24.477761, '厦门中山医院'],
            [118.14748, 24.506295, '厦门中医院'],
            [118.254841, 24.665349, '厦门第五医院'],
           ]
      }]
  });
  mapChart.on('click', function (params) {
      $("#el-dialog").removeClass('hide');
      $("#reportTitle").html(params.value[2]);
  });

  var bmap = mapChart.getModel().getComponent('bmap').getBMap()
  bmap.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP ]}));
  bmap.setMapStyle({style:'midnight'})


var pieChart1 = echarts.init(document.getElementById('pieChart1'));
pieChart1.setOption({
  color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6", "#ffd700"], // 新增一个颜色
  
  legend: {
    y: '260',
    x: 'center',
    textStyle: {
      color: '#ffffff',
    },
    data: ['无症状','Ⅰ期','Ⅱ期','Ⅲ期','Ⅳ期'], // 修改图例
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a}<br/>{b}<br/>{c}例 ({d}%)" // 修改单位：G→例
  },
  calculable: false,
  series: [{
    name: '病例分期比例', // 修改系列名称
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['50%', '45%'],
    itemStyle: {
      normal: {
        label: { show: false },
        labelLine: { show: false }
      },
      emphasis: {
        label: {
          show: true,
          position: 'center',
          textStyle: { fontSize: '20', fontWeight: 'bold' }
        }
      }
    },
    data: [
      // 按从大到小排列（数值可自定义）
      { value: 600, name: '无症状' },
      { value: 400, name: 'Ⅰ期' },
      { value: 300, name: 'Ⅱ期' },
      { value: 200, name: 'Ⅲ期' },
      { value: 100, name: 'Ⅳ期' }
    ].sort((a, b) => b.value - a.value) // 强制从大到小排序
  }]
});


var lineChart = echarts.init(document.getElementById('lineChart'));
lineChart.setOption({
  color: ["#87cefa", "#ff69b4"], // 蓝色代表男性，粉色代表女性
  
  legend: {
    y: '260',
    x: 'center',
    textStyle: { color: '#ffffff' },
    data: ['男性', '女性'] // 图例改为性别
  },
  
  calculable: false,
  
  tooltip: {
    trigger: 'item',
    formatter: "{a}<br/>{b}<br/>{c}人" // 单位从"条"改为"人"
  },
  
  yAxis: [{
    type: 'value',
    axisLine: { 
      lineStyle: { color: '#034c6a' },
      onZero: false 
    },
    axisLabel: {
      textStyle: { color: '#fff' },
      formatter: function (value) {
        return value + "人" // y轴单位修改
      }
    },
    splitLine: { lineStyle: { width: 0 } }
  }],
  
  xAxis: [{
    type: 'category',
    data: ['无症状', 'Ⅰ期', 'Ⅱ期', 'Ⅲ期', 'Ⅳ期'], // x轴改为疾病分期
    axisLine: { lineStyle: { color: '#034c6a' } },
    axisLabel: { textStyle: { color: '#fff' } },
    splitLine: { show: false }
  }],
  
  grid: {
    left: '5%',
    right: '5%',
    bottom: '20%',
    containLabel: true
  },
  
  series: [
    // 男性数据系列
    {
      name: '男性',
      type: 'line',
      smooth: true,
      itemStyle: {
        normal: {
          lineStyle: { shadowColor: 'rgba(0,0,0,0.4)' },
          color: '#87cefa' // 蓝色线条
        }
      },
      // 数据样例：男性在各分期的数量（单位：人）
      data: [1200, 800, 600, 400, 200] 
    },
    // 女性数据系列
    {
      name: '女性',
      type: 'line',
      smooth: true,
      itemStyle: {
        normal: {
          lineStyle: { shadowColor: 'rgba(0,0,0,0.4)' },
          color: '#ff69b4' // 粉色线条
        }
      },
      // 数据样例：女性在各分期的数量（单位：人）
      data: [1000, 750, 550, 350, 150] 
    }
  ]
});
    var histogramChart = echarts.init(document.getElementById('histogramChart'));
    histogramChart.setOption({
      color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6"], // 保持4个颜色对应4个年龄段
      
      legend: {
        y: '250',
        x: 'center',
        data: ['0-25岁', '25-45岁', '45-65岁', '65+岁'], // 修改图例为年龄段
        textStyle: { color: '#ffffff' }
      },
    
      grid: {
        left: '5%',
        right: '5%',
        bottom: '20%',
        containLabel: true
      },
    
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function(params) { // 优化提示信息
          let res = params[0].name + '<br>';
          params.forEach(item => {
            res += `${item.marker} ${item.seriesName}: ${item.value}人<br>`;
          });
          return res;
        }
      },
    
      xAxis: [{
        type: 'value',
        name: '人数', // 添加单位
        axisLabel: { color: '#fff' },
        splitLine: { lineStyle: { color: '#f2f2f2', width: 0 } }
      }],
    
      yAxis: [{
        type: 'category',
        // 修改为五个疾病分期（注意数据顺序影响显示顺序）
        data: ['Ⅳ期', 'Ⅲ期', 'Ⅱ期', 'Ⅰ期', '无症状'], // 从重到轻排列
        axisLabel: { color: '#fff' },
        splitLine: { lineStyle: { width: 0 } }
      }],
    
      series: [
        // 每个系列对应一个年龄段
        {
          name: '0-25岁',
          type: 'bar',
          stack: '总量',
          itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
          data: [20, 35, 80, 120, 200] // 数据样例（按yAxis顺序：Ⅳ期到无症状）
        },
        {
          name: '25-45岁',
          type: 'bar',
          stack: '总量',
          itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
          data: [45, 68, 150, 240, 350]
        },
        {
          name: '45-65岁',
          type: 'bar',
          stack: '总量',
          itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
          data: [80, 120, 280, 380, 480]
        },
        {
          name: '65+岁',
          type: 'bar',
          stack: '总量',
          itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
          data: [120, 180, 320, 450, 600] // 假设老年患者最多
        }
      ]
    });

var lineChart2 = echarts.init(document.getElementById('lineChart2'));
   lineChart2.setOption({
     color: ["#87cefa", "#ff69b4"], // 蓝色-男性，粉色-女性
     
     legend: {
       y: '260',
       x: 'center',
       textStyle: { color: '#ffffff' },
       data: ['男性', '女性'] // 图例改为性别
     },
     
     tooltip: {
       trigger: 'item',
       formatter: "{a}<br/>{b}<br/>危机度: {c}%" // 优化提示信息
     },
     
     yAxis: [{
       type: 'value',
       min: 0,
       max: 99,
       axisLine: { 
         lineStyle: { color: '#034c6a' },
         onZero: false 
       },
       axisLabel: {
         textStyle: { color: '#fff' },
         formatter: function (value) {
           return value + "%" // y轴显示百分比
         }
       },
       splitLine: { lineStyle: { width: 0 } }
     }],
     
     xAxis: [{
       type: 'category',
       // 按生命周期排序（需要与数据顺序对应）
       data: ['0-25岁', '25-45岁', '45-65岁', '65+岁'], 
       axisLine: { lineStyle: { color: '#034c6a' } },
       axisLabel: { 
         textStyle: { color: '#fff' },
         rotate: 30 // x轴标签倾斜30度
       },
       splitLine: { show: false }
     }],
     
     grid: {
       left: '5%',
       right: '5%',
       bottom: '30%', // 增大底部间距适应倾斜标签
       containLabel: true
     },
     
     series: [
       // 男性数据（中年＞老年＞青年）
       {
         name: '男性',
         type: 'line',
         smooth: true,
         itemStyle: {
           normal: {
             lineStyle: { 
               width: 3,
               shadowColor: 'rgba(0,0,0,0.4)'
             }
           }
         },
         data: [32, 85, 68,34] // 青年32%，中年85%，老年68%
       },
       // 女性数据（中年＞老年＞青年）
       {
         name: '女性',
         type: 'line',
         smooth: true,
         itemStyle: {
           normal: {
             lineStyle: { 
               width: 3,
               shadowColor: 'rgba(0,0,0,0.4)'
             }
           }
         },
         data: [28, 78, 62,40] // 青年28%，中年78%，老年62%
       }
     ]
   });



}

function init2(){
  var lineChart3 = echarts.init(document.getElementById('lineChart3'));
  lineChart3.setOption({

    color:["#87cefa","#ff7f50",],
    legend: {
        y : 'top',
        x : 'center',
        textStyle : {
            color : '#ffffff',

        },
         data : ['门诊人次','住院人次'],
    },
    calculable : false,
    tooltip : {
        trigger: 'item',
        formatter: "{a}<br/>{b}<br/>{c}人"
    },
    dataZoom: {
         show: true,
         realtime : true,
         start: 0,
         end: 18,
         height: 20,
         backgroundColor: '#f8f8f8',
         dataBackgroundColor: '#e4e4e4',
         fillerColor: '#87cefa',
         handleColor: '#87cefa',
     },
    yAxis: [
          {
              type: 'value',
              axisLine : {onZero: false},
              axisLine:{
                  lineStyle:{
                      color: '#034c6a'
                  },
              },

              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "人"
                  },
              },
              splitLine:{
                  lineStyle:{
                      width:0,
                      type:'solid'
                  }
              }
          }
      ],
      xAxis: [
          {
              type: 'category',
              data : symptomName,
              boundaryGap : false,
              axisLine:{
                  lineStyle:{
                      color: '#034c6a'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + ""
                  },
              },
              splitLine:{
                  lineStyle:{
                      width:0,
                      type:'solid'
                  }
              },
          }
      ],
      grid:{
              left: '5%',
              right: '5%',
              bottom: '20%',
              containLabel: true
      },
      series : [
        {
            name:'门诊费用',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        shadowColor : 'rgba(0,0,0,0.4)'
                    }
                }
            },
            data:[1150, 180, 2100, 2415, 1212.1, 3125,1510, 810, 2100, 2415, 1122.1, 3215,1510, 801, 2001, 2245, 1232.1, 3245,1520, 830, 2200, 2145, 1223.1, 3225,150, 80, 200, 245, 122.1, 325]
        },
        {
            name:'住院费用',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        shadowColor : 'rgba(0,0,0,0.4)'
                    }
                }
            },
            data:[2500, 1000, 3000, 5005, 3200.1, 3005, 2500, 1000, 3000, 5005, 3200.1, 3005,2500, 1000, 3000, 5005, 3200.1, 3005,2500, 1000, 3000, 5005, 3200.1, 3005, 2500, 1000, 3000, 5005, 3200.1, 3005,2500, 1000, 3000, 5005, 3200.1, 3005,]
        },
    ]
  });


  var lineChart4 = echarts.init(document.getElementById('lineChart4'));
  lineChart4.setOption({

    color:["#87cefa","#ff7f50",],
    calculable : false,
    tooltip : {
        trigger: 'item',
        formatter: "{a}<br/>{b}<br/>{c}元"
    },
    dataZoom: {
         show: true,
         realtime : true,
         start: 0,
         end: 18,
         height: 20,
         backgroundColor: '#f8f8f8',
         dataBackgroundColor: '#e4e4e4',
         fillerColor: '#87cefa',
         handleColor: '#87cefa',
     },
    yAxis: [
          {
              type: 'value',
              axisLine : {onZero: false},
              axisLine:{
                  lineStyle:{
                      color: '#034c6a'
                  },
              },

              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "元"
                  },
              },
              splitLine:{
                  lineStyle:{
                      width:0,
                      type:'solid'
                  }
              }
          }
      ],
      xAxis: [
          {
              type: 'category',
              data : symptomName,
              boundaryGap : false,
              axisLine:{
                  lineStyle:{
                      color: '#034c6a'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + ""
                  },
              },
              splitLine:{
                  lineStyle:{
                      width:0,
                      type:'solid'
                  }
              },
          }
      ],
      grid:{
              left: '5%',
              right: '5%',
              bottom: '20%',
              containLabel: true
      },
      series : [
        {
            name:'医疗费用',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        shadowColor : 'rgba(0,0,0,0.4)'
                    }
                }
            },
            data:[1500, 800, 1200, 2450, 1122.1, 1325,1150, 180, 1200, 1245, 1122.1, 1325,150, 180, 1200, 2145, 1212.1, 3215,1510, 180, 2100, 2415, 122.1, 325,150, 80, 200, 245, 122.1, 325].reverse()
        },
    ]
  });

  //年龄分布
  var pieChart2 = echarts.init(document.getElementById('pieChart2'));
  pieChart2.setOption({
    color:["#32cd32","#ff7f50","#87cefa","#FD6C88","#4b5cc4","#faff72"],
    tooltip : {
     trigger: 'item',
     formatter: "{a}<br/>{b}<br/>{c}人"
    },
    calculable : true,
    series : [
        {
            name:'发病人数',
            type:'pie',
            radius : [30, 110],
            center : ['50%', '50%'],
            roseType : 'area',
            x: '50%',



            sort : 'ascending',
            data:[
                {value:10, name:'婴儿(1-3岁)'},
                {value:5, name:'少儿(4-10岁)'},
                {value:15, name:'少年(10-18岁)'},
                {value:25, name:'青年(18-45岁)'},
                {value:125, name:'中年(45-60岁)'},
                {value:175, name:'老年(60岁以上)'},
            ]
        }
    ]
  })

  //医疗费用组成
  var pieChart3 = echarts.init(document.getElementById('pieChart3'));
  pieChart3.setOption({
    color:["#32cd32","#ff7f50","#87cefa","#FD6C88","#4b5cc4","#faff72"],
    tooltip : {
     trigger: 'item',
     formatter: "{a}<br/>{b}<br/>{c}元"
    },
    calculable : true,
    series : [
        {
            name:'发病人数',
            type:'pie',
            radius : [30, 110],
            center : ['50%', '50%'],
            roseType : 'area',
            x: '50%',



            sort : 'ascending',
            data:[
                {value:10, name:'诊察费用'},
                {value:500, name:'检查费用'},
                {value:150, name:'检验费用'},
                {value:250, name:'西药费用'},
                {value:125, name:'中药费用'},
                {value:1750, name:'手术费用'},
            ]
        }
    ]
  })
}
