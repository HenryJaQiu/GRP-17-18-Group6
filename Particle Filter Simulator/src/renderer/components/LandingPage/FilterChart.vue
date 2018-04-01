<template>
  <div>
    <div class="title">Echarts Example</div>
    <div id="myChart" :style="{width: '450px', height: '350px'}"></div>
  </div>
</template>


<script>
    const fs = require('fs')
    const math = require('mathjs')
    const Menu = require('../../menu.js')
    var matrix = math.matrix([[7, 1], [-2, 3]])
    var mycars = [2, 3, 4]

    var matrixHAT = [[1, -0.010400274], [2, 17.78367866], [3, 1.998126664], [4, 2.125066577], [5, 9.045655265], [6, -2.263150158], [7, -1.486251726], [8, -8.94276337], [9, -13.64800407], [10, -12.09988305]]
    var matrixTRUE = [[1, 0.977311356], [2, 18.35047756], [3, 3.256392619], [4, -1.181589658], [5, -16.5583134], [6, -6.918493812], [7, -0.205070382], [8, -12.40525515], [9, -14.84230392], [10, -13.44208877]]

    export default {
      data () {
        return {
          input: '',
          path: '',
          echarts: {},
          option1: {
            xAxis: {
              type: 'value',
              min: 1,
              max: 10
              // data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
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
                // Image Save Settings
                saveAsImage: {
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
            }]
          }
        }
      },
      mounted () {
        this.drawLine()
        Menu.togglePreview = this.togglePreview
        Menu.openFile = this.openFile
        Menu.saveFile = this.saveFile
        Menu.saveAsFile = this.saveAs
        Menu.ready()
        this.openLinkExternal()
      },
      methods: {
        drawLine () {
          this.echarts = require('echarts')
          this.myChart = this.echarts.init(document.getElementById('myChart'))
          this.myChart.setOption(this.option1)
        },
        openDialog (type, msg) {
          const remote = this.$electron.remote
          const dialog = remote.dialog
          const browserWindow = remote.BrowserWindow
          const focusedWindow = browserWindow.getFocusedWindow()

          dialog.showMessageBox(focusedWindow, {
            title: type,
            type: type,
            buttons: ['OK'],
            detail: msg
          })
        },
        openFile () {
          const self = this
          const remote = this.$electron.remote
          const dialog = remote.dialog
          const browserWindow = remote.BrowserWindow
          const focusedWindow = browserWindow.getFocusedWindow()

          dialog.showOpenDialog(focusedWindow, {
            title: 'Open Dialog',
            filters: [{
              name: 'Documents',
              extensions: ['json']
            }],
            properties: ['openFile']
          }, function (item) {
            if (item) {
              self.readFile(item[0])
            }
          })
        },
        readFile (path) {
          const self = this

          fs.readFile(path, 'utf8', function (err, content) {
            if (err === null) {
              var data = JSON.parse(content)
              var ob = data.matrix
              console.log(mycars)
              matrix = ob
              mycars = data.car
              self.setPath(path)
            } else {
              self.openDialog('error', err.toString())
            }
          })
        },
        saveAsDialog () {
          const remote = this.$electron.remote
          const dialog = remote.dialog
          const browserWindow = remote.BrowserWindow
          const focusedWindow = browserWindow.getFocusedWindow()

          let savePath = dialog.showSaveDialog(focusedWindow, {
            title: 'Save Dialog',
            filters: [
              {name: 'Text file', extensions: ['json']}
            ]
          })

          return savePath
        },
        saveFile () {
          let savePath = this.saveAsDialog()
          if (savePath) {
            this.setPath(savePath)
            this.writeFile()
          }
        },
        writeFile () {
          const self = this
          try {
            let error
            var json = {'matrix': matrix, 'car': mycars}
            fs.writeFile(self.path, JSON.stringify(json, null, 4), function (err) {
              error = err
            })

            if (!error) {
              return true
            }
          } catch (e) {
            self.openDialog('error', e)
            return false
          }

          return false
        },
        setPath (path) {
          this.path = path
        },
        clean () {
          this.setEditor('')
          this.setPath('')
        },
        openLinkExternal () {
          const electron = this.$electron
          const window = electron.remote.getCurrentWindow()

          document.addEventListener('click', function (e) {
            let target = e.target
            let href = target.getAttribute('href')

            if (target.tagName !== 'A' && !href) {
              return
            }

            if (href.substring(0, 4) === 'http') {
              e.preventDefault()
              // get status
              let status = window.isAlwaysOnTop()
              // on top
              window.setAlwaysOnTop(true)
              // open link
              electron.shell.openExternal(target.href)
              // restore
              if (!status) {
                setTimeout(function () {
                  window.setAlwaysOnTop(false)
                }, 1000)
              }
            }
          })
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
