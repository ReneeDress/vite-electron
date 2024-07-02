import { Button, Layout } from "antd";
import { useState, useEffect } from "react";
import './index.less';

const Display = () => {
    const [status, setStatus] = useState<string>();
    const [dbTables, setDbTables] = useState<string[]>([]);
    const [currTableData, setCurrTableData] = useState<any[]>([]);
    const getTableData = (tablename: string) => {
        window.api.getTableData({ tablename }).then((res: any) => {
            console.log(res)
            setCurrTableData(res);
        })
        // console.log('react getTableData', res)
    }

    useEffect(() => {
        window.ipcRenderer.on("main-process-message", (_event, message) => {
            console.log('useEffect', message);
            setStatus(message + ' useEffect');
        });
        window.api.getTestData({ msg: 'you' }).then((i: any) => console.log(i))
        // console.log(res);
        // console.log(window.api.getDatabasePath().then((dbpath: string) => console.log(dbpath)))
        window.api.getAllTables({ msg: 'table' }).then((res: any) => {
            setDbTables(res);
        })
        // console.log(restable);
    }, []);

    return (
        <Layout className="Display">
            Display {status}
            <div>
                <div>
                    {
                        dbTables.map((t: any) => {
                            return (
                                <Button key={t} onClick={() => getTableData(t)}>{t}</Button>
                            )
                        })
                    }
                </div>
                <div>
                    {JSON.stringify(currTableData)}
                </div>
            </div>
            <footer>Tongrang</footer>
        </Layout>
    )
};

export default Display;