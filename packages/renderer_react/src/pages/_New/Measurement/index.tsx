import { Row, Col, Layout } from "antd";
import './index.less';
import { ShiftStatistics, MeasureResult, MeasureInfo, RealtimeData, MachineInfo, SystemInfo, MeasureImage, Measure3dModel } from "./fragments";

const Measurement = () => {
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