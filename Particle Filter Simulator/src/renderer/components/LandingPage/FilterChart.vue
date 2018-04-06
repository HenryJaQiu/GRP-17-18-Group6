<template>
  <div>
    <div class="title">Echarts Example</div>
    <div id="myChart" :style="{width: '450px', height: '350px'}"></div>
  </div>
</template>


<script>
  import {template} from '../../menu.js'
  const {remote} = require('electron')
  const math = require('mathjs')
  var matrixSpace = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
  const {Menu} = remote
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  export default {
    data () {
      return {
        echarts: {},
        option1: {
          xAxis: {
            data: matrixSpace
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
            data: null // wait for matrixXHAT
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
            data: null // wait for matrixTRUE
          }]
        }
      }
    },

    mounted () {
      this.initChart()
      this.drawChart()
    },
    methods: {
      initChart () {
        this.echarts = require('echarts')
        this.myChart = this.echarts.init(document.getElementById('myChart'))
      },
      loadMatrix () {
        console.log(this.convertDTO(this.$store.getters.getMatrixXhat))
        console.log(this.convertDTO(this.$store.getters.getMatrixTrue))
        this.option1.series[0].data = this.convertDTO(this.$store.getters.getMatrixXhat)
        this.option1.series[1].data = this.convertDTO(this.$store.getters.getMatrixTrue)
      },
      drawChart () {
        this.loadMatrix()
        this.myChart.setOption(this.option1)
      },
      convertDTO (mat) {
        var matSize = math.subset(math.size(mat), math.index(1))
        var matDTO = Array(matSize)
        for (let i = 0; i < matSize; i++) {
          matDTO[i] = mat.subset(math.index(0, i))
        }
        return matDTO
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
