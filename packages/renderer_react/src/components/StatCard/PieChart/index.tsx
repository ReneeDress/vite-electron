import * as echarts from 'echarts';
import { init, getInstanceByDom } from 'echarts';
import { useEffect, useRef } from 'react';
import { ReactEChartsProps } from '..';

const PieChart = (props: ReactEChartsProps) => {
    const { option, style, settings, loading, theme } = props;

    const chartDom = useRef(null);

    useEffect(() => {
        if (chartDom.current) {
            const chartInstance = echarts.init(chartDom.current);
            console.log(chartInstance);
        }
    }, []);

    useEffect(() => {
        if (chartDom.current) {
            const chartInstance = echarts.getInstanceByDom(chartDom.current);
            console.log(chartInstance);
            chartInstance?.setOption(option);
        }
    }, [option]);
    
    return (
        <div className="Chart" ref={chartDom} style={{ width: '100%', height: 400 }}>
            123
        </div>
    )
};

export default PieChart;