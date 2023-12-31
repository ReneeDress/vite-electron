import { RouteObject } from 'react-router-dom';
import Home from './Home';
import USBDevices from './USBDevices';
import SystemInfo from './SystemInfo';
import CameraCalibration from './CameraCalibration';
import Measurement from './Measurement';
import HistoryLogs from './HistoryLogs';
import MeasureLogs from './HistoryLogs/MeasureLogs';

interface CustomRouteObject {
  route: RouteObject;
  menuData?: any;
  pageInfo?: any;
}

export const customRoutes: CustomRouteObject[] = [
  {
    route: {
      path: '',
      element: <Home />,
    },
    menuData: {
      label: '首页',
    },
    pageInfo: {
      title: '首页',
      subtitle: '',
      titleVisibility: false,
    }
  },
  {
    route: {
      path: 'measurement',
      element: <Measurement />,
    },
    menuData: {
      label: '螺纹参数测量',
    },
    pageInfo: {
      title: '螺纹参数测量',
      subtitle: '',
      titleVisibility: true,
    }
  },
  {
    route: {
      path: 'history-logs',
      element: <HistoryLogs />,
      children: [
        {
          path: 'measure-logs',
          element: <MeasureLogs />
        }
      ]
    },
    menuData: {
      label: '历史数据查询',
    },
    pageInfo: {
      title: '历史数据查询',
      subtitle: '',
      titleVisibility: true,
    },
  },
  {
    route: {
      path: 'camera-calibration',
      element: <CameraCalibration />,
    },
    menuData: {
      label: '相机标定',
    },
    pageInfo: {
      title: '相机标定',
      subtitle: '',
      titleVisibility: true,
    }
  },
  {
    route: {
      path: 'usb-devices',
      element: <USBDevices />,
    },
    menuData: {
      label: 'USB设备',
    },
    pageInfo: {
      title: 'USB设备',
      subtitle: '',
      titleVisibility: true,
    }
  },
  {
    route: {
      path: 'system-info',
      element: <SystemInfo />,
    },
    menuData: {
      label: '系统信息',
    },
    pageInfo: {
      title: '系统信息',
      subtitle: '',
      titleVisibility: true,
    }
  },
];

export const routes: RouteObject[] = customRoutes.map(item => item.route);
