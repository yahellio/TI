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
  //mainWindow.loadURL("http://localhost:3000");
  
  //Production
  mainWindow.loadFile(path.join(__dirname, 'index.html'));


};

ipcMain.handle('open-key-file', async (event, byte) => {
  const result = await dialog.showOpenDialog({
      title: 'Выберите файл',
      properties: ['openFile'] 
  });

  if (!result.canceled) {
    const filePath = result.filePaths[0];
    const parsedPath = path.parse(filePath);
    const buffer = fs.readFileSync(filePath);

    if(byte == 1){
     
      const byteArray = Array.from(buffer); 
      return [byteArray,`${parsedPath.name}${parsedPath.ext}`]; 
    }

    if(byte == 4){
        const uint32Array = [];
      
        if (buffer.length % 4 !== 0) {
          throw new Error('File size must be a multiple of 4 bytes for 32-bit values. Plese, set the encrypt-mode.');
        }

        // Разбираем буфер на 32-битные числа (Little-Endian)
        for (let i = 0; i < buffer.length; i += 4) {
          uint32Array.push(buffer.readUInt32LE(i));
        }
        return [uint32Array,`${parsedPath.name}${parsedPath.ext}`]; 
      }
  }
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
ipcMain.handle('write-in-name', async (event, path, numbers, byte) => {
  let buffer;
    
  if (byte === 4) {
    // Создаем буфер для 32-битных чисел (4 байта на каждое число)
    buffer = Buffer.alloc(numbers.length * 4);
    
    // Записываем каждое число как 32-битное целое (Little-Endian)
    numbers.forEach((num, index) => {
      buffer.writeUInt32LE(num, index * 4);
    });
  } else if (byte === 1) {
    // Создаем буфер для байтов (1 байт на каждое число)
    buffer = Buffer.alloc(numbers.length);
    
    // Проверяем, что все числа в диапазоне 0-255
    numbers.forEach((num, index) => {
      if (num < 0 || num > 255) {
        throw new Error(`Число ${num} выходит за диапазон байта (0-255)`);
      }
      buffer.writeUInt8(num, index);
    });
  }

  // Сохраняем буфер в файл (асинхронная запись)
  await fs.promises.writeFile(path, buffer);

  return null;
});

app.whenReady().then(() => {
  createWindow();
});
