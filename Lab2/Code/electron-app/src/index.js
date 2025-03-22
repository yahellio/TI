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
      title: 'Выберите файл с ключом',
      properties: ['openFile'] 
  });

  if (!result.canceled) {
      const binaryData = fs.readFileSync(result.filePaths[0]);
      const bitArray = [];
  for (const byte of binaryData) {
      for (let i = 7; i >= 0; i--) {
          bitArray.push((byte >> i) & 1); // Преобразование каждого байта в биты
      }
  }
      return binaryData; 
  }

  return null;
});

ipcMain.handle('get-file-name', async () => {
  const result = await dialog.showOpenDialog({
      title: 'Выберите файл с ключом',
      filters: [{ name: 'Текстовые файлы', extensions: ['txt'] }],
      properties: ['openFile']
  });

  if (!result.canceled) {
      return result.filePaths[0];
  }

  return null;
});

ipcMain.handle('write-in-name', async (event, path,text) => {
 
  fs.writeFileSync(path, text);

  return null;
});

app.whenReady().then(() => {
  createWindow();
});
