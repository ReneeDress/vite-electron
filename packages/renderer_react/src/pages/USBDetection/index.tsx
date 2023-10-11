import { getUserData } from '#preload';
import { useEffect } from 'react';

const USBDetection = () => {
    // const [devices, setDevices] = useState<any[]>([]);
    
    useEffect(() => {
        // getUsbDevices().then((res) => {
        //     console.log(res);
        // });
        // console.log(doSomething());
        console.log(getUserData('../../renderer_react/src/pages/USBDetection/test.json').then((res) => console.log('../../renderer_react/src/pages/USBDetection/test.json', res)));
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