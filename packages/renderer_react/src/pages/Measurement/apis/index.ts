import { Measurement, MeasurementData, MeasurementStatistics } from '/@/types/db';
import SingleMeasurementData from '../mocks/singleMeasurementData.json';
import SingleMeasurementStat from '../mocks/singleMeasurementStat.json';

export const getCurrentMeasurementData: () => Promise<MeasurementData> = () => {
    console.log('getCurrentMeasurementData', SingleMeasurementData);
    return new Promise((resolve) => {
        resolve(SingleMeasurementData);
    })
}

export const getCurrentMeasurementStat: () => Promise<MeasurementStatistics> = () => {
    console.log('getCurrentMeasurementStat', SingleMeasurementStat);
    return new Promise((resolve) => {
        resolve(SingleMeasurementStat);
    })
}

export const getCurrentMeasurement: () => Promise<Measurement> = () => {
    const measurement: Measurement = {
        info: {
            result: false,
            datetime: new Date(Date.now()).toLocaleString('zh-CN'),
            productInfo: {
                specification: '',
                qualifiedRate: 0.92,
            },
            measurementStat: SingleMeasurementStat,
            operator: '操作员',
        },
        data: SingleMeasurementData,
    };
    return new Promise((resolve) => {
        resolve(measurement);
    });
}