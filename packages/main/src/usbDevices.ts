/* eslint-disable @typescript-eslint/consistent-type-imports */
import { usb, getDeviceList } from 'usb';

const getUSBDevices = () => {
    const devices: usb.Device[] = getDeviceList();
    return devices;
};

export {
    getUSBDevices,
};