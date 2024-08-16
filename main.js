const { app, BrowserWindow, ipcMain, powerMonitor } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
        },
    });

    mainWindow.loadFile('index.html');

    // Monitor system idle time
    setInterval(() => {
        const idleTime = powerMonitor.getSystemIdleTime();
        if (idleTime >= 5) {
            mainWindow.webContents.send('timer-stop');
            console.log('System idle, timer stopped');
        } else {
            mainWindow.webContents.send('timer-start');
            console.log('System active, timer running');
        }
    }, 1000); // check every second
}

app.whenReady().then(createWindow);

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
