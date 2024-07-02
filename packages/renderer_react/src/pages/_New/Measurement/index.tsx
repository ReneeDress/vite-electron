import { Row, Col, Layout, Button } from "antd";
import './index.less';
import { ShiftStatistics, MeasureResult, MeasureInfo, RealtimeData, MachineInfo, SystemInfo, MeasureImage, Measure3dModel } from "./fragments";
import { useEffect, useState } from "react";

const Measurement = () => {
    const [status, setStatus] = useState<string>();
    const [dbTables, setDbTables] = useState<string[]>([]);
    const [currTableData, setCurrTableData] = useState<any[]>([]);
    const getTableData = (tablename: string) => {
        window.api.getTableData({ tablename }).then((res: any) => {
            console.log(res)
            setCurrTableData(res);
        })
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
        <Layout className="Measurement">
            <div className="MeasurementContent">
                <Row gutter={[16, 16]} justify="center" align="top">
                    <Col span={12}>
                        <Row gutter={[16, 16]} justify="center" align="top">
                            <Col span={24}>
                                <ShiftStatistics />
                            </Col>
                            <Col span={24}>
                                <RealtimeData />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row gutter={[16, 16]} justify="center" align="top">
                            <Col span={12}>
                                <MeasureResult />
                            </Col>
                            <Col span={12}>
                                <MeasureInfo />
                            </Col>
                            <Col span={12}>
                                <MeasureImage />
                            </Col>
                            <Col span={12}>
                                <MachineInfo />
                            </Col>
                            <Col span={12}>
                                <Measure3dModel />
                            </Col>
                            <Col span={12}>
                                <SystemInfo />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <footer>Tongrang</footer>
        </Layout>
    )
};

export default Measurement;