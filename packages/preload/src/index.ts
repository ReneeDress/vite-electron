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

import { ipcRenderer } from 'electron';
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