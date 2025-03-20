import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App></App>
);

/*document.getElementById('loadKey').addEventListener('click', async () => {
  const key = await window.electronAPI.openKeyFile();  
  if (key !== null) {
      document.getElementById('keyDisplay').textContent = `Ключ: ${key}`;
  } else {
      document.getElementById('keyDisplay').textContent = 'Не удалось загрузить ключ.';
  }
});*/
//async () => {let temp = await window.electronAPI.openKeyFile(); setClick(temp)

