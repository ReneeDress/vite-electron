import { getUserData, api, electron } from '#preload';
import { useEffect, useState } from 'react';
import { Divider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

const { ipcRenderer } = electron;

const SystemInfo = () => {
    const [devices, setDevices] = useState<any[]>([]);

    const muiCols: any[] = [
        { field: 'vendorId', },
        { field: 'vendorIdHex', },
        { field: 'manufacturerName', },
        { field: 'productId', },
        { field: 'productIdHex', },
        { field: 'productName', },
        { field: 'serialNumber', }
    ];

    const antdCols: ColumnsType<any> = muiCols.map((i, index) => {
        return {
            ...i,
            dataIndex: i.field,
            title: i?.headerName || i.field,
            colSpan: 1,
            sorter: {
                compare: (a, b) => a[i.field] - b[i.field],
                multiple: muiCols.length - index + 1,
            },
            filters: []
        }
    });
    
    useEffect(() => {
        // getUsbDevices().then((res) => {
        //     console.log(res);
        // });
        // console.log(doSomething());

        // 给主进程发送消息
        ipcRenderer.send('getUSBDevices', { msg: 'test' })
        // 通过preload接收主进程的回调信息
        api.onGetUSBDevices((event: Electron.IpcRendererEvent, res: any[]) => {
            console.log(event, res)
            setDevices(res.map((device) => {
                return {
                    ...device,
                    id: (`${device?.vendorId}-${device?.productId}` || device?.legacy?.deviceDescriptor?.idProduct || device?.deviceDescriptor?.idProduct) + Math.random(),
                    key: (`${device?.vendorId}-${device?.productId}` || device?.legacy?.deviceDescriptor?.idProduct || device?.deviceDescriptor?.idProduct) + Math.random(),
                }
            }));
        })
        
        
        console.log(getUserData('../../renderer_react/src/pages/USBDevices/test.json').then((res) => console.log('../../renderer_react/src/pages/USBDevices/test.json', res)));
    }, []);

    const onClickGetDevices = () => {
        console.log('onClickGetDevices');
        // 给主进程发送消息
        ipcRenderer.send('getUSBDevices', { msg: 'test' })
        // 通过preload接收主进程的回调信息
        api.onGetUSBDevices((event: Electron.IpcRendererEvent, res: any[]) => {
            console.log(event, res)
            setDevices(res.map((device) => {
                return {
                    ...device,
                    id: (`${device?.vendorId}-${device?.productId}` || device?.legacy?.deviceDescriptor?.idProduct || device?.deviceDescriptor?.idProduct) + Math.random(),
                    key: (`${device?.vendorId}-${device?.productId}` || device?.legacy?.deviceDescriptor?.idProduct || device?.deviceDescriptor?.idProduct) + Math.random(),
                }
            }));
        })
    }

    return (
        <>
            <p>SystemInfo</p>
            <p>
                <Link to={'/'}>Home</Link>
            </p>
            <p>
                <button onClick={onClickGetDevices}>onClickGetDevices</button>
            </p>
            <div>

            </div>
            
            <Divider />
        </>
    )
}

export default SystemInfo;