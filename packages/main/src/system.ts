import type { IpcMainInvokeEvent } from 'electron';
import * as os from 'os';

const detectSystemInfo = async () => {
    return {
        platform: os.platform(),
        release: os.release(),
        arch: os.arch(),
        node: {
            
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