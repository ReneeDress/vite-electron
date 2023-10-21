export interface dataFormat {
    measureValue?: number;
    standardValue: number;
    tolerance?: number;
    compliance?: boolean;
}

export interface MeasurementData {
    [key: string]: dataFormat;
    // 螺纹长度L4 mm
    threadLengthL4: dataFormat;
    // 螺纹锥度
    threadTaper: dataFormat;
    // 螺距 mm
    threadPitch: dataFormat;
    // 齿高 mm
    teethHeight: dataFormat;
    // 牙顶高 mm
    crestHeight: dataFormat;
    // 牙顶直径 mm
    crestDiameter: dataFormat;
    // 累计螺距 mm
    cumulativePitch: dataFormat;
    // 外倒角角度 °
    outerChamfer: dataFormat;
    // 牙形角 °
    toothProfileAngle: dataFormat;
    // 椭圆度
    ovality: dataFormat;
}

interface ProductInfo {
    specification: string;
}

interface ProductMeasurementInfo extends ProductInfo {
    qualifiedRate: number;
}

interface MeasurementStatistics {
    scope?: string;
    total: number;
    qualified?: number;
    unqualified?: number;
    resultDatetime: string;
}

export interface Measurement {
    info: {
        [key: string]: any;
        result: boolean;
        datetime: string;
        productInfo: ProductMeasurementInfo;
        measurementStat: MeasurementStatistics;
        operator: any;
    };
    data: MeasurementData;
}

interface MeasurementItemInfo {
    [key: string]: {
        unit: string;
        locale: {
            [key: string]: string
        }
    }
}

export const MeasurementItemInfo: MeasurementItemInfo = {
    threadLengthL4: {
        unit: 'mm',
        locale: {
            'zh-CN': '螺纹长度L4'
        }
    },
    threadTaper: {
        unit: '',
        locale: {
            'zh-CN': '螺纹锥度'
        }
    },
    threadPitch: {
        unit: 'mm',
        locale: {
            'zh-CN': '螺距'
        }
    },
    teethHeight: {
        unit: 'mm',
        locale: {
            'zh-CN': '齿高'
        }
    },
    crestHeight: {
        unit: 'mm',
        locale: {
            'zh-CN': '牙顶高'
        }
    },
    crestDiameter: {
        unit: 'mm',
        locale: {
            'zh-CN': '牙顶直径'
        }
    },
    cumulativePitch: {
        unit: 'mm',
        locale: {
            'zh-CN': '累计螺距'
        }
    },
    outerChamfer: {
        unit: '°',
        locale: {
            'zh-CN': '外倒角角度'
        }
    },
    toothProfileAngle: {
        unit: '°',
        locale: {
            'zh-CN': '牙形角'
        }
    },
    ovality: {
        unit: '°',
        locale: {
            'zh-CN': '椭圆度'
        }
    },
}