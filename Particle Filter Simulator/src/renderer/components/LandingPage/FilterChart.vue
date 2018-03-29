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
    export default {
      data () {
        return {
          input: '',
          path: '',
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
              data: [-0.010400274, 17.78367866, 1.998126664, 2.125066577, 9.045655265, -2.263150158, -1.486251726, -8.94276337, -13.64800407, -12.09988305]
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
              data: [0.977311356, 18.35047756, 3.256392619, -1.181589658, -16.5583134, -6.918493812, -0.205070382, -12.40525515, -14.84230392, -13.44208877]
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
        newFile () {
          const editor = this.$refs.codemirror.editor

          // is newFile
          if (!this.path && editor.isClean()) {
            return
          }

          // is not modify
          if (this.path && !editor.isClean()) {
            this.clean()
            return
          }

          let response = this.modifyDialog()
          switch (response) {
            // Yes
            case 0:
              this.saveFile()
              break
              // No
            case 1:
              this.clean()
              break
          }
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
        modifyDialog () {
          const remote = this.$electron.remote
          const dialog = remote.dialog
          const browserWindow = remote.BrowserWindow
          const focusedWindow = browserWindow.getFocusedWindow()

          let response = dialog.showMessageBox(focusedWindow, {
            title: '',
            type: 'warning',
            buttons: ['Yes', 'No', 'Cancel'],
            detail: 'Wolud you like to save changes?'
          })

          return response
        },
        saveFile () {
          if (this.path) {
            this.setPath(this.path)
            this.writeFile()
          } else {
            let savePath = this.saveAsDialog()
            if (savePath) {
              this.setPath(savePath)
              this.writeFile()
            }
          }
        },
        saveAs () {
          const self = this
          let savePath = this.saveAsDialog()

          if (savePath) {
            self.setPath(savePath)
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
        dropFile (file, ext) {
          const self = this
          const remote = this.$electron.remote
          const dialog = remote.dialog
          const browserWindow = remote.BrowserWindow
          const focusedWindow = browserWindow.getFocusedWindow()

          if (file.type === 'text/plain' || file.type === 'application/text' || ext === 'txt' || ext === 'md') {
            self.readFile(file.path)
          } else {
            dialog.showMessageBox(focusedWindow, {
              title: 'error',
              type: 'error',
              buttons: ['OK'],
              detail: 'This file format is not supported.'
            })
          }
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
