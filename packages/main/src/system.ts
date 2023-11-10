const detectSystemInfo = async () => {
    return {
        
    };
};

const getSystemInfo = (event: Electron.IpcMainEvent, arg: any[]) => {
    console.log('getUSBDevices', arg);
    // const legacyDevices: usb.Device[] = getDeviceList();
    detectSystemInfo()
    .then((infos) => event.reply('getUSBDevices-reply', infos))
    .catch((err) => console.log(err));    
};

export {
    getSystemInfo,
};