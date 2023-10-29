import { Card } from 'antd';
import './index.less';

interface StatCardProps {
    type?: string;
    data?: any;
    title?: string;
    description?: string;
}

const StatCard = (props: StatCardProps) => {
    const { type = 'plain', data = {}, title = '默认标题', description } = props;
    
    return (
        <div className="StatCard">
            <Card className='CardContainer' title={title} bordered={false} size={'small'}>
                {
                    description ? 
                    <div className="Description">{description}</div>
                    : <></>
                }
            </Card>
        </div>
    )
};

export default StatCard;