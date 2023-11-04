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

// export const getCurrentModelOption: () => Promise<any> = () => {
//     const sin = Math.sin;
//     const cos = Math.cos;
//     const pow = Math.pow;
//     const sqrt = Math.sqrt;
//     const cosh = Math.cosh;
//     const sinh = Math.sinh;
//     const PI = Math.PI;
//     const aa = 0.4;
//     const r = 1 - aa * aa;
//     const w = sqrt(r);
//     const option = {
//     tooltip: {},
//     visualMap: {
//         show: false,
//         dimension: 2,
//         min: -5,
//         max: 5,
//         inRange: {
//         color: [
//             '#313695',
//             '#4575b4',
//             '#74add1',
//             '#abd9e9',
//             '#e0f3f8',
//             '#ffffbf',
//             '#fee090',
//             '#fdae61',
//             '#f46d43',
//             '#d73027',
//             '#a50026'
//         ]
//         }
//     },
//     xAxis3D: {},
//     yAxis3D: {},
//     zAxis3D: {},
//     grid3D: {
//         show: false,
//         postEffect: {
//             enable: true,
//             SSAO: {
//                 enable: true,
//                 radius: 4,
//                 quality: 'high',
//                 intensity: 1.5
//             }
//         },
//         temporalSuperSampling: {
//             enable: true
//         },
//         light: {
//             main: {
//                 intensity: 2,
//                 shadow: true
//             },
//             ambient: {
//                 intensity: 0
//             },
//             ambientCubemap: {
//                 // texture: '../assets/canyon.hdr',
//                 exposure: 2,
//                 diffuseIntensity: 0.2,
//                 specularIntensity: 3
//             }
//         }
//     },
//     series: [
//         {
//             type: 'surface',
//             parametric: false,
//             silent: true,
//             wireframe: {
//                 show: false
//             },
//             shading: 'realistic',
//             // realisticMaterial: {
//             //     roughness: 0.2,
//             //     metalness: 1
//             // },
//             // parametricEquation: {
//             //     u: {
//             //     min: -13.2,
//             //     max: 13.2,
//             //     step: 0.2
//             //     },
//             //     v: {
//             //     min: -37.4,
//             //     max: 37.4,
//             //     step: 0.2
//             //     },
//             //     x: function (u, v) {
//             //     const denom = aa * (pow(w * cosh(aa * u), 2) + aa * pow(sin(w * v), 2));
//             //     return -u + (2 * r * cosh(aa * u) * sinh(aa * u)) / denom;
//             //     },
//             //     y: function (u, v) {
//             //     const denom = aa * (pow(w * cosh(aa * u), 2) + aa * pow(sin(w * v), 2));
//             //     return (
//             //         (2 *
//             //         w *
//             //         cosh(aa * u) *
//             //         (-(w * cos(v) * cos(w * v)) - sin(v) * sin(w * v))) /
//             //         denom
//             //     );
//             //     },
//             //     z: function (u, v) {
//             //     const denom = aa * (pow(w * cosh(aa * u), 2) + aa * pow(sin(w * v), 2));
//             //     return (
//             //         (2 *
//             //         w *
//             //         cosh(aa * u) *
//             //         (-(w * sin(v) * cos(w * v)) + cos(v) * sin(w * v))) /
//             //         denom
//             //     );
//             //     }
//             // },
//             data: model
//         }
//     ]
//     };
//     return new Promise((resolve) => {
//         resolve(option);
//     });
// }