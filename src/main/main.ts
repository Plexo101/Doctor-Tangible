import * as path from 'path';
import * as url from 'url';

import { BrowserWindow, app } from 'electron';

let mainWindow: Electron.BrowserWindow | null;

function createWindow(): void {

  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    minHeight: 300,
    minWidth: 400,
    webPreferences: {
      webSecurity: false,
      devTools: true,
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame: false
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  ).finally(() => { });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.maximize();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
