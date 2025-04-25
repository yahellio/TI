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
    const filePath = result.filePaths[0];
    const parsedPath = path.parse(filePath);

    const binaryData = fs.readFileSync(filePath);
    const byteArray = Array.from(binaryData); 


    const uint32Array = [];
    const buffer = fs.readFileSync(filePath);
    /*
    // Разбираем буфер на 32-битные числа (Little-Endian)
    for (let i = 0; i < buffer.length; i += 4) {
      uint32Array.push(buffer.readUInt32LE(i));
    }
    */

    return [byteArray, uint32Array,`${parsedPath.name}${parsedPath.ext}`]; 
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


//добавить флаг( добавлять по 1 байту или по 4)
ipcMain.handle('write-in-name', async (event, path, numbers) => {
  // Создаем буфер достаточного размера (4 байта на каждое число)
  const buffer = Buffer.alloc(numbers.length * 4);

  // Записываем каждое число как 32-битное целое (Little-Endian)
  numbers.forEach((num, index) => {
    buffer.writeUInt32LE(num, index * 4);
  });

  // Сохраняем буфер в файл
  fs.writeFileSync(path, buffer);

  return null;
});

app.whenReady().then(() => {
  createWindow();
});
