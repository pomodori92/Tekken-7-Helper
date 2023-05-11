// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const { join } = require('path');

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		icon: './build/icon.png',
		width: '60vw',
		height: '60vw',
		resizable: true,
		webPreferences: {
			preload: join(__dirname, 'assets', 'js', 'preload.js'),
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	// mainWindow.webContents.openDevTools();
	mainWindow.setMenuBarVisibility(false);
	// and load the index.html of the app.
	mainWindow.loadFile('./assets/html/index.html');

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin')
		app.quit();
});
