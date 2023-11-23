import type { IpcMainInvokeEvent } from 'electron';
import * as os from 'node:os';

const detectSystemInfo = async () => {
    return {
        platform: os.platform(),
        release: os.release(),
        arch: os.arch(),
        node: {
            version: process.version,
        },
        electron: {
            version: process.versions.electron,
        },
    };
};

const getSystemInfo = (event: IpcMainInvokeEvent, arg: any[]) => {
    console.log('getSystemInfo', arg);
    return detectSystemInfo()
    .then((infos) => infos)
    .catch((err) => console.log(err));    
};

export {
    getSystemInfo,
};