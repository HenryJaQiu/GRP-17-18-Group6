const fs = require('fs')
const math = require('mathjs')
var matrix = math.matrix([[7, 1], [-2, 3]])
var mycars = [2, 3, 4]
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
      var ob = data.matrix
      console.log(mycars)
      matrix = ob
      mycars = data.car
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
    var json = {'matrix': matrix, 'car': mycars}
    fs.writeFile(path, JSON.stringify(json, null, 4), function (err) {
      error = err
    })

    if (!error) {
      return true
    }
  } catch (e) {
    openDialog('error', e)
    return false
  }

  return false
}

function setPath (p) {
  path = p
}

function openLinkExternal () {
  const electron = require('electron')
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

export {
  openFile,
  saveFile,
  openLinkExternal
}
