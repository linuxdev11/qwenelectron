const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const iconPath = path.join(__dirname, 'icon.png');
if (fs.existsSync(iconPath)) {
    app.commandLine.appendSwitch('icon', iconPath);
}

function createWindow() {

    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        autoHideMenuBar: true,
    });

    if (!fs.existsSync(iconPath)) {
        console.warn(`Icon file not found at ${iconPath}`);
    }

    Menu.setApplicationMenu(null);

    mainWindow.loadURL('https://chat.qwen.ai');

}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});