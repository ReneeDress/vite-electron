import { app, ipcMain, BrowserWindow } from 'electron';
import './security-restrictions';
import { restoreOrCreateWindow } from '/@/mainWindow';
import { platform } from 'node:process';
import { getUSBDevices } from './usbDevices';
import { testPython } from './python';
import { getSystemInfo } from './system';
import WebSocket, { WebSocketServer } from 'ws';


/**
 * Prevent electron from running multiple instances.
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on('second-instance', restoreOrCreateWindow);

/**
 * Disable Hardware Acceleration to save more system resources.
 */
// app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on('activate', () => {
  restoreOrCreateWindow();
  restoreOrCreateWindow();
});

/**
 * Create the application window when the background process is ready.
 */
app
  .whenReady()
  .then(restoreOrCreateWindow)
  .then(() => {
    console.log(BrowserWindow.getAllWindows());
  })
  .catch((e: any) => console.error('Failed create window:', e));

/**
 * Install Vue.js or any other extension in development mode only.
 * Note: You must install `electron-devtools-installer` manually
 */
// if (import.meta.env.DEV) {
//   app
//     .whenReady()
//     .then(() => import('electron-devtools-installer'))
//     .then(module => {
//       const {default: installExtension, VUEJS3_DEVTOOLS} =
//         // @ts-expect-error Hotfix for https://github.com/cawa-93/vite-electron-builder/issues/915
//         typeof module.default === 'function' ? module : (module.default as typeof module);
//
//       return installExtension(VUEJS3_DEVTOOLS, {
//         loadExtensionOptions: {
//           allowFileAccess: true,
//         },
//       });
//     })
//     .catch(e => console.error('Failed install extension:', e));
// }

/**
 * Check for app updates, install it in background and notify user that new version was installed.
 * No reason run this in non-production build.
 * @see https://www.electron.build/auto-update.html#quick-setup-guide
 *
 * Note: It may throw "ENOENT: no such file app-update.yml"
 * if you compile production app without publishing it to distribution server.
 * Like `npm run compile` does. It's ok 😅
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() =>
      /**
       * Here we forced to use `require` since electron doesn't fully support dynamic import in asar archives
       * @see https://github.com/electron/electron/issues/38829
       * Potentially it may be fixed by this https://github.com/electron/electron/pull/37535
       */
      require('electron-updater').autoUpdater.checkForUpdatesAndNotify(),
    )
    .catch((e: any) => console.error('Failed check and install updates:', e));
}


ipcMain.handle('getUSBDevices', getUSBDevices);
ipcMain.on('testPython', testPython);
ipcMain.handle('getSystemInfo', getSystemInfo);

// 在Electron的主进程中
const wss: WebSocketServer = new WebSocketServer({
  port: 8567,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  },
});

wss.on('connection', (ws: WebSocket, req: any) => {
  // 如果使用的是WebSocket库的旧版本，可以尝试:
  // const ip = req.connection.remoteAddress;
  // const port = req.connection.remotePort;

  // 对于新版本，你需要检查socket属性
  const ip = req.socket.remoteAddress;
  const port = req.socket.remotePort;

  console.log(`Client connected: ${ip}:${port}`);
  ws.send('Welcome New Client!');

  // 也可以检查升级后的请求headers来获取更多信息
  // const headers = req.headers;

  // 处理websocket消息
  ws.on('message', (message: any) => {
    console.log(`Received message ${message} from user ${ip}:${port}`);
    // 处理从Python发送的数据
    // console.log(buffer);
    const string = message.toString('utf-8');
    console.log(string);
    ws.send(`Received ${string}`);
    // 你可以在这里将接收到的数据转发给渲染进程
  });

  // 当客户端关闭连接
  ws.on('close', () => {
    console.log(`Client at ${ip}:${port} disconnected`);
  });
});

console.log('WebSocket server is running on port 8567');
