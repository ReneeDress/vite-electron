/**
 * @module preload
 */

export { sha256sum } from './nodeCrypto';
export { versions } from './versions';
export { getUserData } from './nodeFs';
// export { getUsbDevices } from './usbDetection';
// export type { Device } from './usbDetection';

export const doSomething =  () => {
    return require('os').userInfo().username;
};