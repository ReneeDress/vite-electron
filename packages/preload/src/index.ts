/**
 * @module preload
 */

export { sha256sum } from './nodeCrypto';
export { versions } from './versions';
export { getUserData } from './nodeFs';
// export { getUsbDevices } from './usbDetection';
// export type { Device } from './usbDetection';

// export const doSomething =  () => {
//     return require('os').userInfo().username;
// };

import { contextBridge, ipcRenderer } from 'electron';
import databasePreload from './database';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
// 自定义的主进程方法API
export const api = {
    // 读取目录文件列表回调
    readDirReply: (callback: any) => {
        ipcRenderer.once('readDir-reply', (event, result) => {
            callback(event, result);
        });
    },

    onGetUSBDevices: (cb: any) => {
        ipcRenderer.once('getUSBDevices-reply', (event, res) => {
            console.log('preload event', event, res);
            cb(event, res);
        });
    },

    onTestPython: (cb: any) => {
        ipcRenderer.once('testPython-reply', (event, res) => {
            console.log('preload event', event, res);
            cb(event, res);
        });
    },
};

export const electron = electronAPI;

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
// 使用contextBridge将Electron API和自定义的主进程方法API暴露给渲染进程页面。
// if (process.contextIsolated) {
//     try {
//         contextBridge.exposeInMainWorld('electron', electronAPI);
//         contextBridge.exposeInMainWorld('api', api);
//     } catch (error) {
//         console.error(error);
//     }
// } else {
//     window.electron = electronAPI;
//     window.api = api;
// }

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer));
contextBridge.exposeInMainWorld('api', {
  // Invoke Methods
  testInvoke: (args: any) => ipcRenderer.invoke('test-invoke', args),
  // Send Methods
  testSend: (args: any) => ipcRenderer.send('test-send', args),
  // Receive Methods
  testReceive: (callback: any) => ipcRenderer.on('test-receive', (_event, data) => { callback(data); }),

  // --------- Database
  ...databasePreload,
});

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
    const protos = Object.getPrototypeOf(obj);
  
    for (const [key, value] of Object.entries(protos)) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) continue;
  
      if (typeof value === 'function') {
        // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
        obj[key] = function (...args: any) {
          return value.call(obj, ...args);
        };
      } else {
        obj[key] = value;
      }
    }
    return obj;
  }
  