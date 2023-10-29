import StatCard from "/@/components/StatCard";
import './index.less';

const Display = () => {
    const option = {
        title: {
        text: ''
        },
        tooltip: {},
        xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
        {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }
        ]
    };

    return (
        <div className="Display">
            <StatCard data={{option}} />
        </div>
    )
};

export default Display;