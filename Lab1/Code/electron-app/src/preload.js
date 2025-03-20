
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openKeyFile: () => ipcRenderer.invoke('open-key-file'),
    getFileName: () => ipcRenderer.invoke('get-file-name'),
    writeInFile: (path,text) => ipcRenderer.invoke('write-in-name', path, text)
});

