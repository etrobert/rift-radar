const { contextBridge, ipcRenderer } = require('electron');

// Expose LCU API to renderer process safely
contextBridge.exposeInMainWorld('electronAPI', {
  // LCU connection methods
  lcuConnect: () => ipcRenderer.invoke('lcu-connect'),
  lcuDisconnect: () => ipcRenderer.invoke('lcu-disconnect'),
  lcuGetCurrentSession: () => ipcRenderer.invoke('lcu-get-current-session'),
  
  // Listen for champion select updates
  onChampionSelectUpdate: (callback) => {
    ipcRenderer.on('champion-select-update', (event, data) => callback(data));
  },
  
  // Remove listener
  removeChampionSelectListener: () => {
    ipcRenderer.removeAllListeners('champion-select-update');
  }
});