import { useState, useEffect } from 'react';
import { Button, Col, Row, } from 'antd';
import { Measurement, MeasurementItemInfo, dataFormat } from "/@/types/db";
import { getCurrentMeasurement } from '../../apis';
import './index.less';

const MeasurementBoard = () => {
    const [currentMeasurement, setCurrentMeasurement] = useState<Measurement>();

    const fetchData = async () => {
        const data: Measurement = await getCurrentMeasurement();
        setCurrentMeasurement(data);
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <div className="measurementBoard">
            <div className="temp">{JSON.stringify(currentMeasurement)}</div>
            <div className="measurementBoard__content">
                <div className="measurementBoard__content-left">
                    <Row className='dataRow'>
                        <Col className='dataCell header' span={4}>产品规格</Col>
                        <Col className='dataCell header' span={4}>检测时间</Col>
                        <Col className='dataCell header' span={4}>合格率</Col>
                        <Col className='dataCell header' span={4}>不合格次数/检测总次数</Col>
                        <Col className='dataCell header' span={4}>操作员</Col>
                        <Col className='dataCell header' span={4}>检测结果</Col>
                    </Row>
                    <Row className='dataRow'>
                        <Col className='dataCell' span={4}>{currentMeasurement?.info.productInfo.specification}</Col>
                        <Col className='dataCell' span={4}>{currentMeasurement?.info.datetime}</Col>
                        <Col className='dataCell' span={4}>{currentMeasurement?.info.productInfo.qualifiedRate}</Col>
                        <Col className='dataCell' span={4}>{`${currentMeasurement?.info.measurementStat.unqualified}/${currentMeasurement?.info.measurementStat.total}`}</Col>
                        <Col className='dataCell' span={4}>{currentMeasurement?.info.operator}</Col>
                        <Col className='dataCell' span={4}>
                            <Button 
                                type={'primary'} 
                                danger={!currentMeasurement?.info.result}
                                style={{ width: '4rem', height: '4rem', padding: 0, fontWeight: 900, }}
                            >
                                {currentMeasurement?.info.result ? '合格' : '不合格'}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="measurementBoard__content">
                <div className="measurementBoard__content-left">
                    <Row className='dataRow'>
                        <Col className='dataCell header' span={5}>测量项目</Col>
                        <Col className='dataCell header' span={5}>测量值</Col>
                        <Col className='dataCell header' span={5}>标准值</Col>
                        <Col className='dataCell header' span={5}>误差</Col>
                        <Col className='dataCell header' span={4}>是否达标</Col>
                    </Row>
                    {
                        currentMeasurement?.data ? 
                        Object.keys(currentMeasurement?.data).map((item: string) => {
                            const itemMeasurement: dataFormat = currentMeasurement?.data[item];
                            return (
                                <>
                                    <Row className='dataRow' key={item}>
                                        <Col className='dataCell itemName' span={5}>{`${MeasurementItemInfo[item]['locale']['zh-CN']} ${MeasurementItemInfo[item]['unit']}`}</Col>
                                        <Col className='dataCell' span={5}>{itemMeasurement.measureValue}</Col>
                                        <Col className='dataCell' span={5}>{itemMeasurement.standardValue}</Col>
                                        <Col className='dataCell' span={5}>{itemMeasurement.tolerance}</Col>
                                        <Col className='dataCell' span={4}>{itemMeasurement.compliance}</Col>
                                    </Row>
                                </>
                            )
                        })
                        : <>Measuring</>
                    }
                </div>
                <div className="measurementBoard__content-right">
                    threejs
                </div>
                
            </div>
        </div>
    )
}

export default MeasurementBoard;
