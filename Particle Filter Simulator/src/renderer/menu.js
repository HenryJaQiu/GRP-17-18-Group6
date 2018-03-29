const {remote} = require('electron')
const {Menu, dialog, nativeImage} = remote
const iconImage = nativeImage.createFromPath('./build/icons/256x256.png')
const pkg = require('../../package.json')
const OSX = process.platform === 'darwin'
const WIN = process.platform === 'win32'

module.exports = {
  menubar: [],
  newFile: function () {},
  openFile: function () {},
  saveFile: function () {},
  saveAsFile: function () {},
  togglePreview: function () {},
  ready: function () {
    var self = this

    self.addMenuOSX()
    self.menubar.push({
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: function () {
            self.newFile()
          }
        },
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: function () {
            self.openFile()
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: function () {
            self.saveFile()
          }
        },
        {
          label: 'Save as',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: function () {
            self.saveAsFile()
          }
        }
      ]
    }, {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Preview Panel',
          type: 'checkbox',
          checked: true,
          // accelerator: '',
          click: function (item, focusedWindow) {
            self.togglePreview()
          }
        },
        { type: 'separator' },
        {
          label: 'Toggle Full Screen',
          accelerator: (function () {
            return OSX ? 'Ctrl+Command+F' : 'F11'
          })(),
          click: function (item, focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        },
        {
          label: 'Always on Top',
          accelerator: 'CmdOrCtrl+Shift+T',
          type: 'checkbox',
          checked: false,
          click: function (item, focusedWindow) {
            focusedWindow.setAlwaysOnTop(!focusedWindow.isAlwaysOnTop())
          }
        }
      ]
    }, {
      label: 'Help',
      submenu: [
        {
          label: 'Website',
          click: function () {
            const BrowserWindow = require('electron').remote.BrowserWindow
            const path = require('path')
            let win = new BrowserWindow({width: 400, height: 320})
            win.openDevTools()
            win.on('closed', function () {
              win = null
            })
            const modalPath = path.join(`http://localhost:9080/src/renderer/modules/test.html`)
            win.loadURL(modalPath)
            console.log(modalPath)
            win.show()
          }
        },
        { type: 'separator' },
        {
          label: 'About',
          click: function (item, focusedWindow) {
            dialog.showMessageBox(focusedWindow, {
              title: 'About',
              type: 'none',
              icon: iconImage,
              message: `${pkg.name} Ver. ${pkg.version}`,
              detail: pkg.description + '\n\n' +
              'Electron: ' + process.versions.electron + '\n' +
              'Chromium: ' + process.versions.chrome + '\n' +
              'V8: ' + process.versions.v8 + '\n' +
              'Node.js: ' + process.versions.node,
              buttons: []
            })
          }
        }
      ]
    })

    self.addMenuWin()

    Menu.setApplicationMenu(
      Menu.buildFromTemplate(self.menubar)
    )
  },
  addMenuOSX: function () {
    if (!OSX) {
      return
    }
    var self = this
    self.menubar.push({
      label: pkg.name,
      submenu: [{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function (item, focusedWindow) {
          focusedWindow.close()
        }
      }]
    })
  },
  addMenuWin: function () {
    if (!WIN) {
      return
    }
    var self = this
    self.menubar[0].submenu.push({
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: function (item, focusedWindow) {
        focusedWindow.close()
      }
    })
  }
}
