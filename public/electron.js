
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    var display = electron.screen.getPrimaryDisplay();
    const scrWidth = display.size.width;
    const scrHeight = display.size.height;

    let winWidth = Math.floor(scrWidth/3)
    let winHeight = Math.floor(scrHeight*3/4)
    /*
    if(isDev){
        winWidth = 1200
        winHeight = 600
    }*/

    mainWindow = new BrowserWindow({
        width: winWidth, 
        height: winHeight, 
        x: scrWidth-winWidth-50,
        y: scrHeight-winHeight-100,
        resizable:false, 
        fullscreenable:false,
        title:"Snippet-Fu",
        webPreferences: {
            nodeIntegration: true,
        }
    });
    mainWindow.setMenuBarVisibility(false)
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});