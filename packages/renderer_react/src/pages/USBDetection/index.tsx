import { getUserData, api, electron } from '#preload';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

const { ipcRenderer } = electron;

const USBDetection = () => {
    const [devices, setDevices] = useState<any[]>([]);

    const muiCols: GridColDef<any>[] = [
        { field: 'vendorId', },
        { field: 'vendorIdHex', },
        { field: 'manufacturerName', },
        { field: 'productId', },
        { field: 'productIdHex', },
        { field: 'productName', },
        { field: 'serialNumber', }
    ];

    const antdCols: ColumnsType<any> = muiCols.map((i) => {
        return {
            ...i,
            dataIndex: i.field,
            title: i?.headerName || i.field,
            colSpan: 1,
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
                    id: `${device?.vendorId}-${device?.productId}` || device?.legacy?.deviceDescriptor?.idProduct || device?.deviceDescriptor?.idProduct,
                    key: `${device?.vendorId}-${device?.productId}` || device?.legacy?.deviceDescriptor?.idProduct || device?.deviceDescriptor?.idProduct,
                }
            }));
        })
        
        
        console.log(getUserData('../../renderer_react/src/pages/USBDetection/test.json').then((res) => console.log('../../renderer_react/src/pages/USBDetection/test.json', res)));
    }, []);

    const onClickGetDevices = () => {
        console.log('onClickGetDevices');
        // 给主进程发送消息
        ipcRenderer.send('getUSBDevices', { msg: 'test' })
        // 通过preload接收主进程的回调信息
        api.onGetUSBDevices((event: Electron.IpcRendererEvent, res: any[]) => {
            console.log(event, res)
            setDevices(res.map((row) => {
                return {
                    ...row,
                    id: row?.productId || row?.legacy?.deviceDescriptor?.idProduct || row?.deviceDescriptor?.idProduct,
                    key: row?.productId || row?.legacy?.deviceDescriptor?.idProduct || row?.deviceDescriptor?.idProduct,
                }
            }));
        })
    }

    return (
        <>
            <p>USBDetection</p>
            <p>
                <a href={`/`}>Home</a>
            </p>
            <p>
                <button onClick={onClickGetDevices}>onClickGetDevices</button>
            </p>
            <div>
                <DataGrid
                    rows={devices}
                    columns={muiCols}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    // checkboxSelection
                    // getRowId={(row) => row?.productId || row?.legacy?.deviceDescriptor?.idProduct || row?.deviceDescriptor?.idProduct}
                />
            </div>
            <div>
                <Table columns={antdCols} dataSource={devices}></Table>
            </div>
        </>
    )
}

export default USBDetection;