/* eslint-disable @typescript-eslint/consistent-type-imports */
import { usb, getDeviceList, WebUSBDevice } from 'usb';

interface WebUSBDeviceWithLegacy extends WebUSBDevice {
    legacy?: usb.Device;
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