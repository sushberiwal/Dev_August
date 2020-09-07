// Terminal should be in activity folder
// Create main.js file 
// npm init -y
// npm install electron --save-dev
// add "start":"electron ." in package.json file

// html css javascript/jquery

// BoilerPlate Code
const electron = require('electron');

const app = electron.app;

// Node + Browser
function createWindow(){
    // creates a new window instance
    const win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
          }
    })
    win.loadFile('index.html').then(function(){
        win.maximize();
        win.webContents.openDevTools();
    })

}
app.whenReady().then(createWindow);

