const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { authenticate, createWebSocketConnection, createHttp1Request } = require('league-connect');
const isDev = process.env.NODE_ENV === 'development';

let lcuCredentials = null;
let lcuWebSocket = null;

function createWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (isDev) {
    // Load from dev server in development
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // Load from built files in production
    mainWindow.loadFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// LCU connection functions
async function connectToLCU() {
  try {
    console.log('Attempting to connect to League client...');
    lcuCredentials = await authenticate();
    console.log('Successfully authenticated with League client');
    
    // Create WebSocket connection for real-time updates
    lcuWebSocket = await createWebSocketConnection(lcuCredentials);
    console.log('WebSocket connection established');
    
    // Subscribe to champion select updates
    lcuWebSocket.subscribe('/lol-champ-select/v1/session', (data) => {
      console.log('Champion select update received:', data);
      // Send data to renderer process
      const allWindows = BrowserWindow.getAllWindows();
      allWindows.forEach(window => {
        window.webContents.send('champion-select-update', data);
      });
    });
    
    return { success: true, message: 'Connected to League client' };
  } catch (error) {
    console.error('Failed to connect to League client:', error);
    return { success: false, error: error.message };
  }
}

async function disconnectFromLCU() {
  if (lcuWebSocket) {
    lcuWebSocket.terminate();
    lcuWebSocket = null;
  }
  lcuCredentials = null;
  console.log('Disconnected from League client');
  return { success: true, message: 'Disconnected from League client' };
}

async function getCurrentChampionSelect() {
  if (!lcuCredentials) {
    return { success: false, error: 'Not connected to League client' };
  }
  
  try {
    const response = await createHttp1Request({
      method: 'GET',
      url: '/lol-champ-select/v1/session',
    }, lcuCredentials);
    
    const data = JSON.parse(response.toString());
    return { success: true, data };
  } catch (error) {
    console.error('Failed to get champion select data:', error);
    return { success: false, error: error.message };
  }
}

// IPC handlers
ipcMain.handle('lcu-connect', connectToLCU);
ipcMain.handle('lcu-disconnect', disconnectFromLCU);
ipcMain.handle('lcu-get-current-session', getCurrentChampionSelect);