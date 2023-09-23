import { getUserData } from '#preload';
import { useEffect } from 'react';

const USBDetection = () => {
    // const [devices, setDevices] = useState<any[]>([]);
    
    useEffect(() => {
        // getUsbDevices().then((res) => {
        //     console.log(res);
        // });
        // console.log(doSomething());
        console.log(getUserData('/Users/i562752/Projects/CraneMagic/vite-electron/packages/renderer_react/src/pages/USBDetection/test.json').then((res) => console.log('/Users/i562752/Projects/CraneMagic/vite-electron/packages/renderer_react/src/pages/USBDetection/test.json', res)));
    }, []);

    return (
        <>
            <p>USBDetection</p>
            <p>
                <a href={`/`}>Home</a>
            </p>
        </>
    )
}

export default USBDetection;