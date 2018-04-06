import {openFile, saveFile} from './IOfunctions.js'
const {remote} = require('electron')
const {dialog, nativeImage} = remote
const iconImage = nativeImage.createFromPath('./build/icons/256x256.png')
const pkg = require('../../package.json')
const OSX = process.platform === 'darwin'
const WIN = process.platform === 'win32'
const template = []

template.push({
  label: 'File',
  submenu: [
    {
      label: 'Import json file',
      accelerator: 'CmdOrCtrl+O',
      click: function () {
        openFile()
      }
    },
    {
      label: 'Export data',
      accelerator: 'CmdOrCtrl+S',
      click: function () {
        saveFile()
      }
    }
  ]
}, {
  label: 'View',
  submenu: [
    { type: 'separator' },
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
addMenuOSX()
addMenuWin()

function addMenuOSX () {
  if (!OSX) {
    return
  }
  template.unshift({
    label: pkg.name,
    submenu: [{
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: function (item, focusedWindow) {
        focusedWindow.close()
      }
    }]
  })
}

function addMenuWin () {
  if (!WIN) {
    return
  }
  template[0].submenu.push({
    type: 'separator'
  }, {
    label: 'Quit',
    accelerator: 'CmdOrCtrl+Q',
    click: function (item, focusedWindow) {
      focusedWindow.close()
    }
  })
}

export {
  template
}
