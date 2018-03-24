<template>
  <div>
    <div class="title">Echarts Example</div>
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        echarts: {},
        option1: {
          tooltip: {},
          xAxis: {
            data: ['A', 'AA', 'FA', 'RUA', 'CC', 'DD']
          },
          yAxis: {},
          series: [{
            name: 'ruaruarua!',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
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
    }
  }
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
