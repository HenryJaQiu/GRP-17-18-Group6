<template>
  <div>
    <div class="title">Echarts Example</div>
    <div id="myChart" :style="{width: '450px', height: '350px'}"></div>
  </div>
</template>


<script>
   import {template} from '../../menu.js'
   const {remote} = require('electron')
   var matrixHAT = [[1, -0.010400274], [2, 17.78367866], [3, 1.998126664], [4, 2.125066577], [5, 9.045655265], [6, -2.263150158], [7, -1.486251726], [8, -8.94276337], [9, -13.64800407], [10, -12.09988305]]
   var matrixTRUE = [[1, 0.977311356], [2, 18.35047756], [3, 3.256392619], [4, -1.181589658], [5, -16.5583134], [6, -6.918493812], [7, -0.205070382], [8, -12.40525515], [9, -14.84230392], [10, -13.44208877]]
   const {Menu} = remote
   const menu = Menu.buildFromTemplate(template)
   Menu.setApplicationMenu(menu)

export default {
     data () {
       return {
         echarts: {},
         option1: {
           xAxis: {
             data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
           },
           yAxis: {},
           dataZoom: [
             {
               type: 'slider',
               show: true,
               xAxisIndex: [0]
             },
             {
               type: 'slider',
               show: true,
               yAxisIndex: [0]
             }
           ],
           tooltip: {
             // axisPointer 指示器
             show: true,
             trigger: 'item',
             axisPointer: {
               type: 'cross',
               snap: true,
               opacity: 0.8
             }
           },
           toolbox: {
             show: true,
             orient: 'horizontal',
             feature: {
               dataZoom: {
                 yAxisIndex: 'none'
               },
               dataView: {
                 readOnly: true
               },
               restore: {},
               saveAsImage: {}
             }
           },
           series: [{
             name: 'xhat',
             type: 'line',
             itemStyle: {
               opacity: 0
             },
             lineStyle: {
               color: 'red',
               width: 1,
               type: 'solid'
             },
             data: matrixHAT
           },
           {
             name: 'xTrue',
             type: 'line',
             itemStyle: {
               opacity: 0
             },
             lineStyle: {
               color: 'grey',
               width: 1,
               type: 'dashed'
             },
             data: matrixTRUE
           }]
         }
       }
     },
     mounted () {
       this.drawLine()
     },
     methods: {
       drawLine () {
         this.echarts = require('echarts')
         this.myChart = this.echarts.init(document.getElementById('myChart'))
         this.myChart.setOption(this.option1)
       }
     } }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
