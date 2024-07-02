import { app, BrowserWindow, nativeTheme } from 'electron';
import { join, resolve } from 'node:path';

async function createWindow(title?: string) {
  const browserWindow = new BrowserWindow({
    title,
    width: 1920,
    height: 1080,
    show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(app.getAppPath(), 'packages/preload/dist/index.cjs'),
    },
  });

  /**
   * If the 'show' property of the BrowserWindow's constructor is omitted from the initialization options,
   * it then defaults to 'true'. This can cause flickering as the window loads the html content,
   * and it also has show problematic behaviour with the closing of the window.
   * Use `show: false` and listen to the  `ready-to-show` event to show the window.
   *
   * @see https://github.com/electron/electron/issues/25012 for the afford mentioned issue.
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  /**
   * Load the main page of the main window.
   */
  if (import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined) {
    /**
     * Load from the Vite dev server for development.
     */
    await browserWindow.loadURL(
      `${import.meta.env.VITE_DEV_SERVER_URL}?electronWindow=${title ?? ''}`,
    );
  } else {
    /**
     * Load from the local file system for production and test.
     *
     * Use BrowserWindow.loadFile() instead of BrowserWindow.loadURL() for WhatWG URL API limitations
     * when path contains special characters like `#`.
     * Let electron handle the path quirks.
     * @see https://github.com/nodejs/node/issues/12682
     * @see https://github.com/electron/electron/issues/6869
     */
    await browserWindow.loadFile(resolve(__dirname, '../../renderer_react/dist/index.html'), {
      query: { electronWindow: title ?? '' },
    });
  }

  nativeTheme.themeSource = 'light';

  return browserWindow;
}

/**
 * Restore an existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(
    w => !w.isDestroyed() && w?.title === 'Whorl Inspection | Main',
  );
  let subWindow = BrowserWindow.getAllWindows().find(
    w => !w.isDestroyed() && w?.title !== 'Whorl Inspection | Main',
  );
  console.log('restoreOrCreateWindow', window, window?.title, subWindow);

  // Test active push message to Renderer-process.
  window?.webContents.on('did-finish-load', () => {
    window?.webContents.send(
      'main-process-message',
      `${new Date().toLocaleString()} ${app.getPath('userData')} ${
        process.resourcesPath
      } ${__dirname} ${import.meta.env.DEV} ${import.meta.env.VITE_DB_FILENAME}`,
    );
  });

  if (window === undefined) {
    window = await createWindow('Whorl Inspection | Main');
  }

  if (subWindow === undefined) {
    subWindow = await createWindow('Whorl Inspection | Display');
  }

  if (window.isMinimized()) {
    window.restore();
  }

  if (subWindow.isMinimized()) {
    subWindow.restore();
  }

  window.focus();

  return [window, subWindow];
}
