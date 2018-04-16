// By Xiang Zhang
import store from './vuex/store.js'
const math = require('mathjs')
const fs = require('fs')
var path = ''

function openDialog (type, msg) {
  const remote = require('electron').remote
  const dialog = remote.dialog
  const browserWindow = remote.BrowserWindow
  const focusedWindow = browserWindow.getFocusedWindow()

  dialog.showMessageBox(focusedWindow, {
    title: type,
    type: type,
    buttons: ['OK'],
    detail: msg
  })
}

function openFile () {
  const remote = require('electron').remote
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
      readFile(item[0])
    }
  })
}

function readFile (path) {
  fs.readFile(path, 'utf8', function (err, content) {
    if (err === null) {
      var data = JSON.parse(content)
      store.dispatch('setMatrixXhat', math.matrix(data.xhat.data))
      store.dispatch('setMatrixTrue', math.matrix(data.xTrue.data))
      store.commit('setIfImported', true)
      setPath(path)
    } else {
      openDialog('error', err.toString())
    }
  })
}

function saveAsDialog () {
  const remote = require('electron').remote
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
}

function saveFile () {
  let savePath = saveAsDialog()
  if (savePath) {
    setPath(savePath)
    writeFile()
  }
}

function writeFile () {
  try {
    let error
    var json = { xTrue: store.getters.getMatrixTrue, xhat: store.getters.getMatrixXhat }
    fs.writeFile(path, JSON.stringify(json, null, 4), function (err) {
      error = err
    })

    if (!error) {
      return true
    }
  } catch (e) {
    openDialog('error', e.toString())
    return false
  }

  return false
}

function setPath (p) {
  path = p
}

export {
  openFile,
  saveFile
}
