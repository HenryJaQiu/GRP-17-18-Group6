<template>
  <div>
    <div class="container">
      <div class='input' v-for = "item in a">{{item}}

      </div>

    </div>
  </div>
</template>

<script>
const fs = require('fs')
const math = require('mathjs')
const Menu = require('../modules/menu.js')
var matrix = math.matrix([[7, 1], [-2, 3]])
var mycars = [2, 3, 4]

export default {
  name: 'mii-editor',
  data () {
    return {
      a: matrix.valueOf(),
      code: '',
      isPreview: true,
      input: '',
      path: '',
    }
  },
  mounted () {
    Menu.togglePreview = this.togglePreview
    Menu.openFile = this.openFile
    Menu.saveFile = this.saveFile
    Menu.saveAsFile = this.saveAs
    Menu.ready()
    this.openLinkExternal()
  },

  methods: {
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
      let result

      if (this.path) {
        this.setPath(this.path)
        result = this.writeFile()
      } else {
        let savePath = this.saveAsDialog()
        if (savePath) {
          this.setPath(savePath)
          result = this.writeFile()
        }
      }
    },
    saveAs () {
      const self = this
      let savePath = this.saveAsDialog()

      if (savePath) {
        self.setPath(savePath)
        let result = self.writeFile()
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
  },
}
</script>

<style scoped></style>
