'use strict'

import { app, protocol, BrowserWindow, dialog, ipcMain, Menu, screen } from 'electron'
import {
  createProtocol
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  Menu.setApplicationMenu(null)
  let size = screen.getPrimaryDisplay().workAreaSize
  let width = parseInt(size.width * 0.8)
  let height = parseInt(size.height * 0.8)
  win = new BrowserWindow({
    width: width,
    height: height,
    // minWidth: width,
    // minHeight: height,
    webPreferences: {
      nodeIntegration: true
    },
    show: false,
    transparent: true,
    frame: false,
  })
  // win.maximize()
  win.show()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  ipcMain.on('close', e => {
    win.close()
  })
  ipcMain.on('minimize', e => {
    win.minimize()
  })
  ipcMain.on('maximize', e => {
    console.log('wisth11=' + width + " height22=" + height)
    console.log('getContentSize=' + win.getContentSize() + " width=" + size.width + " height=" + size.height)
    if (win.getContentSize()[0] == parseInt(size.width) || win.getContentSize()[1] == parseInt(size.height)) {
      // console.log('1111111111')
      win.setSize(width, height, true)
      win.setPosition(parseInt(width / 8), parseInt(height / 8), true)
    } else {
      win.setFullScreen(true)
    }

    // if (width != win.width || height != win.height) {
    //   win.restore()
    // } else {
    //   win.maximize()
    // }
  })


  ipcMain.on('open-save-dialog', (event, fileName) => {
    console.log('event=' + Object.keys(event))
    console.log('fileName=' + fileName)
    dialog.showSaveDialog({
      defaultPath: fileName, // '导出数据'
      title: '导出',
      filters: [
        { name: 'Excel Files', extensions: ['xlsx', 'xls'] },
        { name: 'All Files', extensions: ['*'] } ]
    }, res => {
      win.webContents.send('selectedItem', res)
    })
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
