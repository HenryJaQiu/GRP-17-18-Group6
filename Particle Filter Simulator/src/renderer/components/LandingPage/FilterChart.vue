<!-- By Hejia Qiu -->
<template>
  <div>
    <div class="chart" id="myChart"></div>
    <div class="title" v-if="this.$store.getters.getIfImported">*Please click 'Refresh' to reload the Chart</div>
  </div>
</template>


<script>
  import {template} from '../../menu.js'
  // import source
  const {remote} = require('electron')
  const math = require('mathjs')
  var matrixSpace = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
  // import menu
  const {Menu} = remote
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  export default {
    data () {
      return {
        echarts: {},
        // set chart options
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
            // axisPointer
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
                yAxisIndex: 'none',
                title: {
                  zoom: 'Area Zooming',
                  back: 'Restore Area Zooming'
                }
              },
              dataView: {
                readOnly: true,
                title: 'Data View',
                lang: ['Data View', 'Close', 'Refresh']
              },
              restore: {
                title: 'Restore'
              },
              saveAsImage: {
                title: 'Save as Image',
                name: 'FilterImage',
                excludeComponents: ['dataZoom', 'toolbox']
              }
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
      this.$parent.initData()
    },
    methods: {
      initChart () {
        this.echarts = require('echarts')
        this.myChart = this.echarts.init(document.getElementById('myChart'))
      },
      loadMatrix () {
        this.option1.series[0].data = this.convertDTO(this.$store.getters.getMatrixXhat)
        this.option1.series[1].data = this.convertDTO(this.$store.getters.getMatrixTrue)
      },
      // Use Echarts's API with options to draw chart
      drawChart () {
        this.loadMatrix()
        this.myChart.setOption(this.option1)
        this.$store.commit('setIfImported', false)
      },
      // Transfer DenseMatrix to Array
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
  .chart {
    width: 450px;
    height: 350px;
    margin-left: -11%;
    margin-top: 2%
  }
</style>
