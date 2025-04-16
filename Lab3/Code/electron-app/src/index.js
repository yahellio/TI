const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.webContents.setZoomFactor(1.25);

  //Developement
  mainWindow.loadURL("http://localhost:3000");
  
  //Production
  //mainWindow.loadFile(path.join(__dirname, 'index.html'));


};

ipcMain.handle('open-key-file', async () => {
  const result = await dialog.showOpenDialog({
      title: 'Выберите файл',
      properties: ['openFile'] 
  });

  if (!result.canceled) {
    const binaryData = fs.readFileSync(result.filePaths[0]);
    const byteArray = Array.from(binaryData); 
    const parsedPath = path.parse(result.filePaths[0]);
    return [byteArray,`${parsedPath.name}${parsedPath.ext}`]; 
  }

  return [];
});

ipcMain.handle('get-file-name', async () => {
  const result = await dialog.showOpenDialog({
      title: 'Выберите директорию',
      properties: ['openDirectory']
  });

  if (!result.canceled) {
      return result.filePaths[0];
  }

  return null;
});

ipcMain.handle('write-in-name', async (event, path,text) => {
 
  fs.writeFileSync(path, Buffer.from(text));

  return null;
});

app.whenReady().then(() => {
  createWindow();
});
