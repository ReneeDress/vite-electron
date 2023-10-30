import { useRef, MutableRefObject, } from 'react';
import { Card } from 'antd';
import { EChartsOption, SetOptionOpts } from 'echarts';
import './index.less';
import Chart from './Chart';
import { CSSProperties } from 'react';

interface StatCardProps {
    type?: string;
    data?: any;
    title?: string;
    description?: string;
    style?: CSSProperties;
}

export interface ReactEChartsProps {
    option: EChartsOption;
    style?: CSSProperties;
    settings?: SetOptionOpts;
    loading?: boolean;
    theme?: "light" | "dark";
    containerDom: MutableRefObject<any>;
  }

const StatCard = (props: StatCardProps) => {
    const { type = 'plain', data = {}, title = '默认标题', description, style } = props;
    const containerDom = useRef(null);

    return (
        <div className="StatCard" style={style}>
            <Card className='CardContainer' ref={containerDom} title={title} bordered={false}>
                {
                    description ? 
                    <div className="Description">{description}</div>
                    : <></>
                }
                {
                    type === 'chart' ?
                    <Chart option={data.option} containerDom={containerDom} />
                    : <></>
                }
            </Card>
        </div>
    )
};

export default StatCard;