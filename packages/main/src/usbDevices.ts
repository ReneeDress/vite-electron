/* eslint-disable @typescript-eslint/consistent-type-imports */
import { usb, getDeviceList, WebUSBDevice } from 'usb';

interface WebUSBDeviceWithLegacy extends WebUSBDevice {
    legacy?: usb.Device;
    vendorIdHex?: string;
    productIdHex?: string;
}

function int2Hex (num = 0) {
    if (num === 0) {
        return '0';
    }
    const HEXS = '0123456789abcdef';
    let hex = '';
    while (num) {
        // console.log(num, num % 16, HEXS.charAt(num % 16));
        hex = HEXS.charAt(num % 16) + hex;
        num = Math.floor(num / 16);
    }
    return hex;
}
  

const getWebUSBDevices = async () => {
    const legacyDevices = getDeviceList();
    let webDevices: WebUSBDeviceWithLegacy[] = [];

    for (const device of legacyDevices) {
        // console.log(device); // Legacy device

        await (async () => {
            // Uses a blocking call, so is async
            // const device = await findBySerialNumber('TEST_DEVICE');
        
            // Uses blocking calls, so is async
            const webDevice: WebUSBDeviceWithLegacy = await WebUSBDevice.createInstance(device);
        
            if (webDevice) {
                // console.log(webDevice); // WebUSB device
                webDevice.legacy = device;
                webDevice.vendorIdHex = int2Hex(webDevice.vendorId).padStart(4, '0');
                webDevice.productIdHex = int2Hex(webDevice.productId).padStart(4, '0');
                webDevices = [...webDevices, webDevice];
            }
        })();
    }
    return webDevices || legacyDevices;
};

const getUSBDevices = (event: Electron.IpcMainEvent, arg: any[]) => {
    console.log('getUSBDevices', arg);
    // const legacyDevices: usb.Device[] = getDeviceList();
    getWebUSBDevices()
    .then((devices) => event.reply('getUSBDevices-reply', devices))
    .catch((err) => console.log(err));    
};

export {
    getUSBDevices,
};