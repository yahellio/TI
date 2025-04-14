// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openKeyFile: () => ipcRenderer.invoke('open-key-file'),
    getFileName: () => ipcRenderer.invoke('get-file-name'),
    writeInFile: (path,text) => ipcRenderer.invoke('write-in-name', path, text)
});

