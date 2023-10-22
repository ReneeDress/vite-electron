import { useState } from 'react';
import { Button, Steps, message } from 'antd';
import './index.less';
import MeasurementBoard from './fragments/MeasurementBoard';

const MeasurementStepMap = [
  <>MeasurementStepMap0</>,
  <MeasurementBoard />,
  <>MeasurementStepMap2</>
]

interface MeasurementStepProps {
  stepIndex: number;
  [key: string]: any;
}

const MeasurementStep = (props: MeasurementStepProps) => {
  const { stepIndex } = props;
  return (
    <>
      {/* {`MeasurementStep${stepIndex + 1}`} */}
      <div className="contentWrapper">
        { MeasurementStepMap[stepIndex] }
      </div>
    </>
  )
}

const Measurement = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const steps = [
    {
      title: '相机状态检查',
      description: '检查所有相机是否都工作正常',
    },
    {
      title: '螺纹参数测量',
      description: '',
    },
    {
      title: '螺纹数据统计',
      description: '确认测量数据及初步统计结果',
    },
  ];

  const changeStep = (direction: number) => {
    setCurrentStepIndex(currentStepIndex + direction);
  };

  return (
    <>
      <div className='stepsRow'>
        <Steps
          current={currentStepIndex}
          items={steps}
        />
      </div>
      <div className='stepContent'>
      {
        <MeasurementStep stepIndex={currentStepIndex} />
      }
      </div>
      <div className='actionRow' style={{ marginTop: 24 }}>
        {currentStepIndex > 0 && (
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => changeStep(-1)}
          >
            上一步
          </Button>
        )}
        {currentStepIndex < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => changeStep(+1)}
          >
            下一步
          </Button>
        )}
        {currentStepIndex === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            结束测量
          </Button>
        )}
      </div>
    </>
  );
};

export default Measurement;
