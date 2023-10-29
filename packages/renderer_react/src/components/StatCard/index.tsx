import { Card } from 'antd';
import { EChartsOption, SetOptionOpts } from 'echarts';
import './index.less';
import PieChart from './PieChart';
import { CSSProperties } from 'react';

interface StatCardProps {
    type?: string;
    data?: any;
    title?: string;
    description?: string;
}

export interface ReactEChartsProps {
    option: EChartsOption;
    style?: CSSProperties;
    settings?: SetOptionOpts;
    loading?: boolean;
    theme?: "light" | "dark";
  }

const StatCard = (props: StatCardProps) => {
    const { type = 'plain', data = {}, title = '默认标题', description } = props;
    
    return (
        <div className="StatCard">
            <Card className='CardContainer' title={title} bordered={false}>
                {
                    description ? 
                    <div className="Description">{description}</div>
                    : <></>
                }
                <PieChart option={data.option} />
            </Card>
        </div>
    )
};

export default StatCard;