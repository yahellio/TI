// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openKeyFile: (byte) => ipcRenderer.invoke('open-key-file', byte),
    getFileName: () => ipcRenderer.invoke('get-file-name'),
    writeInFile: (path,text,byte) => ipcRenderer.invoke('write-in-name', path, text, byte)
});

