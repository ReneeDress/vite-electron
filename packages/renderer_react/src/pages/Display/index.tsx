import { useEffect, useState, CSSProperties } from 'react';
import { Button, Slider } from 'antd';
import {
    ZoomOutOutlined,
    ZoomInOutlined,
  } from '@ant-design/icons';
import StatCard from "/@/components/StatCard";
import './index.less';
import mockChartDatas from './mocks/chartDatas.json';
import chartDisplayTitles from './mocks/chartDisplayTitles.json';
import { CamelCaseToPharse } from '/@/common/utils';

const Display = () => {
    const [chartContainerOptions, setChartContainerOptions] = useState<any>({ cols: 3, });
    const [chartDatas, setChartDatas] = useState<any[]>([]);

    const fetchChartDatas = async (statItems?: string[]) => {
        statItems = statItems ?? [
            'QualifiedRate',
            'WeeklyCount',
            'MonthlyCount',
            'TypeDistribution',
            'MultiDimensionComparsion',
            
        ]

        console.log({gridTemplateColumns: `repeat(${chartContainerOptions.cols}, calc(100% / ${chartContainerOptions.cols})`})

        return await new Promise<any[]>((resolve) => {
            console.log(statItems);
            const res = statItems?.map((i) => {
                const currOption = (mockChartDatas as any)[i];
                console.log(currOption);
                return { title: `${(chartDisplayTitles as any)[i]} ${CamelCaseToPharse(i)}`, option: currOption, size: i === 'QualifiedRate' ? 4 : i === 'MonthlyCount' ? 4 : 1 };
            }) ?? []
            resolve(res);
        }).then((res) => {
            setChartDatas(res);
        })
    }

    useEffect(() => {
        fetchChartDatas();
    }, []);

    useEffect(() => {
        triggerResizeEvent();
    }, [chartContainerOptions.cols]);

    const caculateCardStyle: (size: number, chartIndex: number) => CSSProperties = (size: number, chartIndex: number) => {
        if (size === 1) return {};

        const colsLimit = chartContainerOptions.cols;
        const actualSize = size < chartContainerOptions.cols ? size : chartContainerOptions.cols;
        const colLineIndex = chartIndex % colsLimit + 1;
        // const rowLineIndex = Math.floor(chartIndex / colsLimit) + 1;
        const ColsGridLineRange = new Array(colsLimit + 1);
        for (let i = 0; i < ColsGridLineRange.length; i++) {
            ColsGridLineRange[i] = i + 1;
        }
        // console.log('ColsGridLineRange', ColsGridLineRange)

        if (ColsGridLineRange.includes(colLineIndex + actualSize)) {
            // 当前这行放得下
            return { gridColumn: `${colLineIndex} / ${colLineIndex + actualSize}` }
        } else {
            // 当前这行放不下 重开新行
            return { gridColumn: `${1} / ${1 + actualSize}`, }
        }
    }
    
    const triggerResizeEvent = () => {
        // 创建一个自定义的 Event 对象
        const resizeEvent = new Event('resize');
      
        // 分派该事件给 window 对象
        window.dispatchEvent(resizeEvent);
      }

    return (
        <div className="Display">
            <div className="ToolsBar">
                <div className="Zoom">
                    <ZoomOutOutlined className={'Icon'} />
                    <Slider className='Slider' min={1} max={3} onChange={async (value) => {
                        setChartContainerOptions({...chartContainerOptions, cols: value});
                    }} value={chartContainerOptions.cols} />
                    <ZoomInOutlined className={'Icon'} />
                </div>
                <Button type="primary" size="small" onClick={() => fetchChartDatas()}>刷新</Button>
            </div>
            <div className="CardsContainer" style={{ gridTemplateColumns: `repeat(${chartContainerOptions.cols}, calc((100% - ${chartContainerOptions.cols - 1} * 1rem) / ${chartContainerOptions.cols})` }}>
            {
                chartDatas.map((chartD, chartIndex: number) => 
                    <StatCard 
                        key={chartD?.title}
                        type='chart' 
                        title={chartD?.title} 
                        data={chartD} 
                        style={caculateCardStyle(chartD?.size, chartIndex)}
                    />
                )
            }
            </div>
            
        </div>
    )
};

export default Display;