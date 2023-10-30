import { useEffect, useState } from 'react';
import { Measurement } from "/@/types/db";
import { getCurrentMeasurement } from "../../Measurement/apis";
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CamelCaseToPharse } from '/@/common/utils';

const MeasureLogs = () => {
    const colFields: any[] = [
        'datetime',
        'productInfo',
        'threadLengthL4',
        'threadTaper',
        'threadPitch',
        'teethHeight',
        'crestHeight',
        'crestDiameter',
        'cumulativePitch',
        'outerChamfer',
        'toothProfileAngle',
        'ovality',
    ].map((i) => {
        return { field: i }
    });

    const antdCols: ColumnsType<any> = colFields.map((i, index) => {
        return {
            ...i,
            dataIndex: i.field,
            title: CamelCaseToPharse(i?.headerName || i.field),
            colSpan: 1,
            sorter: {
                compare: (a, b) => a[i.field] - b[i.field],
                multiple: colFields.length - index + 1,
            },
            filters: []
        }
    });

    const [measureLogs, setMeasureLogs] = useState<Measurement[]>([]);

    const fetchData = async () => {
        const data: Measurement = await getCurrentMeasurement();
        console.log(Object.assign({}, ...Object.keys(data.data).map((i) => {
            return { [i]: data.data[i].measureValue }
        })))
        setMeasureLogs((new Array(20)).fill({
            ...data.info,
            ...Object.assign({}, ...Object.keys(data.data).map((i) => {
                return { [i]: data.data[i].measureValue }
            }))
        }));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="MeasureLogs">
            <Table
                tableLayout='auto'
                columns={antdCols} 
                dataSource={measureLogs} 
                pagination={false}
                scroll={{ x: true }}
            />
        </div>
    )
}

export default MeasureLogs;