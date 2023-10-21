import { useState } from 'react';
import { Button, Steps, message } from 'antd';

const Measurement = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
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
      Measurement
      <Steps
        current={currentStepIndex}
        items={steps}
      />
      <div className='actionRow' style={{ marginTop: 24 }}>
        {currentStepIndex > 0 && (
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => changeStep(-1)}
          >
            Previous
          </Button>
        )}
        {currentStepIndex < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => changeStep(+1)}
          >
            Next
          </Button>
        )}
        {currentStepIndex === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default Measurement;
