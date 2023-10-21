import { useState, useEffect } from 'react';
import { Col, Row, } from 'antd';
import { MeasurementData, MeasurementItemInfo, dataFormat } from "/@/types/db";
import { getCurrentMeasurement } from '../../apis';
import './index.less';

const MeasurementBoard = () => {
    const [currentMeasurement, setCurrentMeasurement] = useState<MeasurementData>();

    const fetchData = async () => {
        const data = await getCurrentMeasurement();
        console.log('fetchData', data);
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
                        <Col className='dataCell header' span={5}>测量项目</Col>
                        <Col className='dataCell header' span={5}>测量值</Col>
                        <Col className='dataCell header' span={5}>标准值</Col>
                        <Col className='dataCell header' span={5}>误差</Col>
                        <Col className='dataCell header' span={4}>是否达标</Col>
                    </Row>
                    {
                        currentMeasurement ? 
                        Object.keys(currentMeasurement).map((item: string) => {
                            const itemMeasurement: dataFormat = currentMeasurement[item];
                            return (
                                <>
                                    <Row className='dataRow'>
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
                <div className="measurementBoard__content-right"></div>
                
            </div>
        </div>
    )
}

export default MeasurementBoard;
