// import * as echarts from 'echarts';
import { init, getInstanceByDom } from 'echarts';
import { useEffect, useRef } from 'react';
import { ReactEChartsProps } from '..';

const Chart = (props: ReactEChartsProps) => {
    const { option, style, settings, loading, theme, containerDom } = props;

    const chartDom = useRef(null);

    useEffect(() => {
        if (chartDom.current) {
            const chartInstance = init(chartDom.current);
            // console.log(chartInstance);

            // 监听窗口大小变化，调用 ECharts 实例的 resize 方法
            const handleResize = () => {
                chartInstance.resize();
            };

            // 监听窗口大小变化事件
            window.addEventListener('resize', handleResize);

            // 在组件销毁时，移除事件监听
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        if (chartDom.current) {
            const chartInstance = getInstanceByDom(chartDom.current);
            // console.log(chartInstance);
            chartInstance?.setOption(option);
        }
    }, [option]);
    
    return (
        <div className="Chart" ref={chartDom} style={{ width: '100%', minHeight: 400 }}>
            123
        </div>
    )
};

export default Chart;