import SingleMeasurement from '../mocks/singleMeasurement.json';
import { MeasurementData } from '/@/types/db';

export const getCurrentMeasurement: () => Promise<MeasurementData> = () => {
    console.log('getCurrentMeasurement', SingleMeasurement)
    return new Promise((resolve) => {
        resolve(SingleMeasurement);
    })
}